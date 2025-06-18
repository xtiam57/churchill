import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { generateGUID } from 'utils';
import { process, resizeText } from './helper';
import { PresenterStyled } from './styled';
import { useGetImage } from 'hooks';

const textMotion = {
  initial: { opacity: 0, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.25 },
};

function getConf(width) {
  // 4K screens
  if (width > 2560) {
    return {
      minSize: 180,
      maxSize: 500,
    };
  }

  // 2K screens
  if (width > 1920) {
    return {
      minSize: 140,
      maxSize: 460,
    };
  }

  // HD screens
  if (width > 1280) {
    return {
      minSize: 100,
      maxSize: 400,
    };
  }

  // 720p screens
  if (width > 1024) {
    return {
      minSize: 50,
      maxSize: 340,
    };
  }

  // Small screens
  return {
    minSize: 30,
    maxSize: 300,
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
  const { bgBase64 } = useGetImage({ filepath: rest.bg });
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

  const restWithBg = { ...rest, bg: bgBase64 };
  return (
    <PresenterStyled ref={divRef} {...restWithBg}>
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
