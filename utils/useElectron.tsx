export const useElectron = () => {
  let electron = null;

  if (typeof window !== "undefined") {
    electron = window.require("electron");
  }

  return { electron };
};
