export const useIdb = () => {
    const openDB = (dbname, version = 1, storeName) => {
        return new Promise((resolve, reject) => {
            const requestdb = indexedDB.open(dbname, version);

            requestdb.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(storeName, { keyPath: "id" })
            };

            requestdb.onsuccess = () => resolve(requestdb.result)
            requestdb.onerror = () => reject(requestdb.error)
            requestdb.onblocked = () => reject(new Error('Upgrade blocked by another open connection.'))
        })
    }

    const addRecord = (db, storeName, note) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const rawId = String(note.id)
        const rawValue = String(note.value)
        const request = store.put({
            id: rawId,
            value: rawValue
        })

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    const getRecords = (db, id, storeName, no = 3) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAllRecords({ count: no })

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    const deleteRecord = (db, id, storeName) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(id)

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    return {
        openDB,
        addRecord,
        getRecords,
        deleteRecord,
    }
}