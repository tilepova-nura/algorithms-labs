// ЛР 1. Линейные алгоритмы — веб-версия.
(function () {
  const { round, fail } = App;
  const nonZero = (value, label) => { if (value === 0) fail(`«${label}»: число не должно быть равно нулю.`); };
  const dist = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  App.renderLab({
    number: 1,
    title: 'Линейные алгоритмы',
    tasks: [
      {
        statement: 'Даны стороны прямоугольника <i>a</i> и <i>b</i>. Найти его площадь <code>S = a·b</code> и периметр <code>P = 2·(a + b)</code>.',
        inputs: [
          { name: 'a', label: 'Сторона a', value: 3 },
          { name: 'b', label: 'Сторона b', value: 4 },
        ],
        solve: ({ a, b }) => [`Площадь S = ${round(a * b)}`, `Периметр P = ${round(2 * (a + b))}`],
      },
      {
        statement: 'Дан диаметр окружности <i>d</i>. Найти её длину <code>L = π·d</code>, π = 3.14.',
        inputs: [{ name: 'd', label: 'Диаметр d', value: 10 }],
        solve: ({ d }) => `Длина окружности L = ${round(3.14 * d)}`,
      },
      {
        statement: 'Даны два числа <i>a</i> и <i>b</i>. Найти их среднее арифметическое <code>(a + b) / 2</code>.',
        inputs: [
          { name: 'a', label: 'Число a', value: 3 },
          { name: 'b', label: 'Число b', value: 8 },
        ],
        solve: ({ a, b }) => `Среднее арифметическое = ${round((a + b) / 2)}`,
      },
      {
        statement: 'Даны два ненулевых числа. Найти сумму, разность, произведение и частное их квадратов.',
        inputs: [
          { name: 'a', label: 'Первое число', value: 2 },
          { name: 'b', label: 'Второе число', value: -4 },
        ],
        solve: ({ a, b }) => {
          nonZero(a, 'Первое число'); nonZero(b, 'Второе число');
          const a2 = a * a;
          const b2 = b * b;
          return [`Квадраты: ${round(a2)} и ${round(b2)}`, `Сумма = ${round(a2 + b2)}`, `Разность = ${round(a2 - b2)}`,
            `Произведение = ${round(a2 * b2)}`, `Частное = ${round(a2 / b2)}`];
        },
      },
      {
        statement: 'Даны два ненулевых числа. Найти сумму, разность, произведение и частное их модулей.',
        inputs: [
          { name: 'a', label: 'Первое число', value: -2 },
          { name: 'b', label: 'Второе число', value: 4 },
        ],
        solve: ({ a, b }) => {
          nonZero(a, 'Первое число'); nonZero(b, 'Второе число');
          const absA = Math.abs(a);
          const absB = Math.abs(b);
          return [`Модули: ${round(absA)} и ${round(absB)}`, `Сумма = ${round(absA + absB)}`, `Разность = ${round(absA - absB)}`,
            `Произведение = ${round(absA * absB)}`, `Частное = ${round(absA / absB)}`];
        },
      },
      {
        statement: 'Найти расстояние между точками (x1, y1) и (x2, y2): <code>d = √((x2 − x1)² + (y2 − y1)²)</code>.',
        inputs: [
          { name: 'x1', label: 'x1', value: 0 }, { name: 'y1', label: 'y1', value: 0 },
          { name: 'x2', label: 'x2', value: 3 }, { name: 'y2', label: 'y2', value: 4 },
        ],
        solve: ({ x1, y1, x2, y2 }) => `Расстояние = ${round(dist(x1, y1, x2, y2))}`,
      },
      {
        statement: 'Даны три точки A, B, C на числовой оси. Найти длины отрезков AC и BC и их сумму.',
        inputs: [
          { name: 'a', label: 'Координата A', value: 1 },
          { name: 'b', label: 'Координата B', value: 7 },
          { name: 'c', label: 'Координата C', value: 4 },
        ],
        solve: ({ a, b, c }) => {
          const ac = Math.abs(a - c);
          const bc = Math.abs(b - c);
          return [`AC = ${round(ac)}`, `BC = ${round(bc)}`, `AC + BC = ${round(ac + bc)}`];
        },
      },
      {
        statement: 'Даны три точки A, B, C на числовой оси, точка C между A и B. Найти произведение длин AC и BC.',
        inputs: [
          { name: 'a', label: 'Координата A', value: 1 },
          { name: 'b', label: 'Координата B', value: 7 },
          { name: 'c', label: 'Координата C', value: 4 },
        ],
        solve: ({ a, b, c }) => {
          if (c < Math.min(a, b) || c > Math.max(a, b)) fail('Точка C должна лежать между A и B.');
          const ac = Math.abs(a - c);
          const bc = Math.abs(b - c);
          return [`AC = ${round(ac)}, BC = ${round(bc)}`, `AC · BC = ${round(ac * bc)}`];
        },
      },
      {
        statement: 'Даны координаты двух противоположных вершин прямоугольника (x1, y1), (x2, y2), стороны параллельны осям. Найти периметр и площадь.',
        inputs: [
          { name: 'x1', label: 'x1', value: 1 }, { name: 'y1', label: 'y1', value: 1 },
          { name: 'x2', label: 'x2', value: 4 }, { name: 'y2', label: 'y2', value: 5 },
        ],
        solve: ({ x1, y1, x2, y2 }) => {
          const w = Math.abs(x2 - x1);
          const h = Math.abs(y2 - y1);
          return [`Стороны: ${round(w)} и ${round(h)}`, `Периметр = ${round(2 * (w + h))}`, `Площадь = ${round(w * h)}`];
        },
      },
      {
        statement: 'Даны координаты трёх вершин треугольника. Найти периметр и площадь (площадь — по формуле Герона).',
        inputs: [
          { name: 'x1', label: 'x1', value: 0 }, { name: 'y1', label: 'y1', value: 0 },
          { name: 'x2', label: 'x2', value: 4 }, { name: 'y2', label: 'y2', value: 0 },
          { name: 'x3', label: 'x3', value: 0 }, { name: 'y3', label: 'y3', value: 3 },
        ],
        solve: ({ x1, y1, x2, y2, x3, y3 }) => {
          const a = dist(x1, y1, x2, y2);
          const b = dist(x2, y2, x3, y3);
          const c = dist(x3, y3, x1, y1);
          const p = (a + b + c) / 2;
          const s = Math.sqrt(Math.max(0, p * (p - a) * (p - b) * (p - c)));
          return [`Стороны: ${round(a)}, ${round(b)}, ${round(c)}`, `Периметр = ${round(a + b + c)}`, `Площадь = ${round(s)}`];
        },
      },
      {
        statement: 'Найти значение функции <code>y = 3x⁶ − 6x² − 7</code> при данном x.',
        inputs: [{ name: 'x', label: 'x', value: 1 }],
        solve: ({ x }) => {
          const x2 = x * x;
          return `y = ${round(3 * x2 * x2 * x2 - 6 * x2 - 7)}`;
        },
      },
      {
        statement: 'Найти значение функции <code>y = 4(x − 3)⁶ − 7(x − 3)³ + 2</code> при данном x.',
        inputs: [{ name: 'x', label: 'x', value: 4 }],
        solve: ({ x }) => {
          const t = x - 3;
          const t3 = t * t * t;
          return `y = ${round(4 * t3 * t3 - 7 * t3 + 2)}`;
        },
      },
    ],
  });
})();
