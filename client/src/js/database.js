import { openDB } from 'idb';

const initdb = async () =>
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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented') {
  const db = await initdb();
  const tx = = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store .put({ content });
  await tx.done;
  console.log('Data retrieved from database');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented') {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const data = await store.getAll();
  await tx.done;
  console.log('Data retrieved from database');
  return data.map(item => item.content)[0]
};

initdb();