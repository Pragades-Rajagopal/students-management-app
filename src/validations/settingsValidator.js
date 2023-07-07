const { check } = require('express-validator');

module.exports = {
    addDepartment: [
        check('department')
            .isLength({ min: 1, max: 100 })
            .withMessage('Department is mandatory')
    ],

    addStream: [
        check('stream')
            .isLength({ min: 1, max: 100 })
            .withMessage('Stream is mandatory')
    ]
}