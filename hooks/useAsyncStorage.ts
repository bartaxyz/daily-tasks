import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export interface AsyncStorageData {
  userPreferences: {
    showKeyboardShortcuts?: boolean;
  };
}

export const useAsyncStorage = <T extends keyof AsyncStorageData>(
  key: keyof AsyncStorageData,
  defaultValue: AsyncStorageData[T] = {}
) => {
  const [value, setValueSync] = useState<AsyncStorageData[T]>(defaultValue);

  const setValue = async (value: AsyncStorageData[T]) => {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
      setValueSync(value);
    } catch (error) {
      console.error(error);
    }
  };

  const getValueAsync = async () => {
    try {
      const serializedValue = await AsyncStorage.getItem(key);
      if (serializedValue !== null) {
        const parsedValue = JSON.parse(serializedValue);
        setValueSync(parsedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValueSync(defaultValue);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getValueAsync();
  }, []);

  return [value, setValue, clearValue];
};
