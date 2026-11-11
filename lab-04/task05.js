// Задача 5. Бинарный поиск: функция рекурсивно ищет элемент в отсортированном массиве.
// Смотрим на средний элемент: если он равен искомому — нашли;
// если искомое меньше — ищем в левой половине, если больше — в правой.

const { askNumber, askNumberList, close } = require('./input');

// Возвращает индекс найденного элемента или −1, если его нет.
// left и right — границы участка массива, в котором ищем.
function binarySearch(array, target, left, right) {
  if (left > right) {
    return -1; // участок пуст — элемента нет
  }
  const middle = Math.floor((left + right) / 2);
  if (array[middle] === target) {
    return middle;
  }
  if (target < array[middle]) {
    return binarySearch(array, target, left, middle - 1);
  }
  return binarySearch(array, target, middle + 1, right);
}

function isSorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) return false;
  }
  return true;
}

async function main() {
  let array = await askNumberList('Отсортированный массив через пробел: ');
  while (!isSorted(array)) {
    console.log('Массив должен быть отсортирован по возрастанию.');
    array = await askNumberList('Отсортированный массив через пробел: ');
  }
  const target = await askNumber('Искомое число: ');

  const index = binarySearch(array, target, 0, array.length - 1);
  if (index === -1) {
    console.log('Элемент не найден.');
  } else {
    console.log(`Элемент найден, позиция ${index + 1} (индекс ${index}).`);
  }
  close();
}

main();
