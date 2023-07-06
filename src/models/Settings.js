const db = require('../connector/database');
const constants = require('../config/constants')

module.exports = {
    getDepartment: function () {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM DEPARTMENT WHERE STATUS = '${constants.status.active}'`;
            db.appDatabase.all(
                sql,
                [],
                (err, data) => {
                    if (err) {
                        console.log('[getDepartment model] error: ', err);
                        return reject('error')
                    }
                    resolve(data)
                }
            )
        })
    },

    addDepartment: function (name) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO DEPARTMENT (NAME) VALUES (?)`;
            db.appDatabase.run(
                sql,
                [name],
                (err, data) => {
                    if (err) {
                        console.log('[addDepartment model] error: ', err);
                        return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },

    deleteDepartment: function (id) {
        return new Promise((resolve, reject) => {
            const sql = `
            UPDATE DEPARTMENT
            SET STATUS = ${constants.status.inactive}
            WHERE ID = ?`;
            db.appDatabase.run(
                sql,
                [id],
                (err, data) => {
                    if (err) {
                        console.log('[deleteDepartment model] error: ', err);
                        return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },

    getStream: function () {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM STREAM WHERE STATUS = '${constants.status.active}'`;
            db.appDatabase.all(
                sql,
                [],
                (err, data) => {
                    if (err) {
                        console.log('[getStream model] error: ', err);
                        return reject('error')
                    }
                    resolve(data)
                }
            )
        })
    },

    addStream: function (name) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO STREAM (NAME) VALUES (?)`;
            db.appDatabase.run(
                sql,
                [name],
                (err, data) => {
                    if (err) {
                        console.log('[addStream model] error: ', err);
                        return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },

    deleteStream: function (id) {
        return new Promise((resolve, reject) => {
            const sql = `
            UPDATE STREAM
            SET STATUS = ${constants.status.inactive}
            WHERE ID = ?`;
            db.appDatabase.run(
                sql,
                [id],
                (err, data) => {
                    if (err) {
                        console.log('[deleteStream model] error: ', err);
                        return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    }
}