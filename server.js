const path = require('path');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 6969;
const connectDB = require('./config/db.js');

connectDB();

const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const rolaRouter = require('./routes/rolas.js');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('rola');
});

app.use('/api/rolas', rolaRouter);

app.listen(port, function() {
    return console.log('Server on port ' + port);
});