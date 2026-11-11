// Лабораторная работа 8. Сортировка вставками.
//
// Идея: массив делится на две части — отсортированную (слева) и неотсортированную (справа).
// Сначала отсортированная часть — это один первый элемент.
// На каждом шаге берём следующий элемент из неотсортированной части («ключ»)
// и вставляем его на нужное место в отсортированной части:
// сдвигаем вправо все элементы, которые больше ключа, и ставим ключ в освободившуюся ячейку.
// Так раскладывают карты в руке.

const { ask, close } = require('./input');

function insertionSort(source) {
  const array = [...source]; // работаем с копией, исходный массив не меняем
  let comparisons = 0;
  let shifts = 0;

  for (let i = 1; i < array.length; i++) {
    const key = array[i]; // элемент, который вставляем
    let j = i - 1;

    // сдвигаем вправо элементы отсортированной части, которые больше ключа
    while (j >= 0) {
      comparisons++;
      if (array[j] > key) {
        array[j + 1] = array[j];
        shifts++;
        j--;
      } else {
        break;
      }
    }
    array[j + 1] = key; // ставим ключ на освободившееся место

    const sorted = array.slice(0, i + 1).join(' ');
    const rest = array.slice(i + 1).join(' ');
    console.log(`Шаг ${i}: вставили ${key} → [${sorted}]${rest ? ' | ' + rest : ''}`);
  }

  return { array, comparisons, shifts };
}

// Если пользователь ничего не ввёл — берём случайный массив из 8 чисел от 1 до 99.
function randomArray(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 99) + 1);
  }
  return array;
}

async function readArray() {
  while (true) {
    const line = (await ask('Числа через пробел (Enter — случайный массив): ')).trim();
    if (line === '') return randomArray(8);
    const numbers = line.split(/\s+/).map((part) => Number(part.replace(',', '.')));
    if (numbers.every((n) => !Number.isNaN(n))) return numbers;
    console.log('Нужно ввести числа через пробел.');
  }
}

async function main() {
  const array = await readArray();
  console.log(`Исходный массив: ${array.join(' ')}`);
  console.log('В квадратных скобках — отсортированная часть, после | — ещё не обработанная.');

  const result = insertionSort(array);

  console.log(`Отсортированный массив: ${result.array.join(' ')}`);
  console.log(`Сравнений: ${result.comparisons}, сдвигов: ${result.shifts}`);
  close();
}

if (require.main === module) {
  main();
}

module.exports = { insertionSort };
