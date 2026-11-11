// Задача 2. Дано N (> 1), первый член A и знаменатель D геометрической прогрессии.
// Сформировать массив из N первых членов: A, A·D, A·D², ...

const { askNumber, askInteger, close, round } = require('./input');

async function main() {
  const n = await askInteger('N: ', 2);
  const a = await askNumber('Первый член A: ');
  const d = await askNumber('Знаменатель D: ');

  const array = [a];
  for (let i = 1; i < n; i++) {
    array.push(array[i - 1] * d); // каждый член = предыдущий × D
  }

  console.log(array.map(round).join(' '));
  close();
}

main();
