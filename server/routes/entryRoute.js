import express from 'express';
import { entriesCreate } from '../controllers/entry';
import entryValidator from '../middleware/entryValidator';
import checkAuth from '../middleware/checkAuth';

const router = express.Router();
router.post('/entries', [checkAuth, entryValidator], entriesCreate);

export default router;
