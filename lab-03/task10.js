// Задача 10. Даны целые положительные числа A и B.
// Найти их наибольший общий делитель (НОД) по алгоритму Евклида.
// Алгоритм: пока B ≠ 0, заменяем пару (A, B) на (B, A mod B). Когда B = 0, ответ — A.

const { askInteger, close } = require('./input');

async function main() {
  let a = await askInteger('A: ', 1);
  let b = await askInteger('B: ', 1);
  const startA = a;
  const startB = b;

  while (b !== 0) {
    const rest = a % b;
    console.log(`${a} mod ${b} = ${rest}`);
    a = b;
    b = rest;
  }

  console.log(`НОД(${startA}, ${startB}) = ${a}`);
  close();
}

main();
