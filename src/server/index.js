// Module dependencies
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import wds from './wds';

const app = express();
wds(app);


// Configuration
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);


// Middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, '../../dist')));


// Main
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


// Start listenning
app.listen(
  app.get('port'),
  () => console.log(`Running on localhost:${app.get('port')}`)
);
