import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js';
//@desc Fetch a user 
//@route Post /user/logIn
//@access Public
const authUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            idAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    } else {
        throw new Error('Invalid email or passwrod')
    }
})
//@desc register a new user 
//@route Post /users
//@access Public
const registerUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userIsExisted = await User.findOne({ email })
    if (userIsExisted) {
        res.status(404);
        throw new Error('The user is already exists.')
    } else {
        const user = await User.create({
            name,
            email,
            password
        });
        if (user) {
            res.status(201);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                idAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(404);
            throw new Error('User not found')
        }
    }
})

//@desc get a user profile
//@route get /user/logIn/profile
//@access Public
const userProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            idAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    //res.send("success");
})

//@desc update the user profile 
//@route Put /user/logIn/profile
//@access Private : means that we need to logged in to see access this endpoint
const updatUserProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            //and this will be encrypted automatically 
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            idAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    //res.send("success");
})

//@desc get all the users
//@route Get /users
//@access  Private/ADMIN : means that we need to logged in to see access this endpoint
const getUsers = AsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send(users);
    //res.send("success");
})
//@desc get a user by its id
//@route Get api/users/:id
//@access  Private/ADMIN : means that we need to logged in to see access this endpoint
const getUserByID = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user);
    } else {
        res.status(404)
        throw new Error('No users were founded')
    }
    //res.send("success");
})

//@desc delete a user
//@route delete /users/:id
//@access Private/ADMIN : means that we need to logged in to see access this endpoint
const deleteUser = AsyncHandler(async (req, res) => {
    //req.params.id : we use in order to get the data from the url 
    //req.body.id : in order to get the data from the request data body " the payload "
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove();
        res.json({ Message: 'user deleted' })
    } else {
        res.status(404)
        throw new Error(' user is not found')
    }

})


//@desc update the user profile admin 
//@route Put /users/:id
//@access Private/ADMIN : means that we need to logged in to see access this endpoint
const updatUser = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.idAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    //res.send("success");
})


export { authUser, registerUser, userProfile, updatUserProfile, getUsers, deleteUser, getUserByID, updatUser };