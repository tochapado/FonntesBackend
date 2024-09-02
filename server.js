const path = require('path');
const express = require('express');
const cors = require('cors');
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

// CORS Middleware
app.use(
    cors({
        origin: [
            'http://localhost:6969',
            'http://localhost:3000',
        ],
        credentials: true,
    })
);

app.get('/', function(req, res) {
    res.send('rola');
});

app.use('/api/rolas', rolaRouter);

app.listen(port, function() {
    return console.log('Server on port ' + port);
});