// Задача 3. Возведение в степень: функция рекурсивно возводит x в целую степень n.
// x⁰ = 1 — базовый случай, xⁿ = x · xⁿ⁻¹.
// Для отрицательной степени: x⁻ⁿ = 1 / xⁿ.

const { askNumber, askInteger, close, round } = require('./input');

function power(x, n) {
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    return 1 / power(x, -n);
  }
  return x * power(x, n - 1);
}

async function main() {
  const x = await askNumber('x: ');
  const n = await askInteger('n (целое): ');

  if (x === 0 && n < 0) {
    console.log('Ноль нельзя возводить в отрицательную степень.');
  } else {
    console.log(`${x}^${n} = ${round(power(x, n))}`);
  }
  close();
}

main();
