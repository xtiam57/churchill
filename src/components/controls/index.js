import React, { useEffect, useCallback } from 'react';

import { isFunction } from 'utils/isFunction';
import {
  DOWN_ARROW_KEY,
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
  UP_ARROW_KEY,
  SPACE_BAR_KEY,
  ESCAPE_KEY,
} from 'values';

export function Controls({
  children,
  onKeyUp,
  onKeyDown,
  onKeyLeft,
  onKeyRight,
  onKeySpace,
  onKeyEscape,
  ...rest
}) {
  const handleKeyDown = useCallback(
    (event) => {
      const key = event.keyCode || event.charCode || 0;
      const inputs = document.querySelectorAll('input');
      const isFocused = [...inputs].some((el) => el === document.activeElement);

      if (isFocused) {
        return;
      }

      if (key === ESCAPE_KEY && isFunction(onKeyEscape)) {
        onKeyEscape();
      }

      if (key === SPACE_BAR_KEY && isFunction(onKeySpace)) {
        onKeySpace();
      }

      if (key === DOWN_ARROW_KEY && isFunction(onKeyDown)) {
        onKeyDown();
      }

      if (key === UP_ARROW_KEY && isFunction(onKeyUp)) {
        onKeyUp();
      }

      if (key === RIGHT_ARROW_KEY && isFunction(onKeyRight)) {
        onKeyRight();
      }

      if (key === LEFT_ARROW_KEY && isFunction(onKeyLeft)) {
        onKeyLeft();
      }
    },
    [onKeyUp, onKeyDown, onKeyLeft, onKeyRight, onKeySpace, onKeyEscape]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <nav className="navbar navbar-dark bg-secondary" {...rest}>
        <div className="container-fluid justify-content-space">{children}</div>
      </nav>
    </>
  );
}
