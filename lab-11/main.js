// Лабораторная работа 11. Работа с деревьями — программа с меню.
// Запуск: node main.js

const { ask, askNumber, close } = require('./input');
const { BinarySearchTree } = require('./binary-search-tree');

const DEFAULT_VALUES = [50, 30, 70, 20, 40, 60, 80];

function showTree(tree) {
  console.log(tree.toString());
  console.log(`Узлов: ${tree.size()}, высота: ${tree.height()}, ` +
    `минимум: ${tree.min() ?? '—'}, максимум: ${tree.max() ?? '—'}`);
}

async function readStartValues() {
  while (true) {
    const line = (await ask(`Начальные значения через пробел (Enter — ${DEFAULT_VALUES.join(' ')}): `)).trim();
    if (line === '') return DEFAULT_VALUES;
    const numbers = line.split(/\s+/).map((part) => Number(part.replace(',', '.')));
    if (numbers.every((n) => !Number.isNaN(n))) return numbers;
    console.log('Нужно ввести числа через пробел.');
  }
}

async function main() {
  const tree = new BinarySearchTree();

  for (const value of await readStartValues()) {
    tree.insert(value);
  }
  console.log('\nДерево построено:');
  showTree(tree);

  while (true) {
    console.log('\n1 — добавить  2 — найти  3 — удалить  4 — обходы  5 — об узле  6 — показать дерево  0 — выход');
    const choice = (await ask('Выбор: ')).trim();

    if (choice === '0' || choice === '') {
      break;
    } else if (choice === '1') {
      const value = await askNumber('Значение: ');
      console.log(tree.insert(value) ? `${value} добавлено.` : `${value} уже есть в дереве.`);
      showTree(tree);
    } else if (choice === '2') {
      const value = await askNumber('Что ищем: ');
      const route = tree.path(value);
      console.log(route
        ? `Найдено. Путь от корня: ${route.join(' → ')}`
        : `${value} в дереве нет.`);
    } else if (choice === '3') {
      const value = await askNumber('Что удалить: ');
      console.log(tree.remove(value) ? `${value} удалено.` : `${value} в дереве нет.`);
      showTree(tree);
    } else if (choice === '4') {
      console.log(`Симметричный (по возрастанию): ${tree.inOrder().join(' ')}`);
      console.log(`Прямой (корень первым):        ${tree.preOrder().join(' ')}`);
      console.log(`Обратный (корень последним):   ${tree.postOrder().join(' ')}`);
      console.log(`В ширину (по уровням):         ${tree.levelOrder().join(' ')}`);
    } else if (choice === '5') {
      const value = await askNumber('Значение узла: ');
      if (!tree.search(value)) {
        console.log(`${value} в дереве нет.`);
      } else {
        const parent = tree.parent(value);
        const children = tree.children(value);
        console.log(`Родитель: ${parent ?? 'нет (это корень)'}`);
        console.log(`Потомки: ${children.length ? children.join(', ') : 'нет (это лист)'}`);
        console.log(`Глубина: ${tree.depth(value)}`);
      }
    } else if (choice === '6') {
      showTree(tree);
    } else {
      console.log('Нет такого пункта.');
    }
  }

  console.log('Выход.');
  close();
}

main();
