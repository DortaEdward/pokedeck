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
      contextIsolation: true,
      nodeIntegration: true,
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

ipcMain.on("saveData", (sender: any, createDeck: any) => {
  const fPath = path.join(__dirname, '../electron/decks.json')
  const isFile = fs.existsSync(fPath);
  if (!isFile) {
    fs.writeFile(path.join(fPath), JSON.stringify(createDeck), (err: any) => {
      if (err) {
        console.log(`ERROR: ${err}`);
      }
      return;
    });
  }

  fs.readFile(fPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading deck.json:', err);
      return;
    }
    try {
      const deckData = JSON.parse(data);

      deckData.push(createDeck);
      fs.writeFile(path.join(fPath), JSON.stringify(deckData), (err: any) => {
        if (err) {
          console.log(`ERROR: ${err}`);
        }
        return;
      });
      // Use the deck data as needed
    } catch (parseError) {
      console.error('Error parsing deck.json:', parseError);
    }
  });

  fs.appendFile(fPath, JSON.stringify(createDeck), (err: any) => {
    if (err) {
      console.log(`ERROR: ${err}`);
    }
  })
  return;
})

ipcMain.on('getDecks', async (event, ) => {
  try {
    const deckFilePath = path.join(__dirname, '../electron/decks.json');
    const fileData = await fs.readFileSync(deckFilePath, 'utf-8');
    event.reply('file-data', fileData);
  } catch (error: any) {
    event.reply('file-read-error', error.message);
  }
});

// ipcMain.on('getDecks', async () => {
//   const deckFilePath = path.join(__dirname, '../electron/decks.json');
//   let deckData;
//   fs.readFile(deckFilePath, 'utf-8', (err, data) => {
//     if (err) {
//       return console.error('Error reading deck.json:', err);
//     }
//     try {
//       deckData = JSON.parse(data);
//     } catch (parseError) {
//       return console.error('Error parsing deck.json:', parseError);
//     }
//     return deckData;
//   });
// })


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
