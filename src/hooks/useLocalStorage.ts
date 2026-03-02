import type { Dispatch, SetStateAction } from 'react';
import { useStorage } from './useStorage';
import type { UseStorageOptions, StorageError } from '../types';

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
  options?: UseStorageOptions<T>
): [T, Dispatch<SetStateAction<T>>, () => void, StorageError | null] => {
  return useStorage(key, defaultValue, 'localStorage', options);
};