import express from 'express';
import { usersSignUp, usersSignIn } from '../controllers/user';
import signUpValidator from '../middleware/signupValidator';
import signinValidator from '../middleware/signinValidator';
import checkUser from '../middleware/checkUser';

const router = express.Router();
router.post('/auth/signup', [signUpValidator, checkUser], usersSignUp);
router.post('/auth/signIn', signinValidator, usersSignIn);

export default router;
