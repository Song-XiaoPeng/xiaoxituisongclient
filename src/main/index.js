'use strict';

import { app, BrowserWindow, ipcMain, globalShortcut, screen, session } from 'electron';
import updater from 'electron-simple-updater';
import url from 'url';
const { download } = require('electron-dl');
const path = require('path');

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
    width: 1400,
    autoHideMenuBar: true,
    frame: false,
    minWidth: 1400,
    minHeight: 800,
    show: false,
    webPreferences: {webSecurity: false}
  });

  // 注册全局快捷键 打开调试
  globalShortcut.register('ctrl+alt+d+b', function () {
    mainWindow.webContents.openDevTools();
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

  mainWindow.on('minimize', (e) => {
    mainWindow.webContents.send('mini');
  });

  mainWindow.on('restore', (e) => {
    mainWindow.webContents.send('restore');
  });

  mainWindow.on('maximize', (e) => {
    mainWindow.webContents.send('max');
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

// 下载文件
ipcMain.on('download-btn', (e, args) => {
  download(
    BrowserWindow.getFocusedWindow(),
    args.url,
    {
      saveAs: true,
      onProgress: (number) => {
        console.log(number);
      }
    }
  ).then(dl => console.log(dl.getSavePath())).catch(console.error);
});

// 设置cookie
ipcMain.on('setCookie', (e, str) => {
  session.defaultSession.cookies.set({ url: winURL, name: 'dialogueArr', value: str }, (e, c) => {
  });
});

// 获取cookie
ipcMain.on('getCookie', () => {
  session.defaultSession.cookies.get({url: winURL, name: 'dialogueArr'}, (e, c) => {
    mainWindow.webContents.send('getLossDialogueFun', c);
  });
});

// 退出
ipcMain.on('window-all-closed', () => {
  // window.localStorage.
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
  let display = screen.getPrimaryDisplay();
  console.log(display, 13212);
  $win = new BrowserWindow({
    width: display.workAreaSize.width,
    height: display.workAreaSize.height,
    x: display.bounds.x,
    y: display.bounds.y
    // frame: false,
    // show: false
    // transparent: true,
    // resizable: false,
    // alwaysOnTop: true,
    // fullscreen: true,
    // skipTaskbar: true,
    // closable: true,
    // minimizable: false,
    // maximizable: false
  });
  $win.on('close', function () { $win = null; });
  $win.loadURL(url.format({
    pathname: path.join(__dirname, './window/shortcut-capture.html'),
    protocol: 'file:',
    slashes: true
  }));
  // $win.loadURL(`file://${__dirname}/window/shortcut-capture.html`);
  $win.show();
  // $win.on('closed', () => {
  //   mainWindow = null;
  // });
  // 只能通过cancel-shortcut-capture的方式关闭窗口
  $win.on('close', e => {
    e.preventDefault();
  });
  $win.webContents.on('dom-ready', () => {
    $win.webContents.executeJavaScript(`window.source = ${JSON.stringify(display)}`);
    $win.webContents.send('dom-ready');
    $win.focus();
  });
};

function closeWindow () {
  while ($windows.length) {
    const $winItem = $windows.pop();
    $winItem.close();
  }
}
