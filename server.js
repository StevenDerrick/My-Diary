import dotenv from 'dotenv';
import app from './server/v2/app';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  process.stdout.write(`Listening on port ${port}...`);
});
