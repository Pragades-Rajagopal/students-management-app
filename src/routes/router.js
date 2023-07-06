const Router = require('express').Router();
const { getMainPage, healthCheck } = require('../controllers/mainpage')
const studentsController = require('../controllers/Students')
const settingsController = require('../controllers/Settings')
const validators = require('../validations/validator')

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
Router.post('/students/add', validators.addStudent, studentsController.addStudent)
Router.post('/students/search', validators.searchStudent, studentsController.searchStudent)
Router.post('/students/update', validators.updateStudent, studentsController.updateStudent)
Router.get('/students/delete/:student_id', studentsController.deleteStudent)
Router.get('/students/details', studentsController.getStudentDetails)

/**
 * Settings router
 */
Router.get('/settings', settingsController.getIndex)

module.exports = Router;