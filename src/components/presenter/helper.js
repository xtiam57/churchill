export function process(text, subtext) {
  const res = text
    .replaceAll('//', '<b>//</b>')
    .replaceAll('___', '<b>///</b>')
    .replace('1)', '<strong>(1)</strong><br/> ')
    .replace('2)', '<strong>(2)</strong><br/> ')
    .replace('3)', '<strong>(3)</strong><br/> ')
    .replace('4)', '<strong>(4)</strong><br/> ')
    .replace('5)', '<strong>(5)</strong><br/> ')
    .replace('6)', '<strong>(6)</strong><br/> ')
    .replace('7)', '<strong>(7)</strong><br/> ')
    .replace('8)', '<strong>(8)</strong><br/> ')
    .replace('9)', '<strong>(9)</strong><br/> ')
    .replace('10)', '<strong>(10)</strong><br/> ');

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
}) => {
  element.style.opacity = 0;

  let i = minSize;
  let overflow = false;

  const parent = element.parentNode;

  while (!overflow && i < maxSize) {
    element.style.fontSize = `calc(${i}${unit} + 3.05vh)`;
    overflow = isOverflown(parent);

    if (!overflow) {
      i += step;
    }
  }

  // revert to last state where no overflow happened
  element.style.fontSize = `calc(${i - step}${unit} + 3.05vh)`;
  return `calc(${i - step}${unit} + 3.05vh)`;
};
