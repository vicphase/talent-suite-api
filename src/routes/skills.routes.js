const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const skillsController = require('../controllers/skills.controller')();

const router = express.Router();

router.get('/', skillsController.getAll);

router.get('/:id', validateObjectId, skillsController.get);

router.post('/', skillsController.post);

router.put('/:id', skillsController.put);

router.delete('/:id', skillsController.delete);

module.exports = router;
