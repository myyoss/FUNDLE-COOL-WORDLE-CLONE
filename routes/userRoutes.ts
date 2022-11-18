import express from 'express';
const router = express.Router();

import { addUser, getUser, updateUser, loadUser, getOutUser, loadAllUsers } from "../controllers/usersCont"
// import {isAdmin} from '../middleWear/isAdmin'

router
    // .get('/get-user', isAdmin, getUser)
    .get('/get-user', getUser)
    .get('/get-out-user', getOutUser)
    .get('/load-all-users', loadAllUsers)
    .get('/load-user', loadUser)
    .post('/add-user', addUser)
    .patch('/update-user', updateUser)


export default router;