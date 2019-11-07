import express from 'express';
import {
  entriesCreate, entriesModify, entriesDelete, entriesAll, entriesParticular,
} from '../controllers/entry';
import entryValidator from '../../validators/entryValidator';
import paramsHandler from '../middleware/paramsHandler';
import checkValidUser from '../middleware/checkValidUser';
import checkEntryAll from '../middleware/checkEntryAll';
import checkUserEntry from '../middleware/checkUserEntry';
import checkAuth from '../../validators/checkAuth';

const router = express.Router();
router.post('/entries', [checkAuth, checkValidUser, entryValidator], entriesCreate);
router.patch('/entries/:entryId', [paramsHandler, checkAuth, checkValidUser, checkUserEntry, entryValidator], entriesModify);
router.delete('/entries/:entryId', [paramsHandler, checkAuth, checkValidUser, checkUserEntry], entriesDelete);
router.get('/entries', [checkAuth, checkValidUser, checkEntryAll], entriesAll);
router.get('/entries/:entryId', [paramsHandler, checkAuth, checkValidUser, checkUserEntry], entriesParticular);

export default router;
