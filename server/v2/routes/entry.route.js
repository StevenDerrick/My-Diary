import express from 'express';
import {
  entriesCreate, entriesModify, entriesDelete, entriesAll,
} from '../controllers/entry';
import entryValidator from '../../validators/entryValidator';
import checkEntryAll from '../middleware/checkEntryAll';
import checkUserEntry from '../middleware/checkUserEntry';
import checkAuth from '../../validators/checkAuth';

const router = express.Router();
router.post('/entries', [checkAuth, entryValidator], entriesCreate);
router.patch('/entries/:entryId', [checkAuth, checkUserEntry, entryValidator], entriesModify);
router.delete('/entries/:entryId', [checkAuth, checkUserEntry], entriesDelete);
router.get('/entries', [checkAuth, checkEntryAll], entriesAll);

export default router;
