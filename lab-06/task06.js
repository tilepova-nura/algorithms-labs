// Задача 6. Дана матрица M × N.
// Преобразовать её, поменяв местами минимальный и максимальный элемент в каждой строке.

const { askInteger, askMatrix, printMatrix, close } = require('./input');

async function main() {
  const m = await askInteger('Количество строк M: ', 1, 20);
  const n = await askInteger('Количество столбцов N: ', 1, 20);
  const matrix = await askMatrix(m, n);

  console.log('Было:');
  printMatrix(matrix);

  for (let i = 0; i < m; i++) {
    const row = matrix[i];
    let minIndex = 0;
    let maxIndex = 0;
    for (let j = 1; j < n; j++) {
      if (row[j] < row[minIndex]) minIndex = j;
      if (row[j] > row[maxIndex]) maxIndex = j;
    }
    // обмен через временную переменную
    const temp = row[minIndex];
    row[minIndex] = row[maxIndex];
    row[maxIndex] = temp;
  }

  console.log('Стало:');
  printMatrix(matrix);
  close();
}

main();
