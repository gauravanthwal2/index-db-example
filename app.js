// check if indexedDB supported or not
window.indexedDB = window.indexedDB || webkitIndexedDB || mozIndexedDB;

if (!window.indexedDB) {
  alert("IndexedDB is not supported");
} else {
  // Connection
  // DB creation
  // Create Object Store
  // Insert Values (txn)
  // Retreive Values (txn)

  var db;
  let connection = window.indexedDB.open("moviesDB", 1); // IDBRequest

  connection.onsuccess = function (e) {
    console.log("connected ");
    db = e.target.result;
  };
  connection.onerror = function (e) {
    console.log(e);
  };

  connection.onupgradeneeded = function (e) {
    db = e.target.result; // access the database
    var moviesOS = db.createObjectStore("movies"); // table / collection
    moviesOS.createIndex("m_id", "id", { unique: true }); // createIndex(nameOfIndex, PropertyNameFromObject, contraints)

    // let submitBtn = document.querySelector("#submitBtn");
    // submitBtn.addEventListener("click", submitData);
  };
}

function submitData() {
  // adding the values to the database
  let id = document.querySelector("#id").value;
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let address = document.querySelector("#address").value;

  let newData = { id, name, email, address };
  let txn = db.transaction(["movies"], "readwrite");
  let moviesOS = txn.objectStore("movies");
  moviesOS.add(newData, id);
}

function retreiveData() {
  var txn = db.transaction(["movies"], "readonly");
  var moviesOS = txn.objectStore("movies");
  let id = document.querySelector("#id").value;
  if (id) {
    var req = moviesOS.get(id);
    req.onsuccess = function (e) {
      console.log(e.target.result);
    };
    req.onerror = function (e) {
      console.log(e);
    };
  }else{
      console.log('Id cannto be empty');
  }
}
