import { useEffect } from 'react';
import { generateGUID } from 'utils';
import { process } from './helper';
import { CornerStyled } from './styled';

export function Corner({ id = generateGUID(), text = '', ...rest }) {
  const handleFontScale = () => {
    setTimeout(() => {
      // resizeText({
      //   element: document.getElementById('corner-text'),
      //   step: 5,
      //   minSize: 50,
      //   maxSize: 310,
      //   unit: '%',
      // });
    });
  };

  useEffect(handleFontScale, []);

  return (
    <CornerStyled {...rest}>
      <p
        key={id}
        // id="corner-text"
        dangerouslySetInnerHTML={{
          __html: process(text, ''),
        }}
      />
    </CornerStyled>
  );
}
