// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
//import { Keyboard } from 'telegram-keyboard'
import { bot } from './helpers/bot'
import { checkTime } from './middlewares/checkTime'
import { setupHelp } from './commands/help'
import { attachUser } from './middlewares/attachUser'
let day = 0

// Check time
bot.use(checkTime)
// Attach user
bot.use(attachUser)
// Setup commands
setupHelp(bot)

// Start bot
bot.startPolling()


bot.on('text', async (ctx) => {

  //write user`s text and its date to variables
  const user_text : string = ctx.message.text 
  const today = new Date()
  const todayString = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`

  let doings = ctx.dbuser.doingslist

  if (!doings) {
    doings = {[todayString]: []}
  }

  if (doings[todayString]) {
    //doingslist[todayString]= dela;
    doings[todayString][doings[todayString].length] = user_text
  } else {
    doings[todayString][0] = user_text
  }

  ctx.dbuser.doingslist = doings
  ctx.dbuser.markModified('doingslist')
  await ctx.dbuser.save()
  return ctx.reply(
    `Количество дел сегодня: ${ctx.dbuser.doingslist[todayString]}.`
  )
  // const keyboard = Keyboard.make([
  //   ['💪', '💻'], // First row
  //   ['📚', '🎼'], // Second row
  // ])

}
)

bot.command('info', ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Bot Info", {
        reply_markup: {
            keyboard:[
                [
                    {text : '💪'},
                    {text : '💻'},
                    {text : '📚'},
                    {text : '🎼'}
                ]
            ],
            resize_keyboard : true 
        }
    })
} )

// Log
console.info('Bot is up and running')
