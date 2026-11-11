// Задача 7. Даны три точки A, B, C на числовой оси.
// Найти длины отрезков AC и BC и их сумму.
// Длина отрезка на прямой — модуль разности координат.

const { askNumber, close, round } = require('./input');

async function main() {
  const a = await askNumber('Координата A: ');
  const b = await askNumber('Координата B: ');
  const c = await askNumber('Координата C: ');

  const ac = Math.abs(a - c);
  const bc = Math.abs(b - c);

  console.log(`AC = ${round(ac)}`);
  console.log(`BC = ${round(bc)}`);
  console.log(`AC + BC = ${round(ac + bc)}`);
  close();
}

main();
