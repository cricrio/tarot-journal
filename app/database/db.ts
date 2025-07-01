const DB_NAME = 'TarotJournalDB';
const DB_VERSION = 2;

const CREATED_AT_INDEX = 'createdAt';
const STORE_NAMES = ['speads', 'notes'] as const;

export type StoreName = (typeof STORE_NAMES)[number];

let dbInstance: IDBDatabase | null = null;

export type Node = {
  id: number;
  createdAt: Date;
};

export type DBError = {
  message: string;
};

export async function getDatabaseInstance(): Promise<IDBDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDatabase();
  return dbInstance;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      STORE_NAMES.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex(CREATED_AT_INDEX, CREATED_AT_INDEX, {
            unique: false,
          });
        }
      });
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function addEntry<T extends {}>(storeName: StoreName, entry: T) {
  const db = await getDatabaseInstance();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const request = store.add({ ...entry, createdAt: new Date() });

  return new Promise<IDBValidKey>((resolve, reject) => {
    request.onsuccess = (event) => resolve(request.result);
    request.onerror = () => reject(transaction.error);
  });
}

export async function getEntries<T extends Node>(
  storeName: StoreName
): Promise<T[]> {
  const db = await getDatabaseInstance();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.index(CREATED_AT_INDEX).getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result as T[];
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      resolve(result);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getEntry<T extends Node>(
  storeName: StoreName,
  id: number
): Promise<T> {
  const db = await getDatabaseInstance();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteEntry(
  storeName: StoreName,
  id: number
): Promise<void> {
  const db = await getDatabaseInstance();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const request = store.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function updateEntry<T extends Partial<Node>>(
  storeName: StoreName,
  updatedEntry: T
): Promise<void> {
  const db = await getDatabaseInstance();

  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const putRequest = store.put(updatedEntry);

  return new Promise((resolve, reject) => {
    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () => reject(putRequest.error);
  });
}