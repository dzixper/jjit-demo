import * as express from 'express';
require('dotenv').config();
const bodyParser = require('body-parser');
const api = require('./routes/api.ts');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.use(express.static('/app/dist/DEOM'));
app.get('/*', (req: express.Request, res: express.Response) => res.sendFile('/app/dist/DEOM/index.html'));



app.get('/', (req: express.Request, res: express.Response) => res.send('Server working!'));

app.listen(PORT, () => console.log('Server running on port: ' + PORT));
