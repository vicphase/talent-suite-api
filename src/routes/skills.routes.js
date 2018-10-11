const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const skillsController = require('../controllers/skills.controller')();
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', skillsController.getAll);

router.get('/:id', validateObjectId, skillsController.get);

router.post('/', admin, skillsController.post);

router.put('/:id', skillsController.put);

router.delete('/:id', skillsController.delete);

module.exports = router;
