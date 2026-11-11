// ЛР 6. Двумерные массивы — веб-версия.
(function () {
  const { round, fail } = App;

  // Матрица текстом с выравниванием столбцов
  function formatMatrix(matrix) {
    const width = Math.max(...matrix.flat().map((v) => String(v).length));
    return matrix.map((row) => row.map((v) => String(v).padStart(width)).join(' ')).join('\n');
  }
  const copy = (matrix) => matrix.map((row) => [...row]);
  const square = (matrix) => { if (matrix.some((row) => row.length !== matrix.length)) fail('Матрица должна быть квадратной.'); };

  const M34 = '3 1 4 1\n5 9 2 6\n5 3 5 8';

  App.renderLab({
    number: 6,
    title: 'Двумерные массивы',
    intro: 'Матрица вводится построчно: каждая строка матрицы — с новой строки, числа через пробел. Номера строк и столбцов считаются с 1.',
    tasks: [
      {
        statement: 'Дана квадратная матрица нечётного порядка. Начиная с A1,1 и двигаясь против часовой стрелки, вывести элементы по спирали: первый столбец, последняя строка, последний столбец снизу вверх, первая строка справа налево и т. д.; центральный элемент — последним.',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: '1 2 3 4 5\n6 7 8 9 10\n11 12 13 14 15\n16 17 18 19 20\n21 22 23 24 25' }],
        solve: ({ m: a }) => {
          square(a);
          if (a.length % 2 === 0) fail('Порядок матрицы должен быть нечётным.');
          const n = a.length;
          const result = [];
          for (let k = 0; k <= Math.floor(n / 2); k++) {
            const last = n - 1 - k;
            if (k === last) { result.push(a[k][k]); break; }
            for (let i = k; i <= last; i++) result.push(a[i][k]);
            for (let j = k + 1; j <= last; j++) result.push(a[last][j]);
            for (let i = last - 1; i >= k; i--) result.push(a[i][last]);
            for (let j = last - 1; j >= k + 1; j--) result.push(a[k][j]);
          }
          return result.join(' ');
        },
      },
      {
        statement: 'Дана матрица M × N и номер строки K. Найти сумму и произведение элементов K-й строки.',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: M34 }, { name: 'k', label: 'K', type: 'int', value: 2, min: 1 }],
        solve: ({ m, k }) => {
          if (k > m.length) fail(`K должно быть от 1 до ${m.length}.`);
          let sum = 0;
          let product = 1;
          for (const value of m[k - 1]) { sum += value; product *= value; }
          return `Строка ${k}: сумма = ${round(sum)}, произведение = ${round(product)}`;
        },
      },
      {
        statement: 'Дана матрица M × N. Найти номер столбца с наименьшим произведением элементов и это произведение.',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: '1 2 3\n4 -5 6' }],
        solve: ({ m }) => {
          let best = 0;
          let bestProduct = Infinity;
          for (let j = 0; j < m[0].length; j++) {
            let product = 1;
            for (let i = 0; i < m.length; i++) product *= m[i][j];
            if (product < bestProduct) { bestProduct = product; best = j; }
          }
          return `Столбец ${best + 1}, наименьшее произведение = ${round(bestProduct)}`;
        },
      },
      {
        statement: 'Дана матрица M × N. В каждом столбце найти количество элементов, больших среднего арифметического этого столбца.',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: M34 }],
        solve: ({ m }) => {
          const lines = [];
          for (let j = 0; j < m[0].length; j++) {
            let sum = 0;
            for (let i = 0; i < m.length; i++) sum += m[i][j];
            const average = sum / m.length;
            let count = 0;
            for (let i = 0; i < m.length; i++) if (m[i][j] > average) count++;
            lines.push(`Столбец ${j + 1}: среднее ${round(average)}, больше среднего — ${count}`);
          }
          return lines;
        },
      },
      {
        statement: 'Дана целочисленная матрица. Найти номер первого столбца, содержащего только нечётные числа (0, если таких нет).',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: '2 3 5\n4 7 9' }],
        solve: ({ m }) => {
          for (let j = 0; j < m[0].length; j++) {
            let allOdd = true;
            for (let i = 0; i < m.length; i++) if (m[i][j] % 2 === 0) { allOdd = false; break; }
            if (allOdd) return `Номер столбца: ${j + 1}`;
          }
          return 'Номер столбца: 0';
        },
      },
      {
        statement: 'Дана матрица. В каждой строке поменять местами минимальный и максимальный элементы.',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: M34 }],
        solve: ({ m }) => {
          const a = copy(m);
          for (const row of a) {
            let minIndex = 0;
            let maxIndex = 0;
            for (let j = 1; j < row.length; j++) {
              if (row[j] < row[minIndex]) minIndex = j;
              if (row[j] > row[maxIndex]) maxIndex = j;
            }
            [row[minIndex], row[maxIndex]] = [row[maxIndex], row[minIndex]];
          }
          return ['Было:', formatMatrix(m), '', 'Стало:', formatMatrix(a)];
        },
      },
      {
        statement: 'Дана матрица. Поменять местами столбцы, содержащие минимальный и максимальный элементы матрицы.',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: '5 1 3\n4 6 9' }],
        solve: ({ m }) => {
          const a = copy(m);
          let minCol = 0;
          let maxCol = 0;
          let min = a[0][0];
          let max = a[0][0];
          a.forEach((row) => row.forEach((value, j) => {
            if (value < min) { min = value; minCol = j; }
            if (value > max) { max = value; maxCol = j; }
          }));
          for (const row of a) [row[minCol], row[maxCol]] = [row[maxCol], row[minCol]];
          return [`Минимум ${min} в столбце ${minCol + 1}, максимум ${max} в столбце ${maxCol + 1}`, '', 'Стало:', formatMatrix(a)];
        },
      },
      {
        statement: 'Дана матрица M × N (M и N чётные). Поменять местами левую верхнюю и правую нижнюю четверти.',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: '1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16' }],
        solve: ({ m }) => {
          if (m.length % 2 !== 0 || m[0].length % 2 !== 0) fail('Количество строк и столбцов должно быть чётным.');
          const a = copy(m);
          const hm = a.length / 2;
          const hn = a[0].length / 2;
          for (let i = 0; i < hm; i++) {
            for (let j = 0; j < hn; j++) [a[i][j], a[i + hm][j + hn]] = [a[i + hm][j + hn], a[i][j]];
          }
          return ['Было:', formatMatrix(m), '', 'Стало:', formatMatrix(a)];
        },
      },
      {
        statement: 'Дана матрица. Упорядочить строки так, чтобы их первые элементы шли по возрастанию (пузырьком по строкам).',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: '5 1 7\n2 2 8\n9 3 1\n4 0 6' }],
        solve: ({ m }) => {
          const a = copy(m);
          for (let pass = 0; pass < a.length - 1; pass++) {
            for (let i = 0; i < a.length - 1 - pass; i++) {
              if (a[i][0] > a[i + 1][0]) [a[i], a[i + 1]] = [a[i + 1], a[i]];
            }
          }
          return ['Было:', formatMatrix(m), '', 'Стало:', formatMatrix(a)];
        },
      },
      {
        statement: 'Дана квадратная матрица. Найти суммы элементов диагоналей, параллельных главной, начиная с одноэлементной A1,M.',
        inputs: [{ name: 'm', label: 'Матрица', type: 'matrix', value: '1 2 3\n4 5 6\n7 8 9' }],
        solve: ({ m }) => {
          square(m);
          const n = m.length;
          const sums = [];
          for (let d = n - 1; d >= -(n - 1); d--) {
            let sum = 0;
            for (let i = 0; i < n; i++) {
              const j = i + d;
              if (j >= 0 && j < n) sum += m[i][j];
            }
            sums.push(round(sum));
          }
          return `Суммы диагоналей (от A1,${n} к A${n},1): ${sums.join(' ')}`;
        },
      },
    ],
  });
})();
