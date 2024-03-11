import { Highlighter } from 'react-bootstrap-typeahead';

export const finderRender = (option, { text }) => (
  <div className="my-1">
    <Highlighter search={text}>
      {option.text.replaceAll('<br/>', '\n').replaceAll('_', '')}
    </Highlighter>
    <strong className="d-block">{option.subtext}</strong>
  </div>
);

export const typeaheadRender = (option, { text }) => (
  <>
    <Highlighter search={text}>{option.subtext}</Highlighter>
    <small
      className="more font-italic"
      title={option.text.replaceAll('<br/>', '\n').replaceAll('_', '')}
    >
      {option.text.replaceAll('<br/>', ' ').replaceAll('_', '')}
    </small>
  </>
);
