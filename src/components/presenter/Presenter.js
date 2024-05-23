import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { generateGUID } from 'utils';
import { process, resizeText } from './helper';
import { PresenterStyled } from './styled';

const textMotion = {
  initial: { opacity: 0, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.25 },
};

export function Presenter({
  id = generateGUID(),
  text = '',
  subtext = null,
  book = '',
  processedText = null,
  ...rest
}) {
  const handleFontScale = () => {
    setTimeout(() => {
      resizeText({
        element: document.getElementById('presenter-html'),
        step: 10,
        minSize: 50,
        maxSize: 400,
        unit: '%',
      });
    });
  };

  useEffect(handleFontScale, []);

  const handleExitComplete = () => handleFontScale();

  return (
    <PresenterStyled {...rest}>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <motion.p
          key={id}
          id="presenter-html"
          dangerouslySetInnerHTML={{
            __html: processedText
              ? processedText
              : process(text, subtext, book),
          }}
          {...textMotion}
        />
      </AnimatePresence>
    </PresenterStyled>
  );
}
