// Задача 4. Дана матрица M × N. В каждом столбце найти количество элементов,
// больших среднего арифметического всех элементов этого столбца.

const { askInteger, askMatrix, printMatrix, close, round } = require('./input');

async function main() {
  const m = await askInteger('Количество строк M: ', 1, 20);
  const n = await askInteger('Количество столбцов N: ', 1, 20);
  const matrix = await askMatrix(m, n);

  printMatrix(matrix);
  for (let j = 0; j < n; j++) {
    // 1) среднее столбца
    let sum = 0;
    for (let i = 0; i < m; i++) sum += matrix[i][j];
    const average = sum / m;

    // 2) сколько элементов больше среднего
    let count = 0;
    for (let i = 0; i < m; i++) {
      if (matrix[i][j] > average) count++;
    }

    console.log(`Столбец ${j + 1}: среднее ${round(average)}, больше среднего — ${count}`);
  }
  close();
}

main();
