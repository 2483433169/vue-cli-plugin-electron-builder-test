'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  Menu
} from 'electron'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {
  VUEJS_DEVTOOLS
} from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

let win = null;


async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    height: 620,
    useContentSize: true,
    width: 400,
    frame: false,
    show: false,
    backgroundColor: '#23232D',
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  win.setMenu(null)

  win.on('closed', () => {
    win = null
  })

  let isMaximize = win.isMaximized()
  win.webContents.send('isMaximize', isMaximize)

  win.on('maximize', () => {
    console.log('maximize')
    win.webContents.send('isMaximize', true)
  })

  win.on('unmaximize', () => {
    console.log('unmaximize')
    win.webContents.send('isMaximize', false)
  })

  win.webContents.on('did-finish-load', () => {
    const locale = app.getLocale()
    console.log(locale, 'locale')
    win.webContents.send('setSysLanguage', locale)
  })



  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  globalShortcut.register('Alt+I', () => {
    const isOpenDevTools = win.webContents.isDevToolsOpened()
    if (isOpenDevTools) {
      win.webContents.closeDevTools()
    } else {
      win.webContents.openDevTools()
    }
    console.log('Electron loves global shortcuts!')
  })
  createWindow()
})

const shouldQuit = app.requestSingleInstanceLock()

if (!shouldQuit) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMaximized()) win.restore()
      win.focus()
    }
  })
}

ipcMain.on('hasLogin', (event, arg) => {
  console.log(arg, 'arg')
  win.setResizable(true)
  //(1200, 675)
  win.setSize(1920, 675)
  win.setMinimumSize(1920, 675)
  win.setContentSize(1920, 675)

  win.center()
  win.show()

  // mainWindow.setSimpleFullScreen(true)
})

ipcMain.on('backLogin', (event, arg) => {
  win.hide()
  console.log(arg, 'arg')
  win.setResizable(false)
  win.setMinimumSize(400, 620)
  win.setSize(400, 620)
  win.setContentSize(400, 620)

  win.center()
  win.show()

  // mainWindow.setSimpleFullScreen(true)
})

ipcMain.on('windowMin', (event, arg) => {
  win.minimize()
})

ipcMain.on('windowMax', (event, arg) => {
  const isMaximized = win.isMaximized()
  console.log(isMaximized, 'isMaximized')
  if (isMaximized) {
    win.restore()
  } else {
    win.maximize()
  }
})

ipcMain.on('closeApp', (event, arg) => {
  console.log(arg, 'arg')
  app.quit()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}