const { contextBridge, ipcRenderer } = require("electron");

const ipcBridge = {
  send: msg => {
    ipcRenderer.send("msg", msg);
  },
  getData: async channel => {
    const validChannel = ["networks"];
    if (!validChannel.includes(channel)) return;

    return await ipcRenderer.invoke(channel);
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("api", ipcBridge);
});
