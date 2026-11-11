// Задача 7. Даны положительные числа A и B (A > B).
// На отрезке длины A размещено максимально возможное количество отрезков длины B.
// Не используя умножение и деление, найти длину незанятой части отрезка A.
// Решение: отнимаем B от A, пока остаток не станет меньше B.

const { askNumber, close, round } = require('./input');

async function main() {
  const a = await askNumber('A: ');
  const b = await askNumber('B (меньше A): ');

  if (a <= 0 || b <= 0 || a <= b) {
    console.log('Нужно, чтобы A > B > 0.');
    close();
    return;
  }

  let rest = a;
  let count = 0;
  while (rest >= b) {
    rest -= b;
    count++;
  }

  console.log(`Поместилось отрезков: ${count}`);
  console.log(`Незанятая часть = ${round(rest)}`);
  close();
}

main();
