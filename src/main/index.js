'use strict';

import { app, BrowserWindow, ipcMain, globalShortcut, screen } from 'electron';
import updater from 'electron-simple-updater';
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`;
function createWindow () {
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
    show: false,
    webPreferences: {webSecurity: false}
  });

  // 开发环境默认开启调试窗口
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(winURL);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 防止重复打开
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});
if (shouldQuit) {
  app.quit();
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
const $windows = [];
// 注册全局快捷键
app.on('ready', () => {
  globalShortcut.register('ctrl+alt+a', function () {
    mainWindow.webContents.send('shortcut-capture');
  });
});
// 抓取截图之后显示窗口
ipcMain.on('shortcut-capture', () => {
  closeWindow();
  screenShotFun();
});
// 创建透明窗口
function screenShotFun (source) {
  let $win;
  var size = screen.getPrimaryDisplay().workAreaSize;
  $win = new BrowserWindow({ width: size.width, height: size.height });
  // const { display } = source;
  // const $win = new BrowserWindow({
  //   center: true,
  //   height: 800,
  //   useContentSize: true,
  //   resizable: true,
  //   width: 1300,
  //   autoHideMenuBar: true,
  //   frame: false,
  //   minWidth: 1300,
  //   minHeight: 800,
  //   show: false,
  //   webPreferences: {webSecurity: false}
  // });
  console.log(`file://${__dirname}/window/shortcut-capture.html`);
  $win.loadURL(`file://${__dirname}/window/shortcut-capture.html`);
  // $win.show();
  // $win.on('closed', () => {
  //   mainWindow = null;
  // });
};
function closeWindow () {
  while ($windows.length) {
    const $winItem = $windows.pop();
    $winItem.close();
  }
}
