'use strict';

import { app, BrowserWindow, ipcMain } from 'electron';
import updater from 'electron-simple-updater';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;
console.log(winURL, 11231);
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    center: true,
    height: 800,
    useContentSize: true,
    resizable: true,
    width: 1300,
    autoHideMenuBar: true,
    frame: false,
    minWidth: 1300,
    minHeight: 800,
    webPreferences: {webSecurity: false}
  });

  // 开发环境默认开启调试窗口
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

updater.init({
  checkUpdateOnStart: false,
  autoDownload: false
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// 退出
ipcMain.on('window-all-closed', () => {
  app.quit();
});

// 最小化
ipcMain.on('hide-window', () => {
  mainWindow.minimize();
});

// 最大化
ipcMain.on('show-window', () => {
  mainWindow.maximize();
});

// 还原
ipcMain.on('orignal-window', () => {
  mainWindow.unmaximize();
});
