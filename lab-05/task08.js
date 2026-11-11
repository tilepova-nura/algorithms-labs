// Задача 8. Дан массив A размера N.
// Найти минимальный элемент среди элементов с чётными номерами: A2, A4, A6, ...
// Чётные номера 2, 4, 6 — это индексы 1, 3, 5.

const { askNumberList, close } = require('./input');

async function main() {
  const array = await askNumberList('Массив через пробел (не меньше 2 чисел): ');

  if (array.length < 2) {
    console.log('Элементов с чётными номерами нет.');
    close();
    return;
  }

  let min = array[1];
  for (let i = 3; i < array.length; i += 2) {
    if (array[i] < min) {
      min = array[i];
    }
  }

  console.log(`Минимум среди чётных номеров: ${min}`);
  close();
}

main();
