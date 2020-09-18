// const express = require('express');
// const path = require('path');
//
// const app = express();
// app.use(express.static(__dirname + '/dist/DEOM'));
//
// app.get('/*', function(req,res) {
//   res.sendFile(path.join(__dirname+'/dist/DEOM/index.html'));
// });
//
// app.listen(process.env.PORT || 8080);
//
// console.log("Server's working!");
// ^^ dziala na Heroku
const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api.ts");
const cors = require('cors');

const PORT = 3000;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api", api);

app.get("/", (req, res) => res.send("Server working!"));

app.listen(PORT, () => console.log("Server running on localhost:" + PORT));
