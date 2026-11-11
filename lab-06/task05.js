// Задача 5. Дана целочисленная матрица M × N. Найти номер первого из столбцов,
// содержащих только нечётные числа. Если таких столбцов нет, вывести 0.

const { askInteger, askMatrix, printMatrix, close } = require('./input');

async function main() {
  const m = await askInteger('Количество строк M: ', 1, 20);
  const n = await askInteger('Количество столбцов N: ', 1, 20);
  const matrix = await askMatrix(m, n);

  let answer = 0;
  for (let j = 0; j < n; j++) {
    let allOdd = true;
    for (let i = 0; i < m; i++) {
      if (matrix[i][j] % 2 === 0) { // нашли чётное — столбец не подходит
        allOdd = false;
        break;
      }
    }
    if (allOdd) {
      answer = j + 1;
      break; // нужен первый такой столбец
    }
  }

  printMatrix(matrix);
  console.log(`Номер столбца: ${answer}`);
  close();
}

main();
