const sqlite = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../', 'app.sqlite3');

const appDatabase = new sqlite.Database(
    dbPath,
    sqlite.OPEN_READWRITE,
    (err) => {
        if (err) {
            console.log("error connecting to database: ", err);
            return;
        }
        console.log("app connected to database");
    }
);

module.exports = { appDatabase }