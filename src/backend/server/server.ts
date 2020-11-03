import * as express from 'express';
require('dotenv').config();
const bodyParser = require('body-parser');
const api = require('./routes/api.ts');
const cors = require('cors');

const PORT = process.env.PORT; // || 3000
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

// HEROKU SECTION

// const path = require('path');
app.use(express.static('/app/dist/DEOM'));
app.get('/*', (req: express.Request, res: express.Response) => res.sendFile('/app/dist/DEOM/index.html'));

// HEROKU


app.get('/', (req: express.Request, res: express.Response) => res.send('Server working!'));

app.listen(PORT, () => console.log('Server running on localhost:' + PORT));
