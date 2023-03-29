const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// API methods
function handleTogglePresenter(
  event,
  presenter,
  setPresenter,
  setPresenting,
  castPage
) {
  const { BrowserWindow, screen, app } = electron;
  const [parent] = BrowserWindow.getAllWindows();
  let url = parent.webContents.getURL();

  if (presenter) {
    presenter.isVisible() ? presenter.hide() : presenter.show();
    setPresenting(presenter.isVisible());
    return;
  }

  app.whenReady().then(() => {
    const displays = screen.getAllDisplays();
    const extDisplay = displays.find(
      ({ bounds }) => bounds.x !== 0 || bounds.y !== 0
    );

    if (extDisplay) {
      let win = new BrowserWindow({
        x: extDisplay.bounds.x + 50,
        y: extDisplay.bounds.y + 50,
        frame: false,
        fullscreen: true,
        show: false,
        parent,
      });

      // Open the DevTools.
      // win.webContents.openDevTools();

      win.loadURL(url.replace(/#.*$/, `#${castPage}`));

      win.once('ready-to-show', () => {
        win.show();
        setPresenting(true);
      });

      setPresenter(win);
    }
  });
}

function handleGetMyDocumentsPath(event) {
  const { app } = electron;
  const path = `${app.getPath('documents')}\\Churchill\\Himnos`;
  event.sender.send('GET_MY_DOCUMENTS_PATH_RESPONSE', path);
}

function handleOpenMyDocuments(_) {
  const { app, shell } = electron;
  const path = `${app.getPath('documents')}\\Churchill\\Himnos`;
  shell.openPath(path);
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Hide menu
  mainWindow.removeMenu();

  // Show window when everything is loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Creando carpeta para los himnos
  fs.mkdirSync(`${app.getPath('documents')}\\Churchill\\Himnos`, {
    recursive: true,
  });

  // API
  electron.ipcMain.on('TOGGLE_PRESENTER', handleTogglePresenter);
  electron.ipcMain.on('OPEN_MY_DOCUMENTS', handleOpenMyDocuments);
  electron.ipcMain.on('GET_MY_DOCUMENTS_PATH', handleGetMyDocumentsPath);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
