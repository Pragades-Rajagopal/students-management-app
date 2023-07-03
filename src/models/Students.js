const db = require('../connector/database');
const constants = require('../config/constants');

module.exports = {
    getStudents: function () {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM STUDENTS WHERE STATUS = ${constants.status.active}`;
            db.appDatabase.all(
                sql,
                [],
                (err, rows) => {
                    if (err) {
                        console.log("[getStudents model] error: ", err)
                        return reject('error')
                    }
                    resolve(rows)
                }
            )
        })
    },

    getStudentById: function (id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT S.ID,
            S.NAME,
            S.STREAM,
            S.DEPARTMENT,           
            S.BATCH,
            S.DOB,
            S.MOBILE_NO,
            S.EMAIL,
            S.STATUS,
            S.CREATED_ON,
            S.MODIFIED_ON,
            SD.AGE,
            SD.ADDRESS,
            SD.BLOOD_GROUP
            FROM STUDENTS S, STUDENT_DETAILS SD 
            WHERE S.ID = ? 
            AND S.STATUS = ${constants.status.active} 
            AND SD.STUDENT_ID = S.ID`;
            db.appDatabase.get(
                sql,
                [id],
                (err, row) => {
                    if (err) {
                        console.log("[getStudentById model] error: ", err)
                        return reject('error')
                    }
                    resolve(row)
                }
            )
        })
    },

    insertStudent: function (data) {
        return new Promise((resolve, reject) => {
            const sql = `
            INSERT INTO STUDENTS
            (NAME, STREAM, DEPARTMENT, BATCH, DOB, MOBILE_NO)
            VALUES(?,?,?,?,?,?)`;
            db.appDatabase.run(
                sql,
                [data.name, data.stream, data.department, data.batch, data.dob, data.mobile_no],
                (err, result) => {
                    if (err) {
                        console.log("[insertStudent model] error: ", err)
                        return reject('error')
                    }
                    db.appDatabase.get(
                        'SELECT MAX(ID) AS ID FROM STUDENTS',
                        [],
                        (err, result) => {
                            if (err) {
                                console.log("[insertStudent model] error: ", err)
                                return reject({ msg: 'error', result: null })
                            }
                            return resolve({ msg: 'success', result: result })
                        }
                    )
                }
            )
        })
    },

    updateStudentById: function (data, id) {
        return new Promise((resolve, reject) => {
            const sql = `
            UPDATE STUDENTS SET
            NAME = ?, STREAM = ?, DEPARTMENT = ?, 
            BATCH = ?, DOB = ?, MOBILE_NO = ?, EMAIL = ?
            WHERE ID = ?
            AND STATUS = ${constants.status.active}`;
            db.appDatabase.run(
                sql,
                [data.name, data.stream, data.department, data.batch, data.dob, data.mobile_no, data.email, id],
                (err, result) => {
                    if (err) {
                        console.log("[updateStudentById model] error: ", err)
                        return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },

    deleteStudentById: function (id) {
        return new Promise((resolve, reject) => {
            const sql = `
            UPDATE STUDENTS 
            SET STATUS=${constants.status.inactive}
            WHERE ID=? 
            AND STATUS=${constants.status.active}`;
            db.appDatabase.run(
                sql,
                [id],
                (err, result) => {
                    if (err) {
                        console.log("[deleteStudentById model] error: ", err)
                        return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },

    insertStudentDetail: function (data) {
        return new Promise((resolve, reject) => {
            const sql = `
            INSERT INTO STUDENT_DETAILS
            (STUDENT_ID, AGE, ADDRESS, BLOOD_GROUP)
            VALUES(?,?,?,?)`;
            db.appDatabase.run(
                sql,
                [data.student_id, data.age, data.address, data.blood_group],
                (err, result) => {
                    if (err) {
                        console.log("[insertStudentDetail model] error: ", err)
                        return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },

    updateStudentDetail: function (data, studentId) {
        return new Promise((resolve, reject) => {
            const sql = `
            UPDATE STUDENT_DETAILS SET
            AGE=?, ADDRESS=?, BLOOD_GROUP=?
            WHERE STUDENT_ID=?`;
            db.appDatabase.run(
                sql,
                [data.age, data.address, data.blood_group, studentId],
                (err, result) => {
                    if (err) {
                        console.log("[updateStudentDetail model] error: ", err)
                        return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },

    getStudentData: function () {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM STUDENTS_DTLS_RELATION_V`;
            db.appDatabase.all(
                sql,
                [],
                (err, rows) => {
                    if (err) {
                        console.log("[getStudentData model] error: ", err)
                        return reject('error')
                    }
                    resolve(rows)
                }
            )
        })
    }
}