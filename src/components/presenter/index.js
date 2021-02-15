import React from 'react';
import { PresenterStyled } from './style';
import { useTransition, animated } from 'react-spring';

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

export function Presenter({ children, subtext = null, ...rest }) {
  const textTransitions = useTransition(children, (el) => el, {
    from: { opacity: 0, transform: 'translate3d(0, -100%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: { opacity: 0, display: 'none' },
  });

  const subtextTransitions = useTransition(children, (el) => el, {
    from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: { opacity: 0, display: 'none' },
  });

  const size = getScale(
    children.length,
    (children.match(/<strong>/g) || []).length,
    (children.match(/<br\/>/g) || []).length
  );

  return (
    <PresenterStyled size={size} {...rest}>
      {textTransitions.map(({ key, props }) => (
        <animated.p
          key={key}
          style={props}
          className={subtext ? '' : 'mb-0'}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      ))}
      {subtextTransitions.map(({ key, props }) => (
        <>
          {subtext ? (
            <animated.cite key={key} style={props}>
              {subtext}
            </animated.cite>
          ) : null}
        </>
      ))}
    </PresenterStyled>
  );
}
