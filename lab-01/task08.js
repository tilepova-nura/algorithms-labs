// Задача 8. Даны три точки A, B, C на числовой оси.
// Точка C расположена между точками A и B.
// Найти произведение длин отрезков AC и BC.

const { askNumber, close, round } = require('./input');

async function main() {
  const a = await askNumber('Координата A: ');
  const b = await askNumber('Координата B: ');
  const c = await askNumber('Координата C (между A и B): ');

  const ac = Math.abs(a - c);
  const bc = Math.abs(b - c);

  console.log(`AC = ${round(ac)}, BC = ${round(bc)}`);
  console.log(`AC · BC = ${round(ac * bc)}`);
  close();
}

main();
