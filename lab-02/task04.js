// Задача 4. Даны координаты точки, не лежащей на осях OX и OY.
// Определить номер координатной четверти, в которой находится точка.
//    2  |  1
//  -----+-----
//    3  |  4

const { askNumber, close } = require('./input');

async function main() {
  const x = await askNumber('x: ');
  const y = await askNumber('y: ');

  if (x === 0 || y === 0) {
    console.log('Точка лежит на оси, четверть не определена.');
  } else if (x > 0 && y > 0) {
    console.log('Четверть 1');
  } else if (x < 0 && y > 0) {
    console.log('Четверть 2');
  } else if (x < 0 && y < 0) {
    console.log('Четверть 3');
  } else {
    console.log('Четверть 4');
  }
  close();
}

main();
