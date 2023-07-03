import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import path from 'node:path'
import * as fs from 'fs';

process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'logo.png'),
    width: 1280,
    height: 750,
    resizable: false,
    webPreferences: {
      contextIsolation:true,
      nodeIntegration:true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  // win.setMenuBarVisibility(false)

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  win = null
})

ipcMain.on("saveData", (sender: any, data: any) => {
  const fPath = path.join(__dirname,'../electron/decks.json')
  console.log(fPath)
  const file = fs.existsSync(fPath);
  if(!file) {
    console.log('No File, Creating it now'); 
    console.log(JSON.stringify(data))
    fs.writeFile(path.join(fPath),JSON.stringify(data),(err: any) => {
      if(err){
        console.log(`ERROR: ${err}`);
      }
      return;
    });
    console.log('File Created')
  }

  return;
})


app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+R", () => {
    return
  });
  globalShortcut.register("F5", () => {
    return
  });
});
app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
});

app.whenReady().then(createWindow)
