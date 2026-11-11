// Задача 1. Факториал числа: функция рекурсивно вычисляет n!
// n! = n · (n − 1)!, а 0! = 1 — базовый случай, на котором рекурсия останавливается.

const { askInteger, close } = require('./input');

function factorial(n) {
  if (n === 0) {
    return 1; // базовый случай
  }
  return n * factorial(n - 1); // рекурсивный вызов с меньшим n
}

async function main() {
  // Больше 20! не помещается точно в обычное число JavaScript
  const n = await askInteger('n (от 0 до 20): ', 0, 20);
  console.log(`${n}! = ${factorial(n)}`);
  close();
}

main();
