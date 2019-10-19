import express from 'express';
import { entriesCreate, entriesModify, entriesDelete } from '../controllers/entry';
import entryValidator from '../middleware/entryValidator';
import checkAuth from '../middleware/checkAuth';
import checkUserEntry from '../middleware/checkUserEntry';

const router = express.Router();
router.post('/entries', [checkAuth, entryValidator], entriesCreate);
router.patch('/entries/:entryId', [checkAuth, checkUserEntry, entryValidator], entriesModify);
router.delete('/entries/:entryId', [checkAuth, checkUserEntry], entriesDelete);

export default router;
