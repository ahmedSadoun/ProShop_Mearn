import express from 'express'
const router = express.Router();
import { authUser, registerUser, userProfile, updatUserProfile, getUsers, deleteUser, getUserByID, updatUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/login').post(authUser)
//if we are using this url with the get and put methods 
router.route('/profile').get(protect, userProfile).put(protect, updatUserProfile)
router.route('/users').get(protect, admin, getUsers)
router.route('/:id').delete(protect, admin, deleteUser)
    .get(protect, admin, getUserByID)
    .put(protect, admin, updatUser)
export default router;


