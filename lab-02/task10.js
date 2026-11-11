// Задача 10. Восточный календарь: 60-летний цикл из пяти 12-летних подциклов,
// обозначаемых цветами: зеленый, красный, желтый, белый, черный.
// Годы в подцикле называются по животным. 1984 год — начало цикла: «год зеленой крысы».
// По номеру года определить его название.

const { askInteger, close } = require('./input');

// Цвет в родительном падеже: для животных женского рода («крысы») и мужского («тигра»)
const COLORS_FEMININE = ['зеленой', 'красной', 'желтой', 'белой', 'черной'];
const COLORS_MASCULINE = ['зеленого', 'красного', 'желтого', 'белого', 'черного'];

const ANIMALS = ['крысы', 'коровы', 'тигра', 'зайца', 'дракона', 'змеи',
  'лошади', 'овцы', 'обезьяны', 'курицы', 'собаки', 'свиньи'];
const MASCULINE = ['тигра', 'зайца', 'дракона'];

// Остаток от деления, который всегда неотрицательный (нужен для лет раньше 1984)
function mod(a, b) {
  return ((a % b) + b) % b;
}

async function main() {
  const year = await askInteger('Год: ', 1);

  const position = mod(year - 1984, 60);        // номер года внутри 60-летнего цикла
  const colorIndex = Math.floor(position / 12); // какой 12-летний подцикл (цвет)
  const animalIndex = position % 12;            // какое животное

  const animal = ANIMALS[animalIndex];
  const colors = MASCULINE.includes(animal) ? COLORS_MASCULINE : COLORS_FEMININE;

  console.log(`год ${colors[colorIndex]} ${animal}`);
  close();
}

main();
