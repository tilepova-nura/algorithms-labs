// Лабораторная работа 11. Работа с деревьями.
// Двоичное дерево поиска (Binary Search Tree, BST).
//
// Каждый узел хранит значение и ссылки на левого и правого потомка.
// Правило дерева поиска: в левом поддереве узла все значения меньше,
// в правом — больше. Благодаря этому поиск идёт по одной ветке, как бинарный поиск.

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;  // левый потомок (меньшие значения)
    this.right = null; // правый потомок (большие значения)
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null; // корень дерева; null — дерево пустое
  }

  // ---------- Добавление ----------

  // Добавляет значение. Возвращает false, если такое значение уже есть.
  insert(value) {
    if (this.search(value)) {
      return false; // одинаковые значения не храним
    }
    this.root = this.#insertNode(this.root, value);
    return true;
  }

  #insertNode(node, value) {
    if (node === null) {
      return new Node(value); // нашли пустое место — создаём узел
    }
    if (value < node.value) {
      node.left = this.#insertNode(node.left, value);
    } else {
      node.right = this.#insertNode(node.right, value);
    }
    return node;
  }

  // ---------- Поиск ----------

  // Возвращает узел с таким значением или null.
  search(value) {
    let node = this.root;
    while (node !== null) {
      if (value === node.value) return node;
      node = value < node.value ? node.left : node.right;
    }
    return null;
  }

  // Путь от корня до значения, например [50, 30, 40]. Если значения нет — null.
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

  // ---------- Информация об узле ----------

  // Родитель узла со значением value (null у корня или если значения нет).
  parent(value) {
    const route = this.path(value);
    if (route === null || route.length < 2) return null;
    return route[route.length - 2];
  }

  // Значения потомков узла: [левый, правый], отсутствующие пропускаются.
  children(value) {
    const node = this.search(value);
    if (node === null) return null;
    const result = [];
    if (node.left) result.push(node.left.value);
    if (node.right) result.push(node.right.value);
    return result;
  }

  // Глубина узла — сколько рёбер от корня до него (у корня 0).
  depth(value) {
    const route = this.path(value);
    return route === null ? -1 : route.length - 1;
  }

  // Высота дерева — количество уровней (у пустого 0, у одного корня 1).
  height(node = this.root) {
    if (node === null) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  // Количество узлов.
  size(node = this.root) {
    if (node === null) return 0;
    return 1 + this.size(node.left) + this.size(node.right);
  }

  // Минимум — самый левый узел, максимум — самый правый.
  min() {
    if (this.root === null) return null;
    let node = this.root;
    while (node.left !== null) node = node.left;
    return node.value;
  }

  max() {
    if (this.root === null) return null;
    let node = this.root;
    while (node.right !== null) node = node.right;
    return node.value;
  }

  // ---------- Удаление ----------

  // Удаляет значение. Возвращает false, если его не было.
  remove(value) {
    if (!this.search(value)) return false;
    this.root = this.#removeNode(this.root, value);
    return true;
  }

  #removeNode(node, value) {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this.#removeNode(node.left, value);
      return node;
    }
    if (value > node.value) {
      node.right = this.#removeNode(node.right, value);
      return node;
    }

    // нашли удаляемый узел
    // случай 1 и 2: у узла нет потомков или один потомок — ставим потомка на его место
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    // случай 3: два потомка — заменяем значение наименьшим из правого поддерева
    // (это следующее по величине значение), а тот узел удаляем из правого поддерева
    let successor = node.right;
    while (successor.left !== null) successor = successor.left;
    node.value = successor.value;
    node.right = this.#removeNode(node.right, successor.value);
    return node;
  }

  // ---------- Обходы ----------

  // Симметричный обход (левое → узел → правое): значения по возрастанию.
  inOrder(node = this.root, result = []) {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // Прямой обход (узел → левое → правое): сначала корень.
  preOrder(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // Обратный обход (левое → правое → узел): корень последним.
  postOrder(node = this.root, result = []) {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // Обход в ширину — по уровням сверху вниз, с помощью очереди.
  levelOrder() {
    const result = [];
    if (this.root === null) return result;
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  // ---------- Печать ----------

  // Рисует дерево «лёжа на боку»: корень слева, правое поддерево сверху, левое снизу.
  toString() {
    if (this.root === null) return '(дерево пустое)';
    const lines = [];
    const draw = (node, prefix, isRight) => {
      if (node === null) return;
      draw(node.right, prefix + (isRight ? '        ' : '│       '), true);
      lines.push(prefix + (isRight ? '┌── ' : '└── ') + node.value);
      draw(node.left, prefix + (isRight ? '│       ' : '        '), false);
    };
    draw(this.root.right, '', true);
    lines.push(String(this.root.value));
    draw(this.root.left, '', false);
    return lines.join('\n');
  }
}

module.exports = { Node, BinarySearchTree };
