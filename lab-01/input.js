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

module.exports = { ask, askNumber, askNonZero, close, round };
