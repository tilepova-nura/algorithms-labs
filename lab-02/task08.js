// Задача 8. Дано целое число в диапазоне 10–40 — количество учебных заданий.
// Вывести строку с правильным согласованием, например: 18 → «восемнадцать учебных заданий».
//
// Правило согласования:
//   11–14                         → «учебных заданий»
//   последняя цифра 1             → «учебное задание» (двадцать одно учебное задание)
//   последняя цифра 2, 3 или 4    → «учебных задания»
//   всё остальное                 → «учебных заданий»

const { askInteger, close } = require('./input');

const UNITS = ['', 'одно', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
const TEENS = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать',
  'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
const TENS = ['', '', 'двадцать', 'тридцать', 'сорок'];

function numberToText(n) {
  if (n < 20) return TEENS[n - 10];
  const tens = Math.floor(n / 10);
  const units = n % 10;
  return units === 0 ? TENS[tens] : `${TENS[tens]} ${UNITS[units]}`;
}

function taskWord(n) {
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return 'учебных заданий';
  if (lastDigit === 1) return 'учебное задание';
  if (lastDigit >= 2 && lastDigit <= 4) return 'учебных задания';
  return 'учебных заданий';
}

async function main() {
  const n = await askInteger('Количество заданий (10–40): ', 10, 40);
  console.log(`${numberToText(n)} ${taskWord(n)}`);
  close();
}

main();
