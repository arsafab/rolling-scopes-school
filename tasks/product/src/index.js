module.exports = function multiply(first, second) {
  if(first.length < 14 && second.length < 14) return String(Number(first) * Number(second));

  let stack = [];
  let result = [];
  let tmp = []; // хранилище после преобразования многомерного массива в одномерный

  let num1 = first.split('').reverse();
  let num2 = second.split('').reverse();
  
  // перемножаем first на каждую цифру second и выводим массивы внутри stack
  for(let i = 0; i < num2.length; i++){
    let exc = 0;
  
    for(let j = 0; j < num1.length; j++){     
      let res = Number(num1[j]) * Number(num2[i]) + exc;
      exc = 0; // остаток
      
      if (res < 10 || j === num1.length - 1) {
        (stack[i] == undefined) ? stack.push([res]) : stack[i].push(res);
        
      } else {
        let tmp = String(res).split('');

        res = Number(tmp[1]);
        exc = Number(tmp[0]);

        (stack[i] == undefined) ? stack.push([res]) : stack[i].push(res);
      }      
    }
  }

  // добавляем нули перед и после субмассивов, чтобы уравнять длину
  for(let i = 0; i < stack.length; i++){
    let count = 0;
    for(let j = 0; j < i; j++){
        stack[i].unshift(0);
        stack[count++].push(0);
    }
  }

  // преобразуем многомерный массив, складывая элементы по индексу    
  for(let i = 0; i < stack[0].length; i++){
      for(let j = 0; j < stack.length; j++){
          if(tmp[i] != undefined) tmp[i] += stack[j][i]; 
          else tmp[i] = stack[j][i];  
      }
  }
 
  // переносим десятки, если число больше 9
  tmp.map((item, i, arr) => {
    let tmp = String(item).split('');
    if(item > 99 && i !== arr.length - 1) {
        arr[i] = Number(tmp[2]);
        arr[i + 1] += Number(tmp[0] + tmp[1]);
    }  
    if(item > 9 && i !== arr.length - 1 && item < 100) {
      arr[i] = Number(tmp[1]);
      arr[i + 1] += Number(tmp[0]); 
    }
    return arr;
  })

  // преобразуем элементы массива в строки и реверсим
  result = tmp.map(item => String(item)).reverse();

  return result.reduce((prev, cur) => prev + cur);
}
