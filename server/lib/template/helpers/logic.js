// test equality
function equal(a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

// great than
function gt(a, b, options) {
  if (a >= b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

// less than
function lt(a, b, options) {
  if (a < b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

function setdefault(val, _default) {
  return (val >= 0 || val < 0) ? val : _default;
}

exports.equal = equal;
exports.gt = gt;
exports.lt = lt;
exports.setdefault = setdefault;
