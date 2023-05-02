const { Telegraf } = require('telegraf');

const BOT_TOKEN = "5685518421:AAHICQR0O4Wjf3JkuLHlJeIcJyGsty8UNkc";

const web_link = "https://regal-bienenstitch-f4682c.netlify.app/";

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome',{
    reply_markup:{inline_keyboard:[[{text: "Click Here", web_app: {url: web_link}}]]},
}));

bot.hears('message', (ctx) => {
    //const message = ctx.message.text;
    ctx.reply('I received your message from the WebApp!');
});

bot.launch();