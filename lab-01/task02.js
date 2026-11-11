// Задача 2. Дан диаметр окружности d. Найти её длину L = π·d.
// В качестве значения π использовать 3.14.

const { askNumber, close, round } = require('./input');

const PI = 3.14;

async function main() {
  const d = await askNumber('Диаметр d: ');

  const length = PI * d;

  console.log(`Длина окружности L = ${round(length)}`);
  close();
}

main();
