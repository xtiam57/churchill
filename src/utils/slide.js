import { process } from 'components/presenter/helper';
import { generateGUID } from './generateGUID';

const Slide = {};

Slide.create = ({
  id = generateGUID(),
  index = null,
  title = '',
  text = '',
  subtext = null,
  book = null,
  bg = null,
  ...rest
}) => {
  const length = (title ? title.length : 0) + text.replaceAll('/n', '').length;
  title = title ? `<strong>${title}</strong>/n` : '';
  text = `${title}${text}`.replaceAll('/n', '<br/>');

  return {
    id,
    index,
    length,
    bg,
    processedText: process(text, subtext, book),
    ...rest,
  };
};

export { Slide };
