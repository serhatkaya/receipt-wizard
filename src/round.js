module.exports = {
  round: function(method, number, precision) {
    if (typeof number !== "number") {
      throw new TypeError("Expected value to be a number");
    }
  
    if (precision === Number.POSITIVE_INFINITY) {
      return number;
    }
  
    if (!Number.isInteger(precision)) {
      throw new TypeError("Expected precision to be an integer");
    }
  
    const isRoundingAndNegative = method === "round" && number < 0;
    if (isRoundingAndNegative) {
      number = Math.abs(number);
    }
  
    const power = 10 ** precision;
  
    let result = Math[method]((number * power).toPrecision(15)) / power;
  
    if (isRoundingAndNegative) {
      result = -result;
    }
  
    return result;
  },
  roundTo: function(number, precision) {
    return this.round("round", number, precision);
  },
  roundToUp: function(number, precision) {
    return this.round("ceil", number, precision);
  },
  roundToDown: function(number, precision) {
    return this.round("floor", number, precision);
  }
};

// Explicitly bind 'this' to the exported object for all methods
Object.keys(module.exports).forEach(key => {
  if (typeof module.exports[key] === 'function') {
    module.exports[key] = module.exports[key].bind(module.exports);
  }
});
