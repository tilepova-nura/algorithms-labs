// Задача 11. Найти значение функции y = 3x⁶ − 6x² − 7 при данном значении x.

const { askNumber, close, round } = require('./input');

async function main() {
  const x = await askNumber('x: ');

  const x2 = x * x;        // x²
  const x6 = x2 * x2 * x2; // x⁶ = (x²)³
  const y = 3 * x6 - 6 * x2 - 7;

  console.log(`y = ${round(y)}`);
  close();
}

main();
