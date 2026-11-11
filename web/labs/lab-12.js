// ЛР 12. Очередь — наглядная работа с очередью FIFO.
(function () {
  const { escapeHtml } = App;

  // Очередь на связном списке: head — начало (отсюда забираем), tail — конец (сюда добавляем).
  class Queue {
    constructor() { this.head = null; this.tail = null; this.length = 0; }
    enqueue(value) {
      const node = { value, next: null };
      if (this.tail === null) this.head = node; else this.tail.next = node;
      this.tail = node;
      this.length++;
    }
    dequeue() {
      if (this.isEmpty()) throw new Error('Очередь пуста');
      const value = this.head.value;
      this.head = this.head.next;
      if (this.head === null) this.tail = null;
      this.length--;
      return value;
    }
    peek() { if (this.isEmpty()) throw new Error('Очередь пуста'); return this.head.value; }
    isEmpty() { return this.length === 0; }
    size() { return this.length; }
    contains(value) {
      for (let node = this.head; node !== null; node = node.next) if (node.value === value) return true;
      return false;
    }
    clear() { this.head = null; this.tail = null; this.length = 0; }
    *[Symbol.iterator]() { for (let node = this.head; node !== null; node = node.next) yield node.value; }
  }

  function render(box) {
    const queue = new Queue();
    ['Анна', 'Борис', 'Вера'].forEach((name) => queue.enqueue(name));
    const log = [];

    box.innerHTML = `
      <div class="fields">
        <div class="field"><label for="queue-value">Значение</label><input id="queue-value" value="Глеб" autocomplete="off"></div>
      </div>
      <div class="actions">
        <button type="button" class="primary" data-act="enqueue">Добавить в конец</button>
        <button type="button" data-act="dequeue">Извлечь из начала</button>
        <button type="button" data-act="peek">Первый элемент</button>
        <button type="button" data-act="contains">Есть ли значение</button>
        <button type="button" data-act="size">Размер и пустота</button>
        <button type="button" data-act="iterate">Перебрать</button>
        <button type="button" data-act="clear">Очистить</button>
      </div>
      <div class="queue-view" aria-live="polite"></div>
      <div class="output"></div>
      <div class="log"></div>`;

    const view = box.querySelector('.queue-view');
    const output = box.querySelector('.output');
    const logBox = box.querySelector('.log');
    const input = box.querySelector('#queue-value');

    const say = (text, isError = false) => {
      output.classList.toggle('error', isError);
      output.textContent = text;
    };

    function redraw() {
      const items = [...queue];
      view.innerHTML = items.length === 0
        ? '<span class="queue-empty">Очередь пуста</span>'
        : `<span class="queue-end">начало →</span>${items.map((item, i) => `<span class="queue-item${i === 0 ? ' first' : ''}">${escapeHtml(item)}</span>`).join('')}<span class="queue-end">← конец</span>`;
      logBox.innerHTML = log.slice(-12).reverse().map((line) => `<div>${escapeHtml(line)}</div>`).join('');
    }

    box.addEventListener('click', (event) => {
      const act = event.target.dataset && event.target.dataset.act;
      if (!act) return;
      const value = input.value.trim();
      if (act === 'enqueue') {
        if (value === '') { say('Введите значение.', true); return; }
        queue.enqueue(value);
        say(`«${value}» встал в конец очереди.`);
        log.push(`enqueue(${value})`);
      } else if (act === 'dequeue') {
        if (queue.isEmpty()) { say('Очередь пуста — извлекать нечего.', true); return; }
        const taken = queue.dequeue();
        say(`Извлечён первый элемент: «${taken}».`);
        log.push(`dequeue() → ${taken}`);
      } else if (act === 'peek') {
        say(queue.isEmpty() ? 'Очередь пуста.' : `Первый в очереди: «${queue.peek()}» (остаётся в очереди).`);
        log.push('peek()');
      } else if (act === 'contains') {
        say(queue.contains(value) ? `«${value}» есть в очереди.` : `«${value}» в очереди нет.`);
        log.push(`contains(${value})`);
      } else if (act === 'size') {
        say(`Размер: ${queue.size()}. ${queue.isEmpty() ? 'Очередь пуста.' : 'Очередь не пуста.'}`);
        log.push('size(), isEmpty()');
      } else if (act === 'iterate') {
        const items = [...queue];
        say(items.length ? items.map((item, i) => `${i + 1}. ${item}`).join('\n') : 'Очередь пуста.');
        log.push('for (const item of queue)');
      } else if (act === 'clear') {
        queue.clear();
        say('Очередь очищена.');
        log.push('clear()');
      }
      redraw();
    });
    input.addEventListener('keydown', (event) => { if (event.key === 'Enter') box.querySelector('[data-act="enqueue"]').click(); });

    say('В очереди уже стоят трое. Добавляйте и извлекайте элементы — зелёным выделен тот, кого обслужат первым.');
    redraw();
  }

  App.renderLab({
    number: 12,
    title: 'Очередь',
    intro: 'Очередь работает по принципу FIFO — «первым пришёл, первым ушёл»: новые элементы встают в конец, забирают из начала. Реализация на связном списке с указателями на начало и конец.',
    tasks: [
      {
        title: 'Очередь FIFO',
        statement: 'Операции: создание, добавление в конец (enqueue), извлечение из начала (dequeue), первый элемент без удаления (peek), проверка пустоты, размер, наличие элемента, очистка, перебор элементов.',
        render,
      },
    ],
  });
})();
