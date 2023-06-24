const db = require('../connector/database');

const dbObjects = [
    `CREATE TABLE IF NOT EXISTS STUDENTS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        STREAM TEXT NOT NULL,
        DEPARTMENT TEXT NOT NULL,
        BATCH TEXT NOT NULL,
        DOB TEXT NOT NULL,
        MOBILE_NO TEXT NOT NULL,
        EMAIL TEXT NOT NULL,
        STATUS INTEGER CHECK( STATUS IN (0, 1) )  NOT NULL DEFAULT 1,
        CREATED_ON TEXT NOT NULL,
        MODIFIED_ON TEXT NOT NULL
        );`,

    `CREATE TABLE IF NOT EXISTS STUDENT_DETAILS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        STUDENT_ID INTEGER NOT NULL,
        AGE NUMBER,
        ADDRESS TEXT,
        BLOOD_GROUP TEXT NOT NULL,
        FOREIGN KEY (STUDENT_ID) REFERENCES STUDENTS (ID)
        );`,

    `CREATE TABLE IF NOT EXISTS STAFFS (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        SUBJECT TEXT NOT NULL,
        DEPARTMENT TEXT NOT NULL,
        MOBILE_NO TEXT NOT NULL,
        EMAIL TEXT NOT NULL,
        STATUS INTEGER CHECK( STATUS IN (0, 1) ) NOT NULL DEFAULT 1,
        CREATED_ON TEXT NOT NULL,
        MODIFIED_ON TEXT NOT NULL
        );`
]

dbObjects.forEach(obj => {
    db.appDatabase.run(
        obj,
        [],
        (err, result) => {
            if (err) {
                console.log("something went wrong while creating DB objects: ", err);
                process.exit(1)
            }
            console.log("DB object created");
        }
    )
})
