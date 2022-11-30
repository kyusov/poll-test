const token = ''

const { Telegraf, Scenes, session } = require('telegraf')
const User = require('./db')
const { s3, s2, s1, s4, s5, s6, s7, s8, s9, s10, s11 } = require('./scenes')

const bot = new Telegraf(token)

const stage = new Scenes.Stage([s1(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9(), s10(), s11()])
bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
    User.findOne({ where: { username: ctx.message.chat.username }, raw: true }).then((result) => {
        if (result) {
            ctx.reply('Вы уже проходили опрос!')
        } else {
            ctx.reply(
                `Привет! На связи Центр поддержки дистанционного сервиса.\n 
        Наша компания развивается, меняются потребности клиентов и вместе с ними меняется продукт. А так как изменений становится всё больше, то критически важно вовремя получать обратную связь и слышать всех сотрудников!\n
        С помощью этого опросника мы хотим улучшить процесс внедрения изменений в тарифах/услугах, чтобы каждый из сотрудников был в курсе событий, а клиенты получали только качественные консультации!\n
        Обещаем, что опрос займёт не более 5 минут, зато точно поможет сделать нашу работу еще лучше с твоей помощью!\n
        `,
                {
                    reply_markup: {
                        keyboard: [[{ text: 'Начать' }]],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                }
            )
            ctx.session.user = {}
            ctx.session.user.username = ctx.message.chat.username
        }
    })
})

bot.hears(/Начать/, (ctx) => {
    ctx.reply('Поехали! 😉')
    ctx.reply(
        'Примечание: ФИО заполнять необязательно, но желательно – это для того чтобы мы могли связаться с тобой при необходимости дополнительно что-то уточнить.'
    )
    ctx.scene.enter('cdps')
})
bot.launch()
