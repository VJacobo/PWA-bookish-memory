import { openDB } from 'idb';

const initDb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  const db = await initDb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  await tx.done;
  console.log('Data added to the database');
};

// Method to get all content from the database
export const getDb = async () => {
  const db = await initDb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const data = await store.getAll();
  await tx.done;
  console.log('Data retrieved from the database');
  return data.map(item => item.content);
};

// Initialize the database when the script runs
initDb();
