import express from 'express';
import Responsender from '../../helpers/responseHandler';
import {
  insert, selectLast, update, select, remove,
} from '../../helpers/sqlQueries';
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

exports.entriesModify = async (req, res) => {
  const response = new Responsender();
  await update('entries', `title='${req.body.title}', description='${req.body.description}'`, `id='${req.params.entryId}' AND userid='${req.userData.userId}'`);
  const rows = await select('title, description, id', 'entries', `userid='${req.userData.userId}'`);
  const entryFind = rows.find((c) => c.id === parseInt(req.params.entryId));

  response.successful(STATUS_CODE_OK, 'entry edited successfully', {
    id: entryFind.id,
    title: entryFind.title,
    description: entryFind.description,
  });
  return response.send(res);
};

exports.entriesDelete = async (req, res) => {
  const response = new Responsender();

  const entryRemove = await remove('entries', 'id', `${req.params.entryId}`);

  response.successful(STATUS_CODE_OK, 'entry deleted successfully', null);
  return response.send(res);
};
