const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openPath: (protocol) => ipcRenderer.send('open-path', protocol),
  getPath: (file, protocol) => {
    return new Promise((resolve) => {
      ipcRenderer.once('get-path-response', (event, response) => {
        resolve(response);
      });
      ipcRenderer.send('get-path', file, protocol);
    });
  },
});
