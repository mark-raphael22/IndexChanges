const router=require('express').Router();
const express = require('express');


const {   allDetail,
    createDetail,
    getSinglDetail,
    updateDetail,
    DeleteDetail,}=require('../Controller/PromptController')

const authRole=require('../middleware/AuthenticateUserRole');

router.route('/').get( allDetail ).post(createDetail);
router.route('/').get(getSinglDetail).patch(updateDetail).delete(DeleteDetail);


module.exports = router;  