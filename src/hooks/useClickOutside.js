import { useCallback, useEffect } from 'react';

export function useClickOutside(ref, action = () => {}) {
  const handleEvent = useCallback(
    ({ target }) => {
      if (ref.current && !ref.current.contains(target)) {
        action();
      }
    },
    [action, ref]
  );

  useEffect(() => {
    document.body.addEventListener('mousedown', handleEvent);
    return () => {
      document.body.removeEventListener('mousedown', handleEvent);
    };
  }, [handleEvent]);

  return {};
}
