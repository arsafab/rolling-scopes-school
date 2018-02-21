module.exports = function solveEquation(equation) {
    let numbers = equation.match(/(\-?|\+\s|\-\s)[0-9]+/g).map(item => Number(item.replace(/\s/g, '')));
  
    const a = numbers[0];
    const b = numbers[2];
    const c = numbers[3];
  
    const D = (b * b) - 4 * a * c;
    const res1 = (-b + Math.sqrt(D)) / (2 * a);
    const res2 = (-b - Math.sqrt(D)) / (2 * a);
  
    return [
        Math.round(res1),
        Math.round(res2)
    ].sort((a, b) => a - b)
}