import { TextPreviewWrapperStyled, TextPreviewStyled } from './styled';

export function TextPreview(props) {
  return (
    <TextPreviewWrapperStyled {...props}>
      <TextPreviewStyled {...props}>
        <p className="m-0">
          <strong>Títulos</strong> <br />
          Texto normal. <i className="jesus">Palabras de Jesús.</i>{' '}
          <i>Palabras en cursiva.</i> <b>Palabras resaltadas.</b>
          <small className="my-1">Citas</small>
          <div className="opts">Opción de Trivia.</div>
        </p>
      </TextPreviewStyled>
    </TextPreviewWrapperStyled>
  );
}
