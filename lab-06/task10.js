// Задача 10. Дана квадратная матрица порядка M.
// Найти сумму элементов каждой её диагонали, параллельной главной,
// начиная с одноэлементной диагонали A1,M (правый верхний угол).
//
// На одной диагонали, параллельной главной, у всех элементов одинаковая разность j − i.
// Правый верхний угол: j − i = M − 1, главная диагональ: 0, левый нижний угол: −(M − 1).

const { askInteger, askMatrix, printMatrix, close, round } = require('./input');

async function main() {
  const m = await askInteger('Порядок матрицы M: ', 1, 20);
  const matrix = await askMatrix(m, m);
  printMatrix(matrix);

  const sums = [];
  for (let d = m - 1; d >= -(m - 1); d--) {
    let sum = 0;
    for (let i = 0; i < m; i++) {
      const j = i + d;
      if (j >= 0 && j < m) {
        sum += matrix[i][j];
      }
    }
    sums.push(round(sum));
  }

  console.log(`Суммы диагоналей (от A1,${m} к A${m},1): ${sums.join(' ')}`);
  close();
}

main();
