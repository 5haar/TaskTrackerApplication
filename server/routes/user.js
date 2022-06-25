const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create, find, update, delete
router.get('/', userController.view);
router.post('/', userController.find);

router.get('/addtask', userController.form);
router.post('/addtask', userController.create);
router.get('/edittask/:id', userController.edit);
router.post('/edittask/:id', userController.update);
router.get('/:id', userController.delete);


module.exports = router;