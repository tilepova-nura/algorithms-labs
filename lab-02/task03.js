// Задача 3. На плоскости даны три точки A, B, C.
// Определить, какая из точек B или C ближе к A, и вывести эту точку и её расстояние от A.

const { askNumber, close, round } = require('./input');

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

async function main() {
  const ax = await askNumber('A, x: ');
  const ay = await askNumber('A, y: ');
  const bx = await askNumber('B, x: ');
  const by = await askNumber('B, y: ');
  const cx = await askNumber('C, x: ');
  const cy = await askNumber('C, y: ');

  const ab = distance(ax, ay, bx, by);
  const ac = distance(ax, ay, cx, cy);

  if (ab < ac) {
    console.log(`Ближе точка B, расстояние ${round(ab)}`);
  } else if (ac < ab) {
    console.log(`Ближе точка C, расстояние ${round(ac)}`);
  } else {
    console.log(`Точки B и C находятся на одинаковом расстоянии ${round(ab)}`);
  }
  close();
}

main();
