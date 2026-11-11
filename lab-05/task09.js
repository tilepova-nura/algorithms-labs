// Задача 9. Дан массив размера N. Найти номер его последнего локального максимума.
// Локальный максимум — элемент, который больше любого из своих соседей.
// У первого и последнего элемента сосед только один.
// Идём с конца массива: первый найденный локальный максимум и будет последним.

const { askNumberList, close } = require('./input');

function isLocalMax(array, i) {
  const leftOk = i === 0 || array[i] > array[i - 1];
  const rightOk = i === array.length - 1 || array[i] > array[i + 1];
  return leftOk && rightOk;
}

async function main() {
  const array = await askNumberList('Массив через пробел: ');

  let number = 0; // 0 — если локальных максимумов нет
  for (let i = array.length - 1; i >= 0; i--) {
    if (isLocalMax(array, i)) {
      number = i + 1; // номер = индекс + 1
      break;
    }
  }

  console.log(`Номер последнего локального максимума: ${number}`);
  close();
}

main();
