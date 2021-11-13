const express = require('expresw');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port,function () {
			console.log(`Server listening to requests on localhost:${port}`);
});