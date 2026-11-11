// Задача 3. Дана матрица M × N. Найти номер столбца с наименьшим произведением элементов
// и вывести этот номер и значение наименьшего произведения.

const { askInteger, askMatrix, printMatrix, close, round } = require('./input');

async function main() {
  const m = await askInteger('Количество строк M: ', 1, 20);
  const n = await askInteger('Количество столбцов N: ', 1, 20);
  const matrix = await askMatrix(m, n);

  let bestColumn = 0;
  let bestProduct = Infinity;
  for (let j = 0; j < n; j++) {
    let product = 1;
    for (let i = 0; i < m; i++) {
      product *= matrix[i][j]; // идём по столбцу j сверху вниз
    }
    if (product < bestProduct) {
      bestProduct = product;
      bestColumn = j;
    }
  }

  printMatrix(matrix);
  console.log(`Столбец ${bestColumn + 1}, наименьшее произведение = ${round(bestProduct)}`);
  close();
}

main();
