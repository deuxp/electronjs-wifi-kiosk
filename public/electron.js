const { getNetworks, connectWifi } = require("../src/services/wifi");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { stat } = require("fs");
// const axios = require("axios");
// const fs = require("fs");

if (require("electron-squirrel-startup")) {
  app.quit();
}

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
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

ipcMain.on("msg", (_, msg) => {
  console.log(msg);
});

ipcMain.handle("get/networks", async () => {
  try {
    return await getNetworks();
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("connect/wifi", async (event, { ssid, password }) => {
  try {
    return await connectWifi(ssid, password);
  } catch (error) {
    console.log(error);
  }
});

ipcMain.on("online/status", (event, status) => {
  if (status) alert("on line🤠");
  if (!status) alert("off line👢");
});
