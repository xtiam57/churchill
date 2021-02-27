import { generateGUID } from './generateGUID';

const Slide = {};

Slide.create = ({
  id = generateGUID(),
  index = 0,
  title = '',
  text = '',
  subtext = null,
}) => {
  title = title ? `<strong>${title}</strong>/n` : '';
  text = `${title}${text}`.replaceAll('/n', '<br/>');

  return {
    id,
    index,
    text,
    subtext,
  };
};

export { Slide };
