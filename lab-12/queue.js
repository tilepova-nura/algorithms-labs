// Лабораторная работа 12. Очередь.
//
// Очередь работает по принципу FIFO (First In — First Out, «первым пришёл — первым ушёл»),
// как очередь в магазине: новые элементы встают в конец, а забирают их из начала.
//
// Очередь построена на связном списке: каждый элемент хранит значение
// и ссылку на следующий. Мы помним начало (head) и конец (tail),
// поэтому добавление и извлечение выполняются за O(1) — без сдвига остальных элементов.

class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null; // следующий элемент очереди
  }
}

class Queue {
  constructor() {
    this.head = null;  // первый элемент — его заберут следующим
    this.tail = null;  // последний элемент — за ним встанет новый
    this.length = 0;
  }

  // Добавление элемента в конец очереди (enqueue, в Python — put).
  enqueue(value) {
    const node = new QueueNode(value);
    if (this.tail === null) {
      this.head = node; // очередь была пустой
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
  }

  // Извлечение элемента из начала очереди (dequeue, в Python — get).
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Очередь пуста');
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null; // забрали последний элемент
    }
    this.length--;
    return value;
  }

  // Посмотреть первый элемент, не удаляя его.
  peek() {
    if (this.isEmpty()) {
      throw new Error('Очередь пуста');
    }
    return this.head.value;
  }

  // Проверка пустоты (в Python — empty()).
  isEmpty() {
    return this.length === 0;
  }

  // Размер очереди (в Python — qsize()).
  size() {
    return this.length;
  }

  // Проверка наличия элемента: проходим по цепочке от начала.
  contains(value) {
    let node = this.head;
    while (node !== null) {
      if (node.value === value) return true;
      node = node.next;
    }
    return false;
  }

  // Очистка очереди.
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Перебор элементов от начала к концу: позволяет писать for (const item of queue).
  *[Symbol.iterator]() {
    let node = this.head;
    while (node !== null) {
      yield node.value;
      node = node.next;
    }
  }

  toArray() {
    return [...this];
  }

  toString() {
    return this.isEmpty() ? '(пусто)' : `начало → ${this.toArray().join(' ← ')} ← конец`;
  }
}

module.exports = { Queue };
