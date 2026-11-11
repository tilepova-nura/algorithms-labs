// Задача 8. Дана матрица M × N (M и N — чётные).
// Поменять местами левую верхнюю и правую нижнюю четверти матрицы.
// Элемент [i][j] левой верхней четверти меняется с [i + M/2][j + N/2].

const { askInteger, askMatrix, printMatrix, close } = require('./input');

async function askEven(question) {
  let value = await askInteger(question, 2, 20);
  while (value % 2 !== 0) {
    console.log('Число должно быть чётным.');
    value = await askInteger(question, 2, 20);
  }
  return value;
}

async function main() {
  const m = await askEven('Количество строк M (чётное): ');
  const n = await askEven('Количество столбцов N (чётное): ');
  const matrix = await askMatrix(m, n);

  console.log('Было:');
  printMatrix(matrix);

  const halfM = m / 2;
  const halfN = n / 2;
  for (let i = 0; i < halfM; i++) {
    for (let j = 0; j < halfN; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[i + halfM][j + halfN];
      matrix[i + halfM][j + halfN] = temp;
    }
  }

  console.log('Стало:');
  printMatrix(matrix);
  close();
}

main();
