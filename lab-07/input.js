// Вспомогательный модуль для ввода данных с клавиатуры.
// Каждая введённая строка попадает в очередь, а функция ask()
// печатает вопрос и ждёт следующую строку.

const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];   // строки, которые уже введены, но ещё не прочитаны
let waiting = null; // функция, которая ждёт следующую строку

rl.on('line', (line) => {
  if (waiting) {
    const resolve = waiting;
    waiting = null;
    if (!process.stdin.isTTY) console.log(line); // показываем ввод из файла
    resolve(line);
  } else {
    lines.push(line);
  }
});

function ask(question) {
  process.stdout.write(question);
  if (lines.length > 0) {
    const line = lines.shift();
    if (!process.stdin.isTTY) console.log(line); // показываем ввод из файла
    return Promise.resolve(line);
  }
  return new Promise((resolve) => {
    waiting = resolve;
  });
}

// Спрашивает число, пока пользователь не введёт корректное значение.
// Запятая тоже принимается как десятичный разделитель: 2,5 = 2.5
async function askNumber(question) {
  while (true) {
    const answer = (await ask(question)).trim().replace(',', '.');
    const number = Number(answer);
    if (answer !== '' && !Number.isNaN(number)) {
      return number;
    }
    console.log('Нужно ввести число.');
  }
}

// Спрашивает целое число. Если заданы min и max, число должно быть в этих пределах.
async function askInteger(question, min = -Infinity, max = Infinity) {
  while (true) {
    const number = await askNumber(question);
    if (!Number.isInteger(number)) {
      console.log('Нужно ввести целое число.');
    } else if (number < min || number > max) {
      console.log(`Число должно быть от ${min} до ${max}.`);
    } else {
      return number;
    }
  }
}

// Спрашивает список чисел через пробел, например: 1 3 5 7
async function askNumberList(question) {
  while (true) {
    const parts = (await ask(question)).trim().split(/\s+/).filter((part) => part !== '');
    const numbers = parts.map((part) => Number(part.replace(',', '.')));
    if (numbers.length > 0 && numbers.every((n) => !Number.isNaN(n))) {
      return numbers;
    }
    console.log('Нужно ввести числа через пробел.');
  }
}

// Спрашивает число, отличное от нуля.
async function askNonZero(question) {
  while (true) {
    const number = await askNumber(question);
    if (number !== 0) {
      return number;
    }
    console.log('Число не должно быть равно нулю.');
  }
}

function close() {
  rl.close();
}

// Округляет результат до 4 знаков, чтобы не печатать «хвосты» вроде 0.30000000000000004.
function round(value) {
  return Math.round(value * 10000) / 10000;
}

module.exports = { ask, askNumber, askInteger, askNumberList, askNonZero, close, round };
