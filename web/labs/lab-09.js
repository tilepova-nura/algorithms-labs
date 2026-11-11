// ЛР 9. Сортировка выбором — веб-версия с пошаговой визуализацией.
(function () {
  const { cellsHtml, randomArray } = App;

  function selectionSort(source) {
    const array = [...source];
    const steps = [];
    let comparisons = 0;
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        comparisons++;
        if (array[j] < array[minIndex]) minIndex = j;
      }
      const min = array[minIndex];
      const moved = minIndex !== i;
      if (moved) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        swaps++;
      }
      steps.push({ array: [...array], position: i, min, from: minIndex, moved });
    }
    return { array, steps, comparisons, swaps };
  }

  function view(source) {
    const result = selectionSort(source);
    const rows = result.steps.map((step, index) => `<tr><td>Шаг ${index + 1}</td>
        <td>${cellsHtml(step.array, (i) => (i === step.position ? 'hot' : i < step.position ? 'done' : ''))}</td>
        <td>${step.moved ? `минимум ${step.min} перенесли с позиции ${step.from + 1} на ${step.position + 1}` : `минимум ${step.min} уже на позиции ${step.position + 1}`}</td></tr>`).join('');
    return {
      html: `<div class="legend"><span><span class="cell done">&nbsp;</span>уже на своём месте</span><span><span class="cell hot">&nbsp;</span>поставленный на этом шаге минимум</span></div>
        <table class="steps"><thead><tr><th>Шаг</th><th>Массив</th><th>Что сделали</th></tr></thead>
        <tbody><tr><td>Исходный</td><td>${cellsHtml(source)}</td><td></td></tr>${rows}</tbody></table>
        <div class="summary">Результат: <b>${result.array.join(' ')}</b><br>Сравнений: ${result.comparisons}, обменов: ${result.swaps}</div>`,
    };
  }

  App.renderLab({
    number: 9,
    title: 'Сортировка выбором',
    intro: 'Введите массив через пробел или нажмите «Случайный массив». На каждом шаге видно, какой минимум найден и на какую позицию он поставлен.',
    tasks: [
      {
        title: 'Сортировка выбором',
        statement: 'На каждом шаге ищем наименьший элемент в неотсортированной части массива и меняем его местами с первым элементом этой части. После шага i первые i элементов стоят на своих окончательных местах.',
        inputs: [{ name: 'array', label: 'Массив', type: 'list', value: '64 25 12 22 11' }],
        button: 'Сортировать',
        random: { field: 'array', make: () => randomArray(8).join(' ') },
        solve: ({ array }) => view(array),
      },
    ],
  });
})();
