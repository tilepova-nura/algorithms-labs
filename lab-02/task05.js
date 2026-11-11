// Задача 5. Дано целое число. Вывести его описание вида
// «отрицательное четное число», «нулевое число», «положительное нечетное число».

const { askInteger, close } = require('./input');

async function main() {
  const n = await askInteger('Целое число: ');

  if (n === 0) {
    console.log('нулевое число');
  } else {
    const sign = n > 0 ? 'положительное' : 'отрицательное';
    const parity = n % 2 === 0 ? 'четное' : 'нечетное';
    console.log(`${sign} ${parity} число`);
  }
  close();
}

main();
