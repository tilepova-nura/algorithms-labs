// Задача 8. Подсчёт количества цифр в числе: функция рекурсивно считает цифры.
// Если число меньше 10 — в нём одна цифра (базовый случай).
// Иначе: 1 + количество цифр в числе без последней цифры (делим на 10 нацело).

const { askInteger, close } = require('./input');

function countDigits(n) {
  if (n < 10) {
    return 1;
  }
  return 1 + countDigits(Math.floor(n / 10));
}

async function main() {
  const n = await askInteger('Целое число: ');
  // знак минус цифрой не считается, поэтому берём модуль
  console.log(`Количество цифр: ${countDigits(Math.abs(n))}`);
  close();
}

main();
