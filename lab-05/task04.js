// Задача 4. Дан массив A размера N. Вывести элементы в порядке:
// A1, AN, A2, AN−1, A3, AN−2, ...
// Идём двумя индексами: left с начала, right с конца, навстречу друг другу.

const { askNumberList, close } = require('./input');

async function main() {
  const array = await askNumberList('Массив через пробел: ');

  const result = [];
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    result.push(array[left]);
    if (left !== right) {
      result.push(array[right]); // при нечётном N средний элемент выводим один раз
    }
    left++;
    right--;
  }

  console.log(result.join(' '));
  close();
}

main();
