const Router = require('express').Router();
const { getMainPage, healthCheck } = require('../controllers/mainpage')
const studentsController = require('../controllers/Students')
const validators = require('../validations/validator')

Router.get('/health-check', healthCheck)
Router.get('/home', getMainPage)

Router.get('/students', studentsController.getIndex)
Router.get('/students/add', studentsController.getAddstudent)
Router.post('/students/add', validators.addStudent, studentsController.addStudent)
Router.post('/students/search', validators.searchStudent, studentsController.searchStudent)
Router.post('/students/update', validators.updateStudent, studentsController.updateStudent)
Router.get('/students/delete/:student_id', studentsController.deleteStudent)

module.exports = Router;