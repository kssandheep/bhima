angular.module('bhima.controllers')
.controller('PatientInvoiceController', PatientInvoiceController);

PatientInvoiceController.$inject = [
  '$http', '$q', '$location', 'Patients', 'PriceLists', 'PatientInvoice', 
  'Invoice', 'util'
];

/** 
 * Patient Invoice Controller 
 *
 * @todo (required) Tabbing through UI grid. Code -> Quantity -> Price
 * @todo (required) Design and implement how cautions are assigned. Client vs. Server
 * @todo (required) Sale made outside of fiscal year error should be handled and shown to user
 * @todo (required) Billing services and subsidies should be ignored for specific debtors 
 * @todo Known bug - sidebar expanding and collapsing does not redraw totals columns (listen and update?)
 * @todo Total rows formatted to show subsidy as subtraction and make clear running total
 *
 * @module bhima/controllers/PatientInvoiceController
 */
function PatientInvoiceController($http, $q, $location, Patients, PriceLists, PatientInvoice, Invoice, util) { 
  var vm = this;
  vm.Invoice = new Invoice();
    
  var gridOptions = { 
    appScopeProvider : vm,
    enableSorting : false,
    enableColumnMenus : false,
    columnDefs : [
      {field : 'status', width : 25, displayName : '', cellTemplate : 'partials/patient_invoice/templates/grid/status.tmpl.html'},
      {field : 'code', cellTemplate :  'partials/patient_invoice/templates/grid/code.tmpl.html'},
      {field : 'description'},
      {field : 'quantity', cellTemplate : 'partials/patient_invoice/templates/grid/quantity.tmpl.html'},
      {field : 'transaction_price', cellTemplate : 'partials/patient_invoice/templates/grid/unit.tmpl.html'},
      {field : 'amount', cellTemplate : 'partials/patient_invoice/templates/grid/amount.tmpl.html'},
      {field : 'actions', width : 25, cellTemplate : 'partials/patient_invoice/templates/grid/actions.tmpl.html'}
    ],
    onRegisterApi : exposeGridScroll,
    data : vm.Invoice.items.rows
  };

  function exposeGridScroll(gridApi) { 
    vm.gridApi = gridApi;
  }
  
  function setPatient(patient) { 
    var uuid = patient.uuid;

    Patients.detail(uuid)
      .then(configureInvoice);
  }

  // Invoice total and items are successfully sent and written to the server 
  // - Billing services are sent to the server but NOT recorded 
  // - Subsidies are sent to the server but NOT recorded
  // - TODO the final value of a sale can only be determined after checking all
  //        billing services, subsidies and the cost of the sale
  function submit(detailsForm) { 
    var items = angular.copy(vm.Invoice.items.rows);
    
    // Update value for Form validation
    detailsForm.$setSubmitted();
  
    if (detailsForm.$invalid) { 
      return;
    }

    // Ask service items to validate themselves - if anything is returned it is invalid
    var invalidItem = vm.Invoice.items.verify();
    
    if (angular.isDefined(invalidItem)) { 
      
      // show the user where the error is
      vm.gridApi.core.scrollTo(invalidItem);
      return;
    }
      
    // Invoice consists of 
    // 1. Invoice details
    // 2. Invoice items
    // 3. Charged billing services - each of these have the global charge calculated by the client
    // 4. Charged subsidies - each of these have the global charge calculated by the client
    PatientInvoice.create(vm.Invoice.details, items, vm.Invoice.billingServices, vm.Invoice.subsidies)
      .then(handleCompleteInvoice);
  }
   
  function handleCompleteInvoice(result) { 
    vm.Invoice.items.removeCache(); 
    $location.path('/invoice/sale/'.concat(result.uuid));
  }
  
  // Reset everything in the controller - default values
  function clear() { 
    
    // Default values
    vm.itemIncrement = 1;
    vm.timestamp = new Date();
    
    // set one day in the future 
    vm.timestamp.setDate(vm.timestamp.getDate() + 1);

    vm.minimumDate = util.minimumDate;
    vm.dateLocked = true;
    
    // Set default invoice date to today 
    // FIXME Encapsulare invoice reset logic within service
    vm.Invoice.details.invoice_date = new Date();
    vm.Invoice.recipient = null;
    vm.Invoice.items.recovered = false;
    vm.Invoice.items.clearItems(true, false);

    if (vm.services) { 
      vm.Invoice.details.service_id = vm.services[0].id;
    }

    if (vm.patientSearch) { 
      vm.patientSearch.reset();
    }
  };
  
  vm.gridOptions = gridOptions;
  vm.setPatient = setPatient;
  vm.submit = submit;
  vm.clear = clear;

  // TODO potentially move this into debitor configuration within invoice
  // TODO very temporary code
  function configureInvoice(patient) { 
    var configureQueue = [];

    // Prompt initial invoice item
    vm.Invoice.items.configureBase();
  
    configureQueue.push(Patients.billingServices(patient.uuid));
    configureQueue.push(Patients.subsidies(patient.uuid));

    if (patient.price_list_uuid) { 
      configureQueue.push(PriceLists.detail(patient.price_list_uuid));
    }
    
    $q.all(configureQueue)
      .then(function (result) { 
        var billingResult = result[0];
        var subsidiesResult = result[1];
        var priceListResult = result[2];

        // TODO All of these can be settup in one method exposed by the service
        vm.Invoice.configureGlobalCosts(billingResult, subsidiesResult);
        vm.Invoice.items.setPriceList(priceListResult);
        vm.Invoice.recipient = patient;
        vm.Invoice.details.debitor_uuid = patient.debitor_uuid;
      });
  }

  // TODO 02/08 - Replace with Dedrick's services API
  $http.get('services')
    .then(function (services) { 
      vm.services = services.data;

      // Select default service
      vm.Invoice.details.service_id = vm.services[0].id;
    });
  
  // Set initial default values
  clear();
}
