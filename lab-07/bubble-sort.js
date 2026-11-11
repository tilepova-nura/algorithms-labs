// Лабораторная работа 7. Сортировка пузырьком.
//
// Идея: проходим по массиву и сравниваем соседние элементы.
// Если левый больше правого — меняем их местами.
// За один проход самый большой элемент «всплывает» в конец массива, как пузырёк.
// Повторяем проходы, каждый раз не трогая уже отсортированный хвост.
// Если за проход не было ни одного обмена — массив уже отсортирован, можно остановиться.

const { ask, close } = require('./input');

function bubbleSort(source) {
  const array = [...source]; // работаем с копией, исходный массив не меняем
  let comparisons = 0;
  let swaps = 0;

  for (let pass = 0; pass < array.length - 1; pass++) {
    let swapped = false;

    // после каждого прохода последние pass элементов уже на своих местах
    for (let i = 0; i < array.length - 1 - pass; i++) {
      comparisons++;
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
        swaps++;
      }
    }

    const sortedPart = array.slice(array.length - 1 - pass).join(' ');
    console.log(`Проход ${pass + 1}: ${array.join(' ')}   (на месте: ${sortedPart})`);

    if (!swapped) {
      console.log('Обменов не было — массив отсортирован, дальше проходить не нужно.');
      break;
    }
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

  const result = bubbleSort(array);

  console.log(`Отсортированный массив: ${result.array.join(' ')}`);
  console.log(`Сравнений: ${result.comparisons}, обменов: ${result.swaps}`);
  close();
}

// Запуск программы только при прямом вызове (node bubble-sort.js),
// чтобы функцию bubbleSort можно было подключить и в другом файле.
if (require.main === module) {
  main();
}

module.exports = { bubbleSort };
