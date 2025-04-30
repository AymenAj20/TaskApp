const express = require ('express')
const router = express.Router()
const mailer = require('../controllers/MailerController')

router.get('/', mailer.sendMail);
//router.post('/forgotPassword', forgotPassword);
//router.post('/verifyResetCode', verifyPassResetCode);
//router.put('/resetPassword', resetPassword);


module.exports = router