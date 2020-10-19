export default class DB {
  constructor() {
    this.db = '';
    this.init();
  }

  init() {
    this.request = window.indexedDB.open('todos', 1);
    this.request.onerror = () => {
      // eslint-disable-next-line no-console
      console.log('There was an error opening the database');
    };

    this.request.onsuccess = (event) => {
      // eslint-disable-next-line no-console
      console.log('Database created successful');
      this.db = event.target.result;
    };

    this.request.onupgradeneeded = (event) => {
      // Here we will create database schema
      const db = event.target.result;
      const objectStore = db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true }); // keypath is going to be the indexes
      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('brief', 'brief', { unique: false });
      objectStore.createIndex('content', 'content', { unique: false });
      objectStore.createIndex('createdAt', 'createdAt', { unique: false });
    };
  }

  saveNotesToDB(noteObj) {
    const transaction = this.db.transaction(['todos'], 'readwrite');
    const { objectStore } = transaction;
    const request = objectStore.add(noteObj);
    request.onsuccess = () => {
      // eslint-disable-next-line no-console
      console.log('Data');
    };
  }

  ReadNotesFromDB() {
    if (!this.db) {
      // eslint-disable-next-line no-console
      console.log('This db not ready');
    }
    // eslint-disable-next-line no-console
    console.log(this.request);
    // let objectStore = this.db.transaction('todos').objectStore();
    // objectStore.openCursor().onsuccess = (event) => {
    //   let cursor = event.target.result;
    //   console.log(cursor)
    //   if(cursor){
    //     console.log(cursor.value.name);
    //     cursor.continue();
    //   }
    // }
    // request.onsuccess = () => {
    //   console.log('Data');
    // }
    // request.oncomplete = () => {
    //   console.log('Data');
    // }
    // request.onerror = () => {
    //   console.log('Data');
    // }
  }

  RemoveNote(noteId) {
    const transaction = this.db.transaction(['todos'], 'readwrite');
    const objectStore = transaction.objectStore('todos');
    objectStore.delete(noteId);
    transaction.oncomplete = () => {
      // eslint-disable-next-line no-console
      console.log('pass');
    };
  }
}
