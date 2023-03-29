const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  togglePresenter: (presenter, setPresenter, setPresenting, castPage) =>
    ipcRenderer.send(
      'TOGGLE_PRESENTER',
      presenter,
      setPresenter,
      setPresenting,
      castPage
    ),
  openMyDocuments: () => ipcRenderer.send('OPEN_MY_DOCUMENTS'),
  getMyDocumentsPath: () => {
    return new Promise((resolve) => {
      ipcRenderer.once('GET_MY_DOCUMENTS_PATH_RESPONSE', (_, response) => {
        resolve(response);
      });
      ipcRenderer.send('GET_MY_DOCUMENTS_PATH');
    });
  },
});
