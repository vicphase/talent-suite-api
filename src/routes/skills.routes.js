const express = require('express');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const skillsController = require('../controllers/skills.controller')();

const router = express.Router();

router.get('/', auth, skillsController.getAll);

router.get('/:id', [auth, validateObjectId], skillsController.get);

router.post('/', auth, skillsController.post);

router.put('/:id', auth, skillsController.put);

router.delete('/:id', auth, skillsController.delete);

module.exports = router;
