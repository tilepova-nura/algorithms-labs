// Задача 3. Даны целые N (> 2), A и B. Сформировать массив размера N:
// первый элемент A, второй B, каждый следующий равен сумме всех предыдущих.

const { askInteger, close } = require('./input');

async function main() {
  const n = await askInteger('N: ', 3);
  const a = await askInteger('A: ');
  const b = await askInteger('B: ');

  const array = [a, b];
  let sum = a + b; // сумма всех уже добавленных элементов
  for (let i = 2; i < n; i++) {
    array.push(sum);
    sum += sum; // новый элемент равен прежней сумме, значит, сумма удваивается
  }

  console.log(array.join(' '));
  close();
}

main();
