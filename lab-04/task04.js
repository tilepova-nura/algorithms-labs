// Задача 4. Палиндром: функция рекурсивно проверяет, является ли строка палиндромом
// (читается одинаково слева направо и справа налево).
// Сравниваем первый и последний символ, затем проверяем середину строки.
// Пробелы, знаки препинания и регистр букв не учитываем: «А роза упала на лапу Азора».

const { ask, close } = require('./input');

function isPalindrome(text) {
  if (text.length <= 1) {
    return true; // пустая строка или один символ — палиндром
  }
  if (text[0] !== text[text.length - 1]) {
    return false;
  }
  return isPalindrome(text.slice(1, -1)); // строка без первого и последнего символа
}

async function main() {
  const input = await ask('Строка: ');

  // оставляем только буквы и цифры, приводим к нижнему регистру, ё считаем как е
  const cleaned = input.toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '');

  if (isPalindrome(cleaned)) {
    console.log('Это палиндром.');
  } else {
    console.log('Это не палиндром.');
  }
  close();
}

main();
