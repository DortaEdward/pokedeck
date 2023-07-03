import { ipcRenderer, contextBridge, ipcMain } from "electron";
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      parent.removeChild(child)
    }
  },
}

const saveData = (data: any) => {
  ipcRenderer.send("saveData", data);
  return;
}

contextBridge.exposeInMainWorld('bridge', { saveData })


// ----------------------------------------------------------------------

/*
  create json file of decks
  append deck to file
    - name
    - deck
*/ 