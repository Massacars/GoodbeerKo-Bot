const config = require('config');
const Chats = require('./model');

module.exports = bot => {
	bot.onText(/\/chat_add/, msg => {
		if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
			const chatId = msg.chat.id;
			const name = msg.chat.title;
			const active = true;

			Chats.find({ tgid: chatId }, (err, document) => {
				if (err) {
					console.error(err.message);
				} else {
					if (document.length <= 0) {
						let chat = new Chats();
						chat.tgid = chatId;
						chat.name = name;
						chat.active = active;

						chat.save(err => {
							if (err) {
								console.error(err.message);
								bot.sendMessage(chatId, `Chat not added ${err.message}`);
							} else {
								bot.sendMessage(chatId, `Chat ${name} added`);
							}
						});
					} else {
						bot.sendMessage(chatId, `Chat ${name} already added`);
					}
				}
			});
		}
	});

	bot.onText(/\/chat_disable/, msg => {
		if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
			const chatId = msg.chat.id;
			Chats.updateOne(
				{ tgid: chatId, active: true },
				{ active: false },
				(err, res) => {
					if (err) {
						console.error(err.message);
					} else {
						if (res.n === 1) {
							bot.sendMessage(
								chatId,
								`Find ${res.n} and modified ${res.nModified}`
							);
						} else {
							bot.sendMessage(chatId, 'Chat not find. Please /chat_add first!');
						}
					}
				}
			);
		}
	});

	bot.onText(/\/chat_remove/, msg => {
		if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
			const chatId = msg.chat.id;
			Chats.remove({ tgid: chatId }, (err, res) => {
				if (err) {
					console.error(err.message);
				} else {
					if (res.n === 1) {
						bot.sendMessage(
							chatId,
							`Find ${res.n} and deleted ${res.deletedCount}`
						);
					} else {
						bot.sendMessage(chatId, 'Chat not find. Please /chat_add first!');
					}
				}
			});
		}
	});

	bot.onText(/\/chat_list/, msg => {
		if (msg.chat.type === 'private' && msg.from.id === config.rootUser) {
			const chatId = msg.chat.id;
			Chats.find({}, (err, document) => {
				if (err) {
					console.error(err.message);
				} else {
					if (document.length > 0) {
						let text = '';
						document.forEach(element => {
							text = `${text}\n ID: ${element.tgid} Name: ${element.name} Status: ${element.active}`;
						});
						bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
					} else {
						bot.sendMessage(chatId, 'List is empty');
					}
				}
			});
		}
	});
};
