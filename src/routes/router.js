const Router = require('express').Router();
const { getMainPage, healthCheck } = require('../controllers/mainpage')
const studentsController = require('../controllers/Students')

Router.get('/health-check', healthCheck)
Router.get('/home', getMainPage)

Router.get('/students', studentsController.getIndex)
Router.get('/students/add', studentsController.getAddstudent)
Router.post('/students/add', studentsController.addStudent)

module.exports = Router;