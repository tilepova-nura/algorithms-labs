// Задача 6. Обратный порядок слов: функция рекурсивно меняет порядок слов в строке.
// Идея: перевернуть список слов = перевернуть все слова, кроме первого, и поставить первое в конец.

const { ask, close } = require('./input');

function reverseWords(words) {
  if (words.length <= 1) {
    return words; // одно слово или ни одного — переворачивать нечего
  }
  const [first, ...rest] = words;
  return [...reverseWords(rest), first];
}

async function main() {
  const text = await ask('Строка: ');
  const words = text.trim().split(/\s+/).filter((word) => word !== '');

  console.log(reverseWords(words).join(' '));
  close();
}

main();
