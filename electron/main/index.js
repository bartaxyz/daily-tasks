"use strict";

import { app, BrowserWindow, ipcMain, systemPreferences, Menu } from "electron";
import contextMenu from "electron-context-menu";
import * as path from "path";
import { format as formatUrl } from "url";

const isDevelopment = process.env.NODE_ENV !== "production";

contextMenu({
  showSaveImageAs: true,
  prepend: (defaultActions, parameters, browserWindow) => [
    {
      label: "Rainbow",
      // Only show it when right-clicking images
      visible: parameters.mediaType === "image",
    },
    {
      label: "Search Google for “{selection}”",
      // Only show it when right-clicking text
      visible: parameters.selectionText.trim().length > 0,
      click: () => {
        shell.openExternal(
          `https://google.com/search?q=${encodeURIComponent(
            parameters.selectionText
          )}`
        );
      },
    },
  ],
});

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
    transparent: true,
    titleBarStyle: "hiddenInset",
    icon: path.join(__dirname, "../../assets/images/electron-icon.png"),
  });

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

app.dock.setIcon(path.join(__dirname, "../../assets/images/electron-icon.png"));

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

const openPreferencesWindow = () => {
  /**
   * Create a new browser window
   */
  const preferencesWindow = new BrowserWindow({
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

  if (isDevelopment) {
    preferencesWindow.loadURL(`http://localhost:3000`);
  } else {
    preferencesWindow.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }
};

ipcMain.handle("open-preferences", async () => {});

const isMac = process.platform === "darwin";

const template = [
  ...(isMac
    ? [
        {
          role: "appMenu",
          submenu: [
            { role: "about" },
            { type: "separator" },
            {
              label: "Preferences...",
              accelerator: "CmdOrCtrl+,",
              click: openPreferencesWindow,
            },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
