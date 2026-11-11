// Задача 6. Дано целое число в диапазоне 1–999.
// Вывести описание вида «четное двузначное число», «нечетное трехзначное число».

const { askInteger, close } = require('./input');

async function main() {
  const n = await askInteger('Число от 1 до 999: ', 1, 999);

  const parity = n % 2 === 0 ? 'четное' : 'нечетное';

  let digits;
  if (n < 10) {
    digits = 'однозначное';
  } else if (n < 100) {
    digits = 'двузначное';
  } else {
    digits = 'трехзначное';
  }

  console.log(`${parity} ${digits} число`);
  close();
}

main();
