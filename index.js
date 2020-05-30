const express = require('express')
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request')

const PORT = process.env.PORT ||5000;

//api key pk_794b5343bab747e6b52266260ef9801a 

//create api function
function call_api(finishedAPI){
	request('https://cloud.iexapis.com/stable/stock/XOM/quote?token=pk_794b5343bab747e6b52266260ef9801a', { json: true }, (err, res, body) =>{
	
	if(err){return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
	};
});
};



//Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "Hello there, this is other stuff!";

//Set handlebar routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
	 	res.render('home',{
		stock: doneAPI
		});	
	});
});


//create about page route
app.get('/about.html', function (req, res) {
    res.render('about')
});


// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('server listening on port ' +PORT));
	 