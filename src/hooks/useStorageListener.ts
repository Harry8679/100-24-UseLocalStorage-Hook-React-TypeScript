import { useEffect, useState } from 'react';
import type { StorageType } from '../types';

interface StorageChangeDetail {
  key: string;
  newValue: unknown;
  storageType: StorageType;
}

export const useStorageListener = (key: string, storageType: StorageType = 'localStorage') => {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const handleChange = (e: CustomEvent) => {
      const detail = e.detail as StorageChangeDetail;
      
      if (detail.key === key && detail.storageType === storageType) {
        setLastUpdate(new Date());
      }
    };

    window.addEventListener('storage-change', handleChange as EventListener);

    return () => {
      window.removeEventListener('storage-change', handleChange as EventListener);
    };
  }, [key, storageType]);

  return lastUpdate;
};