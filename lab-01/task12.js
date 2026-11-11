// Задача 12. Найти значение функции y = 4(x − 3)⁶ − 7(x − 3)³ + 2 при данном значении x.
// Чтобы не считать (x − 3) несколько раз, обозначим t = x − 3.

const { askNumber, close, round } = require('./input');

async function main() {
  const x = await askNumber('x: ');

  const t = x - 3;
  const t3 = t * t * t; // (x − 3)³
  const t6 = t3 * t3;   // (x − 3)⁶
  const y = 4 * t6 - 7 * t3 + 2;

  console.log(`y = ${round(y)}`);
  close();
}

main();
