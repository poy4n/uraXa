const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// require the exported routs
const sessionController = require('./controllers/sessionController');
const usersController = require('./controllers/usersController');
const potsController = require('./controllers/postsController');
const tagsController = require('./controllers/tagsController');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

//middleware which will parse JSON request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json({welcome: 'uraxa_api'})
});

// use the controller, the order is important, that's why it's located after the '/' rout
app.use('/api', usersController);
app.use('/api', sessionController);
app.use('/api', potsController);
app.use('/api', tagsController);

app.listen(PORT, () => {
    console.log(`uraxa_api listening on ${PORT}`);    
})