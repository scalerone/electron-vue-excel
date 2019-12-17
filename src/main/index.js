import { app, BrowserWindow , Tray,Menu, screen,dialog  } from 'electron'
import pkg from '../../package.json'
import {updateHandle} from './utils/Update.js';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let window
let tray
let menu
let contextMenu
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:8083`
  : `file://${__dirname}/index.html`

const createWindow = () => {
  if (process.platform !== 'darwin' && process.platform !== 'win32') {
    return
  }
  window = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
        nodeIntegration: true, //设置这个可以使用 nodejs 的API
        nodeIntegrationInWorker: true,
        backgroundThrottling: false
    }
  })

  window.loadURL(winURL)


  window.on('ready-to-show', function() {
    window.show();
    window.focus();
  });
  window.on('closed', () => {
    window = null
  })
  // 去掉顶部菜单
  // window.setMenu(null)
  // 鼠标右键菜单设置
  require('./model/menu.js');
  //设置版本更新地址，即将打包后的latest.yml文件和exe文件同时放在
  //http://xxxx/test/version/对应的服务器目录下,该地址和package.json的publish中的url保持一致
  let feedUrl = "http://localhost:8085/";
  //检测版本更新
  updateHandle(window,feedUrl)
  return window
}
function createContextMenu () {

  contextMenu = Menu.buildFromTemplate([
    {
      label: '关于',
      click () {
        dialog.showMessageBox({
          title: 'excel助手',
          message: '欢迎使用excel助手',
          detail: `Version:${pkg.version}`
        })
      }
    },
    {
      label: '重启应用',
      click () {
        app.relaunch()
        app.exit(0)
      }
    },
    {
      role: 'quit',
      label: '退出'
    }
  ])
}
const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    window.show()
  }
}

function createTray () {
  const menubarPic = process.platform === 'darwin' ? `${__static}/menubar.png` : `${__static}/menubar-nodarwin.png`
  tray = new Tray(menubarPic)
  tray.on('right-click', () => { // 右键点击
    if (window) {
      window.hide()// 隐藏小窗口
    }
    createContextMenu()
    tray.popUpContextMenu(contextMenu) // 打开菜单

  })
  tray.on('click', () => { // 左键点击
    if (process.platform === 'darwin') { // 如果是macOS
      toggleWindow() // 打开或关闭小窗口
    } else { // 如果是windows
      window.hide() // 隐藏小窗口
      if (window === null) { // 如果主窗口不存在就创建一个
        createWindow()
        window.show()
      } else { // 如果主窗口在，就显示并激活
        window.show();
        window.focus();
      }
    }
  })
}




app.on('ready', ()=>{
  createWindow()
  createTray ()
 // window.webContents.openDevTools({mode:'right'})


})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */


// import { autoUpdater } from 'electron-updater'
//
// autoUpdater.on('update-downloaded', () => {
//   autoUpdater.quitAndInstall()
// })
//
// app.on('ready', () => {
//   if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
// })

