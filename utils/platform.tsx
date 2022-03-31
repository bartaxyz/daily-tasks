import { Platform } from "react-native";

/* var userAgent = navigator.userAgent.toLowerCase(); */

export const isAndroid = Platform.OS === "android";
export const isWeb = Platform.OS === "web"; // && userAgent.indexOf(" electron/") == -1;
export const isElectron = false; // userAgent.indexOf(" electron/") > -1;
export const isIOS = Platform.OS === "ios";

export const isMobile = isAndroid || isIOS;
