// Задача 2. Дана матрица M × N и целое число K (1 ≤ K ≤ M).
// Найти сумму и произведение элементов K-й строки.

const { askInteger, askMatrix, printMatrix, close, round } = require('./input');

async function main() {
  const m = await askInteger('Количество строк M: ', 1, 20);
  const n = await askInteger('Количество столбцов N: ', 1, 20);
  const matrix = await askMatrix(m, n);
  const k = await askInteger(`K (от 1 до ${m}): `, 1, m);

  const row = matrix[k - 1];
  let sum = 0;
  let product = 1;
  for (let j = 0; j < n; j++) {
    sum += row[j];
    product *= row[j];
  }

  printMatrix(matrix);
  console.log(`Строка ${k}: сумма = ${round(sum)}, произведение = ${round(product)}`);
  close();
}

main();
