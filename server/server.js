const express  = require('express');
const app = express();
const Port = 7700;
const cors = require('cors');
const bodyParser = require('body-parser');
const { rootRouter } = require('./src/routers/root.router');

// set up
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
rootRouter(app);

app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
})