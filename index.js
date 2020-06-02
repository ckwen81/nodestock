const express = require('express')
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT ||5000;

//api key pk_794b5343bab747e6b52266260ef9801a 
//https://cloud.iexapis.com/v1
//HTTP REQUEST
//GET /stock/{symbol}/largest-trades
//use body parser middleware

app.use(bodyParser.urlencoded({extended: false}));

//create api function
function call_api(finishedAPI, ticker){
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_794b5343bab747e6b52266260ef9801a', { json: true }, (err, res, body) =>{
	
	if(err){return console.log(err);}
	if (res.statusCode === 200){ 
		//console.log(body);
		finishedAPI(body);
	};
});
};
 //api b6f8c82c3c1425d3187a5c4033934bc4 

//http://data.fixer.io/api/convert?access_key=b6f8c82c3c1425d3187a5c4033934bc4&from=USD&to=EUR&amount=25&format=1
 //convert price to euros

 function convert(convPrice, price){
 	request('http://data.fixer.io/api/convert?access_key=b6f8c82c3c1425d3187a5c4033934bc4&from=USD&to=EUR&amount='+ price +'&format=1', { json: true }, (err, res, body) =>{
	
	if(err){return console.log(err);}
	if (res.statusCode === 200){ 
		//console.log(body);
		price(body);
	};
});
 };


//Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "Hello there, this is other stuff!";

//Set handlebar GET routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
	 	res.render('home',{
		stock: doneAPI,
		});	
	}, 'veri');
});

//Set handlebar POST routes
app.post('/', function (req, res) {
	call_api(function(doneAPI){
		 
	 	res.render('home',{
		stock: doneAPI,
		});	
	}, req.body.stock_ticker);
});

//create about page route
app.get('/about.html', function (req, res) {
    res.render('about')
});


// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('server listening on port ' +PORT));
	 