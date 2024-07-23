const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User'); // Adjust the path to your User model

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Change this to a strong secret key

// Sign up route
router.post(
  '/createUser',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('location').notEmpty().withMessage('Location is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await User.create({
        name: req.body.name,
        Email: req.body.email,  // Ensure the field name matches your model definition
        password: hashedPassword,
        location: req.body.location
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Sign in route
router.post(
  '/signinUser',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ Email: req.body.email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid email ' });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid  password' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ success: true, token, name: user.name });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
