// Лабораторная работа 12. Очередь — программа с меню.
// Запуск: node main.js

const { ask, close } = require('./input');
const { Queue } = require('./queue');

function show(queue) {
  console.log(`Очередь: ${queue.toString()}   (размер: ${queue.size()})`);
}

async function main() {
  const queue = new Queue();
  console.log('Создана пустая очередь.');

  while (true) {
    console.log('\n1 — добавить  2 — извлечь  3 — первый элемент  4 — пуста ли  5 — размер');
    console.log('6 — есть ли элемент  7 — очистить  8 — перебрать  9 — моделирование кассы  0 — выход');
    const choice = (await ask('Выбор: ')).trim();

    if (choice === '0' || choice === '') {
      break;
    } else if (choice === '1') {
      const value = (await ask('Что добавить: ')).trim();
      queue.enqueue(value);
      console.log(`«${value}» встал в конец очереди.`);
      show(queue);
    } else if (choice === '2') {
      if (queue.isEmpty()) {
        console.log('Очередь пуста — извлекать нечего.');
      } else {
        console.log(`Извлечён первый элемент: «${queue.dequeue()}»`);
        show(queue);
      }
    } else if (choice === '3') {
      console.log(queue.isEmpty() ? 'Очередь пуста.' : `Первый в очереди: «${queue.peek()}»`);
    } else if (choice === '4') {
      console.log(queue.isEmpty() ? 'Очередь пуста.' : 'Очередь не пуста.');
    } else if (choice === '5') {
      console.log(`Размер очереди: ${queue.size()}`);
    } else if (choice === '6') {
      const value = (await ask('Что ищем: ')).trim();
      console.log(queue.contains(value) ? `«${value}» есть в очереди.` : `«${value}» в очереди нет.`);
    } else if (choice === '7') {
      queue.clear();
      console.log('Очередь очищена.');
      show(queue);
    } else if (choice === '8') {
      if (queue.isEmpty()) {
        console.log('Очередь пуста.');
      } else {
        let position = 1;
        for (const item of queue) {
          console.log(`${position}. ${item}`);
          position++;
        }
      }
    } else if (choice === '9') {
      simulateCheckout();
    } else {
      console.log('Нет такого пункта.');
    }
  }

  console.log('Выход.');
  close();
}

// Пример применения очереди: покупатели подходят к кассе и обслуживаются по порядку.
function simulateCheckout() {
  const line = new Queue();
  const events = [
    ['пришёл', 'Анна'], ['пришёл', 'Борис'], ['обслужен'],
    ['пришёл', 'Вера'], ['пришёл', 'Глеб'], ['обслужен'], ['обслужен'], ['обслужен'],
  ];

  console.log('Касса в магазине: покупатели встают в конец очереди, касса обслуживает первого.');
  for (const [action, name] of events) {
    if (action === 'пришёл') {
      line.enqueue(name);
      console.log(`Пришёл ${name.padEnd(6)} → ${line.toString()}`);
    } else {
      const served = line.dequeue();
      console.log(`Обслужен ${served.padEnd(5)} → ${line.toString()}`);
    }
  }
}

main();
