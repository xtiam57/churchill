import React from 'react';
import { PresenterStyled } from './style';
import { motion, AnimatePresence } from 'framer-motion';

import { generateGUID } from 'utils';

function getScale(length, strongCount = false, lineBreakCount = 0) {
  const FACTOR = 1.2;
  length = length - strongCount * 17 - lineBreakCount * 5;

  if (length > 400) {
    return 0.7 * FACTOR;
  }
  if (length > 350 && length <= 400) {
    return 0.8 * FACTOR;
  }
  if (length > 300 && length <= 350) {
    return 0.85 * FACTOR;
  }
  if (length > 250 && length <= 300) {
    return 0.9 * FACTOR;
  }
  if (length > 200 && length <= 250) {
    return 1 * FACTOR;
  }
  if (length > 150 && length <= 200) {
    return 1.2 * FACTOR;
  }
  if (length > 100 && length <= 150) {
    return 1.4 * FACTOR;
  }
  if (length > 50 && length <= 100) {
    return 1.6 * FACTOR;
  }
  if (length <= 50) {
    return 1.8 * FACTOR;
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
          dangerouslySetInnerHTML={{
            __html: children
              .replaceAll('//', '<b>//</b>')
              .replace('1)', '<strong>(1)</strong><br/> ')
              .replace('2)', '<strong>(2)</strong><br/> ')
              .replace('3)', '<strong>(3)</strong><br/> ')
              .replace('4)', '<strong>(4)</strong><br/> ')
              .replace('5)', '<strong>(5)</strong><br/> ')
              .replace('6)', '<strong>(6)</strong><br/> ')
              .replace('7)', '<strong>(7)</strong><br/> ')
              .replace('8)', '<strong>(8)</strong><br/> ')
              .replace('9)', '<strong>(9)</strong><br/> ')
              .replace('10)', '<strong>(10)</strong><br/> '),
          }}
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
