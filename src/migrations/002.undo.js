const db = require('../connector/database');

const dbObjects = [
    `DROP INDEX IDX_STUDENT_ID;`,
    `DROP INDEX IDX_STAFF_ID;`
];

dbObjects.forEach(obj => {
    db.appDatabase.run(
        obj,
        [],
        (err, result) => {
            if (err) {
                console.log("something went wrong while undoing DB objects: ", err);
                process.exit(1)
            }
            console.log("DB object dropped");
        }
    )
})