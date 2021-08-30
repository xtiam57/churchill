import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { generateGUID } from 'utils';

import { PresenterStyled } from './styled';
import { process, resizeText } from './helper';

const textMotion = {
  initial: { opacity: 0, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.25 },
};

export function Presenter({
  id = generateGUID(),
  text = '',
  subtext = null,
  ...rest
}) {
  const handleFontScale = () => {
    setTimeout(() => {
      resizeText({
        element: document.getElementById('presenter-text'),
        step: 5,
        minSize: 50,
        maxSize: 310,
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
          id="presenter-text"
          dangerouslySetInnerHTML={{
            __html: process(text, subtext),
          }}
          {...textMotion}
        />
      </AnimatePresence>
    </PresenterStyled>
  );
}
