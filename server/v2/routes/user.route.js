import express from 'express';
import { usersSignUp } from '../controllers/user';
import signUpValidator from '../middleware/signupValidator';
import checkUser from '../middleware/checkUser';

const router = express.Router();
router.post('/auth/signup', [signUpValidator, checkUser], usersSignUp);

export default router;
