import { CornerStyled } from './styled';

export function Corner({ text = '', clockposition, ...rest }) {
  return (
    <CornerStyled className={clockposition} {...rest}>
      <p
        id="corner-text"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </CornerStyled>
  );
}
