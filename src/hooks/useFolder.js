import { useMemo } from 'react';

export function useFolder() {
  const folder = useMemo(() => {
    return {
      open: async () => {
        const paths = await window.electronAPI.getPaths();
        window.electronAPI?.openDirectory(paths.HYMNS_PATH);
      },
      getPath: async () => {
        const paths = await window.electronAPI.getPaths();
        const basePath = await window.electronAPI?.getDirectoryPath(
          paths.HYMNS_PATH
        );
        return `file://${basePath}`;
      },
    };
  }, []);

  return folder;
}
