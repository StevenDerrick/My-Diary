import express from 'express';
import { entriesCreate, entriesModify } from '../controllers/entry';
import entryValidator from '../../validators/entryValidator';
import checkUserEntry from '../middleware/checkUserEntry';
import checkAuth from '../../validators/checkAuth';

const router = express.Router();
router.post('/entries', [checkAuth, entryValidator], entriesCreate);
router.patch('/entries/:entryId', [checkAuth, checkUserEntry, entryValidator], entriesModify);

export default router;
