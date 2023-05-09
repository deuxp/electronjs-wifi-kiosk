const { contextBridge, ipcRenderer } = require("electron");

const ipcBridge = {
  mainThread: async (channel, options) => {
    const validChannel = ["get/networks", "connect/wifi"];
    if (!validChannel.includes(channel)) return;

    return await ipcRenderer.invoke(channel, options);
  },
  // onlineStatusChange: status => {
  //   ipcRenderer.invoke("online-status-change", status);
  // },
};

// function onlineStatusChange() {
//   ipcRenderer.send("online-status-change", navigator.onLine);
// }

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("api", ipcBridge);
});
