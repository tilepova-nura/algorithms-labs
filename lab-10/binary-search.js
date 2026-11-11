// Лабораторная работа 10. Бинарный поиск.
//
// Ищем число в ОТСОРТИРОВАННОМ массиве.
// Держим границы области поиска left и right. На каждом шаге смотрим на средний элемент:
//   - если он равен искомому — нашли;
//   - если искомое меньше — оно может быть только левее, сдвигаем right = mid − 1;
//   - если искомое больше — только правее, сдвигаем left = mid + 1.
// Каждый шаг уменьшает область поиска вдвое.

const { askNumber, askNumberList, close } = require('./input');

function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;
  let step = 0;

  while (left <= right) {
    step++;
    const mid = Math.floor((left + right) / 2);
    const area = array.slice(left, right + 1).join(' ');
    console.log(`Шаг ${step}: ищем среди [${area}], середина — ${array[mid]} (индекс ${mid})`);

    if (array[mid] === target) {
      return { index: mid, steps: step };
    }
    if (target < array[mid]) {
      console.log(`  ${target} < ${array[mid]} → ищем в левой половине`);
      right = mid - 1;
    } else {
      console.log(`  ${target} > ${array[mid]} → ищем в правой половине`);
      left = mid + 1;
    }
  }

  return { index: -1, steps: step };
}

function isSorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) return false;
  }
  return true;
}

async function main() {
  let array = await askNumberList('Отсортированный массив через пробел: ');
  if (!isSorted(array)) {
    array = [...array].sort((a, b) => a - b);
    console.log(`Массив не отсортирован. Бинарный поиск работает только на отсортированном,`);
    console.log(`поэтому сначала отсортировали его: ${array.join(' ')}`);
  }
  const target = await askNumber('Искомое число: ');

  const result = binarySearch(array, target);

  if (result.index === -1) {
    console.log(`Число ${target} не найдено (шагов: ${result.steps}).`);
  } else {
    console.log(`Число ${target} найдено: позиция ${result.index + 1}, индекс ${result.index} (шагов: ${result.steps}).`);
  }
  close();
}

if (require.main === module) {
  main();
}

module.exports = { binarySearch };
