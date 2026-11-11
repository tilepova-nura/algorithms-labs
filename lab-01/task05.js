// Задача 5. Даны два ненулевых числа.
// Найти сумму, разность, произведение и частное их модулей.

const { askNonZero, close, round } = require('./input');

async function main() {
  const a = await askNonZero('Первое число: ');
  const b = await askNonZero('Второе число: ');

  const absA = Math.abs(a); // модуль первого числа
  const absB = Math.abs(b); // модуль второго числа

  console.log(`Модули: ${round(absA)} и ${round(absB)}`);
  console.log(`Сумма = ${round(absA + absB)}`);
  console.log(`Разность = ${round(absA - absB)}`);
  console.log(`Произведение = ${round(absA * absB)}`);
  console.log(`Частное = ${round(absA / absB)}`);
  close();
}

main();
