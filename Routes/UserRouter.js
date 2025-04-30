const express = require ('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const imageUpload = require('../helpers/imageUpload')

const uploadOptions = imageUpload.uploadOptions 


router.get('/:id',userController.findUserById) 
router.post('/',uploadOptions.single('image'),userController.addUser)
//router.put('/:id',uploadOptions.single('image'),adminController.updateUser)
router.delete('/:id',userController.deleteUser)

module.exports = router