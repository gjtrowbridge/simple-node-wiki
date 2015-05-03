var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data', [sqlite3.OPEN_CREATE]);

db.serialize(function() {
  db.run("CREATE TABLE pages (name varchar(255), text TEXT)");
});

db.close();
