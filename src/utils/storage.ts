import type { StorageType, StorageError } from '../types';

// Check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Default serializer/deserializer
export const defaultSerializer = <T>(value: T): string => {
  return JSON.stringify(value);
};

export const defaultDeserializer = <T>(value: string): T => {
  return JSON.parse(value) as T;
};

// Get storage object
export const getStorage = (type: StorageType): Storage | null => {
  if (!isBrowser) return null;
  
  try {
    return type === 'localStorage' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
};

// Create storage error
export const createStorageError = (
  type: StorageError['type'],
  message: string,
  error?: unknown
): StorageError => {
  return { type, message, error };
};

// Test if storage is available
export const isStorageAvailable = (type: StorageType): boolean => {
  if (!isBrowser) return false;

  try {
    const storage = getStorage(type);
    if (!storage) return false;

    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};