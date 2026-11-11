// Задача 6. Дан массив размера N и целые K и L (1 ≤ K ≤ L ≤ N).
// Найти среднее арифметическое элементов с номерами от K до L включительно.

const { askInteger, askNumberList, close, round } = require('./input');

async function main() {
  const array = await askNumberList('Массив через пробел: ');
  const n = array.length;
  const k = await askInteger(`K (от 1 до ${n}): `, 1, n);
  const l = await askInteger(`L (от ${k} до ${n}): `, k, n);

  let sum = 0;
  for (let i = k - 1; i <= l - 1; i++) { // номера K..L → индексы K−1..L−1
    sum += array[i];
  }
  const count = l - k + 1;

  console.log(`Среднее = ${round(sum / count)}`);
  close();
}

main();
