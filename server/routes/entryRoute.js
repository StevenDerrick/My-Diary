import express from 'express';
import {
  entriesCreate, entriesModify, entriesDelete, entriesAll, entriesParticular,
} from '../controllers/entry';
import entryValidator from '../middleware/entryValidator';
import checkAuth from '../middleware/checkAuth';
import checkUserEntry from '../middleware/checkUserEntry';
import checkEntryAll from '../middleware/checkEntryAll';

const router = express.Router();
router.post('/entries', [checkAuth, entryValidator], entriesCreate);
router.patch('/entries/:entryId', [checkAuth, checkUserEntry, entryValidator], entriesModify);
router.delete('/entries/:entryId', [checkAuth, checkUserEntry], entriesDelete);
router.get('/entries', [checkAuth, checkEntryAll], entriesAll);
router.get('/entries/:entryId', [checkAuth, checkUserEntry], entriesParticular);

export default router;
