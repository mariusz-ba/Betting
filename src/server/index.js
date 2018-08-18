// Module dependencies
import path from 'path';
import app from './app';
import wds from './wds';
wds(app);


// Send react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


// Start listenning
app.listen(3000, () => console.log(`Running on localhost:3000`));
