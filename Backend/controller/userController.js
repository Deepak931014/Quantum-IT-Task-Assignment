const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, dateOfBirth, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, dateOfBirth, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, dateOfBirth, email } = req.body;

  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.name = name;
      user.dateOfBirth = dateOfBirth;
      user.email = email;
      await user.save();

      res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and delete the user by ID
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
