const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getImages: (relativePath) => ipcRenderer.invoke('get-images', relativePath),
  getFolderPath: (subPath) => ipcRenderer.invoke('get-folder-path', subPath),
  openFolder: (subPath) => ipcRenderer.invoke('open-folder', subPath),
});
