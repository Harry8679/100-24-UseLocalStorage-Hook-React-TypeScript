import { useState, useEffect, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  getStorage,
  defaultSerializer,
  defaultDeserializer,
  createStorageError,
  isBrowser,
} from '../utils/storage';
import type { StorageType, UseStorageOptions, StorageError } from '../types';

export const useStorage = <T>(
  key: string,
  defaultValue: T,
  storageType: StorageType = 'localStorage',
  options: UseStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, () => void, StorageError | null] => {
  const {
    serializer = defaultSerializer,
    deserializer = defaultDeserializer,
    initializeWithValue = true,
  } = options;

  const [error, setError] = useState<StorageError | null>(null);

  // Get initial value
  const readValue = useCallback((): T => {
    if (!initializeWithValue || !isBrowser) {
      return defaultValue;
    }

    try {
      const storage = getStorage(storageType);
      if (!storage) {
        return defaultValue;
      }

      const item = storage.getItem(key);
      
      if (item === null) {
        return defaultValue;
      }

      return deserializer(item);
    } catch (err) {
      setError(createStorageError('READ', `Error reading ${key} from ${storageType}`, err));
      return defaultValue;
    }
  }, [key, defaultValue, storageType, deserializer, initializeWithValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Write value to storage
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      if (!isBrowser) {
        console.warn(`Tried to set ${key} in ${storageType} but not in browser environment`);
        return;
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        
        const storage = getStorage(storageType);
        if (!storage) {
          throw new Error(`${storageType} is not available`);
        }

        const serializedValue = serializer(newValue);
        storage.setItem(key, serializedValue);

        setStoredValue(newValue);
        setError(null);

        // Dispatch custom event for cross-tab sync
        window.dispatchEvent(
          new CustomEvent('storage-change', {
            detail: { key, newValue, storageType },
          })
        );
      } catch (err) {
        if (err instanceof Error && err.name === 'QuotaExceededError') {
          setError(createStorageError('QUOTA_EXCEEDED', `Storage quota exceeded for ${key}`, err));
        } else {
          setError(createStorageError('WRITE', `Error writing ${key} to ${storageType}`, err));
        }
      }
    },
    [key, storageType, serializer, storedValue]
  );

  // Remove value from storage
  const removeValue = useCallback(() => {
    if (!isBrowser) {
      console.warn(`Tried to remove ${key} from ${storageType} but not in browser environment`);
      return;
    }

    try {
      const storage = getStorage(storageType);
      if (!storage) {
        throw new Error(`${storageType} is not available`);
      }

      storage.removeItem(key);
      setStoredValue(defaultValue);
      setError(null);

      window.dispatchEvent(
        new CustomEvent('storage-change', {
          detail: { key, newValue: null, storageType },
        })
      );
    } catch (err) {
      setError(createStorageError('WRITE', `Error removing ${key} from ${storageType}`, err));
    }
  }, [key, storageType, defaultValue]);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    if (!isBrowser) return;

    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if (e instanceof StorageEvent) {
        // Native storage event (cross-tab)
        if (e.key !== key || e.storageArea !== getStorage(storageType)) {
          return;
        }

        try {
          const newValue = e.newValue ? deserializer(e.newValue) : defaultValue;
          setStoredValue(newValue);
          setError(null);
        } catch (err) {
          setError(createStorageError('PARSE', `Error parsing ${key} from storage event`, err));
        }
      } else {
        // Custom event (same-tab)
        const detail = e.detail as { key: string; newValue: T | null; storageType: StorageType };
        
        if (detail.key !== key || detail.storageType !== storageType) {
          return;
        }

        setStoredValue(detail.newValue ?? defaultValue);
      }
    };

    window.addEventListener('storage', handleStorageChange as EventListener);
    window.addEventListener('storage-change', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange as EventListener);
      window.removeEventListener('storage-change', handleStorageChange as EventListener);
    };
  }, [key, defaultValue, storageType, deserializer]);

  return [storedValue, setValue, removeValue, error];
};