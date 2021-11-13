const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();

//DB Setup
mongoose.connect(process.env.CONN);
mongoose.connection.once('open',()=>console.log(`Connection Established`)).on('error', err=>console.log(`Connection Error:${err}`));
const port = process.env.PORT || 3000;
app.listen(port,function () {
			console.log(`Server listening to requests on localhost:${port}`);
});