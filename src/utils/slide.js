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
  const cleanText = text.replaceAll('/n', '');
  const slideTitle = title ? `<strong>${title}</strong>/n` : '';
  const htmlText = `${slideTitle}${text}`.replaceAll('/n', '<br/>');
  const length = (title?.length || 0) + cleanText.length;

  return {
    id,
    index,
    length,
    bg,
    processedText: process(htmlText, subtext, book),
    ...rest,
  };
};

export { Slide };
