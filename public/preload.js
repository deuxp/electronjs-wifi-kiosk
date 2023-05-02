const { contextBridge, ipcRenderer } = require("electron");

const ipcBridge = {
  hi: bool => {
    return new Promise((resolve, reject) => {
      if (bool) return resolve(true);
      reject(false);
    });
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("bridge", ipcBridge);
});
