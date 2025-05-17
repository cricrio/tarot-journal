const DB_NAME = 'TarotJournalDB';
const DB_VERSION = 1;
const STORE_NAME = 'speads';
const CREATED_AT_INDEX = 'createdAt';
let dbInstance: IDBDatabase | null = null;

type Node = {
  id: number;
  createdAt: Date;
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
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex(CREATED_AT_INDEX, CREATED_AT_INDEX, {
          unique: false,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function addEntry<T>(entry: T) {
  const db = await getDatabaseInstance();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.add({ ...entry, createdAt: new Date() });

  return new Promise<IDBValidKey>((resolve, reject) => {
    request.onsuccess = (event) => resolve(request.result);
    request.onerror = () => reject(transaction.error);
  });
}

export async function getEntries<T extends Node>(): Promise<T[]> {
  const db = await getDatabaseInstance();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
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

export async function getEntry<T>(id: number): Promise<T> {
  const db = await getDatabaseInstance();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
