const electron = require('electron');
// Module to control application life.
const { app, ipcMain, BrowserWindow, shell, screen, desktopCapturer } =
  electron;

const path = require('path');
const url = require('url');
const fs = require('fs');
const resourcesBase64 = require('./resources-sample');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let presenterWindow = null;

const MAX_IMAGE_SIZE = 1.5 * 1024 * 1024; // 1.5 MB en bytes
const HYMNS_PATH = 'Churchill/Pistas';
const BACKGROUND_IMAGES_PATH = 'Churchill/Imágenes de fondo';
const BACKGROUND_MUSIC_PATH = 'Churchill/Fondos musicales';
const RESOURCES_PATH = 'Churchill/Recursos';
const VIDEOS_PATH = 'Churchill/Videos';

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    icon: path.join(__dirname, 'icon.png'), // Usar icono desde public
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: true,
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
  // mainWindow.webContents.openDevTools();

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
  fs.mkdirSync(path.join(app.getPath('documents'), HYMNS_PATH), {
    recursive: true,
  });
  // Creando carpeta para los fondos de pantalla
  fs.mkdirSync(path.join(app.getPath('documents'), BACKGROUND_IMAGES_PATH), {
    recursive: true,
  });
  // Creando carpeta para los fondos de música
  fs.mkdirSync(path.join(app.getPath('documents'), BACKGROUND_MUSIC_PATH), {
    recursive: true,
  });
  // Creando carpeta para los videos
  fs.mkdirSync(path.join(app.getPath('documents'), VIDEOS_PATH), {
    recursive: true,
  });
  // Creando carpeta para los recursos
  const resourcesPath = path.join(app.getPath('documents'), RESOURCES_PATH);
  fs.mkdirSync(resourcesPath, { recursive: true });

  // Guardar imágenes base64 la primera vez
  const initFlag = path.join(resourcesPath, '.churchill-resources-init');
  if (!fs.existsSync(initFlag)) {
    const images = [
      {
        base64: resourcesBase64.TEST_MAPA,
        name: 'Viaje misionero de Pablo - Muestra',
      },
      {
        base64: resourcesBase64.TEST_TABERNACULO,
        name: 'Tabernaculo - Muestra',
      },
    ];

    images.forEach(({ base64, name }) => {
      const match = base64.match(/^data:image\/(\w+);base64,(.+)$/);
      if (match) {
        const extension = match[1];
        const data = match[2];
        const filePath = path.join(resourcesPath, `${name}.${extension}`);
        fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      }
    });

    fs.writeFileSync(initFlag, 'sample_created=true');
    // Hacer el archivo oculto en Windows
    if (process.platform === 'win32') {
      const { exec } = require('child_process');
      exec(`attrib +h "${initFlag}"`);
    }
  }
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
ipcMain.handle('get-background-music', async (_) => {
  try {
    const documentsPath = app.getPath('documents'); // Ruta base "Mis Documentos"
    const folderPath = path.join(documentsPath, BACKGROUND_MUSIC_PATH); // Ruta completa

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      return []; // Retorna vacío ya que la carpeta estaba vacía
    }

    const files = fs.readdirSync(folderPath);
    const audioFiles = files.filter((file) => /\.mp3$/i.test(file));

    return audioFiles.map((file) => {
      const filePath = path.join(folderPath, file);
      const extension = path.extname(file).replace('.', '');
      const name = path.basename(file, `.${extension}`);
      const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;
      return { name, extension, path: fileUrl };
    });
  } catch (error) {
    console.error('Error leyendo directorio:', error);
    return [];
  }
});

ipcMain.handle('get-videos', async (_) => {
  try {
    const documentsPath = app.getPath('documents'); // Ruta base "Mis Documentos"
    const folderPath = path.join(documentsPath, VIDEOS_PATH); // Ruta completa

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      return []; // Retorna vacío ya que la carpeta estaba vacía
    }

    const files = fs.readdirSync(folderPath);
    const videoFiles = files.filter((file) =>
      /\.(mp4|mov|avi|mkv|webm)$/i.test(file)
    );

    const videos = videoFiles.map((file) => {
      const filePath = path.join(folderPath, file);
      const extension = path.extname(file).replace('.', '');
      const title = path.basename(file, `.${extension}`);
      const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;
      let id = title;
      let birthtimeMs = 0;
      let createdAt = '';

      try {
        const stats = fs.statSync(filePath);
        birthtimeMs = stats.birthtimeMs;
        id = `${title}-${Math.floor(birthtimeMs)}`;
        // Formatear fecha de creación a dd/MMM/yyyy HH:mm
        const date = new Date(birthtimeMs);
        const months = [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        createdAt = `${day}/${month}/${year} ${hours}:${minutes}`;
      } catch (e) {
        console.error(`Error leyendo el video: ${filePath}`, e);
      }

      return {
        id,
        title,
        createdAt,
        extension,
        path: fileUrl,
        birthtimeMs,
        isVideo: true,
      };
    });

    // Ordenar por fecha de creación
    videos.sort((a, b) => a.birthtimeMs - b.birthtimeMs);

    return videos;
  } catch (error) {
    console.error('Error leyendo el directorio de videos:', error);
    return [];
  }
});

ipcMain.handle('delete-video', (_, fileName) => {
  try {
    const documentsPath = app.getPath('documents');
    const folderPath = path.join(documentsPath, VIDEOS_PATH);
    const filePath = path.join(folderPath, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true, message: 'Video eliminado correctamente.' };
    } else {
      return { success: false, message: 'El archivo no existe.' };
    }
  } catch (error) {
    console.error('Error eliminando video:', error);
    return { success: false, message: 'Error eliminando video.' };
  }
});

ipcMain.on('set-video-control', (_, { action, time }) => {
  if (presenterWindow) {
    presenterWindow.webContents.send('video-control-cast', { action, time });
  }
});

ipcMain.handle('get-background-images', async (_) => {
  try {
    const documentsPath = app.getPath('documents'); // Ruta base "Mis Documentos"
    const folderPath = path.join(documentsPath, BACKGROUND_IMAGES_PATH); // Ruta completa

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      return []; // Retorna vacío ya que la carpeta estaba vacía
    }

    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter((file) => {
      const filePath = path.join(folderPath, file);
      const isImage = /\.(jpg|jpeg|png)$/i.test(file);
      if (!isImage) return false;
      try {
        const stats = fs.statSync(filePath);
        return stats.size < MAX_IMAGE_SIZE;
      } catch {
        return false;
      }
    });

    const images = imageFiles.map((file) => {
      const filePath = path.join(folderPath, file);
      const extension = path.extname(file).replace('.', '');
      const name = path.basename(file, `.${extension}`);
      const base64 = `data:image/${extension};base64,${fs.readFileSync(
        filePath,
        { encoding: 'base64' }
      )}`;

      return { name, extension, base64 };
    });

    return images;
  } catch (error) {
    console.error('Error leyendo directorio:', error);
    return [];
  }
});

// Obtener la ruta de la carpeta en "Mis Documentos"
ipcMain.handle('get-directory-path', (_, subPath) => {
  return path.join(app.getPath('documents'), subPath);
});

// Abrir la carpeta en el explorador
ipcMain.handle('open-directory', async (_, subPath) => {
  const folderPath = path.join(app.getPath('documents'), subPath);

  // Crear la carpeta si no existe
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return shell.openPath(folderPath);
});

ipcMain.handle('toggle-presenter', (event, selectedMonitorId) => {
  const [parent] = BrowserWindow.getAllWindows();
  let url = parent.webContents.getURL();

  if (presenterWindow) {
    if (presenterWindow.isVisible()) {
      presenterWindow.hide();
    } else {
      presenterWindow.show();
    }
    return presenterWindow.isVisible();
  }

  const displays = screen.getAllDisplays();
  const extDisplay = displays[selectedMonitorId];

  if (!extDisplay) {
    console.error('Monitor seleccionado no válido.');
    return false;
  }

  if (extDisplay) {
    presenterWindow = new BrowserWindow({
      x: extDisplay.bounds.x + 50,
      y: extDisplay.bounds.y + 50,
      frame: false,
      fullscreen: true,
      show: false,
      parent,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });

    presenterWindow.loadURL(url.replace(/#.*$/, '#/cast-screen'));

    presenterWindow.once('ready-to-show', () => {
      presenterWindow.show();
    });

    // presenterWindow.webContents.openDevTools();

    return true;
  }

  return false;
});

ipcMain.handle('close-presenter', () => {
  if (presenterWindow) {
    presenterWindow.close();
    presenterWindow = null;
    return false;
  }
  return true;
});

ipcMain.handle('reload', () => {
  const main = BrowserWindow.getFocusedWindow();
  if (main) {
    main.reload();
  }
});

ipcMain.handle('open-devtools', () => {
  const main = BrowserWindow.getFocusedWindow();
  if (main) {
    main.webContents.openDevTools();
  }
});

ipcMain.handle('get-displays', () => {
  return screen.getAllDisplays().map((display, index) => ({
    id: index,
    label: display.label,
    bounds: display.bounds,
  }));
});

ipcMain.handle('get-screen-sources', async () => {
  const sources = await desktopCapturer.getSources({ types: ['screen'] });

  return sources.map((source, index) => ({
    id: index,
    name: source.name,
    thumbnail: source.thumbnail.toDataURL(), // Convertimos la imagen en base64
  }));
});

ipcMain.on('open-link', (event, url) => {
  shell.openExternal(url); // Abre el enlace en el navegador predeterminado
});

ipcMain.handle('get-resources', async (_) => {
  try {
    const documentsPath = app.getPath('documents'); // Ruta base "Mis Documentos"
    const folderPath = path.join(documentsPath, RESOURCES_PATH); // Ruta completa

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      return []; // Retorna vacío ya que la carpeta estaba vacía
    }

    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter((file) => {
      const filePath = path.join(folderPath, file);
      const isImage = /\.(jpg|jpeg|png)$/i.test(file);
      if (!isImage) return false;
      try {
        const stats = fs.statSync(filePath);
        return stats.size < MAX_IMAGE_SIZE;
      } catch {
        return false;
      }
    });

    const images = imageFiles.map((file, idx) => {
      const filePath = path.join(folderPath, file);
      const extension = path.extname(file).replace('.', '');
      const title = path.basename(file, `.${extension}`);
      let id = title;
      let bg = '';
      let birthtimeMs = 0;
      let createdAt = '';
      try {
        const base64 = fs.readFileSync(filePath, { encoding: 'base64' });
        bg = `data:image/${extension};base64,${base64}`;
        // Crear id único usando title y fecha de creación
        const stats = fs.statSync(filePath);
        birthtimeMs = stats.birthtimeMs;
        id = `${title}-${Math.floor(birthtimeMs)}`;
        // Formatear fecha de creación a dd/MMM/yyyy HH:mm
        const date = new Date(birthtimeMs);
        const months = [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        createdAt = `${day}/${month}/${year} ${hours}:${minutes}`;
      } catch (e) {
        console.error(`Error leyendo la imagen: ${filePath}`, e);
      }

      return {
        id,
        title,
        createdAt,
        extension,
        bg,
        birthtimeMs,
        isImage: true,
      };
    });

    // Ordenar por birthtimeMs de más vieja a más actual
    images.sort((a, b) => a.birthtimeMs - b.birthtimeMs);

    return images;
  } catch (error) {
    console.error('Error leyendo el directorio:', error);
    return [];
  }
});

ipcMain.handle('delete-resource', (_, fileName) => {
  try {
    const documentsPath = app.getPath('documents');
    const folderPath = path.join(documentsPath, RESOURCES_PATH);
    const filePath = path.join(folderPath, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true, message: 'Imagen eliminada correctamente.' };
    } else {
      return { success: false, message: 'El archivo no existe.' };
    }
  } catch (error) {
    console.error('Error eliminando imagen:', error);
    return { success: false, message: 'Error eliminando imagen.' };
  }
});

ipcMain.handle('save-resource', (_, fileName, dataBase64) => {
  try {
    const documentsPath = app.getPath('documents');
    const folderPath = path.join(documentsPath, RESOURCES_PATH);
    const filePath = path.join(folderPath, fileName);

    // Crear la carpeta si no existe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Verifica si el dataBase64 es válido
    if (!dataBase64 || dataBase64.length === 0) {
      throw new Error('El archivo está vacío o no se pudo cargar.');
    }

    const match = dataBase64.match(/^data:image\/(\w+);base64,(.+)$/);
    if (match) {
      const data = match[2];
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
    }

    return 'Imagen guardada correctamente en: ' + filePath;
  } catch (err) {
    // Muestra alerta al usuario si falla
    console.error('Error al guardar la imagen', err.message);
  }
});

// Exponer las rutas de las carpetas
ipcMain.handle('get-paths', () => {
  return {
    HYMNS_PATH,
    BACKGROUND_IMAGES_PATH,
    BACKGROUND_MUSIC_PATH,
    VIDEOS_PATH,
    RESOURCES_PATH,
  };
});
