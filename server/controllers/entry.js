import express from 'express';
import entries from '../models/Entries';

const app = express();
app.use(express.json);


exports.entriesCreate = (req, res) => {
  const newEntry = {
    id: entries.length + 1,
    userId: req.userData.userId,
    createdOn: new Date(),
    title: req.body.title,
    description: req.body.description,
  };
  entries.push(newEntry);

  res.status(200).json({
    status: 200,
    data: {
      message: 'entry successfully created',
      id: newEntry.id,
      createdOn: newEntry.createdOn,
      title: newEntry.title,
      description: newEntry.description,
    },
  });
};

exports.entriesModify = (req, res) => {
  const entry = entries.filter((c) => c.userId === req.userData.userId);
  const entryFind = entry.find((c) => c.id === parseInt(req.params.entryId));

  const entryIndex = entry.findIndex((etr) => etr.id === parseInt(req.params.entryId));
  entry[entryIndex].title = req.body.title;
  entry[entryIndex].description = req.body.description;

  res.status(200).json({
    status: 200,
    data: {
      message: 'entry successfully edited',
      id: entryFind.id,
      title: entryFind.title,
      description: entryFind.description,
    },
  });
};


exports.entriesDelete = (req, res) => {
  const entryIndex = entries.findIndex((etr) => etr.id === parseInt(req.params.entryId));
  entries.splice(entryIndex, 1);
  res.status(200).json({
    status: 200,
    data: {
      message: 'entry successfully deleted',
    },
  });
};

exports.entriesAll = (req, res) => {
  const entry = entries.filter((c) => c.userId === req.userData.userId);
  const newArray = entry.map(({ userId, ...item }) => item);
  newArray.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));

  res.status(200).json({
    status: 200,
    data: newArray,
  });
};

exports.entriesParticular = (req, res) => {
  const entry = entries.filter((c) => c.userId === req.userData.userId);
  const specificEntry = entry.filter((etr) => etr.id === parseInt(req.params.entryId));
  const newArray = specificEntry.map(({ userId, ...item }) => item);
  const specificEntryObject = newArray.find((etry) => etry.id === parseInt(req.params.entryId));

  res.status(200).json({
    status: 200,
    data: specificEntryObject,
  });
};
