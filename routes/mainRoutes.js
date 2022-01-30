const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainRoutes');
const fileUpload = require('../middleware/multerMD');
const authMD = require('../middleware/authMD');
const guestMD = require('../middleware/guestMD')

router.get('/', guestMD, controller.login);
router.post('/', controller.loginProcess);
router.get('/register', guestMD, controller.register);
router.post('/register', fileUpload.single('image'), controller.store);
router.get('/profile', authMD, controller.profile);
router.post('/logout', controller.logout)
router.get('/home', authMD, controller.home);

module.exports = router;