//Create a database named "mydb":
var url = "mongodb://localhost/mydb";
const mongoose=require('mongoose')
const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var cronFile=require('./utils/cronFile')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(8080, () => console.log('Example app listening on port 8080!',))
mongoose.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
//   db.close();
});

require('./routes/index')(app)

