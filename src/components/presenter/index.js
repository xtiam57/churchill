import React from 'react';
import { PresenterStyled } from './style';
import { motion, AnimatePresence } from 'framer-motion';

import { generateGUID } from 'utils';

function getScale(length, strongCount = false, lineBreakCount = 0) {
  length = length - strongCount * 17 - lineBreakCount * 5;
  if (length > 400) {
    return 0.7;
  }
  if (length > 350 && length <= 400) {
    return 0.8;
  }
  if (length > 300 && length <= 350) {
    return 0.85;
  }
  if (length > 250 && length <= 300) {
    return 0.9;
  }
  if (length > 200 && length <= 250) {
    return 1;
  }
  if (length > 150 && length <= 200) {
    return 1.2;
  }
  if (length > 100 && length <= 150) {
    return 1.4;
  }
  if (length > 50 && length <= 100) {
    return 1.6;
  }
  if (length <= 50) {
    return 1.8;
  }
}

const textMotion = {
  initial: { opacity: 0, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.25 },
};

const subtextMotion = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '100%' },
};

export function Presenter({
  children,
  subtext = null,
  id = generateGUID(),
  zoom = 1,
  ...rest
}) {
  const size = getScale(
    children.length,
    (children.match(/<strong>/g) || []).length,
    (children.match(/<br\/>/g) || []).length
  );

  return (
    <PresenterStyled size={size} zoom={zoom} {...rest}>
      <AnimatePresence exitBeforeEnter>
        <motion.p
          key={id}
          className={subtext ? '' : 'mb-0'}
          dangerouslySetInnerHTML={{ __html: children }}
          {...textMotion}
        />
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        <motion.div key={id} {...subtextMotion}>
          {subtext ? <cite>{subtext}</cite> : null}
        </motion.div>
      </AnimatePresence>
    </PresenterStyled>
  );
}
