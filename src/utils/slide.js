const Slide = {};

Slide.create = ({ index = 0, title = '', text = '', subtext = null }) => {
  title = title ? `<strong>${title}</strong>/n` : '';
  text = `${title}${text}`.replaceAll('/n', '<br/>');

  return {
    index,
    text,
    subtext,
  };
};

export { Slide };
