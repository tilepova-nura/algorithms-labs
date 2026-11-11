// Задача 9. Даны координаты двух противоположных вершин прямоугольника (x1, y1), (x2, y2).
// Стороны параллельны осям координат. Найти периметр и площадь.
// Стороны прямоугольника — это |x2 − x1| и |y2 − y1|.

const { askNumber, close, round } = require('./input');

async function main() {
  const x1 = await askNumber('x1: ');
  const y1 = await askNumber('y1: ');
  const x2 = await askNumber('x2: ');
  const y2 = await askNumber('y2: ');

  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

  console.log(`Стороны: ${round(width)} и ${round(height)}`);
  console.log(`Периметр = ${round(2 * (width + height))}`);
  console.log(`Площадь = ${round(width * height)}`);
  close();
}

main();
