// ЛР 11. Работа с деревьями — двоичное дерево поиска с рисунком.
(function () {
  const { escapeHtml, parseList, parseNumber, InputError } = App;

  class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {
    constructor() { this.root = null; }

    insert(value) {
      if (this.search(value)) return false;
      const insertNode = (node) => {
        if (node === null) return new Node(value);
        if (value < node.value) node.left = insertNode(node.left);
        else node.right = insertNode(node.right);
        return node;
      };
      this.root = insertNode(this.root);
      return true;
    }

    search(value) {
      let node = this.root;
      while (node !== null) {
        if (value === node.value) return node;
        node = value < node.value ? node.left : node.right;
      }
      return null;
    }

    path(value) {
      const result = [];
      let node = this.root;
      while (node !== null) {
        result.push(node.value);
        if (value === node.value) return result;
        node = value < node.value ? node.left : node.right;
      }
      return null;
    }

    remove(value) {
      if (!this.search(value)) return false;
      const removeNode = (node, target) => {
        if (node === null) return null;
        if (target < node.value) { node.left = removeNode(node.left, target); return node; }
        if (target > node.value) { node.right = removeNode(node.right, target); return node; }
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        let successor = node.right;
        while (successor.left !== null) successor = successor.left;
        node.value = successor.value;
        node.right = removeNode(node.right, successor.value);
        return node;
      };
      this.root = removeNode(this.root, value);
      return true;
    }

    height(node = this.root) { return node === null ? 0 : 1 + Math.max(this.height(node.left), this.height(node.right)); }
    size(node = this.root) { return node === null ? 0 : 1 + this.size(node.left) + this.size(node.right); }

    inOrder(node = this.root, out = []) { if (node) { this.inOrder(node.left, out); out.push(node.value); this.inOrder(node.right, out); } return out; }
    preOrder(node = this.root, out = []) { if (node) { out.push(node.value); this.preOrder(node.left, out); this.preOrder(node.right, out); } return out; }
    postOrder(node = this.root, out = []) { if (node) { this.postOrder(node.left, out); this.postOrder(node.right, out); out.push(node.value); } return out; }
    levelOrder() {
      const out = [];
      const queue = this.root ? [this.root] : [];
      while (queue.length) {
        const node = queue.shift();
        out.push(node.value);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      return out;
    }
  }

  // Рисунок: x — порядковый номер узла в симметричном обходе, y — глубина.
  function treeSvg(tree, highlightPath, found) {
    if (tree.root === null) return '<div class="tree-empty">Дерево пустое</div>';
    const positions = new Map();
    let order = 0;
    const place = (node, depth) => {
      if (!node) return;
      place(node.left, depth + 1);
      positions.set(node, { x: order++, y: depth });
      place(node.right, depth + 1);
    };
    place(tree.root, 0);
    const stepX = 52;
    const stepY = 64;
    const pad = 30;
    const width = Math.max(order * stepX + pad, 200);
    const height = tree.height() * stepY + pad;
    const px = (node) => pad / 2 + positions.get(node).x * stepX + stepX / 2;
    const py = (node) => pad / 2 + positions.get(node).y * stepY + 20;

    const lines = [];
    const circles = [];
    const walk = (node) => {
      if (!node) return;
      for (const child of [node.left, node.right]) {
        if (child) lines.push(`<line x1="${px(node)}" y1="${py(node)}" x2="${px(child)}" y2="${py(child)}"/>`);
      }
      let cls = '';
      if (found !== null && node.value === found) cls = 'found';
      else if (highlightPath.includes(node.value)) cls = 'on-path';
      circles.push(`<g data-value="${node.value}" style="cursor:pointer"><circle class="${cls}" cx="${px(node)}" cy="${py(node)}" r="19"/><text x="${px(node)}" y="${py(node)}">${escapeHtml(node.value)}</text></g>`);
      walk(node.left);
      walk(node.right);
    };
    walk(tree.root);
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Рисунок дерева">${lines.join('')}${circles.join('')}</svg>`;
  }

  function render(box) {
    const tree = new BinarySearchTree();
    [50, 30, 70, 20, 40, 60, 80].forEach((v) => tree.insert(v));
    let highlight = [];
    let found = null;

    box.innerHTML = `
      <div class="fields">
        <div class="field wide"><label for="tree-start">Построить дерево из чисел</label><input id="tree-start" value="50 30 70 20 40 60 80" autocomplete="off"></div>
      </div>
      <div class="actions"><button type="button" data-act="build">Построить заново</button></div>
      <div class="fields" style="margin-top:14px">
        <div class="field"><label for="tree-value">Значение</label><input id="tree-value" value="35" inputmode="decimal" autocomplete="off"></div>
      </div>
      <div class="actions">
        <button type="button" class="primary" data-act="insert">Добавить</button>
        <button type="button" data-act="search">Найти</button>
        <button type="button" data-act="remove">Удалить</button>
      </div>
      <div class="output" aria-live="polite"></div>
      <div class="tree-box"></div>
      <p class="help">Нажмите на узел, чтобы увидеть его родителя, потомков и глубину.</p>
      <div class="output rich traversals"></div>`;

    const output = box.querySelector('.output');
    const treeBox = box.querySelector('.tree-box');
    const traversals = box.querySelector('.traversals');
    const valueInput = box.querySelector('#tree-value');

    const say = (text, isError = false) => {
      output.classList.toggle('error', isError);
      output.textContent = text;
    };

    function nodeInfo(value) {
      const route = tree.path(value);
      const node = tree.search(value);
      const parent = route.length > 1 ? route[route.length - 2] : null;
      const children = [node.left, node.right].filter(Boolean).map((n) => n.value);
      return [`Узел ${value}`, `Путь от корня: ${route.join(' → ')}`,
        `Родитель: ${parent ?? 'нет (это корень)'}`,
        `Потомки: ${children.length ? children.join(', ') : 'нет (это лист)'}`,
        `Глубина: ${route.length - 1}`].join('\n');
    }

    function redraw() {
      treeBox.innerHTML = treeSvg(tree, highlight, found);
      treeBox.querySelectorAll('g[data-value]').forEach((g) => {
        g.addEventListener('click', () => {
          const value = Number(g.dataset.value);
          highlight = tree.path(value);
          found = value;
          say(nodeInfo(value));
          redraw();
        });
      });
      traversals.innerHTML = tree.root === null ? 'Дерево пустое.' : `
        <table class="steps"><tbody>
          <tr><td>Узлов</td><td>${tree.size()}, высота ${tree.height()}, минимум ${tree.inOrder()[0]}, максимум ${tree.inOrder().slice(-1)[0]}</td></tr>
          <tr><td>Симметричный обход</td><td>${tree.inOrder().join(' ')} <span class="help">— по возрастанию</span></td></tr>
          <tr><td>Прямой обход</td><td>${tree.preOrder().join(' ')} <span class="help">— корень первым</span></td></tr>
          <tr><td>Обратный обход</td><td>${tree.postOrder().join(' ')} <span class="help">— корень последним</span></td></tr>
          <tr><td>Обход в ширину</td><td>${tree.levelOrder().join(' ')} <span class="help">— по уровням</span></td></tr>
        </tbody></table>`;
    }

    function readValue() { return parseNumber(valueInput.value, 'Значение'); }

    box.addEventListener('click', (event) => {
      const act = event.target.dataset && event.target.dataset.act;
      if (!act) return;
      try {
        highlight = [];
        found = null;
        if (act === 'build') {
          const values = parseList(box.querySelector('#tree-start').value, 'Построить дерево из чисел');
          tree.root = null;
          values.forEach((v) => tree.insert(v));
          say(`Дерево построено из ${values.length} чисел (повторы пропущены).`);
        } else if (act === 'insert') {
          const value = readValue();
          if (tree.insert(value)) {
            highlight = tree.path(value);
            found = value;
            say(`${value} добавлено. Путь вставки: ${highlight.join(' → ')}`);
          } else {
            say(`${value} уже есть в дереве — повторы не добавляем.`);
          }
        } else if (act === 'search') {
          const value = readValue();
          const route = tree.path(value);
          if (route) {
            highlight = route;
            found = value;
            say(nodeInfo(value));
          } else {
            say(`${value} в дереве нет.`);
          }
        } else if (act === 'remove') {
          const value = readValue();
          const node = tree.search(value);
          const kind = !node ? '' : node.left && node.right ? 'у узла два потомка — на его место встало наименьшее значение правого поддерева'
            : node.left || node.right ? 'у узла один потомок — он встал на место удалённого' : 'это был лист — просто убрали';
          say(tree.remove(value) ? `${value} удалено: ${kind}.` : `${value} в дереве нет.`);
        }
      } catch (error) {
        say(error instanceof InputError ? error.message : `Ошибка: ${error.message}`, true);
      }
      redraw();
    });
    valueInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') box.querySelector('[data-act="insert"]').click(); });

    say('Дерево построено из примера. Введите значение и выберите действие.');
    redraw();
  }

  App.renderLab({
    number: 11,
    title: 'Работа с деревьями',
    intro: 'Двоичное дерево поиска: в левом поддереве каждого узла значения меньше, в правом — больше. Добавляйте, ищите и удаляйте значения — рисунок и обходы обновляются сразу.',
    tasks: [
      {
        title: 'Двоичное дерево поиска',
        statement: 'Операции: создание дерева, добавление узла, поиск, удаление (три случая: лист, один потомок, два потомка), перебор узлов четырьмя обходами, информация об узле — родитель, потомки, глубина.',
        render,
      },
    ],
  });
})();
