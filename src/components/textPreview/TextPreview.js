import { TextPreviewStyled, TextPreviewWrapperStyled } from './styled';

export function TextPreview({ hideText, ...props }) {
  return (
    <TextPreviewWrapperStyled {...props}>
      <TextPreviewStyled {...props}>
        {!hideText && (
          <p className="m-0">
            <strong>Títulos</strong> <br />
            Texto normal. <i className="jesus">Palabras de Jesús.</i>{' '}
            <i>Palabras en cursiva.</i> <b>Palabras resaltadas.</b>
            <small className="my-1">Citas</small>
            {/* <span className="opts">Opción de Trivia.</span> */}
          </p>
        )}
      </TextPreviewStyled>
    </TextPreviewWrapperStyled>
  );
}
