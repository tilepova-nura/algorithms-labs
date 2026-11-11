// Задача 1. Даны две целые переменные A и B.
// Если их значения не равны, присвоить каждой переменной большее из значений,
// а если равны — присвоить обеим ноль. Вывести новые значения A и B.

const { askInteger, close } = require('./input');

async function main() {
  let a = await askInteger('A: ');
  let b = await askInteger('B: ');

  if (a !== b) {
    const max = a > b ? a : b;
    a = max;
    b = max;
  } else {
    a = 0;
    b = 0;
  }

  console.log(`A = ${a}, B = ${b}`);
  close();
}

main();
