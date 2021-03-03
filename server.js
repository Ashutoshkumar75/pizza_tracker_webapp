require('dotenv').config()
const express = require('express')
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3300;
const mogoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//Database connection
const url = 'mongodb+srv://ashu1234:YFPxiHXidf75Z5KU@cluster0.ltd5x.mongodb.net/pizza_shop?retryWrites=true&w=majority'

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}
mogoose.connect(url,connectionParams)
const connection = mogoose.connection;
connection.once('open',() => {
    console.log('Connected to database')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})


//Session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    store:new MongoStore({ mongooseConnection: mogoose.connection }),
    saveUninitialized:false,
     cookie:{maxAge:1000 * 60 * 60 * 24} //24hours
   
}))

app.use(flash())
//Assets
app.use(express.json())
app.use(express.static('public'))
app.use('/favicon.ico', express.static('/public/favicon.ico'));

//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})

//set Templates engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine', 'ejs');

//routes function Page path render

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})


