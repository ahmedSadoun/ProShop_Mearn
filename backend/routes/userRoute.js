import express from 'express'
const router = express.Router();
import { authUser, registerUser, userProfile, updatUserProfile, getUsers } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/login').post(authUser)
//if we are using this url with the get and put methods 
router.route('/profile').get(protect, userProfile).put(protect, updatUserProfile)
router.route('/users').get(protect, admin, getUsers)
export default router;


