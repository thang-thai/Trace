const express = require('express');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const loginController = {};

loginController.authUser = async (req, res, next) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const match = await bcrypt.compare(password, hash);
    if (match) {
      const user = await UserModel.find({ username, hash });
      if (user.length === 1) {
        res.locals.auth = { match, user };
        return next();
      } else {
        res.locals.auth = false;
        return next();
      }
    }
  } catch (error) {
    return next({
      log: 'ERROR: Error in loginController.authUser',
      msg: { err: 'ERROR: Error in loginController.authUser' },
    });
  }
};

module.exports = loginController;
