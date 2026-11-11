// Задача 7. Дана матрица M × N.
// Поменять местами столбцы, содержащие минимальный и максимальный элементы матрицы.

const { askInteger, askMatrix, printMatrix, close } = require('./input');

async function main() {
  const m = await askInteger('Количество строк M: ', 1, 20);
  const n = await askInteger('Количество столбцов N: ', 1, 20);
  const matrix = await askMatrix(m, n);

  console.log('Было:');
  printMatrix(matrix);

  // ищем столбцы минимума и максимума во всей матрице
  let minColumn = 0;
  let maxColumn = 0;
  let min = matrix[0][0];
  let max = matrix[0][0];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] < min) { min = matrix[i][j]; minColumn = j; }
      if (matrix[i][j] > max) { max = matrix[i][j]; maxColumn = j; }
    }
  }

  // меняем столбцы поэлементно в каждой строке
  for (let i = 0; i < m; i++) {
    const temp = matrix[i][minColumn];
    matrix[i][minColumn] = matrix[i][maxColumn];
    matrix[i][maxColumn] = temp;
  }

  console.log(`Минимум ${min} в столбце ${minColumn + 1}, максимум ${max} в столбце ${maxColumn + 1}`);
  console.log('Стало:');
  printMatrix(matrix);
  close();
}

main();
