const express = require('express')

const app = express();

const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');

const PORT = process.env.PORT || 3300;

//Assets

app.use(express.static('public'))


//Page path render
app.get('/', (req,res) => {
    res.render('home')
})


//set Templates engine
 
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})