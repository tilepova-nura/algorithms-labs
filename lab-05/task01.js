// Задача 1. Дано целое число N (> 0). Сформировать и вывести массив размера N,
// содержащий N первых положительных нечётных чисел: 1, 3, 5, ...

const { askInteger, close } = require('./input');

async function main() {
  const n = await askInteger('N: ', 1);

  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(2 * i + 1); // i-е нечётное число (нумерация с нуля)
  }

  console.log(array.join(' '));
  close();
}

main();
