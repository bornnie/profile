const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

//DB Setup
mongoose.connect(process.env.CONN,{
				useNewUrlParser:true,
				useUnifiedTopology:true
});

mongoose.connection.once('open', function(){
				console.log('Connection Done');
}).on("error", function (err) {
			console.log('Connection Error', err);
});

//req and body parsers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
				secret:process.env.SECRET,
				resave:false,
				saveUninitialized: false
}));
//FLASH CONFIG
app.use(flash());

//routes
const userRoutes = require('./routes/router');
app.use('/users', userRoutes);

//public and views
app.use(express.static('public'));
app.set('view engine','ejs');

const port = process.env.PORT || 3000;
app.listen(port,function () {
			console.log(`Server listening to requests on localhost:${port}`);
});
