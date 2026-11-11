// Общий код веб-версии: навигация, построение карточек задач, разбор введённых данных.
// Каждая страница лабы подключает этот файл и свой файл labs/lab-XX.js,
// который вызывает App.renderLab({ ... }) с описанием задач.

(function () {
  const LABS = [
    { number: 1, title: 'Линейные алгоритмы', count: '12 задач' },
    { number: 2, title: 'Алгоритмы ветвления', count: '10 задач' },
    { number: 3, title: 'Циклические алгоритмы', count: '10 задач' },
    { number: 4, title: 'Рекурсивные алгоритмы', count: '9 задач' },
    { number: 5, title: 'Одномерные массивы', count: '10 задач' },
    { number: 6, title: 'Двумерные массивы', count: '10 задач' },
    { number: 7, title: 'Сортировка пузырьком', count: 'пошаговая визуализация' },
    { number: 8, title: 'Сортировка вставками', count: 'пошаговая визуализация' },
    { number: 9, title: 'Сортировка выбором', count: 'пошаговая визуализация' },
    { number: 10, title: 'Бинарный поиск', count: 'пошаговая визуализация' },
    { number: 11, title: 'Работа с деревьями', count: 'двоичное дерево поиска' },
    { number: 12, title: 'Очередь', count: 'очередь FIFO' },
  ];

  const pad = (n) => String(n).padStart(2, '0');

  // Ошибка ввода — показывается пользователю красным, а не падает в консоль.
  class InputError extends Error {}
  const fail = (message) => { throw new InputError(message); };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Округление до 4 знаков: 0.1 + 0.2 → 0.3, а не 0.30000000000000004
  const round = (value) => Math.round(value * 10000) / 10000;

  // ---------- разбор полей ----------

  function parseNumber(text, label) {
    const cleaned = String(text).trim().replace(',', '.');
    const number = Number(cleaned);
    if (cleaned === '' || Number.isNaN(number)) fail(`«${label}»: нужно ввести число.`);
    return number;
  }

  function parseList(text, label) {
    const parts = String(text).trim().split(/[\s;]+/).filter((p) => p !== '');
    if (parts.length === 0) fail(`«${label}»: введите числа через пробел.`);
    return parts.map((part) => {
      const number = Number(part.replace(',', '.'));
      if (Number.isNaN(number)) fail(`«${label}»: «${part}» — не число.`);
      return number;
    });
  }

  function parseMatrix(text, label) {
    const rows = String(text).trim().split('\n').map((line) => line.trim()).filter((line) => line !== '');
    if (rows.length === 0) fail(`«${label}»: введите матрицу, каждую строку с новой строки.`);
    const matrix = rows.map((row) => parseList(row, label));
    const cols = matrix[0].length;
    if (matrix.some((row) => row.length !== cols)) fail(`«${label}»: во всех строках должно быть одинаковое количество чисел.`);
    return matrix;
  }

  function readField(input, spec) {
    const raw = input.value;
    const label = spec.label;
    let value;
    switch (spec.type) {
      case 'text': value = raw; break;
      case 'list': value = parseList(raw, label); break;
      case 'matrix': value = parseMatrix(raw, label); break;
      case 'int':
        value = parseNumber(raw, label);
        if (!Number.isInteger(value)) fail(`«${label}»: нужно целое число.`);
        break;
      default: value = parseNumber(raw, label);
    }
    if (typeof value === 'number') {
      if (spec.min !== undefined && value < spec.min) fail(`«${label}»: должно быть не меньше ${spec.min}.`);
      if (spec.max !== undefined && value > spec.max) fail(`«${label}»: должно быть не больше ${spec.max}.`);
    }
    return value;
  }

  // ---------- каркас страницы: боковое меню + содержимое ----------

  // current — номер открытой лабы (0 — главная)
  function shell(current, content) {
    const links = LABS.map((lab) => {
      const cls = lab.number === current ? ' class="current" aria-current="page"' : '';
      return `<a href="lab-${pad(lab.number)}.html"${cls}><span class="badge">ЛР ${lab.number}</span><span>${escapeHtml(lab.title)}</span></a>`;
    }).join('');

    const options = [`<option value="index.html"${current === 0 ? ' selected' : ''}>Все лабораторные</option>`]
      .concat(LABS.map((lab) => `<option value="lab-${pad(lab.number)}.html"${lab.number === current ? ' selected' : ''}>ЛР ${lab.number}. ${escapeHtml(lab.title)}</option>`))
      .join('');

    return `<div class="layout">
      <aside class="sidebar">
        <a class="brand" href="index.html">
          <div class="subject">Алгоритмы и структуры данных</div>
          <div class="author">Тилепова Нурайым, 243-321</div>
        </a>
        <div class="side-title">Лабораторные работы</div>
        <nav class="side-nav" aria-label="Лабораторные работы">${links}</nav>
      </aside>
      <div>
        <div class="mobile-nav">
          <a href="index.html">АиСД</a>
          <select aria-label="Перейти к лабораторной" onchange="location.href=this.value">${options}</select>
        </div>
        <main>${content}</main>
      </div>
    </div>`;
  }

  // ---------- главная ----------

  function renderIndex() {
    const cards = LABS.map((lab) => `
      <a class="lab-card" href="lab-${pad(lab.number)}.html">
        <div class="num">Лабораторная работа ${lab.number}</div>
        <div class="name">${escapeHtml(lab.title)}</div>
        <div class="count">${escapeHtml(lab.count)}</div>
      </a>`).join('');
    document.body.innerHTML = shell(0, `
      <div class="page-head">
        <span class="eyebrow">Веб-версия лабораторных</span>
        <h1>Алгоритмы и структуры данных</h1>
        <div class="meta">12 лабораторных работ · JavaScript</div>
        <div class="hint">Выберите лабораторную слева или ниже. На её странице задачи идут по порядку: в каждой можно ввести свои данные и сразу увидеть результат работы алгоритма.</div>
      </div>
      <div class="lab-grid">${cards}</div>`);
  }

  // ---------- страница лабы ----------

  function fieldHtml(spec, id) {
    const value = escapeHtml(spec.value ?? '');
    const control = spec.type === 'matrix'
      ? `<textarea id="${id}" spellcheck="false">${value}</textarea>`
      : `<input id="${id}" value="${value}" autocomplete="off" spellcheck="false"${spec.type === 'text' || spec.type === 'list' ? '' : ' inputmode="decimal"'}>`;
    const wide = spec.wide || spec.type === 'list' || spec.type === 'matrix' || spec.type === 'text' ? ' wide' : '';
    return `<div class="field${wide}"><label for="${id}">${escapeHtml(spec.label)}</label>${control}</div>`;
  }

  function showResult(output, result) {
    output.classList.remove('error', 'rich');
    if (result && typeof result === 'object' && !Array.isArray(result) && 'html' in result) {
      output.classList.add('rich');
      output.innerHTML = result.html;
    } else {
      output.textContent = Array.isArray(result) ? result.join('\n') : String(result);
    }
  }

  function showError(output, error) {
    output.classList.remove('rich');
    output.classList.add('error');
    output.textContent = error instanceof InputError ? error.message : `Ошибка: ${error.message}`;
    if (!(error instanceof InputError)) console.error(error);
  }

  function renderTask(task, index, lab) {
    const card = document.createElement('section');
    card.className = 'task';
    card.id = `task-${index + 1}`;
    const label = task.title ? `<span>${escapeHtml(task.title)}</span>` : '';
    const badge = lab.tasks.length > 1 ? `<span class="task-num">Задача ${index + 1}</span>` : '';
    card.innerHTML = `<h2>${badge}${label}</h2><p class="statement">${task.statement}</p>`;

    if (task.render) { // задача со своим интерфейсом (дерево, очередь, сортировки)
      const box = document.createElement('div');
      card.appendChild(box);
      task.render(box);
      return card;
    }

    const inputs = task.inputs || [];
    const ids = inputs.map((spec) => `l${lab.number}t${index + 1}-${spec.name}`);
    card.insertAdjacentHTML('beforeend', `
      <div class="fields">${inputs.map((spec, i) => fieldHtml(spec, ids[i])).join('')}</div>
      <div class="actions"><button type="button" class="primary">${escapeHtml(task.button || 'Выполнить')}</button>${task.random ? '<button type="button" class="random">Случайный массив</button>' : ''}</div>
      <div class="output" aria-live="polite"></div>`);

    const output = card.querySelector('.output');
    const run = () => {
      try {
        const values = {};
        inputs.forEach((spec, i) => { values[spec.name] = readField(card.querySelector(`#${ids[i]}`), spec); });
        showResult(output, task.solve(values));
      } catch (error) {
        showError(output, error);
      }
    };
    card.querySelector('button.primary').addEventListener('click', run);
    if (task.random) {
      // task.random(currentValues?) возвращает строку для поля task.random.field
      card.querySelector('button.random').addEventListener('click', () => {
        const index = inputs.findIndex((spec) => spec.name === task.random.field);
        card.querySelector(`#${ids[index]}`).value = task.random.make();
        run();
      });
    }
    card.querySelectorAll('input').forEach((input) => {
      input.addEventListener('keydown', (event) => { if (event.key === 'Enter') run(); });
    });
    if (task.autorun !== false) run(); // сразу показываем результат для примера
    return card;
  }

  function pagerHtml(number) {
    const prev = LABS.find((lab) => lab.number === number - 1);
    const next = LABS.find((lab) => lab.number === number + 1);
    const link = (lab, cls, label) => (lab
      ? `<a class="${cls}" href="lab-${pad(lab.number)}.html"><small>${label}</small>ЛР ${lab.number}. ${escapeHtml(lab.title)}</a>`
      : '');
    return `<nav class="pager" aria-label="Соседние лабораторные">${link(prev, 'prev', '← Предыдущая')}${link(next, 'next', 'Следующая →')}</nav>`;
  }

  function renderLab(lab) {
    const info = LABS.find((item) => item.number === lab.number);
    document.title = `ЛР ${lab.number}. ${lab.title}`;
    const hint = lab.intro || 'Введите свои данные в поля задачи и нажмите «Выполнить» (или Enter). В полях уже стоит пример, результат для него показан сразу.';
    document.body.innerHTML = shell(lab.number, `
      <div class="page-head">
        <span class="eyebrow">Лабораторная работа ${lab.number}</span>
        <h1>${escapeHtml(lab.title)}</h1>
        <div class="meta">${escapeHtml(info ? info.count : '')}</div>
        <div class="hint">${hint}</div>
      </div>
      <div id="tasks"></div>
      ${pagerHtml(lab.number)}`);
    const container = document.getElementById('tasks');
    lab.tasks.forEach((task, index) => container.appendChild(renderTask(task, index, lab)));
  }

  // ---------- общие помощники для визуализаций ----------

  // Ряд ячеек массива; classFor(i) возвращает CSS-класс ячейки ('done', 'hot', 'mid', 'out').
  function cellsHtml(array, classFor = () => '') {
    return `<div class="cells">${array.map((value, i) => `<span class="cell ${classFor(i)}">${escapeHtml(value)}</span>`).join('')}</div>`;
  }

  function randomArray(length = 8, max = 99) {
    return Array.from({ length }, () => Math.floor(Math.random() * max) + 1);
  }

  window.App = {
    LABS, InputError, fail, escapeHtml, round, parseList, parseNumber,
    renderIndex, renderLab, cellsHtml, randomArray,
  };
})();
