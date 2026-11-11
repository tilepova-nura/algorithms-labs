// Задача 7. Разложение числа на сумму простых чисел: функция рекурсивно
// разлагает заданное число на сумму простых чисел.
//
// Идея: берём наибольшее простое p ≤ n и пробуем разложить остаток n − p.
// Если остаток 0 — готово. Если остаток разложить нельзя (например, 1),
// пробуем следующее, меньшее простое число (это называется перебор с возвратом).

const { askInteger, close } = require('./input');

function isPrime(number) {
  if (number < 2) return false;
  for (let d = 2; d * d <= number; d++) {
    if (number % d === 0) return false;
  }
  return true;
}

// Возвращает массив простых чисел с суммой n или null, если разложить нельзя.
function decompose(n) {
  if (n === 0) {
    return []; // базовый случай: ничего раскладывать не нужно
  }
  for (let p = n; p >= 2; p--) {
    if (isPrime(p)) {
      const rest = decompose(n - p); // рекурсивно раскладываем остаток
      if (rest !== null) {
        return [p, ...rest];
      }
    }
  }
  return null; // например, n = 1: простых чисел, которые в сумме дают 1, нет
}

async function main() {
  const n = await askInteger('Число (от 2 до 100000): ', 2, 100000);

  const parts = decompose(n);
  console.log(`${n} = ${parts.join(' + ')}`);
  close();
}

main();
