import { useMemo } from 'react';

export function useFolder() {
  const folder = useMemo(() => {
    const { app, shell } = window.require('electron').remote;
    const { protocol } = window.location;
    const path = `${
      protocol === 'file:' ? app.getPath('documents') : ''
    }\\Churchill\\Pistas`;

    return {
      open: () => shell.openPath(path),
      getPath: (file) => `${path}\\${file}.mp3`,
    };
  }, []);

  return folder;
}
