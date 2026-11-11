// Задача 7. Дан целочисленный массив размера N без одинаковых чисел.
// Проверить, образуют ли элементы арифметическую прогрессию.
// Если да — вывести разность прогрессии, если нет — вывести 0.
// В прогрессии разность между соседними элементами всегда одна и та же.

const { askNumberList, close } = require('./input');

async function main() {
  const array = await askNumberList('Массив через пробел: ');

  if (array.length < 2) {
    console.log('Нужно хотя бы два элемента.');
    close();
    return;
  }

  const difference = array[1] - array[0];
  let isProgression = true;
  for (let i = 2; i < array.length; i++) {
    if (array[i] - array[i - 1] !== difference) {
      isProgression = false;
      break; // дальше проверять незачем
    }
  }

  console.log(isProgression ? difference : 0);
  close();
}

main();
