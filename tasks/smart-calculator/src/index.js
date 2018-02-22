class SmartCalculator {
  constructor(initialValue) {
    this.initialValue = initialValue;
    this.value = '' + this.initialValue;
    this.prev = this.initialValue;
    this.res = null;
    this.expArr = [];
  }

  add(number) {
    this.setProperties(number);
    this.value += `+${number}`;
    return this;
  }
  
  subtract(number) {
    this.setProperties(number);
    this.value += `-${number}`;
    return this;
  }

  multiply(number) {
    this.setProperties(number);
    this.value += `*${number}`;
    return this;
  }

  devide(number) {
    this.setProperties(number);
    this.value += `/${number}`;
    return this;
  }

  pow(number) {
    this.expArr.push(number);     
    const exp = this.expArr.reduceRight((a, b) => Math.pow(b, a), 1);
       
    const length = this.res ? String(this.res).length : String(this.prev).length;
    
    this.res = Math.pow(this.prev, exp);
    this.value = this.value.slice(0, this.value.length - length) + this.res;

    return this;   
  }

  setProperties(number) {
    this.prev = number;
    this.expArr = []
    this.res = null;
  }

  valueOf() {
      return eval(this.value);
  }

  toString() {
      return eval(this.value);
  }
}    

module.exports = SmartCalculator;
