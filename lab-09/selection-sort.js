// Лабораторная работа 9. Сортировка выбором.
//
// Идея: на каждом шаге находим наименьший элемент в неотсортированной части массива
// и меняем его местами с первым элементом этой части.
// После шага i первые i + 1 элементов массива стоят на своих окончательных местах.

const { ask, close } = require('./input');

function selectionSort(source) {
  const array = [...source]; // работаем с копией, исходный массив не меняем
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    // ищем индекс минимального элемента среди array[i], array[i+1], ..., конец
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      comparisons++;
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    const min = array[minIndex];
    if (minIndex !== i) {
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      swaps++;
    }

    const sorted = array.slice(0, i + 1).join(' ');
    const rest = array.slice(i + 1).join(' ');
    const action = minIndex !== i
      ? `минимум ${min} поменяли с позицией ${i + 1}`
      : `минимум ${min} уже на позиции ${i + 1}`;
    console.log(`Шаг ${i + 1}: ${action} → [${sorted}] | ${rest}`);
  }

  return { array, comparisons, swaps };
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

  const result = selectionSort(array);

  console.log(`Отсортированный массив: ${result.array.join(' ')}`);
  console.log(`Сравнений: ${result.comparisons}, обменов: ${result.swaps}`);
  close();
}

if (require.main === module) {
  main();
}

module.exports = { selectionSort };
