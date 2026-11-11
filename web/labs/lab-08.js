// ЛР 8. Сортировка вставками — веб-версия с пошаговой визуализацией.
(function () {
  const { cellsHtml, randomArray } = App;

  function insertionSort(source) {
    const array = [...source];
    const steps = [];
    let comparisons = 0;
    let shifts = 0;
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
      let shifted = 0;
      while (j >= 0) {
        comparisons++;
        if (array[j] > key) {
          array[j + 1] = array[j];
          shifts++;
          shifted++;
          j--;
        } else {
          break;
        }
      }
      array[j + 1] = key;
      steps.push({ array: [...array], key, keyIndex: j + 1, sortedTo: i, shifted });
    }
    return { array, steps, comparisons, shifts };
  }

  function view(source) {
    const result = insertionSort(source);
    const rows = result.steps.map((step, index) => `<tr><td>Шаг ${index + 1}</td>
        <td>${cellsHtml(step.array, (i) => (i === step.keyIndex ? 'hot' : i <= step.sortedTo ? 'done' : ''))}</td>
        <td>вставили ${step.key}, сдвигов: ${step.shifted}</td></tr>`).join('');
    return {
      html: `<div class="legend"><span><span class="cell done">&nbsp;</span>отсортированная часть</span><span><span class="cell hot">&nbsp;</span>вставленный элемент</span></div>
        <table class="steps"><thead><tr><th>Шаг</th><th>Массив</th><th>Что сделали</th></tr></thead>
        <tbody><tr><td>Исходный</td><td>${cellsHtml(source, (i) => (i === 0 ? 'done' : ''))}</td><td>первый элемент — отсортированная часть</td></tr>${rows}</tbody></table>
        <div class="summary">Результат: <b>${result.array.join(' ')}</b><br>Сравнений: ${result.comparisons}, сдвигов: ${result.shifts}</div>`,
    };
  }

  App.renderLab({
    number: 8,
    title: 'Сортировка вставками',
    intro: 'Введите массив через пробел или нажмите «Случайный массив». Таблица показывает каждый шаг: зелёным — отсортированная часть, жёлтым — элемент, который только что вставили на своё место.',
    tasks: [
      {
        title: 'Сортировка вставками',
        statement: 'Массив делится на отсортированную часть (слева) и неотсортированную. На каждом шаге берём первый неотсортированный элемент («ключ»), сдвигаем вправо все элементы отсортированной части, которые больше ключа, и ставим ключ в освободившуюся ячейку. Так раскладывают карты в руке.',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '5 2 4 6 1 3' }],
        button: 'Сортировать',
        random: { field: 'array', make: () => randomArray(8).join(' ') },
        solve: ({ array }) => view(array),
      },
    ],
  });
})();
