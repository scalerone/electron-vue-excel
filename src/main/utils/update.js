import {autoUpdater} from 'electron-updater'
import {ipcMain} from 'electron'
let log = require('electron-log');
log.transports.file.level = 'silly';
log.transports.console.level = false;
let mainWindow = null;
export function updateHandle(window, feedUrl) {
    mainWindow = window;
    let messagedata = {
        error: '检查更新出错',
        checking: '正在检查更新……',
        updateAva: '检测到新版本，正在下载……',
        updateNotAva: '现在使用的就是最新版本，不用更新',
    };
    //设置更新包的地址
    autoUpdater.setFeedURL(feedUrl);
    //监听升级失败事件
    autoUpdater.on('error', function (error) {
        log.info('autoUpdater error:')
        log.info(error)
        sendUpdateMessage({
            cmd: 'error',
            message: error
        })
    });
    //监听开始检测更新事件
    autoUpdater.on('checking-for-update', function (message) {
        log.info('autoUpdater checking-for-update:')
        log.info(message)
        console.log(message)
        sendUpdateMessage({
            cmd: 'checking-for-update',
            message: message
        })
    });
    //监听发现可用更新事件
    autoUpdater.on('update-available', function (message) {
        log.info('autoUpdater update-available:')
        log.info(message)
        sendUpdateMessage({
            cmd: 'update-available',
            message: message
        })
    });
    //监听没有可用更新事件
    autoUpdater.on('update-not-available', function (message) {
        log.info('autoUpdater update-not-available:')
        log.info(message)
        sendUpdateMessage({
            cmd: 'update-not-available',
            message: message
        })
    });

    // 更新下载进度事件
    // -- progressObj  {}
    // bytesPerSecond: bps/s //传送速率
    // percent : 百分比 //我们需要这个就可以了
    // total : 总大小
    // transferred: 已经下载
    autoUpdater.on('download-progress', function (progressObj) {
        log.info('autoUpdater download-progress:')
        sendUpdateMessage({
            cmd: 'download-progress',
            message: progressObj
        })
    });


    //监听下载完成事件
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl) {
        log.info('autoUpdater update-downloaded:')
        log.info(releaseNotes)
        log.info(releaseName)
        log.info(releaseDate)
        log.info(updateUrl)
        // 下载太快可能无法触发downloadProgress事件，所以手动通知一下
        sendUpdateMessage({
            cmd: 'download-progress',
            message: {percent: 100}
        })
        sendUpdateMessage({
            cmd: 'update-downloaded',
            message: {
                releaseNotes,
                releaseName,
                releaseDate,
                updateUrl
            }
        })


        //退出并安装更新包
        ipcMain.on('updateNow', (e, arg) => {
            log.info('updateNow:')
            //some code here to handle event
            autoUpdater.quitAndInstall();
        })
        // autoUpdater.quitAndInstall();
    });

    //接收渲染进程消息，开始检查更新
    ipcMain.on("checkForUpdate", (e, arg) => {
        //执行自动更新检查
        log.info('trigger checkForUpdate ...')
        // sendUpdateMessage({cmd:'checkForUpdate',message:arg})
        autoUpdater.checkForUpdates();
    })
}
//给渲染进程发送消息
function sendUpdateMessage(text) {
    mainWindow.webContents.send('message', text)
}
