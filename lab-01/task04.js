// Задача 4. Даны два ненулевых числа.
// Найти сумму, разность, произведение и частное их квадратов.

const { askNonZero, close, round } = require('./input');

async function main() {
  const a = await askNonZero('Первое число: ');
  const b = await askNonZero('Второе число: ');

  const a2 = a * a; // квадрат первого числа
  const b2 = b * b; // квадрат второго числа

  console.log(`Квадраты: ${round(a2)} и ${round(b2)}`);
  console.log(`Сумма = ${round(a2 + b2)}`);
  console.log(`Разность = ${round(a2 - b2)}`);
  console.log(`Произведение = ${round(a2 * b2)}`);
  console.log(`Частное = ${round(a2 / b2)}`);
  close();
}

main();
