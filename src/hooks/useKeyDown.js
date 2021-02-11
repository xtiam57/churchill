import { useCallback, useEffect } from 'react';

export function useKeyDown(keyCode, action = () => {}, disableInInputs = true) {
  const handleEvent = useCallback(
    ({ code }) => {
      if (disableInInputs) {
        const inputs = document.querySelectorAll('input');
        const isFocus = [...inputs].some((el) => el === document.activeElement);

        if (isFocus) {
          return;
        }
      }

      if (code.toLowerCase() === keyCode.toLowerCase()) {
        action();
      }
    },
    [disableInInputs, keyCode, action]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleEvent);
    return () => {
      document.body.removeEventListener('keydown', handleEvent);
    };
  }, [handleEvent]);

  return {};
}
