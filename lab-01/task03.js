// Задача 3. Даны два числа a и b. Найти их среднее арифметическое: (a + b) / 2.

const { askNumber, close, round } = require('./input');

async function main() {
  const a = await askNumber('Число a: ');
  const b = await askNumber('Число b: ');

  const average = (a + b) / 2;

  console.log(`Среднее арифметическое = ${round(average)}`);
  close();
}

main();
