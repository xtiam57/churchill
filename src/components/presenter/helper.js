export function process(text, subtext) {
  const res = text
    .replaceAll('///', '<b>///</b>')
    .replaceAll('//', '<b>//</b>')
    .replaceAll('__', '</i>')
    .replaceAll('_', '<i class="jesus">')
    .replaceAll('**********', '<b>__________</b>')
    .replace('(Coro)', '<strong class="fs-title">(Coro)</strong>')
    .replace('1)', '<strong class="fs-title">(1)</strong><br/> ')
    .replace('2)', '<strong class="fs-title">(2)</strong><br/> ')
    .replace('3)', '<strong class="fs-title">(3)</strong><br/> ')
    .replace('4)', '<strong class="fs-title">(4)</strong><br/> ')
    .replace('5)', '<strong class="fs-title">(5)</strong><br/> ')
    .replace('6)', '<strong class="fs-title">(6)</strong><br/> ')
    .replace('7)', '<strong class="fs-title">(7)</strong><br/> ')
    .replace('8)', '<strong class="fs-title">(8)</strong><br/> ')
    .replace('9)', '<strong class="fs-title">(9)</strong><br/> ')
    .replace('10)', '<strong class="fs-title">(10)</strong><br/> ');

  return `${res}${subtext ? `<small>${subtext}</small>` : ''}`;
}

const isOverflown = ({ clientHeight, scrollHeight }) => {
  return scrollHeight > clientHeight;
};

export const resizeText = ({
  element,
  minSize = 10,
  maxSize = 512,
  step = 1,
  unit = 'px',
  vh = 3.065,
}) => {
  element.style.opacity = 0;

  let i = minSize;
  let overflow = false;

  const parent = element.parentNode;

  while (!overflow && i < maxSize) {
    element.style.fontSize = `calc(${i}${unit} + ${vh}vh)`;
    overflow = isOverflown(parent);

    if (!overflow) {
      i += step;
    }
  }

  // revert to last state where no overflow happened
  element.style.fontSize = `calc(${i - step}${unit} + ${vh}vh)`;
  return `calc(${i - step}${unit} + ${vh}vh)`;
};
