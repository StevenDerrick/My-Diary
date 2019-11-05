import express from 'express';
import { entriesCreate } from '../controllers/entry';
import entryValidator from '../../validators/entryValidator';
import checkAuth from '../../validators/checkAuth';

const router = express.Router();
router.post('/entries', [checkAuth, entryValidator], entriesCreate);

export default router;
