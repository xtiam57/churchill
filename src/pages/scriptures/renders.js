import { Highlighter } from 'react-bootstrap-typeahead';

export const finderRender = (option, { text }) => (
  <div className="my-1">
    <Highlighter search={text}>
      {option.text.replaceAll('<br/>', '\n')}
    </Highlighter>
    <small className="d-block text-primary">{option.cite}</small>
  </div>
);

export const typeaheadRender = (option, { text }) => (
  <>
    <Highlighter search={text}>{option.cite}</Highlighter>
    <small
      className="more font-italic"
      title={option.text.replaceAll('<br/>', '\n')}
    >
      {option.text.replaceAll('<br/>', ' ')}
    </small>
  </>
);
