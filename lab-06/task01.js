// Задача 1. Дана квадратная матрица порядка M (M — нечётное).
// Начиная с элемента A1,1 и двигаясь против часовой стрелки, вывести все элементы по спирали:
// первый столбец, последняя строка, последний столбец в обратном порядке,
// первая строка в обратном порядке, затем оставшиеся элементы второго столбца и т. д.;
// последним выводится центральный элемент.
//
// Обходим матрицу «кольцами» (слоями) снаружи внутрь. Слой k — это рамка,
// у которой верхняя строка и левый столбец имеют индекс k, а нижняя/правая — M − 1 − k.

const { askInteger, askMatrix, printMatrix, close } = require('./input');

function spiral(matrix) {
  const m = matrix.length;
  const result = [];

  for (let k = 0; k <= Math.floor(m / 2); k++) {
    const last = m - 1 - k;

    if (k === last) {
      result.push(matrix[k][k]); // центральный элемент
      break;
    }
    for (let i = k; i <= last; i++) result.push(matrix[i][k]);         // вниз по левому столбцу
    for (let j = k + 1; j <= last; j++) result.push(matrix[last][j]);  // вправо по нижней строке
    for (let i = last - 1; i >= k; i--) result.push(matrix[i][last]);  // вверх по правому столбцу
    for (let j = last - 1; j >= k + 1; j--) result.push(matrix[k][j]); // влево по верхней строке
  }
  return result;
}

async function main() {
  let m = await askInteger('Порядок матрицы M (нечётный): ', 1, 15);
  while (m % 2 === 0) {
    console.log('M должно быть нечётным.');
    m = await askInteger('Порядок матрицы M (нечётный): ', 1, 15);
  }
  const matrix = await askMatrix(m, m);

  console.log('Матрица:');
  printMatrix(matrix);
  console.log('По спирали:');
  console.log(spiral(matrix).join(' '));
  close();
}

main();
