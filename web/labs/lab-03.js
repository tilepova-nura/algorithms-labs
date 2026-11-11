// ЛР 3. Циклические алгоритмы — веб-версия.
(function () {
  const { round, fail } = App;

  App.renderLab({
    number: 3,
    title: 'Циклические алгоритмы',
    tasks: [
      {
        statement: 'Дана цена 1 кг конфет. Вывести стоимость 0.1, 0.2, …, 1 кг конфет.',
        inputs: [{ name: 'price', label: 'Цена 1 кг', value: 250 }],
        solve: ({ price }) => {
          const lines = [];
          for (let i = 1; i <= 10; i++) lines.push(`${i / 10} кг — ${round(price * i / 10)}`);
          return lines;
        },
      },
      {
        statement: 'Дано N (> 0). Найти произведение 1.1 · 1.2 · 1.3 · … (N сомножителей).',
        inputs: [{ name: 'n', label: 'N', type: 'int', value: 3, min: 1, max: 1000 }],
        solve: ({ n }) => {
          let product = 1;
          for (let i = 1; i <= n; i++) product *= 1 + i / 10;
          return `Произведение = ${round(product)}`;
        },
      },
      {
        statement: 'Дано N (> 0). Найти N² по формуле N² = 1 + 3 + 5 + … + (2N − 1), выводя сумму после каждого слагаемого.',
        inputs: [{ name: 'n', label: 'N', type: 'int', value: 5, min: 1, max: 1000 }],
        solve: ({ n }) => {
          const lines = [];
          let sum = 0;
          for (let i = 1; i <= n; i++) {
            const term = 2 * i - 1;
            sum += term;
            lines.push(`+ ${term} → ${sum}`);
          }
          lines.push(`${n}² = ${sum}`);
          return lines;
        },
      },
      {
        statement: 'Дано вещественное A и целое N (> 0). Одним циклом найти 1 + A + A² + … + Aᴺ.',
        inputs: [{ name: 'a', label: 'A', value: 2 }, { name: 'n', label: 'N', type: 'int', value: 3, min: 1, max: 1000 }],
        solve: ({ a, n }) => {
          let term = 1;
          let sum = 1;
          for (let i = 1; i <= n; i++) { term *= a; sum += term; }
          return `Сумма = ${round(sum)}`;
        },
      },
      {
        statement: 'Дано вещественное A и целое N (> 0). Одним циклом и без условного оператора найти 1 − A + A² − … ± Aᴺ.',
        inputs: [{ name: 'a', label: 'A', value: 2 }, { name: 'n', label: 'N', type: 'int', value: 3, min: 1, max: 1000 }],
        solve: ({ a, n }) => {
          let term = 1;
          let sum = 1;
          for (let i = 1; i <= n; i++) { term *= -a; sum += term; }
          return `Сумма = ${round(sum)}`;
        },
      },
      {
        statement: 'Даны целые положительные A < B. Вывести числа от A до B, каждое столько раз, каково его значение.',
        inputs: [{ name: 'a', label: 'A', type: 'int', value: 2, min: 1 }, { name: 'b', label: 'B', type: 'int', value: 5, min: 1, max: 100 }],
        solve: ({ a, b }) => {
          if (a >= b) fail('Нужно, чтобы A < B.');
          const lines = [];
          for (let number = a; number <= b; number++) {
            const row = [];
            for (let k = 1; k <= number; k++) row.push(number);
            lines.push(row.join(' '));
          }
          return lines;
        },
      },
      {
        statement: 'Даны положительные A > B. На отрезке A уложено максимум отрезков B. Не используя умножение и деление, найти длину незанятой части.',
        inputs: [{ name: 'a', label: 'A', value: 10 }, { name: 'b', label: 'B', value: 3 }],
        solve: ({ a, b }) => {
          if (b <= 0 || a <= b) fail('Нужно, чтобы A > B > 0.');
          let rest = a;
          let count = 0;
          while (rest >= b) { rest -= b; count++; }
          return [`Поместилось отрезков: ${count}`, `Незанятая часть = ${round(rest)}`];
        },
      },
      {
        statement: 'Дано N (> 1). Найти наименьшее K, при котором 1 + 2 + … + K ≥ N, и саму сумму.',
        inputs: [{ name: 'n', label: 'N', type: 'int', value: 11, min: 2 }],
        solve: ({ n }) => {
          let k = 0;
          let sum = 0;
          while (sum < n) { k++; sum += k; }
          return `K = ${k}, сумма = ${sum}`;
        },
      },
      {
        statement: 'Вклад 1000 руб. каждый месяц растёт на P % (0 < P < 25). Через сколько месяцев он превысит 1100 руб.? Вывести K и итоговый вклад S.',
        inputs: [{ name: 'p', label: 'P, %', value: 5 }],
        solve: ({ p }) => {
          if (p <= 0 || p >= 25) fail('P должно быть больше 0 и меньше 25.');
          let s = 1000;
          let k = 0;
          while (s <= 1100) { s += s * p / 100; k++; }
          return `K = ${k} мес., S = ${round(s)} руб.`;
        },
      },
      {
        statement: 'Даны целые положительные A и B. Найти НОД по алгоритму Евклида.',
        inputs: [{ name: 'a', label: 'A', type: 'int', value: 48, min: 1 }, { name: 'b', label: 'B', type: 'int', value: 18, min: 1 }],
        solve: ({ a, b }) => {
          const lines = [];
          let x = a;
          let y = b;
          while (y !== 0) {
            const rest = x % y;
            lines.push(`${x} mod ${y} = ${rest}`);
            x = y;
            y = rest;
          }
          lines.push(`НОД(${a}, ${b}) = ${x}`);
          return lines;
        },
      },
    ],
  });
})();
