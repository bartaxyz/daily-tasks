import { useEffect, useState } from "react";

let ipcRenderer: Electron.IpcRenderer = require("electron").ipcRenderer;

export const useSystemAccentColor = () => {
  const [systemAccentColor, setSystemAccentColor] = useState<string>('red');

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.invoke("get-accent-color").then((color) => {
        setSystemAccentColor(color);
      });
    }
  }, []);

  return systemAccentColor;
};
