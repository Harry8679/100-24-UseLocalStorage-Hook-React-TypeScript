// Types pour le storage - AUCUN ANY

export type StorageType = 'localStorage' | 'sessionStorage';

export interface UseStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
}

export interface StorageError {
  type: 'READ' | 'WRITE' | 'PARSE' | 'QUOTA_EXCEEDED';
  message: string;
  error?: unknown;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface User {
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

export interface FormData {
  name: string;
  email: string;
  message: string;
  subscribe: boolean;
}