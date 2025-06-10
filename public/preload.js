const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getBackgroundImages: (relativePath) =>
    ipcRenderer.invoke('get-background-images', relativePath),
  getDirectoryPath: (subPath) =>
    ipcRenderer.invoke('get-directory-path', subPath),
  openDirectory: (subPath) => ipcRenderer.invoke('open-directory', subPath),
  togglePresenter: (monitorId) =>
    ipcRenderer.invoke('toggle-presenter', monitorId),
  closePresenter: () => ipcRenderer.invoke('close-presenter'),
  reload: () => ipcRenderer.invoke('reload'),
  openDevTools: () => ipcRenderer.invoke('open-devtools'),
  getDisplays: () => ipcRenderer.invoke('get-displays'),
  getScreenSources: () => ipcRenderer.invoke('get-screen-sources'),
  openLink: (url) => ipcRenderer.send('open-link', url),
  getResources: (relativePath) =>
    ipcRenderer.invoke('get-resources', relativePath),
  saveResource: (relativePath, fileName, buffer) =>
    ipcRenderer.invoke('save-resource', relativePath, fileName, buffer),
  deleteResource: (relativePath, fileName) =>
    ipcRenderer.invoke('delete-resource', relativePath, fileName),
});
