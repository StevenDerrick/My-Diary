import express from 'express';
import user from './userRoute';
import entry from './entryRoute';

const app = express();

app.use('/api/v1/', user);
app.use('/api/v1/', entry);
app.use((req, res) => res.status(400).json({
  status: 400,
  data: 'No such endpoint',
}));


export default app;
