// Задача 1. Даны стороны прямоугольника a и b.
// Найти его площадь S = a·b и периметр P = 2·(a + b).

const { askNumber, close, round } = require('./input');

async function main() {
  const a = await askNumber('Сторона a: ');
  const b = await askNumber('Сторона b: ');

  const area = a * b;
  const perimeter = 2 * (a + b);

  console.log(`Площадь S = ${round(area)}`);
  console.log(`Периметр P = ${round(perimeter)}`);
  close();
}

main();
