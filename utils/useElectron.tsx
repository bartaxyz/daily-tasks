export const useElectron = () => {
  let electron = null;

  if (typeof window !== "undefined" && typeof window.require !== "undefined") {
    electron = window.require("electron");
  }

  return { electron };
};
