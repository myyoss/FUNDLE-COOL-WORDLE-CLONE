import express from 'express';
const router = express.Router();

import {addUser,getUser, updateUser,loadUser} from "../controllers/usersCont"
// import {isAdmin} from '../middleWear/isAdmin'

router
// .get('/get-user', isAdmin, getUser)
.get('/get-user', getUser)
.get('/load-user',loadUser)
.post('/add-user',addUser)
.patch('/update-user',updateUser)


export default router;