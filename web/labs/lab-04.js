// ЛР 4. Рекурсивные алгоритмы — веб-версия.
(function () {
  const { round, fail } = App;

  function factorial(n) { return n === 0 ? 1 : n * factorial(n - 1); }
  function fibonacci(n) { return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2); }
  function power(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / power(x, -n);
    return x * power(x, n - 1);
  }
  function isPalindrome(text) {
    if (text.length <= 1) return true;
    if (text[0] !== text[text.length - 1]) return false;
    return isPalindrome(text.slice(1, -1));
  }
  function binarySearch(array, target, left, right, trace) {
    if (left > right) return -1;
    const middle = Math.floor((left + right) / 2);
    trace.push(`ищем в [${array.slice(left, right + 1).join(' ')}], середина ${array[middle]}`);
    if (array[middle] === target) return middle;
    if (target < array[middle]) return binarySearch(array, target, left, middle - 1, trace);
    return binarySearch(array, target, middle + 1, right, trace);
  }
  function reverseWords(words) {
    if (words.length <= 1) return words;
    const [first, ...rest] = words;
    return [...reverseWords(rest), first];
  }
  function isPrime(n) {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  }
  function decompose(n) {
    if (n === 0) return [];
    for (let p = n; p >= 2; p--) {
      if (isPrime(p)) {
        const rest = decompose(n - p);
        if (rest !== null) return [p, ...rest];
      }
    }
    return null;
  }
  function countDigits(n) { return n < 10 ? 1 : 1 + countDigits(Math.floor(n / 10)); }
  function hanoi(n, from, to, via, moves) {
    if (n === 0) return;
    hanoi(n - 1, from, via, to, moves);
    moves.push(`Ход ${moves.length + 1}: диск ${n} со стержня ${from} на стержень ${to}`);
    hanoi(n - 1, via, to, from, moves);
  }

  App.renderLab({
    number: 4,
    title: 'Рекурсивные алгоритмы',
    tasks: [
      {
        statement: 'Факториал: функция рекурсивно вычисляет <code>n! = n · (n − 1)!</code>, <code>0! = 1</code>.',
        inputs: [{ name: 'n', label: 'n (0–20)', type: 'int', value: 5, min: 0, max: 20 }],
        solve: ({ n }) => `${n}! = ${factorial(n)}`,
      },
      {
        statement: 'Числа Фибоначчи: <code>F(0) = 0</code>, <code>F(1) = 1</code>, <code>F(n) = F(n − 1) + F(n − 2)</code>.',
        inputs: [{ name: 'n', label: 'n (0–30)', type: 'int', value: 10, min: 0, max: 30 }],
        solve: ({ n }) => `F(${n}) = ${fibonacci(n)}`,
      },
      {
        statement: 'Возведение в степень: <code>xⁿ = x · xⁿ⁻¹</code>, <code>x⁰ = 1</code>, для отрицательной степени <code>x⁻ⁿ = 1 / xⁿ</code>.',
        inputs: [{ name: 'x', label: 'x', value: 2 }, { name: 'n', label: 'n (целое)', type: 'int', value: 10, min: -100, max: 100 }],
        solve: ({ x, n }) => {
          if (x === 0 && n < 0) fail('Ноль нельзя возводить в отрицательную степень.');
          return `${x}^${n} = ${round(power(x, n))}`;
        },
      },
      {
        statement: 'Палиндром: рекурсивно проверить, читается ли строка одинаково в обе стороны (пробелы, знаки и регистр не учитываются).',
        inputs: [{ name: 'text', label: 'Строка', type: 'text', value: 'А роза упала на лапу Азора' }],
        solve: ({ text }) => {
          const cleaned = text.toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '');
          if (cleaned === '') fail('Введите строку с буквами или цифрами.');
          return isPalindrome(cleaned) ? 'Это палиндром.' : 'Это не палиндром.';
        },
      },
      {
        statement: 'Бинарный поиск: рекурсивно найти элемент в отсортированном массиве.',
        inputs: [
          { name: 'array', label: 'Отсортированный массив', type: 'list', value: '1 3 5 7 9 11 13' },
          { name: 'target', label: 'Искомое число', value: 9 },
        ],
        solve: ({ array, target }) => {
          for (let i = 1; i < array.length; i++) if (array[i] < array[i - 1]) fail('Массив должен быть отсортирован по возрастанию.');
          const trace = [];
          const index = binarySearch(array, target, 0, array.length - 1, trace);
          trace.push(index === -1 ? 'Элемент не найден.' : `Найден: позиция ${index + 1} (индекс ${index}).`);
          return trace;
        },
      },
      {
        statement: 'Обратный порядок слов: рекурсивно переставить слова строки в обратном порядке.',
        inputs: [{ name: 'text', label: 'Строка', type: 'text', value: 'мама мыла раму' }],
        solve: ({ text }) => {
          const words = text.trim().split(/\s+/).filter((w) => w !== '');
          if (words.length === 0) fail('Введите хотя бы одно слово.');
          return reverseWords(words).join(' ');
        },
      },
      {
        statement: 'Разложение числа на сумму простых чисел (рекурсия с перебором: берём наибольшее простое p ≤ n и раскладываем n − p).',
        inputs: [{ name: 'n', label: 'Число (2–100000)', type: 'int', value: 27, min: 2, max: 100000 }],
        solve: ({ n }) => `${n} = ${decompose(n).join(' + ')}`,
      },
      {
        statement: 'Подсчёт количества цифр: если n < 10 — одна цифра, иначе <code>1 + цифры(n / 10)</code>.',
        inputs: [{ name: 'n', label: 'Целое число', type: 'int', value: 12345 }],
        solve: ({ n }) => `Количество цифр: ${countDigits(Math.abs(n))}`,
      },
      {
        statement: 'Ханойская башня: перенести n дисков со стержня 1 на стержень 3, за ход один диск, больший нельзя класть на меньший.',
        inputs: [{ name: 'n', label: 'Дисков (1–10)', type: 'int', value: 3, min: 1, max: 10 }],
        solve: ({ n }) => {
          const moves = [];
          hanoi(n, 1, 3, 2, moves);
          moves.push(`Всего ходов: ${moves.length} (2^${n} − 1)`);
          return moves;
        },
      },
    ],
  });
})();
