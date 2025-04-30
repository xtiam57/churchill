import { useMemo } from 'react';

export function useFolder() {
  // const folder = useMemo(() => {
  //   const { app, shell } = window.require('electron').remote;
  //   const { protocol } = window.location;
  //   const path = `${
  //     protocol === 'file:' ? app.getPath('documents') : ''
  //   }\\Churchill\\Pistas`;

  //   return {
  //     open: () => shell.openPath(path),
  //     getPath: (file) => `${path}\\${file}.mp3`,
  //   };
  // }, []);

  const folder = useMemo(() => {
    const subPath = 'Churchill\\Pistas';

    return {
      open: () => window.electronAPI?.openDirectory(subPath),
      getPath: async () => {
        const basePath = await window.electronAPI?.getDirectoryPath(subPath);
        return `file://${basePath}`;
      },
    };
  }, []);

  return folder;
}
