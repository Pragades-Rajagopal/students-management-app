const { check } = require('express-validator');

module.exports = {
    addStudent: [
        check('name')
            .isLength({ min: 1 })
            .withMessage("Name is mandatory"),

        check('stream')
            .isLength({ min: 1 })
            .withMessage("Stream is mandatory"),

        check('department')
            .isLength({ min: 1 })
            .withMessage("Department is mandatory"),

        check('batch')
            .isLength({ min: 1 })
            .withMessage("Batch is mandatory"),

        check('dob')
            .isLength({ min: 1 })
            .withMessage("DOB is mandatory"),

        check('mobile_no')
            .isLength({ min: 1 })
            .withMessage("Mobile Number is mandatory"),

        check('mobile_no')
            .isLength({ max: 10 })
            .withMessage("Mobile Number should be of 10 digits"),

        check('mobile_no')
            .isNumeric()
            .withMessage("Mobile Number should be of 10 digit numbers"),

        check('blood_group')
            .isLength({ min: 1 })
            .withMessage("Blood Group is mandatory"),
    ],

    searchStudent: [
        check('student_id')
            .isLength({ min: 1 })
            .withMessage("Student ID is mandatory"),

        check('student_id')
            .isNumeric()
            .withMessage("Student ID should be a number"),
    ],

    updateStudent: [
        check('name')
            .isLength({ min: 1 })
            .withMessage("Name is mandatory"),

        check('stream')
            .isLength({ min: 1 })
            .withMessage("Stream is mandatory"),

        check('department')
            .isLength({ min: 1 })
            .withMessage("Department is mandatory"),

        check('batch')
            .isLength({ min: 1 })
            .withMessage("Batch is mandatory"),

        check('dob')
            .isLength({ min: 1 })
            .withMessage("DOB is mandatory"),

        check('mobile_no')
            .isLength({ min: 1 })
            .withMessage("Mobile Number is mandatory"),

        check('mobile_no')
            .isLength({ max: 10 })
            .withMessage("Mobile Number should be of 10 digits"),

        check('mobile_no')
            .isNumeric()
            .withMessage("Mobile Number should be of 10 digit numbers"),

        check('email')
            .isLength({ min: 1 })
            .withMessage("Email is mandatory"),

        check('blood_group')
            .isLength({ min: 1 })
            .withMessage("Blood Group is mandatory"),
    ]
}