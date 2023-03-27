const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // setTitle: (title) => ipcRenderer.send('set-title', title),
  openPath: (protocol) => ipcRenderer.send('open-path', protocol),
  getPath: (file) => ipcRenderer.send('get-path', file),
});
