//express library for server
//for more: expressjs.com
//for express engine: http://handlebarsjs.com/ 
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // this is for heroku or use port 3000 as defult
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//using middleware:

//create our middleware, register it:
app.use((req, res, next) =>{
var now = new Date().toString();// obtain date in format
var log = now +':'+ req.method + req.url;
//printing the path of user typing in chrome
//console.log(now +':'+ req.method + req.url);
fs.appendFile('server.log', log + '\n', (err) => {
if(err){
	console.log('unable to append to server.log');
}	
});
next();//we need this to start our app

});
/*  remove this /* if you want to put your website in maintenance 
app.use((req, res, next) =>{
	res.render('maintenance.hbs');
}); //udinh this without next(); will let all user request go to maintenance page directly.
*/
app.use(express.static(__dirname + '/public')); //mske this line after maintenance so user will not be able to access the page unless maintenance function is commented
hbs.registerHelper('getCurrentYear',()=> {
return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
})
//http rout handler:
//handler to get from user

app.get('/', (req, res)=>{
/*//res.send('<h1>hello express</h>'); // if someone view website will see this message
res.send({ //sending object which will be presented as json file in browser
	name: 'Tarneem',
	likes: [
'biking',
'cities'
	]
}); */
res.render('home.hbs', {
	pageTitle: 'Home page',
	welcomeMessage: 'welcome to my page',
	
});
});

app.get('/about', (req, res) =>{
	//sending dynamic variable to be used in about.hbs file
res.render('about.hbs', {
	pageTitle: 'About page',
	
});// static page rendering
});

//error page:
app.get('/bad', (req, res) =>{
res.send({
erorrMessage: 'Unable to handle request'
});
});
app.listen(3000, () => {
	console.log('server is up on ' + port);
}); //port to develop locally for local server
