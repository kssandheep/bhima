module.exports = rubircs();

function rubircs() {
  return [
    {
      indice_type :  'is_base_index',
      label :  'PAYROLL_RUBRIC.BASE_INDEX',
      abbr :  'Indice de base',
      is_indice : 1,
      position : 1,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_day_index',
      label :  'PAYROLL_RUBRIC.DAY_INDEX',
      abbr :  'Indice du jr',
      is_indice : 1,
      position : 2,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_reagistered_index',
      label :  'PAYROLL_RUBRIC.REAGISTERED_INDEX',
      abbr :  'Indice Réagisté',
      is_indice : 1,
      position : 3,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_responsability',
      label :  'PAYROLL_RUBRIC.RESPONSABILITY',
      abbr :  'Responsabilité',
      is_indice : 1,
      position : 4,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_other_profits',
      label :  'PAYROLL_RUBRIC.OTHER_PROFIT',
      abbr :  'Autre Profit',
      indice_to_grap : 1,
      is_indice : 1,
      position : 5,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_total_code',
      label :  'PAYROLL_RUBRIC.TOTAL_CODE',
      abbr :  'TtCode',
      is_indice : 1,
      position : 6,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_day_worked',
      label :  'PAYROLL_RUBRIC.DAY_WORKED',
      abbr :  'Jr presté',
      indice_to_grap   :  1,
      is_indice : 1,
      position : 7,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_extra_day',
      label :  'PAYROLL_RUBRIC.EXTRA_DAY',
      abbr :  'jr Suppl',
      indice_to_grap   :  1,
      is_indice : 1,
      position : 8,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_total_days',
      label :  'PAYROLL_RUBRIC.TOTAL_DAYS',
      abbr :  'ttjr',
      is_indice : 1,
      position : 9,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_pay_rate',
      label :  'PAYROLL_RUBRIC.PAY_RATE',
      abbr :  'TxPaie',
      is_indice : 1,
      position : 10,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_gross_salary',
      label :  'PAYROLL_RUBRIC.GROSS_SALARY',
      abbr :  'Brute',
      is_indice : 1,
      position : 11,
      is_monetary_value : 0,
    },
    {
      indice_type :  'is_number_of_days',
      label :  'PAYROLL_RUBRIC.NUMBER_OF_DAYS',
      abbr :  'NbrJr',
      is_indice : 1,
      position : 12,
      is_monetary_value : 0,
    },
  ];
}