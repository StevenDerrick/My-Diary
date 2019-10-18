import express from 'express';
import entries from '../models/Entries';

const app = express();
app.use(express.json);

exports.entriesCreate = (req, res) => {
  const newEntry = {
    id: entries.length + 1,
    createdOn: new Date(),
    title: req.body.title,
    description: req.body.description,
  };
  entries.push(newEntry);
  res.status(200).json({
    status: 200,
    data: {
      id: newEntry.id,
      message: 'entry successfully created',
      createdOn: newEntry.createdOn,
      title: newEntry.title,
      description: newEntry.description,
    },
  });
};
