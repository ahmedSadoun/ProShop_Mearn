import express from 'express'
const router = express.Router();
import {authUser ,registerUser, userProfile ,updatUserProfile} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/login').post(authUser)
//if we are using this url with the get and put methods 
router.route('/profile').get(protect,userProfile).put(protect,updatUserProfile)
export default router;


