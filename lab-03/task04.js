// Задача 4. Дано вещественное число A и целое N (> 0).
// Используя один цикл, найти сумму 1 + A + A² + A³ + ... + A^N.
// Каждую следующую степень получаем из предыдущей умножением на A.

const { askNumber, askInteger, close, round } = require('./input');

async function main() {
  const a = await askNumber('A: ');
  const n = await askInteger('N: ', 1);

  let term = 1; // текущая степень A, начинаем с A⁰ = 1
  let sum = 1;
  for (let i = 1; i <= n; i++) {
    term *= a;   // A^i
    sum += term;
  }

  console.log(`Сумма = ${round(sum)}`);
  close();
}

main();
