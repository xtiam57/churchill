import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNewAnimation } from 'hooks/useNewAnimation';
import { generateGUID } from 'utils';
import { process, resizeText } from './helper';
import { PresenterStyled } from './styled';

const PLUS = 110;

function getConf(width) {
  // 4K screens
  if (width > 2560) {
    return {
      minSize: 180 + PLUS,
      maxSize: 500 + PLUS,
    };
  }

  // 2K screens
  if (width > 1920) {
    return {
      minSize: 140 + PLUS,
      maxSize: 560 + PLUS,
    };
  }

  // HD screens
  if (width > 1280) {
    return {
      minSize: 100 + PLUS,
      maxSize: 400 + PLUS,
    };
  }

  // 720p screens
  if (width > 1024) {
    return {
      minSize: 50 + PLUS,
      maxSize: 340 + PLUS,
    };
  }

  // Small screens
  return {
    minSize: 30 + PLUS,
    maxSize: 300 + PLUS,
  };
}

export function Presenter({
  id = generateGUID(),
  text = '',
  subtext = null,
  book = '',
  processedText = null,
  castScreen = false,
  ...rest
}) {
  const divRef = useRef(null);
  const [divWidth, setDivWidth] = useState(1024);
  const { currentAnimation } = useNewAnimation();

  const handleFontScale = () => {
    setTimeout(() => {
      resizeText({
        element: document.getElementById('presenter-html'),
        ...getConf(divWidth),
      });
    });
  };

  const handleExitComplete = () => handleFontScale();

  useEffect(() => {
    setDivWidth(divRef.current.clientWidth);
  }, []);

  useEffect(handleFontScale, []);

  return (
    <PresenterStyled ref={divRef} {...rest}>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <motion.p
          key={id}
          id="presenter-html"
          dangerouslySetInnerHTML={{
            __html: processedText
              ? processedText
              : process(text, subtext, book),
          }}
          {...currentAnimation.motion}
        />
      </AnimatePresence>
    </PresenterStyled>
  );
}
