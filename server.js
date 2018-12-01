const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const url = require("url");
const product = require('./routes/product');
const port = process.env.PORT || 8090;
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.listen(port);
console.log('REST API is runnning at ' + port);

mongoose.connect('mongodb://localhost:27017/products');

router.use(function (req, res, next) {
	console.log('Logging of request will be done here');
	next(); // make sure we go to the next routes and don't stop here
});

app.use('/', router);
app.use('/product', product);


function start(route){
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(pathname);

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
