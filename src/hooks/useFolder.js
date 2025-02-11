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
    const subPath = 'Churchill/Pistas';

    return {
      open: () => window.electronAPI.openFolder(subPath),
      getPath: async (file) => {
        const basePath = await window.electronAPI.getFolderPath(subPath);
        return `${basePath}/${file}.mp3`;
      },
    };
  }, []);

  return folder;
}
