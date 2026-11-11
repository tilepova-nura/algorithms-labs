// Задача 8. Дано целое число N (> 1).
// Вывести наименьшее K, при котором сумма 1 + 2 + ... + K ≥ N, и саму эту сумму.
// Количество шагов заранее неизвестно, поэтому используем цикл while.

const { askInteger, close } = require('./input');

async function main() {
  const n = await askInteger('N: ', 2);

  let k = 0;
  let sum = 0;
  while (sum < n) {
    k++;
    sum += k;
  }

  console.log(`K = ${k}, сумма = ${sum}`);
  close();
}

main();
