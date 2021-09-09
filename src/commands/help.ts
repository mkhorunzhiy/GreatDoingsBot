// Dependencies
import { Telegraf, Context } from 'telegraf'

export function setupHelp(bot: Telegraf<Context>) {
  bot.command(['help', 'start'], (ctx) => {
    ctx.replyWithHTML(
      'Пришлите мне сделанное дело за сегодня, а я запишу ваши успехи!\n💪 - занятие спортом\n💻 - работа за ноутбуком\n📚 - чтение\n🎼 - занятие музыкой',
    )
  })
}
