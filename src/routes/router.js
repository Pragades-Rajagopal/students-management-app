const Router = require('express').Router();
const { getMainPage, healthCheck } = require('../controllers/mainpage')
const studentsController = require('../controllers/Students')
const settingsController = require('../controllers/Settings')
const studentValidator = require('../validations/studentValidator')
const settingsValidator = require('../validations/settingsValidator')

/**
 * Homepage router
 */
Router.get('/health-check', healthCheck)
Router.get('/home', getMainPage)

/**
 * Students router
 */
Router.get('/students', studentsController.getIndex)
Router.get('/students/add', studentsController.getAddstudent)
Router.post('/students/add', studentValidator.addStudent, studentsController.addStudent)
Router.post('/students/search', studentValidator.searchStudent, studentsController.searchStudent)
Router.post('/students/update', studentValidator.updateStudent, studentsController.updateStudent)
Router.get('/students/delete/:student_id', studentsController.deleteStudent)
Router.get('/students/details', studentsController.getStudentDetails)

/**
 * Settings router
 */
Router.get('/settings', settingsController.getIndex)
Router.post('/settings/department/add', settingsValidator.addDepartment, settingsController.addDepartment)
Router.post('/settings/stream/add', settingsValidator.addStream, settingsController.addStream)
Router.post('/settings/department/delete', settingsValidator.deleteDepartment, settingsController.deleteDepartment)
Router.post('/settings/stream/delete', settingsValidator.deleteStream, settingsController.deleteStream)
Router.get('/students/export', studentsController.exportStudentData)

module.exports = Router;