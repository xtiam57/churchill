import React, { useEffect, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsBoxArrowInLeft,
  BsBoxArrowInRight,
} from 'react-icons/bs';

import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

import { isFunction } from 'utils/isFunction';

const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

export function Controls({
  children,
  onUp,
  onDown,
  onLeft,
  onRight,
  ...props
}) {
  const handleKeyDown = useCallback(
    (event) => {
      const key = event.keyCode || event.charCode || 0;
      const inputs = document.querySelectorAll('input');
      const isFocused = [...inputs].some((el) => el === document.activeElement);

      if (isFocused) {
        return;
      }

      if (key === DOWN_ARROW && isFunction(onDown)) {
        onDown();
      }

      if (key === UP_ARROW && isFunction(onUp)) {
        onUp();
      }

      if (key === RIGHT_ARROW && isFunction(onRight)) {
        onRight();
      }

      if (key === LEFT_ARROW && isFunction(onLeft)) {
        onLeft();
      }
    },
    [onUp, onDown, onLeft, onRight]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <ButtonGroup size="lg">
        {isFunction(onDown) ? (
          <Button onClick={onDown} variant="secondary" className="">
            <BsBoxArrowInLeft />
          </Button>
        ) : null}

        {isFunction(onDown) ? (
          <Button onClick={onDown} variant="secondary" className="">
            <BsArrowBarLeft />
          </Button>
        ) : null}

        {isFunction(onLeft) ? (
          <Button onClick={onLeft} variant="secondary" className="">
            <BiLeftArrow />
          </Button>
        ) : null}

        {isFunction(onRight) ? (
          <Button onClick={onRight} variant="secondary" className="">
            <BiRightArrow />
          </Button>
        ) : null}

        {isFunction(onUp) ? (
          <Button onClick={onUp} variant="secondary" className="">
            <BsArrowBarRight />
          </Button>
        ) : null}

        {isFunction(onUp) ? (
          <Button onClick={onUp} variant="secondary" className="">
            <BsBoxArrowInRight />
          </Button>
        ) : null}
      </ButtonGroup>
    </>
  );
}
