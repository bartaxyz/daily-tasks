"use strict";

import { app, BrowserWindow, ipcMain, systemPreferences } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const browserWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    width: 440,
    minWidth: 440,
    maxWidth: 800,
    minHeight: 440,
    vibrancy: "sidebar",
    transparent: false,
    titleBarStyle: "hiddenInset",
  });

  browserWindow.document;

  if (isDevelopment) {
    browserWindow.webContents.openDevTools();
  }

  if (isDevelopment) {
    browserWindow.loadURL(`http://localhost:3000`);
  } else {
    browserWindow.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  browserWindow.on("closed", () => {
    mainWindow = null;
  });

  browserWindow.webContents.on("devtools-opened", () => {
    browserWindow.focus();
    setImmediate(() => {
      browserWindow.focus();
    });
  });

  return browserWindow;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  // if (process.platform !== "darwin") {
  app.quit();
  // }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();

  mainWindow.webContents.on("did-finish-load", () => {
    let code = /* js */ `
      document.body.style.webkitFontSmoothing = 'antialiased';

      document.body.style.userSelect = 'none';
      
      /** Draggable Section */
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.top = '0px';
      div.style.height = '54px';
      div.style.width = '100%';
      div.style.zIndex = '-1';
      div.style.webkitAppRegion = 'drag';

      document.body.appendChild(div);

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/renderer.js";
      document.head.appendChild(script)

      ;0
    `;
    mainWindow.webContents.executeJavaScript(code);
  });
});

/** Get accent color */
ipcMain.handle("get-accent-color", async () => {
  console.log(systemPreferences.getAccentColor());
  return `#${systemPreferences.getAccentColor().substring(0, 6)}`;
});
