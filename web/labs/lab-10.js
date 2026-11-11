// ЛР 10. Бинарный поиск — веб-версия с пошаговой визуализацией.
(function () {
  const { cellsHtml, randomArray } = App;

  function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;
    const steps = [];
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      let decision;
      if (array[mid] === target) decision = 'found';
      else if (target < array[mid]) decision = 'left';
      else decision = 'right';
      steps.push({ left, right, mid, decision });
      if (decision === 'found') return { index: mid, steps };
      if (decision === 'left') right = mid - 1;
      else left = mid + 1;
    }
    return { index: -1, steps };
  }

  function view(input, target) {
    const sorted = input.every((v, i) => i === 0 || input[i - 1] <= v);
    const array = sorted ? input : [...input].sort((a, b) => a - b);
    const result = binarySearch(array, target);
    const note = sorted ? '' : `<p class="help">Массив не был отсортирован, а бинарный поиск работает только на отсортированном — поэтому сначала отсортировали его.</p>`;
    const rows = result.steps.map((step, index) => {
      const what = {
        found: `${array[step.mid]} = ${target} — найдено`,
        left: `${target} &lt; ${array[step.mid]} → ищем левее`,
        right: `${target} &gt; ${array[step.mid]} → ищем правее`,
      }[step.decision];
      return `<tr><td>Шаг ${index + 1}</td>
        <td>${cellsHtml(array, (i) => (i === step.mid ? 'mid' : i < step.left || i > step.right ? 'out' : ''))}</td>
        <td>left = ${step.left}, right = ${step.right}, mid = ${step.mid}<br>${what}</td></tr>`;
    }).join('');
    const answer = result.index === -1
      ? `Число ${target} не найдено`
      : `Число ${target} найдено: позиция ${result.index + 1} (индекс ${result.index})`;
    return {
      html: `${note}<div class="legend"><span><span class="cell mid">&nbsp;</span>средний элемент</span><span><span class="cell out">&nbsp;</span>отброшено</span></div>
        <table class="steps"><thead><tr><th>Шаг</th><th>Область поиска</th><th>Решение</th></tr></thead><tbody>${rows}</tbody></table>
        <div class="summary"><b>${answer}</b> за ${result.steps.length} шаг(а/ов). Простому перебору в худшем случае понадобилось бы ${array.length}.</div>`,
    };
  }

  App.renderLab({
    number: 10,
    title: 'Бинарный поиск',
    intro: 'Введите отсортированный массив и искомое число. Таблица показывает, как на каждом шаге область поиска сокращается вдвое.',
    tasks: [
      {
        title: 'Бинарный поиск',
        statement: 'Ищем число в отсортированном массиве. Держим границы <code>left</code> и <code>right</code>, смотрим на средний элемент <code>mid</code>: если он равен искомому — нашли; если искомое меньше — ищем в левой половине (<code>right = mid − 1</code>), если больше — в правой (<code>left = mid + 1</code>).',
        inputs: [
          { name: 'array', label: 'Отсортированный массив', type: 'list', value: '2 5 8 12 16 23 38 56 72 91' },
          { name: 'target', label: 'Искомое число', value: 23 },
        ],
        button: 'Найти',
        random: { field: 'array', make: () => [...new Set(randomArray(12))].sort((a, b) => a - b).join(' ') },
        solve: ({ array, target }) => view(array, target),
      },
    ],
  });
})();
