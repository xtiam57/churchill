const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getBackgroundImages: (relativePath) =>
    ipcRenderer.invoke('get-background-images', relativePath),
  getDirectoryPath: (subPath) =>
    ipcRenderer.invoke('get-directory-path', subPath),
  openDirectory: (subPath) => ipcRenderer.invoke('open-directory', subPath),
  togglePresenter: () => ipcRenderer.invoke('toggle-presenter'),
  closePresenter: () => ipcRenderer.invoke('close-presenter'),
  reload: () => ipcRenderer.invoke('reload'),
  openDevTools: () => ipcRenderer.invoke('open-devtools'),
  getDisplays: () => ipcRenderer.invoke('get-displays'),
});
