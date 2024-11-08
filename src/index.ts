import express from 'express';
import logger from './logger/logger';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  logger.error('error');
logger.warn('warn');
logger.info('info');
logger.verbose('verbose');
logger.debug('debug');
logger.silly('silly');

  res.send('Hello World!');
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});