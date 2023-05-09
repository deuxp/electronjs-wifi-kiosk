const { contextBridge, ipcRenderer } = require("electron");

const ipcBridge = {
  send: status => {
    ipcRenderer.send("online/status", status);
  },
  mainThread: async (channel, options) => {
    const validChannel = ["get/networks", "connect/wifi"];
    if (!validChannel.includes(channel)) return;

    return await ipcRenderer.invoke(channel, options);
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("api", ipcBridge);
});
