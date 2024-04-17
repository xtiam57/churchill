import { process } from './helper';
import { CornerStyled } from './styled';

export function Corner({ text = '', clockposition, ...rest }) {
  // const handleFontScale = () => {
  //   setTimeout(() => {
  //     resizeText({
  //       element: document.getElementById('corner-text'),
  //       step: 5,
  //       minSize: 50,
  //       maxSize: 310,
  //       unit: '%',
  //     });
  //   });
  // };

  // useEffect(handleFontScale, []);

  return (
    <CornerStyled className={clockposition} {...rest}>
      <p
        id="corner-text"
        dangerouslySetInnerHTML={{
          __html: process(text, ''),
        }}
      />
    </CornerStyled>
  );
}
