const { contextBridge, ipcRenderer } = require("electron");

const ipcBridge = {
  mainThread: async (channel, options) => {
    const validChannel = ["get/networks", "connect/wifi"];
    if (!validChannel.includes(channel)) return;
    return await ipcRenderer.invoke(channel, options);
  },
  reload: () => {
    ipcRenderer.invoke("reload");
  },
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("api", ipcBridge);
});
