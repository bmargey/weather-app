const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const port = 3000
const apiKey = '*****'

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
	if (err) {
    	res.render('index', {weather: null, error: 'Error, please try again'});
    } 
    else {
    	let weather = JSON.parse(body)
    	if (weather.main == undefined) {
     		res.render('index', {weather: null, error: 'Error, please try again'});
      	} 
      	else {
      		let celc = getCelc(weather.main.temp)
        	let weatherText = `It is ${celc} degrees in ${weather.name}!`;
        	res.render('index', {weather: weatherText, error: null});
      	}
    }
  });
})

function getCelc(far) {
	celc = (far - 32)/1.8
	return Math.round(celc)
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
