import { generateGUID } from './generateGUID';

const Slide = {};

Slide.create = ({
  id = generateGUID(),
  index = null,
  title = '',
  text = '',
  subtext = null,
  ...rest
}) => {
  title = title ? `<strong>${title}</strong>/n` : '';
  text = `${title}${text}`.replaceAll('/n', '<br/>');

  return {
    id,
    index,
    text,
    subtext,
    ...rest,
  };
};

export { Slide };
