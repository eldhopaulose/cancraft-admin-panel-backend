var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var adminRouter = require('./routes/adminRoutes');

app.use(bodyParser.json()); 

app.use('/api/admin', adminRouter); 

app.get('/', function (req, res) {
    res.send('welcome to cancraft admin panel backend!');
})

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
