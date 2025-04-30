const express = require ('express')
const router = express.Router()
const taskController = require('../controllers/TaskController')


//const uploadOptions = imageUpload.uploadOptions 

router.get('/user/:userID',taskController.getUserTasks) 
router.get('/',taskController.getAllTasks) 
router.get('/:id',taskController.getTaskById) 
router.post('/:userID',taskController.addTaskToUser)
//router.put('/:id',uploadOptions.single('image'),adminController.updateUser)
router.delete('/:id',taskController.deleteTaskById)

module.exports = router