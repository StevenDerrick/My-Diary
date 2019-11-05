import express from 'express';
import Responsender from '../helpers/responseHandler';
import { STATUS_CODE_OK } from '../helpers/statusCodeHandler';
import entries from '../models/Entries';

const app = express();
app.use(express.json);


exports.entriesCreate = (req, res) => {
  const response = new Responsender();
  const newEntry = {
    id: entries.length + 1,
    userId: req.userData.userId,
    createdOn: new Date().toDateString(),
    title: req.body.title,
    description: req.body.description,
  };
  entries.push(newEntry);
  const { userId, ...newObject } = newEntry;
  response.successful(STATUS_CODE_OK, 'entry created successfully', newObject);
  return response.send(res);
};


exports.entriesModify = (req, res) => {
  const response = new Responsender();
  const entry = entries.filter((c) => c.userId === req.userData.userId);
  const entryFind = entry.find((c) => c.id === parseInt(req.params.entryId));

  const entryIndex = entry.findIndex((etr) => etr.id === parseInt(req.params.entryId));
  entry[entryIndex].title = req.body.title;
  entry[entryIndex].description = req.body.description;

  response.successful(STATUS_CODE_OK, 'entry edited successfully', {
    id: entryFind.id,
    title: entryFind.title,
    description: entryFind.description,
  });
  return response.send(res);
};


exports.entriesDelete = (req, res) => {
  const response = new Responsender();
  const entryIndex = entries.findIndex((etr) => etr.id === parseInt(req.params.entryId));
  entries.splice(entryIndex, 1);

  response.successful(STATUS_CODE_OK, 'entry deleted successfully', null);
  return response.send(res);
};

exports.entriesAll = (req, res) => {
  const response = new Responsender();
  const entry = entries.filter((c) => c.userId === req.userData.userId);
  const newArray = entry.map(({ userId, ...item }) => item);
  newArray.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));

  response.successful(200, null, newArray);
  return response.send(res);
};

exports.entriesParticular = (req, res) => {
  const response = new Responsender();
  const entry = entries.filter((c) => c.userId === req.userData.userId);
  const specificEntry = entry.filter((etr) => etr.id === parseInt(req.params.entryId));
  const newArray = specificEntry.map(({ userId, ...item }) => item);
  const specificEntryObject = newArray.find((etry) => etry.id === parseInt(req.params.entryId));

  response.successful(STATUS_CODE_OK, null, specificEntryObject);
  return response.send(res);
};
