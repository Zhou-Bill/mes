const { app, BrowserWindow, ipcMain, Menu, session } = require('electron')
const {
  mainLoadURL,
  printLoadURL,
  isOpenDevTools,
  showPrint,
  isOpenPrintDevTools,
} = require('./dev_config')
const log = require('electron-log');
const path = require('path');
const fs = require('fs');

const handleUpdate = require('./src/main/app_update')
const { appEvent } = require('./src/event')

app.commandLine.appendSwitch('disable-web-security')
app.commandLine.appendSwitch('ignore-certificate-errors')
app.commandLine.appendSwitch('allow-insecure-localhost', 'true')

// 自定义桌面上的日志文件夹
log.transports.file.resolvePathFn = () => {
  const logDir = path.join(app.getPath('desktop'), 'electron-logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
  return path.join(logDir, `main-${new Date().toISOString().replace(/:/g, '-')}.log`);
};

let mainWindow = null
let printerWindow = null
function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  mainWindow.webContents.session.setCertificateVerifyProc((request, callback) => {
      // 对于所有请求都允许通过，但保持会话状态
      callback(0);
  });
  mainWindow.focus()

  const myMenuTemplate = [
    {
      // 设置菜单项文本
      label: '操作',
      // 设置子菜单
      submenu: [
        {
          label: '刷新',
          accelerator: "CmdOrCtrl+R", 
          click: () => {
            mainWindow.reload();
          }
        },
        {
          label: '打开控制台',
          accelerator: "CmdOrCtrl+E", 
          click: () => {
            mainWindow.webContents.openDevTools()
          }
        }
      ]
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(myMenuTemplate))
  console.log(mainLoadURL)
  log.info('mainLoadURL', mainLoadURL);
  mainWindow.loadURL(mainLoadURL).catch((err) => {
    log.error('loadURL error', err);
  })
  if (isOpenDevTools) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
    app.quit()
  })
}

function createPrinterWindow(url) {
  if (printerWindow) {
    return
  }
  printerWindow = new BrowserWindow({
    // 尺寸根据 7cm 5cm 在 chrome 中得到具体 size
    width: 264,
    height: 188,
    frame: false,
    show: showPrint,
    webPreferences: {
       nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    },
  })

  printerWindow.webContents.session.setCertificateVerifyProc((request, callback) => {
    callback(0);
  });


  printerWindow.loadURL(url || printLoadURL)

  if (isOpenPrintDevTools) {
    printerWindow.webContents.openDevTools()
  }

  printerWindow.on('closed', () => {
    printerWindow = null
  })
}

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true); // 允许继续加载
});

app.whenReady().then(async () => {
  await session.defaultSession.clearCache()
  app.allowRendererProcessReuse = false

  createWindow()
  // createPrinterWindow()
  handleUpdate(sendUpdateMessage)
})

function sendUpdateMessage(msgObj) {
  mainWindow.webContents.send(appEvent.UPDATE_MESSAGE, msgObj)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
    createPrinterWindow()
  }
})

// app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  
//     // Prevent having error
//     event.preventDefault()
//     // and continue
//     callback(true)

// })

// 接受渲染进程对 print 事件
ipcMain.handle('print', (event, payload) => {
  // 像打印窗口发送 print 事件
  printerWindow.webContents.send('print', payload)
  // return payload
})

ipcMain.handle('openPrintWindow', (event, payload) => {
  createPrinterWindow(payload)
})
