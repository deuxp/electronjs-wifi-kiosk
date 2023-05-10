const { getNetworks, connectWifi } = require("../src/services/wifi");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
// const axios = require("axios");
// const fs = require("fs");

if (require("electron-squirrel-startup")) {
  app.quit();
}

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      nodeIntegrationInWorker: false,
      webviewTag: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/////////////////////////
// Security listeners //
///////////////////////

app.on("web-contents-created", (event, contents) => {
  contents.on("will-attach-webview", (event, webPreferences, params) => {
    delete webPreferences.preload;
    webPreferences.nodeIntegration = false;
    event.preventDefault();
  });
});

app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    event.preventDefault();
  });
});

app.on("web-contents-created", (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    event.preventDefault();
    return { action: "deny" };
  });
});

/* ------------------------------------ v ----------------------------------- */

/**
 * all handles return obj: { data: Object, message: String }
 */
ipcMain.handle("get/networks", async () => {
  try {
    const networks = await getNetworks();
    return { data: networks, message: "get/networks: OK" };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "could not get networks, check internet connection",
    };
  }
});

ipcMain.handle("connect/wifi", async (event, { ssid, password }) => {
  try {
    await connectWifi(ssid, password);
    return { data: true, message: "on-line: OK" };
  } catch (error) {
    console.log(error);
    return { data: false, message: "error: connection problems" };
  }
});

//simple page reload
ipcMain.handle("reload", () => {
  win.reload();
});
