// Задача 9. Дана матрица M × N.
// Упорядочить строки так, чтобы их первые элементы образовывали возрастающую последовательность.
// Используем сортировку пузырьком, но переставляем не числа, а целые строки,
// сравнивая их первые элементы.

const { askInteger, askMatrix, printMatrix, close } = require('./input');

async function main() {
  const m = await askInteger('Количество строк M: ', 1, 20);
  const n = await askInteger('Количество столбцов N: ', 1, 20);
  const matrix = await askMatrix(m, n);

  console.log('Было:');
  printMatrix(matrix);

  for (let pass = 0; pass < m - 1; pass++) {
    for (let i = 0; i < m - 1 - pass; i++) {
      if (matrix[i][0] > matrix[i + 1][0]) {
        const temp = matrix[i];      // меняем местами строки целиком
        matrix[i] = matrix[i + 1];
        matrix[i + 1] = temp;
      }
    }
  }

  console.log('Стало:');
  printMatrix(matrix);
  close();
}

main();
