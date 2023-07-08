const studentsModel = require('../models/Students');
const settingsModel = require('../models/Settings')
const constants = require('../config/constants')
const { validationResult } = require('express-validator');
const { bloodGroup } = require('../config/studentDataConfig')

module.exports = {
    getIndex: function (request, response) {
        return response.render('students/index', { errors: {} })
    },

    getAddstudent: async function (request, response) {
        const departmentData = await getAllDepartments()
        const streamData = await getAllStreams()
        return response.render('students/addStudent',
            {
                errors: {},
                bloodGroup: bloodGroup,
                departmentData: departmentData,
                streamData: streamData
            })
    },

    addStudent: async function (request, response) {
        try {
            const departmentData = await getAllDepartments()
            const streamData = await getAllStreams()
            const validationErrors = validationResult(request);
            if (!validationErrors.isEmpty()) {
                return response.render('students/addStudent', {
                    errors: validationErrors.mapped(),
                    bloodGroup: bloodGroup,
                    departmentData: departmentData,
                    streamData: streamData
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

            const result = await studentsModel.insertStudent(data);
            if (result.msg === constants.resultFlag.error) {
                return response.render('students/addStudent', {
                    errors: {},
                    bloodGroup: bloodGroup,
                    departmentData: departmentData,
                    streamData: streamData
                })
            }
            const studentId = result.result.ID;
            const addlData = {
                student_id: studentId,
                age: age,
                address: address,
                blood_group: blood_group
            }
            const addlResult = await studentsModel.insertStudentDetail(addlData);
            if (addlResult === constants.resultFlag.error) {
                return response.render('students/addStudent', {
                    errors: {},
                    bloodGroup: bloodGroup,
                    departmentData: departmentData,
                    streamData: streamData
                })
            }
            return response.render('students/index', { errors: {} })

        } catch (error) {
            console.log("[addStudent controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while adding student" } })
        }
    },

    searchStudent: async function (request, response) {
        try {
            const departmentData = await getAllDepartments()
            const streamData = await getAllStreams()
            const validationErrors = validationResult(request)
            if (!validationErrors.isEmpty()) {
                return response.render('students/index', { errors: validationErrors.mapped() })
            }
            const studentId = request.body.student_id;
            const studentData = await studentsModel.getStudentById(studentId)
            if (!studentData) {
                return response.render('students/index', { errors: { noData: "Student does not exists" } })
            }
            return response.render('students/searchStudent', {
                data: studentData,
                errors: {},
                bloodGroup: bloodGroup,
                departmentData: departmentData,
                streamData: streamData
            })
        } catch (error) {
            console.log("[searchStudent controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while searching student" } })
        }
    },

    updateStudent: async function (request, response) {
        try {
            const departmentData = await getAllDepartments()
            const streamData = await getAllStreams()
            const id = request.body.id;
            const studentData = await studentsModel.getStudentById(id)
            const validationErrors = validationResult(request);
            if (!validationErrors.isEmpty()) {
                return response.render('students/searchStudent', {
                    errors: validationErrors.mapped(),
                    data: studentData,
                    bloodGroup: bloodGroup,
                    departmentData: departmentData,
                    streamData: streamData
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

            const updatedResult = await studentsModel.updateStudentById(data, id);
            const updateAddlData = await studentsModel.updateStudentDetail(addlData, id)
            if (updatedResult === constants.resultFlag.error) {
                return response.render('students/searchStudent', {
                    errors: { updateError: "Unable to update data" },
                    data: studentData,
                    bloodGroup: bloodGroup,
                    departmentData: departmentData,
                    streamData: streamData
                })
            }
            const updatedStudentData = await studentsModel.getStudentById(id);
            return response.render('students/searchStudent', {
                errors: { successMsg: "Data updated successfully" },
                data: updatedStudentData,
                bloodGroup: bloodGroup,
                departmentData: departmentData,
                streamData: streamData
            })

        } catch (error) {
            console.log("[updateStudent controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while updating student details" } })
        }
    },

    deleteStudent: async function (request, response) {
        try {
            const studentId = request.params.student_id;
            const result = await studentsModel.deleteStudentById(studentId);
            if (result === constants.resultFlag.error) {
                return response.render('students/index', { errors: { opsError: "Something went wrong while deleting student" } })
            }
            return response.render('students/index', { errors: { opsError: "Student deleted successfully" } })
        } catch (error) {
            console.log("[deleteStudent controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while deleting student" } })
        }
    },

    getStudentDetails: async function (request, response) {
        try {
            const data = await studentsModel.getStudentData();
            return response.render('students/details-page', { data: data })
        } catch (error) {
            console.log("[getStudentDetails controller] error: ", error)
            return response.render('students/index', { errors: { opsError: "Something went wrong while deleting student" } })
        }
    }
}

const getAllDepartments = async () => {
    try {
        return await settingsModel.getDepartment();
    } catch (error) {
        console.log('[getAllDepartments] error: ', error)
        return null
    }
}

const getAllStreams = async () => {
    try {
        return await settingsModel.getStream();
    } catch (error) {
        console.log('[getAllStreams] error: ', error)
        return null
    }
}