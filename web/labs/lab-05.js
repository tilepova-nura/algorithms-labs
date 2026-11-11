// ЛР 5. Одномерные массивы — веб-версия.
(function () {
  const { round, fail } = App;

  App.renderLab({
    number: 5,
    title: 'Одномерные массивы',
    intro: 'Массивы вводятся одной строкой, числа через пробел. Номера элементов считаются с 1, как в условиях задач.',
    tasks: [
      {
        statement: 'Дано N (> 0). Сформировать массив из N первых положительных нечётных чисел: 1, 3, 5, …',
        inputs: [{ name: 'n', label: 'N', type: 'int', value: 6, min: 1, max: 200 }],
        solve: ({ n }) => {
          const array = [];
          for (let i = 0; i < n; i++) array.push(2 * i + 1);
          return array.join(' ');
        },
      },
      {
        statement: 'Даны N (> 1), первый член A и знаменатель D. Сформировать массив из N членов геометрической прогрессии.',
        inputs: [
          { name: 'n', label: 'N', type: 'int', value: 5, min: 2, max: 100 },
          { name: 'a', label: 'A', value: 3 }, { name: 'd', label: 'D', value: 2 },
        ],
        solve: ({ n, a, d }) => {
          const array = [a];
          for (let i = 1; i < n; i++) array.push(array[i - 1] * d);
          return array.map(round).join(' ');
        },
      },
      {
        statement: 'Даны N (> 2), A и B. Первый элемент A, второй B, каждый следующий — сумма всех предыдущих.',
        inputs: [
          { name: 'n', label: 'N', type: 'int', value: 6, min: 3, max: 50 },
          { name: 'a', label: 'A', type: 'int', value: 1 }, { name: 'b', label: 'B', type: 'int', value: 2 },
        ],
        solve: ({ n, a, b }) => {
          const array = [a, b];
          let sum = a + b;
          for (let i = 2; i < n; i++) { array.push(sum); sum += sum; }
          return array.join(' ');
        },
      },
      {
        statement: 'Дан массив. Вывести элементы в порядке A1, AN, A2, AN−1, A3, …',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '1 2 3 4 5 6 7' }],
        solve: ({ array }) => {
          const result = [];
          let left = 0;
          let right = array.length - 1;
          while (left <= right) {
            result.push(array[left]);
            if (left !== right) result.push(array[right]);
            left++; right--;
          }
          return result.join(' ');
        },
      },
      {
        statement: 'Дан массив. Вывести сначала элементы с нечётными номерами по возрастанию номеров, затем с чётными — по убыванию.',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '1 2 3 4 5 6' }],
        solve: ({ array }) => {
          const result = [];
          for (let i = 0; i < array.length; i += 2) result.push(array[i]);
          const lastEven = array.length % 2 === 0 ? array.length - 1 : array.length - 2;
          for (let i = lastEven; i >= 1; i -= 2) result.push(array[i]);
          return result.join(' ');
        },
      },
      {
        statement: 'Дан массив и номера K ≤ L. Найти среднее арифметическое элементов с номерами от K до L.',
        inputs: [
          { name: 'array', label: 'Массив', type: 'list', value: '2 4 6 8 10' },
          { name: 'k', label: 'K', type: 'int', value: 2, min: 1 }, { name: 'l', label: 'L', type: 'int', value: 4, min: 1 },
        ],
        solve: ({ array, k, l }) => {
          if (k > l || l > array.length) fail(`Нужно 1 ≤ K ≤ L ≤ ${array.length}.`);
          let sum = 0;
          for (let i = k - 1; i <= l - 1; i++) sum += array[i];
          return `Среднее = ${round(sum / (l - k + 1))}`;
        },
      },
      {
        statement: 'Дан целочисленный массив без повторов. Если элементы образуют арифметическую прогрессию — вывести разность, иначе 0.',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '3 7 11 15' }],
        solve: ({ array }) => {
          if (array.length < 2) fail('Нужно хотя бы два элемента.');
          const difference = array[1] - array[0];
          for (let i = 2; i < array.length; i++) if (array[i] - array[i - 1] !== difference) return '0';
          return String(difference);
        },
      },
      {
        statement: 'Дан массив. Найти минимальный элемент среди элементов с чётными номерами: A2, A4, …',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '5 9 1 4 7 2' }],
        solve: ({ array }) => {
          if (array.length < 2) fail('Элементов с чётными номерами нет.');
          let min = array[1];
          for (let i = 3; i < array.length; i += 2) if (array[i] < min) min = array[i];
          return `Минимум среди чётных номеров: ${min}`;
        },
      },
      {
        statement: 'Дан массив. Найти номер последнего локального максимума (элемента, большего своих соседей).',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '1 5 2 6 3 4' }],
        solve: ({ array }) => {
          for (let i = array.length - 1; i >= 0; i--) {
            const leftOk = i === 0 || array[i] > array[i - 1];
            const rightOk = i === array.length - 1 || array[i] > array[i + 1];
            if (leftOk && rightOk) return `Номер последнего локального максимума: ${i + 1}`;
          }
          return 'Локальных максимумов нет: 0';
        },
      },
      {
        statement: 'Дан целочисленный массив, в котором ровно два одинаковых элемента. Найти их номера по возрастанию.',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '4 8 1 9 8 3' }],
        solve: ({ array }) => {
          for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
              if (array[i] === array[j]) return `Одинаковые элементы: номера ${i + 1} и ${j + 1}`;
            }
          }
          return 'Одинаковых элементов нет.';
        },
      },
    ],
  });
})();
