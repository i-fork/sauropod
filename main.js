const { menubar } = require('menubar');
const { join } = require('path');
const electron = require('electron');

const isDev = process.NODE_ENV !== 'production';
const webUrl = !isDev ? `file://${__dirname}/index.html` : 'http://localhost:3000';

// Setup Menubar
const menubarConfig = {
  dir: join(__dirname, 'src'),
  browserWindow: {
    width: isDev ? 700 : 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  },
  icon: join(__dirname, 'icons', 'MenuBarIcon.png'),
  tooltip: 'Sauropod',
  index: webUrl,
  showDockIcon: process.NODE_ENV !== 'production',
}

const mb = menubar(menubarConfig);

mb.on('ready', () => {
  console.log('App is ready');
});

mb.on('after-create-window', () => {
  if (isDev) {
    mb.window.openDevTools();
  }
});

// Listen on the ipcAPI if we should open a window
electron.ipcMain.on('openFull', () => {
  const fullWindow = new electron.BrowserWindow({
    minWidth: 600,
    minHeight: 500,
    show: true,
    backgroundColor: '#2A304B',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  fullWindow.loadURL(webUrl);
});
