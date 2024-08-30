const express = require('express');
const port = 6969;

const app = express();

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