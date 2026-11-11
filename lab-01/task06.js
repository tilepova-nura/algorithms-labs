// Задача 6. Найти расстояние между двумя точками с координатами (x1, y1) и (x2, y2).
// Формула: d = √((x2 − x1)² + (y2 − y1)²)

const { askNumber, close, round } = require('./input');

async function main() {
  const x1 = await askNumber('x1: ');
  const y1 = await askNumber('y1: ');
  const x2 = await askNumber('x2: ');
  const y2 = await askNumber('y2: ');

  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  console.log(`Расстояние = ${round(distance)}`);
  close();
}

main();
