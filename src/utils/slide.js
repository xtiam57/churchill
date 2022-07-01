import { generateGUID } from './generateGUID';

const Slide = {};

Slide.create = ({
  id = generateGUID(),
  index = null,
  title = '',
  text = '',
  subtext = null,
  bg = null,
  ...rest
}) => {
  const length = (title ? title.length : 0) + text.replaceAll('/n', '').length;
  title = title ? `<strong>${title}</strong>/n` : '';
  text = `${title}${text}`.replaceAll('/n', '<br/>');

  return {
    id,
    index,
    text,
    subtext,
    length,
    bg,
    ...rest,
  };
};

export { Slide };
