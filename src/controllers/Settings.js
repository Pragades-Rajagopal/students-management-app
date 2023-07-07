const { validationResult } = require('express-validator')
const models = require('../models/Settings');
const constants = require('../config/constants');

module.exports = {
    getIndex: async function (request, response) {
        const departmentData = await getAllDepartments()
        const streamData = await getAllStreams()
        return response.render('settings/index', { message: {}, departmentData: departmentData, streamData: streamData })
    },

    addDepartment: async function (request, response) {
        try {
            const departmentData = await getAllDepartments()
            const streamData = await getAllStreams()
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.render('settings/index', { message: errors.mapped(), departmentData: departmentData, streamData: streamData })
            }
            let name = request.body.department;
            name = String(name).trim()
            const result = await models.addDepartment(name);
            if (result === constants.resultFlag.error) {
                return response.render('settings/index', { message: { errDept: 'Unable to add department' }, departmentData: departmentData, streamData: streamData })
            }
            return response.render('settings/index', { message: { successDepartment: 'Department added successfully' }, departmentData: departmentData, streamData: streamData })
        } catch (error) {
            console.log("[addDepartment controller] error: ", error);
            return response.render('settings/index', { message: { errDept: 'Unable to add department' }, departmentData: departmentData, streamData: streamData })
        }
    },

    addStream: async function (request, response) {
        try {
            const departmentData = await getAllDepartments()
            const streamData = await getAllStreams()
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.render('settings/index', { message: errors.mapped(), departmentData: departmentData, streamData: streamData })
            }
            let name = request.body.stream;
            name = String(name).trim()
            const result = await models.addStream(name);
            if (result === constants.resultFlag.error) {
                return response.render('settings/index', { message: { errStream: 'Unable to add stream' }, departmentData: departmentData, streamData: streamData })
            }
            return response.render('settings/index', { message: { successStream: 'Stream added successfully' }, departmentData: departmentData, streamData: streamData })
        } catch (error) {
            console.log("[addStream controller] error: ", error);
            return response.render('settings/index', { message: { errStream: 'Unable to add stream' }, departmentData: departmentData, streamData: streamData })
        }
    }
}

const getAllDepartments = async () => {
    try {
        return await models.getDepartment();
    } catch (error) {
        console.log('[getAllDepartments] error: ', error)
        return null
    }
}

const getAllStreams = async () => {
    try {
        return await models.getStream();
    } catch (error) {
        console.log('[getAllStreams] error: ', error)
        return null
    }
}