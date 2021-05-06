const express = require('express')
const http = require('http')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 1000
const bodyParser = require('body-parser')
const passport = require('passport')
const routes = require('./settings/routes.js') 
var cors = require('cors')
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(passport.initialize())
app.use(express.static('./webdev/'));
require('./middleware/passport')(passport)




routes(app)

app.use(function (req, res, next) {
	 res.set({
	        'Content-Type': 'text/plain',
	        'Access-Control-Allow-Origin': '*'
	    })
   next();
});


//Маршрутизация по сайту

// Главная страница 
app.get('/main', function(req, res){
		res.writeHead(200, {'Content-Type': 'text/html; Charset=UTF8'});
		fs.createReadStream('webdev/index.html').pipe(res)
})

app.get('/about', function(req, res){
		res.writeHead(200, {'Content-Type': 'text/html; Charset=UTF8'});
		fs.createReadStream('webdev/about.html').pipe(res)
})

app.get('/contacts', function(req, res){
		res.writeHead(200, {'Content-Type': 'text/html; Charset=UTF8'});
		fs.createReadStream('webdev/contact.html').pipe(res)
})

app.get('/ChoosePhone', function(req, res){
		res.writeHead(200, {'Content-Type': 'text/html; Charset=UTF8'});
		fs.createReadStream('webdev/phone.html').pipe(res)
})

app.get('/admin', function(req, res){
		res.writeHead(200, {'Content-Type': 'text/html; Charset=UTF8'});
		fs.createReadStream('webdev/admin.html').pipe(res)
})

app.listen(port, () => {
    console.log(`Серввер запущен  ${port}`);
})



