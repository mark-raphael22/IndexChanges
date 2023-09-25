const router = require('express').Router();

const {
    register,
    login,
    forgetPassword
}=require('../Controller/Users')


router.post('/register', register);
router.post('/login', login);
router.patch('/forgotPassword', forgetPassword);

module.exports = router;      