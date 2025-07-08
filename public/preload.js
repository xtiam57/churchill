const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getBackgroundImages: () => ipcRenderer.invoke('get-background-images'),
  getBackgroundMusic: () => ipcRenderer.invoke('get-background-music'),
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
  getResources: () => ipcRenderer.invoke('get-resources'),
  saveResource: (fileName, dataBase64) =>
    ipcRenderer.invoke('save-resource', fileName, dataBase64),
  deleteResource: (fileName) => ipcRenderer.invoke('delete-resource', fileName),
  getPaths: () => ipcRenderer.invoke('get-paths'),
  getVideos: () => ipcRenderer.invoke('get-videos'),
  deleteVideo: (fileName) => ipcRenderer.invoke('delete-video', fileName),
  setVideoControl: ({ action, time }) =>
    ipcRenderer.send('set-video-control', { action, time }),
  onVideoControl: (callback) => ipcRenderer.on('video-control-cast', callback),
  removeVideoControl: (callback) =>
    ipcRenderer.removeListener('video-control-cast', callback),
});
