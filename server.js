const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

class weatherForecast {
	constructor(date, description) {
		this.date = date;
		this.description = description;
	}
}

app.get('/', (request, response) => {
	response.json('This is the root endpoint of the City Explorer API');
});

app.get('/weather', (request, response) => {
	const { lat, lon, searchQuery } = request.query;

	const cityWeatherData = weatherData.find((city) => {
		return (
			city.city_name.toLowerCase() === searchQuery.toLowerCase() &&
			lat == lat &&
			lon == lon
		);
	});

	const forcastArray = [];

	cityWeatherData.data.forEach((day) => {
		const date = day.datetime;
		const description = day.weather.description;

		const newForecastItem = new weatherForecast(date, description);

		forcastArray.push(newForecastItem);
	});

	response.json(forcastArray);
});

app.listen(PORT, function () {
	console.log('App is listening on Port ' + PORT);
});
