// Задача 2. Дано целое число N (> 0).
// Найти произведение 1.1 · 1.2 · 1.3 · ... (N сомножителей).

const { askInteger, close, round } = require('./input');

async function main() {
  const n = await askInteger('N: ', 1);

  let product = 1; // начальное значение произведения — 1, а не 0
  for (let i = 1; i <= n; i++) {
    const factor = 1 + i / 10; // 1.1, 1.2, 1.3, ...
    product *= factor;
  }

  console.log(`Произведение = ${round(product)}`);
  close();
}

main();
