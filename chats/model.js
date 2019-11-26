const mongoose = require('mongoose');

const chatScema = mongoose.Schema({
	tgid: {
		type: String
	},
	name: {
		type: String
	},
	active: {
		type: Boolean
	},
	users: {
		type: Object
	}
});

const Chats = (module.exports = mongoose.model('Chats', chatScema));
