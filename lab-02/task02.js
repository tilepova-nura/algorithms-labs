// Задача 2. Даны три числа. Найти сумму двух наибольших из них.
// Идея: сумма двух наибольших = сумма всех трёх минус наименьшее.

const { askNumber, close, round } = require('./input');

async function main() {
  const a = await askNumber('Первое число: ');
  const b = await askNumber('Второе число: ');
  const c = await askNumber('Третье число: ');

  let min = a;
  if (b < min) min = b;
  if (c < min) min = c;

  const result = a + b + c - min;

  console.log(`Наименьшее число: ${round(min)}`);
  console.log(`Сумма двух наибольших = ${round(result)}`);
  close();
}

main();
