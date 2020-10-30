// app.use(express.static(__dirname + '/dist/DEOM'));
//
// app.get('/*', function(req,res) {
//   res.sendFile(path.join(__dirname+'/dist/DEOM/index.html'));
// });
//

import * as express from 'express';
const bodyParser = require('body-parser');
const api = require('./routes/api.ts');
const cors = require('cors');

const PORT = process.env.port || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

// HEROKU SECTION

app.use(express.static('../../../dist/DEOM'));
app.get('/*', (req: express.Request, res: express.Response) => res.sendFile('index.html', {root: '../../../dist/DEOM/'}));

// HEROKU


app.get('/', (req: express.Request, res: express.Response) => res.send('Server working!'));

app.listen(PORT, () => console.log('Server running on localhost:' + PORT));
