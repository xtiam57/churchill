import { useCallback } from 'react';

export function useFolder() {
  const { protocol } = window.location;

  const openPath = useCallback(
    () => window.electronAPI.openPath(protocol),
    [protocol]
  );

  const getPath = useCallback(
    (file) =>
      window.electronAPI.getPath(file, protocol).then((response) => response),
    [protocol]
  );

  return {
    openPath,
    getPath,
  };
}
