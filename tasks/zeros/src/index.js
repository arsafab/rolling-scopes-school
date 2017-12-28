module.exports = function zeros(expression) {
  let arr = expression.split('*');
  let ordinary = [];
  let binary = [];
  let count = 0;

  ordinary = arr.filter(item => /[0-9]+\!$/.test(item))
                .map(item => Number(item.replace('!', '')));

  binary = arr.filter(item => /[0-9]+\!\!$/.test(item))
                .map(item => Number(item.replace('!!', ''))); 

  // how many zeros in ordinary              
  ordinary.forEach(item => count += Math.floor(item / 5) + Math.floor(item / 25));
  
  // how many zeros in binary
  let even = binary.filter(item => item % 2 === 0).concat(ordinary);;
  
    binary.forEach(item => {
      if(item % 2 === 0) {
        if(item >= 50) count += 1;
        if(item >= 100) count += 1;

        count += Math.floor(item / 10);
      } else if(item % 2 === 1 && even.length > 0) {
        let tmp = 5;
  
        while(tmp <= item){
          if(tmp === 25 || tmp === 75) count += 1;

          tmp += 10;
          count += 1;       
        }
      } 
    });


  return count;
}
