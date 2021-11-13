const express = require('express');
const mongoose = require('mongoose')
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
const port = process.env.PORT || 3000;
app.listen(port,function () {
			console.log(`Server listening to requests on localhost:${port}`);
});