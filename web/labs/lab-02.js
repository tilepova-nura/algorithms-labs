// ЛР 2. Алгоритмы ветвления — веб-версия.
(function () {
  const { round, fail } = App;
  const dist = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  // Задача 7: порядковые числительные среднего рода и месяцы в родительном падеже
  const DAY_UNITS = ['', 'первое', 'второе', 'третье', 'четвертое', 'пятое', 'шестое', 'седьмое', 'восьмое', 'девятое'];
  const DAY_TEENS = ['десятое', 'одиннадцатое', 'двенадцатое', 'тринадцатое', 'четырнадцатое', 'пятнадцатое',
    'шестнадцатое', 'семнадцатое', 'восемнадцатое', 'девятнадцатое'];
  const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function dayToText(day) {
    if (day < 10) return DAY_UNITS[day];
    if (day < 20) return DAY_TEENS[day - 10];
    if (day === 20) return 'двадцатое';
    if (day < 30) return `двадцать ${DAY_UNITS[day - 20]}`;
    if (day === 30) return 'тридцатое';
    return `тридцать ${DAY_UNITS[day - 30]}`;
  }

  // Задачи 8 и 9: числа словами
  const TEENS = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать',
    'семнадцать', 'восемнадцать', 'девятнадцать'];
  const TENS = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  const UNITS_M = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  const UNITS_N = ['', 'одно', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  const HUNDREDS = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

  // Задача 10: восточный календарь
  const COLORS_F = ['зеленой', 'красной', 'желтой', 'белой', 'черной'];
  const COLORS_M = ['зеленого', 'красного', 'желтого', 'белого', 'черного'];
  const ANIMALS = ['крысы', 'коровы', 'тигра', 'зайца', 'дракона', 'змеи', 'лошади', 'овцы', 'обезьяны', 'курицы', 'собаки', 'свиньи'];
  const MASCULINE = ['тигра', 'зайца', 'дракона'];
  const mod = (a, b) => ((a % b) + b) % b;

  App.renderLab({
    number: 2,
    title: 'Алгоритмы ветвления',
    tasks: [
      {
        statement: 'Даны две целые переменные A и B. Если их значения не равны, присвоить каждой большее из значений, а если равны — присвоить обеим ноль.',
        inputs: [{ name: 'a', label: 'A', type: 'int', value: 3 }, { name: 'b', label: 'B', type: 'int', value: 7 }],
        solve: ({ a, b }) => {
          if (a !== b) {
            const max = a > b ? a : b;
            return `A = ${max}, B = ${max}`;
          }
          return 'A = 0, B = 0';
        },
      },
      {
        statement: 'Даны три числа. Найти сумму двух наибольших из них.',
        inputs: [
          { name: 'a', label: 'Первое', value: 3 }, { name: 'b', label: 'Второе', value: 9 }, { name: 'c', label: 'Третье', value: 5 },
        ],
        solve: ({ a, b, c }) => {
          let min = a;
          if (b < min) min = b;
          if (c < min) min = c;
          return [`Наименьшее: ${round(min)}`, `Сумма двух наибольших = ${round(a + b + c - min)}`];
        },
      },
      {
        statement: 'На плоскости даны точки A, B, C. Определить, какая из точек B или C ближе к A, и вывести её расстояние от A.',
        inputs: [
          { name: 'ax', label: 'A, x', value: 0 }, { name: 'ay', label: 'A, y', value: 0 },
          { name: 'bx', label: 'B, x', value: 3 }, { name: 'by', label: 'B, y', value: 4 },
          { name: 'cx', label: 'C, x', value: 1 }, { name: 'cy', label: 'C, y', value: 1 },
        ],
        solve: (v) => {
          const ab = dist(v.ax, v.ay, v.bx, v.by);
          const ac = dist(v.ax, v.ay, v.cx, v.cy);
          if (ab < ac) return `Ближе точка B, расстояние ${round(ab)}`;
          if (ac < ab) return `Ближе точка C, расстояние ${round(ac)}`;
          return `B и C на одинаковом расстоянии ${round(ab)}`;
        },
      },
      {
        statement: 'Даны координаты точки, не лежащей на осях OX и OY. Определить номер координатной четверти.',
        inputs: [{ name: 'x', label: 'x', value: -2 }, { name: 'y', label: 'y', value: -5 }],
        solve: ({ x, y }) => {
          if (x === 0 || y === 0) fail('Точка лежит на оси — четверть не определена.');
          if (x > 0 && y > 0) return 'Четверть 1';
          if (x < 0 && y > 0) return 'Четверть 2';
          if (x < 0 && y < 0) return 'Четверть 3';
          return 'Четверть 4';
        },
      },
      {
        statement: 'Дано целое число. Вывести описание вида «отрицательное четное число», «нулевое число», «положительное нечетное число».',
        inputs: [{ name: 'n', label: 'Целое число', type: 'int', value: -6 }],
        solve: ({ n }) => {
          if (n === 0) return 'нулевое число';
          return `${n > 0 ? 'положительное' : 'отрицательное'} ${n % 2 === 0 ? 'четное' : 'нечетное'} число`;
        },
      },
      {
        statement: 'Дано целое число 1–999. Вывести описание вида «четное двузначное число», «нечетное трехзначное число».',
        inputs: [{ name: 'n', label: 'Число 1–999', type: 'int', value: 57, min: 1, max: 999 }],
        solve: ({ n }) => {
          const digits = n < 10 ? 'однозначное' : n < 100 ? 'двузначное' : 'трехзначное';
          return `${n % 2 === 0 ? 'четное' : 'нечетное'} ${digits} число`;
        },
      },
      {
        statement: 'Дан номер дня (1–31) и месяца (1–12). Вывести дату текстом, например «пятое января».',
        inputs: [
          { name: 'day', label: 'День', type: 'int', value: 23, min: 1, max: 31 },
          { name: 'month', label: 'Месяц', type: 'int', value: 2, min: 1, max: 12 },
        ],
        solve: ({ day, month }) => {
          if (day > DAYS_IN_MONTH[month - 1]) fail(`В этом месяце нет ${day}-го числа.`);
          return `${dayToText(day)} ${MONTHS[month - 1]}`;
        },
      },
      {
        statement: 'Дано число 10–40 — количество учебных заданий. Вывести строку с правильным согласованием: 18 → «восемнадцать учебных заданий».',
        inputs: [{ name: 'n', label: 'Количество 10–40', type: 'int', value: 21, min: 10, max: 40 }],
        solve: ({ n }) => {
          const text = n < 20 ? TEENS[n - 10] : (n % 10 === 0 ? TENS[n / 10] : `${TENS[Math.floor(n / 10)]} ${UNITS_N[n % 10]}`);
          const last = n % 10;
          let word = 'учебных заданий';
          if (n % 100 < 11 || n % 100 > 14) {
            if (last === 1) word = 'учебное задание';
            else if (last >= 2 && last <= 4) word = 'учебных задания';
          }
          return `${text} ${word}`;
        },
      },
      {
        statement: 'Дано число 100–999. Вывести его словами: 256 → «двести пятьдесят шесть».',
        inputs: [{ name: 'n', label: 'Число 100–999', type: 'int', value: 814, min: 100, max: 999 }],
        solve: ({ n }) => {
          const h = Math.floor(n / 100);
          const t = Math.floor(n / 10) % 10;
          const u = n % 10;
          const words = [HUNDREDS[h]];
          if (t === 1) words.push(TEENS[u]);
          else {
            if (t > 1) words.push(TENS[t]);
            if (u > 0) words.push(UNITS_M[u]);
          }
          return words.join(' ');
        },
      },
      {
        statement: 'Восточный календарь: 60-летний цикл из пяти 12-летних подциклов (зеленый, красный, желтый, белый, черный), годы названы по животным. 1984 — «год зеленой крысы». По номеру года определить его название.',
        inputs: [{ name: 'year', label: 'Год', type: 'int', value: 1984, min: 1 }],
        solve: ({ year }) => {
          const position = mod(year - 1984, 60);
          const animal = ANIMALS[position % 12];
          const colors = MASCULINE.includes(animal) ? COLORS_M : COLORS_F;
          return `год ${colors[Math.floor(position / 12)]} ${animal}`;
        },
      },
    ],
  });
})();
