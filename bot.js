module.exports = () => {
	const TelegramBot = require('node-telegram-bot-api');
	const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

	bot.onText(/\/ping/, msg => {
		const chatId = msg.chat.id;
		bot.sendMessage(chatId, `Hello World ${chatId}`);
	});

	require('./chats/commands')(bot);
};
