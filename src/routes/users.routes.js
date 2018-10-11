const express = require('express');
const admin = require('../middleware/admin');
const { User } = require('../models/user.model');

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 */
router.get('/', admin, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/me', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

module.exports = router;
