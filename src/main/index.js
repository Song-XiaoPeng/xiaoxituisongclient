'use strict';

import { app, BrowserWindow, ipcMain } from 'electron';
import updater from 'electron-simple-updater';

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;
// ************************************  截图相关  **************************************************//
// 保证函数只执行一次
// let isRuned = false;
// const $windows = [];
// let isClose = false;
// // 暴露全局接口
// module.exports = mainWindow => {
//   if (isRuned) {
//     return;
//   }
//   isRuned = true;
//
//   // 注册全局快捷键
//   globalShortcut.register('ctrl+alt+a', function () {
//     mainWindow.webContents.send('shortcut-capture');
//   });

//   // 抓取截图之后显示窗口
//   ipcMain.on('shortcut-capture', (e, sources) => {
//     closeWindow();
//     sources.forEach(source => {
//       screenshotWindow(source);
//     });
//   });
//   // 有一个窗口关闭就关闭所有的窗口
//   ipcMain.on('cancel-shortcut-capture', closeWindow);
//   ipcMain.on('set-shortcut-capture', (e, dataURL) => {
//     console.log(dataURL);
//     clipboard.writeImage(nativeImage.createFromDataURL(dataURL));
//     closeWindow();
//   });
// };
// 截图窗口
// function screenshotWindow () {
//   const { display } = source;
//   const $win = new BrowserWindow({
//     title: '截图',
//     width: display.size.width,
//     height: display.size.height,
//     x: display.bounds.x,
//     y: display.bounds.y,
//     frame: false,
//     show: false,
//     transparent: true,
//     resizable: false,
//     alwaysOnTop: true,
//     fullscreen: true,
//     skipTaskbar: true,
//     closable: true,
//     minimizable: false,
//     maximizable: false
//   });
//   setFullScreen($win, display);
//   // 只能通过cancel-shortcut-capture的方式关闭窗口
//   $win.on('close', e => {
//     if (!isClose) {
//       e.preventDefault();
//     }
//   });
  // 页面初始化完成之后再显示窗口
  // 并检测是否有版本更新
//   $win.once('ready-to-show', () => {
//     $win.show();
//     $win.focus();
//     // 重新调整窗口位置和大小
//     setFullScreen($win, display);
//   });
//
//   $win.webContents.on('dom-ready', () => {
//     $win.webContents.executeJavaScript(`window.source = ${JSON.stringify(source)}`);
//     $win.webContents.send('dom-ready');
//     $win.focus();
//   });
//   $win.loadURL(`file://${__dirname}/window/shortcut-capture.html`);
//   $windows.push($win);
// }
// 设置全屏
// function setFullScreen ($win, display) {
//   $win.setBounds({
//     width: display.size.width,
//     height: display.size.height,
//     x: display.bounds.x,
//     y: display.bounds.y
//   });
//   $win.setAlwaysOnTop(true);
//   $win.setFullScreen(true);
// }
// ************************************  end截图相关  **************************************************//
function createWindow () {
  mainWindow = new BrowserWindow({
    center: true,
    height: 800,
    useContentSize: true,
    resizable: true,
    width: 1380,
    autoHideMenuBar: true,
    frame: false,
    minWidth: 1380,
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
