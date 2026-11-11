// Задача 6. Даны целые положительные числа A и B (A < B).
// Вывести все целые числа от A до B включительно; каждое число выводится
// столько раз, каково его значение (например, 3 выводится 3 раза).
// Два вложенных цикла: внешний перебирает числа, внутренний повторяет вывод.

const { askInteger, close } = require('./input');

async function main() {
  const a = await askInteger('A: ', 1);
  const b = await askInteger(`B (больше ${a}): `, a + 1);

  for (let number = a; number <= b; number++) {
    const repeated = [];
    for (let k = 1; k <= number; k++) {
      repeated.push(number);
    }
    console.log(repeated.join(' '));
  }
  close();
}

main();
