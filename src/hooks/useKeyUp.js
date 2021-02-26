import { useCallback, useEffect } from 'react';

export function useKeyUp(
  keyCode,
  action = () => {},
  { ctrl = false, disableInInputs = true } = {}
) {
  const handleEvent = useCallback(
    ({ code, ctrlKey }) => {
      if (disableInInputs) {
        const inputs = document.querySelectorAll('input,select');
        const isFocus = [...inputs].some((el) => el === document.activeElement);

        if (isFocus) {
          return;
        }
      }

      if (code.toLowerCase() === keyCode.toLowerCase() && ctrl === ctrlKey) {
        action();
      }
    },
    [disableInInputs, keyCode, ctrl, action]
  );

  useEffect(() => {
    document.body.addEventListener('keyup', handleEvent);
    return () => {
      document.body.removeEventListener('keyup', handleEvent);
    };
  }, [handleEvent]);

  return {};
}
