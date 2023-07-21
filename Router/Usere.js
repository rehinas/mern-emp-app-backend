const express = require('express');
const router = express.Router();
const userModel = require('../model/User');
const mongoose = require('mongoose');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  let userRole;

  try {
    if (name === 'admin' && password === 'admin') {
      userRole = 'admin';
    } else if (name === 'name' && password === 'password') {
      userRole = 'user';
    } else {
      return res.json({ message: 'Login failed' });
    }

    const user = await userModel.findOne({ name, password });

    if (!user) {
      return res.json({ message: 'Login failed' });
    }

    user.user = userRole;
    await user.save();

    return res.json({ message: 'Login success', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;





