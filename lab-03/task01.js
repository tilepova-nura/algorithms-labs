// Задача 1. Дано вещественное число — цена 1 кг конфет.
// Вывести стоимость 0.1, 0.2, ..., 1 кг конфет.

const { askNumber, close, round } = require('./input');

async function main() {
  const price = await askNumber('Цена 1 кг: ');

  // i = 1, 2, ..., 10, вес = i / 10 = 0.1, 0.2, ..., 1
  for (let i = 1; i <= 10; i++) {
    const weight = i / 10;
    console.log(`${weight} кг — ${round(price * weight)}`);
  }
  close();
}

main();
