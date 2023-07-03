const models = require('../models/Students');
const constants = require('../config/constants')
const { validationResult } = require('express-validator');

module.exports = {
    getIndex: function (request, response) {
        return response.render('students/index', { errors: {} })
    },

    getAddstudent: function (request, response) {
        return response.render('students/addStudent', { errors: {} })
    },

    addStudent: async function (request, response) {
        try {
            const validationErrors = validationResult(request);
            if (!validationErrors.isEmpty()) {
                return response.render('students/addStudent', {
                    errors: validationErrors.mapped()
                })
            }
            const name = request.body.name;
            const stream = request.body.stream;
            const department = request.body.department;
            const batch = request.body.batch;
            const dob = request.body.dob;
            const mobile_no = request.body.mobile_no;

            const data = {
                name: name,
                stream: stream,
                department: department,
                batch: batch,
                dob: dob,
                mobile_no: mobile_no
            }

            const result = await models.insertStudent(data);
            if (result === constants.resultFlag.success) {
                return response.render('students/index', { errors: {} })
            }
            return response.render('students/addStudent', { errors: {} })

        } catch (error) {
            console.log("[addStudent controller] error: ", error)
            return response.render('students/index')
        }
    },

    searchStudent: async function (request, response) {
        try {
            const validationErrors = validationResult(request)
            if (!validationErrors.isEmpty()) {
                return response.render('students/index', { errors: validationErrors.mapped() })
            }
            const studentId = request.body.student_id;
            const studentData = await models.getStudentById(studentId)
            if (!studentData) {
                return response.render('students/index', { errors: { noData: "Student does not exists" } })
            }
            return response.render('students/searchStudent', { data: studentData, errors: {} })
        } catch (error) {

        }
    },

    updateStudent: async function (request, response) {
        try {
            const id = request.body.id;
            const studentData = await models.getStudentById(id)
            const validationErrors = validationResult(request);
            if (!validationErrors.isEmpty()) {
                return response.render('students/searchStudent', {
                    errors: validationErrors.mapped(),
                    data: studentData
                })
            }
            const name = request.body.name;
            const stream = request.body.stream;
            const department = request.body.department;
            const batch = request.body.batch;
            const dob = request.body.dob;
            const mobile_no = request.body.mobile_no;
            const email = request.body.email;

            const data = {
                name: name,
                stream: stream,
                department: department,
                batch: batch,
                dob: dob,
                mobile_no: mobile_no,
                email: email
            }

            const updatedResult = await models.updateStudentById(data, id);
            if (updatedResult === constants.resultFlag.error) {
                return response.render('students/searchStudent', {
                    errors: { updateError: "Unable to update data" },
                    data: studentData
                })
            }
            const updatedStudentData = await models.getStudentById(id);
            return response.render('students/searchStudent', {
                errors: { successMsg: "Data updated successfully" },
                data: updatedStudentData
            })

        } catch (error) {

        }
    }
}