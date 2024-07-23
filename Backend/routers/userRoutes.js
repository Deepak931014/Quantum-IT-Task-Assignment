// backend/routes/userRoutes.js
const express = require('express');
const { check } = require('express-validator');
const { getAllUsers, updateUser, deleteUser, registerUser, loginUser } = require('../controller/userController');
const router = express.Router();

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('dateOfBirth', 'Date of Birth is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
