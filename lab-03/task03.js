// Задача 3. Дано целое число N (> 0). Найти квадрат числа по формуле
// N² = 1 + 3 + 5 + ... + (2·N − 1).
// После добавления каждого слагаемого выводить текущее значение суммы.

const { askInteger, close } = require('./input');

async function main() {
  const n = await askInteger('N: ', 1);

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    const term = 2 * i - 1; // нечётные числа: 1, 3, 5, ...
    sum += term;
    console.log(`+ ${term} → ${sum}`); // после i шагов sum = i²
  }

  console.log(`${n}² = ${sum}`);
  close();
}

main();
