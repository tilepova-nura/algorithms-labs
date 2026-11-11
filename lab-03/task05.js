// Задача 5. Дано вещественное число A и целое N (> 0).
// Используя один цикл, найти 1 − A + A² − A³ + ... ± A^N.
// Условный оператор не использовать.
// Знак меняется сам, если каждый раз умножать слагаемое на −A.

const { askNumber, askInteger, close, round } = require('./input');

async function main() {
  const a = await askNumber('A: ');
  const n = await askInteger('N: ', 1);

  let term = 1; // текущее слагаемое со знаком: 1, −A, A², −A³, ...
  let sum = 1;
  for (let i = 1; i <= n; i++) {
    term *= -a;
    sum += term;
  }

  console.log(`Сумма = ${round(sum)}`);
  close();
}

main();
