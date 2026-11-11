// ЛР 7. Сортировка пузырьком — веб-версия с пошаговой визуализацией.
(function () {
  const { cellsHtml, escapeHtml, randomArray } = App;

  // Возвращает массив шагов: состояние после каждого прохода.
  function bubbleSort(source) {
    const array = [...source];
    const steps = [];
    let comparisons = 0;
    let swaps = 0;
    for (let pass = 0; pass < array.length - 1; pass++) {
      let swapped = false;
      const swappedHere = [];
      for (let i = 0; i < array.length - 1 - pass; i++) {
        comparisons++;
        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
          swaps++;
          swappedHere.push(`${array[i + 1]}↔${array[i]}`);
        }
      }
      steps.push({ array: [...array], sortedFrom: array.length - 1 - pass, swaps: swappedHere, swapped });
      if (!swapped) break;
    }
    return { array, steps, comparisons, swaps };
  }

  function view(source) {
    const result = bubbleSort(source);
    const rows = result.steps.map((step, index) => {
      const from = step.swapped ? step.sortedFrom : 0;
      return `<tr><td>Проход ${index + 1}</td>
        <td>${cellsHtml(step.array, (i) => (i >= from ? 'done' : ''))}</td>
        <td>${step.swapped ? escapeHtml(step.swaps.join(', ')) : 'обменов нет — массив отсортирован'}</td></tr>`;
    }).join('');
    return {
      html: `<div class="legend"><span><span class="cell done">&nbsp;</span>уже на своём месте</span></div>
        <table class="steps"><thead><tr><th>Шаг</th><th>Массив после прохода</th><th>Обмены за проход</th></tr></thead>
        <tbody><tr><td>Исходный</td><td>${cellsHtml(source)}</td><td></td></tr>${rows}</tbody></table>
        <div class="summary">Результат: <b>${result.array.join(' ')}</b><br>Сравнений: ${result.comparisons}, обменов: ${result.swaps}</div>`,
    };
  }

  App.renderLab({
    number: 7,
    title: 'Сортировка пузырьком',
    intro: 'Введите массив через пробел или нажмите «Случайный массив». Таблица показывает массив после каждого прохода; зелёным отмечены элементы, которые уже «всплыли» на своё место.',
    tasks: [
      {
        title: 'Сортировка пузырьком',
        statement: 'Проходим по массиву и сравниваем соседние элементы; если левый больше правого — меняем их местами. За проход самый большой элемент «всплывает» в конец. Повторяем проходы, каждый раз не трогая отсортированный хвост. Если за проход не было обменов — массив отсортирован.',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '5 1 4 2 8 3' }],
        button: 'Сортировать',
        random: { field: 'array', make: () => randomArray(8).join(' ') },
        solve: ({ array }) => view(array),
      },
    ],
  });
})();
