import express from 'express';
import user from './userRoute';
import entry from './entryRoute';
import Responsender from '../helpers/responseHandler';
import { STATUS_CODE_OK, BAD_REQUEST_STATUS_CODE } from '../helpers/statusCodeHandler';

const app = express();

app.use('/api/v1/', user);
app.use('/api/v1/', entry);
app.get('/', (req, res) => {
  res.status(STATUS_CODE_OK);
  res.setHeader('Content-Type', 'text/html;charset=utf8');
  res.end(`<h1>WELCOME TO My-Diary</h1>\nTo get started with My-Diary API, use this <a href="https://documenter.getpostman.com/view/9247920/SVzw51AC
      ">documentation.</a>`);
});
app.use((req, res) => {
  const response = new Responsender();
  response.error(BAD_REQUEST_STATUS_CODE, 'No such endpoint');
  return response.send(res);
});


export default app;
