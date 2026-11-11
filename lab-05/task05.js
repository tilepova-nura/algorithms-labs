// Задача 5. Дан массив A размера N. Вывести сначала элементы с нечётными номерами
// в порядке возрастания номеров, затем элементы с чётными номерами в порядке убывания.
// Номера в условии начинаются с 1, а индексы в JavaScript — с 0:
// номер 1 → индекс 0, номер 2 → индекс 1 и т. д.

const { askNumberList, close } = require('./input');

async function main() {
  const array = await askNumberList('Массив через пробел: ');
  const result = [];

  // нечётные номера 1, 3, 5, ... — это индексы 0, 2, 4, ...
  for (let i = 0; i < array.length; i += 2) {
    result.push(array[i]);
  }

  // чётные номера в порядке убывания: начинаем с последнего чётного номера
  const lastEvenIndex = array.length % 2 === 0 ? array.length - 1 : array.length - 2;
  for (let i = lastEvenIndex; i >= 1; i -= 2) {
    result.push(array[i]);
  }

  console.log(result.join(' '));
  close();
}

main();
