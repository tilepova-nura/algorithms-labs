// Задача 2. Числа Фибоначчи: функция рекурсивно вычисляет n-е число.
// F(0) = 0, F(1) = 1 — базовые случаи, F(n) = F(n − 1) + F(n − 2).

const { askInteger, close } = require('./input');

function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

async function main() {
  // Простая рекурсия пересчитывает одни и те же значения много раз,
  // поэтому для больших n она очень медленная — ограничим n числом 30.
  const n = await askInteger('n (от 0 до 30): ', 0, 30);
  console.log(`F(${n}) = ${fibonacci(n)}`);
  close();
}

main();
