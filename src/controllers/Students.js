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
            const age = request.body.age;
            const address = request.body.address;
            const blood_group = request.body.blood_group;

            const data = {
                name: name,
                stream: stream,
                department: department,
                batch: batch,
                dob: dob,
                mobile_no: mobile_no
            }

            const result = await models.insertStudent(data);
            if (result.msg === constants.resultFlag.error) {
                return response.render('students/addStudent', { errors: {} })
            }
            const studentId = result.result.ID;
            const addlData = {
                student_id: studentId,
                age: age,
                address: address,
                blood_group: blood_group
            }
            const addlResult = await models.insertStudentDetail(addlData);
            if (addlResult === constants.resultFlag.error) {
                return response.render('students/addStudent', { errors: {} })
            }
            return response.render('students/index', { errors: {} })

        } catch (error) {
            console.log("[addStudent controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while adding student" } })
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
            console.log("[searchStudent controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while searching student" } })
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
            const age = request.body.age;
            const address = request.body.address;
            const blood_group = request.body.blood_group;

            const data = {
                name: name,
                stream: stream,
                department: department,
                batch: batch,
                dob: dob,
                mobile_no: mobile_no,
                email: email
            }

            const addlData = {
                student_id: id,
                age: age,
                address: address,
                blood_group: blood_group
            }

            const updatedResult = await models.updateStudentById(data, id);
            const updateAddlData = await models.updateStudentDetail(addlData, id)
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
            console.log("[updateStudent controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while updating student details" } })
        }
    },

    deleteStudent: async function (request, response) {
        try {
            const studentId = request.params.student_id;
            const result = await models.deleteStudentById(studentId);
            if (result === constants.resultFlag.error) {
                return response.render('students/index', { errors: { opsError: "Something went wrong while deleting student" } })
            }
            return response.render('students/index', { errors: { opsError: "Student deleted successfully" } })
        } catch (error) {
            console.log("[deleteStudent controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while deleting student" } })
        }
    }
}