import express from 'express';
import Responsender from '../../helpers/responseHandler';
import { insert, selectLast } from '../../helpers/sqlQueries';
import { STATUS_CODE_OK } from '../../helpers/statusCodeHandler';

const app = express();
app.use(express.json);


exports.entriesCreate = async (req, res) => {
  const response = new Responsender();

  class Entry {
    constructor() {
      this.userId = req.userData.userId;
      this.createdOn = new Date().toDateString();
      this.title = req.body.title;
      this.description = req.body.description;
    }
  }
  const newEntry = new Entry();

  await insert('entries', 'userId, createdOn, title, description', '$1, $2, $3, $4',
    [newEntry.userId, newEntry.createdOn, newEntry.title, newEntry.description]);
  const rows = await selectLast('id, createdOn, title, description', 'entries');

  response.successful(STATUS_CODE_OK, 'entry created successfully', rows[0]);
  return response.send(res);
};
