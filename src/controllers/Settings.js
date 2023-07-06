const models = require('../models/Settings');

module.exports = {
    getIndex: function (request, response) {
        return response.render('settings/index')
    }
}