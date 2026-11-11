// Задача 10. Даны координаты трёх вершин треугольника (x1, y1), (x2, y2), (x3, y3).
// Найти его периметр и площадь.
// Стороны считаем как расстояния между вершинами,
// площадь — по формуле Герона: S = √(p·(p − a)·(p − b)·(p − c)), где p — полупериметр.

const { askNumber, close, round } = require('./input');

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

async function main() {
  const x1 = await askNumber('x1: ');
  const y1 = await askNumber('y1: ');
  const x2 = await askNumber('x2: ');
  const y2 = await askNumber('y2: ');
  const x3 = await askNumber('x3: ');
  const y3 = await askNumber('y3: ');

  const a = distance(x1, y1, x2, y2);
  const b = distance(x2, y2, x3, y3);
  const c = distance(x3, y3, x1, y1);

  const perimeter = a + b + c;
  const p = perimeter / 2;
  const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));

  console.log(`Стороны: ${round(a)}, ${round(b)}, ${round(c)}`);
  console.log(`Периметр = ${round(perimeter)}`);
  console.log(`Площадь = ${round(area)}`);
  close();
}

main();
