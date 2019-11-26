/* eslint-disable no-unused-vars */
const dotenv = require('dotenv').config();
const config = require('config');
const mongoose = require('mongoose');

let env = process.env;

mongoose.connect(
	env.DB_CONNECT_STRING,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	err => {
		if (err) {
			console.error('Output: err', err);
		} else {
			console.log('Connection established successfully');
			require('./bot')();
		}
	}
);

process.on('SIGINT', () => {
	console.log('Bye bye!');
	process.exit();
});
