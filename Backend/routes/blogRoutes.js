const express = require('express');
const { createBlogController,getAllUserController, getUserController, deleteUserController, editUserContoller, userBlogController } = require('../controller/blogController');

const router = express.Router();

router.post('/create-blog',createBlogController)
router.get('/all-blog',getAllUserController)
router.get('/all-blog/:id',getUserController)
router.put('/update-blog/:id',editUserContoller)
router.delete('/delete-blog/:id',deleteUserController)
// GET || user blog
router.get('/user-blog/:id',userBlogController)

module.exports = router