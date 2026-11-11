// Задача 10. Дан целочисленный массив размера N, в котором ровно два одинаковых элемента.
// Найти номера одинаковых элементов и вывести их в порядке возрастания.
// Сравниваем каждый элемент со всеми следующими (два вложенных цикла).

const { askNumberList, close } = require('./input');

async function main() {
  const array = await askNumberList('Массив через пробел: ');

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        console.log(`Одинаковые элементы: номера ${i + 1} и ${j + 1}`);
        close();
        return;
      }
    }
  }

  console.log('Одинаковых элементов нет.');
  close();
}

main();
