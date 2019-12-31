// console.log('indexedDB start');
// console.log(indexedDB);
//
// const dbVersion = 4;
// const dbName = 'myDb';
// let db;
// //open
// let request = indexedDB.open(dbName, dbVersion);
// //onerror
// request.onerror = function (ev) {
//     console.log('error %o', ev);
// };
// //onsuccess
// request.onsuccess = function (ev) {
//     console.log('success %o', ev);
//     db = ev.target.result;
//     console.log(db);
//     console.log(db.objectStoreNames);
//     let idbTransaction = db.transaction('testA', 'readwrite');
//     let testAStore = idbTransaction.objectStore('testA');
//     testAStore.transaction.oncomplete = function (ev) {
//         console.log('test complete---');
//
//     };
//     testAStore.get('444-44-4444').onsuccess = function (e) {
//         console.log('get %o', e.target.result)
//     };
//     testAStore.transaction.onerror = function (e) {
//         console.log('test error %o', e);
//     };
//
//     // testAStore.add({ ssn: "44-550-55553", name: "Donna", age: 32, email: "no@home.org24" });
//     // testAStore.put({ ssn: "44-550-55553", name: "Donna", age: 32, email: "no@home.org24" });
//
//     testAStore.count().onsuccess = function (e) {
//         console.log('count %o', e.target.result)
//     };
//     testAStore.openCursor().onsuccess = function (ev) {
//         let result = ev.target.result;
//         if (result) {
//             console.log('cursor %o', result);
//             result.continue();
//         }
//
//
//     };
//
//     // setTimeout(function () {
//     //
//     //     // testAStore.add({ ssn: "44-550-555534", name: "Donna", age: 32, email: "no@home.org34" });
//     //     db.transaction("testA","readwrite").objectStore('testA').add({ ssn: "44-550-555534", name: "Donna", age: 32, email: "no@home.org34" });
//     // },1000)
// };
// request.onupgradeneeded = function (ev) {
//     console.log('upgradeneeded o%', ev);
//     db = ev.target.result;
//
//     let idbObjectStore = db.createObjectStore('testA', {keyPath: 'ssn'});
//     idbObjectStore.createIndex('name', 'name', {unique: false});
//     idbObjectStore.createIndex('email', 'email', {unique: true});
//     idbObjectStore.transaction.oncomplete = function (ev) {
//         console.log('transaction oncomplete o%', ev);
//         let objectStore = db.transaction('testA', 'readwrite').objectStore('testA');
//         [
//             {ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com"},
//             {ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org"}
//         ].forEach(function (item) {
//             objectStore.add(item)
//         });
//
//     };
// };
//
// setTimeout(function () {
//     let idbTransaction = db.transaction('testA', 'readwrite');
//     let testAStore = idbTransaction.objectStore('testA');
//     testAStore.get('555-55-5555').onsuccess = function (ev) {
//         console.log(ev)
//     };
//
//     setTimeout(function () {
//         try {
//             testAStore.get('555-55-5555').onsuccess = function (ev) {
//                 console.log(ev)
//             };//Uncaught DOMException: Failed to execute 'get' on 'IDBObjectStore': The transaction has finished.
//         } catch (e) {
//             console.log(e)
//         }
//     }, 1500);
//
// }, 2000);

function pdb(dbName,dbVersion) {
    return new Promise(function (resolve,reject) {
        let request = indexedDB.open(dbName, dbVersion);
//onerror
        request.onerror = function (ev) {
            console.log('error %o', ev);
            reject(ev);
        };
//onsuccess
        request.onsuccess = function (ev) {
            console.log('request.onsuccess');
            db = ev.target.result;
            resolve(db)
        };
        request.onupgradeneeded = function (ev) {
            db = ev.target.result;
            console.log(db.version);
            // db.createObjectStore('testB',{keyPath:'_id'});
            console.log('request.onupgradeneeded');
        };
    });
}
pdb('myDb2',4).then(function (db) {
    console.log(db);
});
indexedDB.databases().then(function (e) {
    console.log(e);
});