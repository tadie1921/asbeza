const { Telegraf } = require('telegraf');

const BOT_TOKEN = "5685518421:AAHICQR0O4Wjf3JkuLHlJeIcJyGsty8UNkc";

const web_link = "https://regal-bienenstitch-f4682c.netlify.app/";

const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome',{
    reply_markup:{inline_keyboard:[[{text: "Click Here", web_app: {url: web_link}}]]},
}));

bot.on('message', (ctx) => {
    const message = ctx.message;
    console.log(typeof message)
    console.log(message.web_app_data.data);
    const data = JSON.parse(message.web_app_data.data);
    console.log(data)
    console.log(data.text);
    ctx.reply(data.text);
});

bot.launch();