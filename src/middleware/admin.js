const { userRoles } = require('../models/user.model');

module.exports = (req, res, next) => {
  if (req.user.role !== userRoles.admin) {
    return res.status(403).send('Access denied.');
  }
  next();
};
