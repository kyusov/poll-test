const { Scenes, Markup } = require('telegraf')
const User = require('./db')
const { db } = require('./db')

const keyboardScore = Markup.inlineKeyboard([
    [Markup.button.callback('1', '1'), Markup.button.callback('2', '2')],
    [Markup.button.callback('3', '3'), Markup.button.callback('4', '4')],
    [Markup.button.callback('5', '5')],
]).resize()

const keyboardSkip = Markup.keyboard([[{ text: 'Далее' }]])
    .resize()
    .oneTime()

function s1() {
    const chooseCDPS = new Scenes.BaseScene('cdps')
    chooseCDPS.enter((ctx) => {
        ctx.reply(
            '1. Выбери свой ЦДПС',
            Markup.inlineKeyboard([
                [Markup.button.callback('Иркутск', 'IRK')],
                [Markup.button.callback('Ростов', 'RST')],
                [Markup.button.callback('Челябинск', 'CLB')],
                [Markup.button.callback('Саранск', 'SRN')],
            ])
        )
    })

    chooseCDPS.action('IRK', (ctx) => {
        ctx.session.user.place = 'Иркутск'
        ctx.answerCbQuery()
        ctx.scene.enter('fio')
    })

    chooseCDPS.action('RST', (ctx) => {
        ctx.session.user.place = 'Ростов'
        ctx.answerCbQuery()
        ctx.scene.enter('fio')
    })

    chooseCDPS.action('CLB', (ctx) => {
        ctx.session.user.place = 'Челябинск'
        ctx.answerCbQuery()
        ctx.scene.enter('fio')
    })

    chooseCDPS.action('SRN', (ctx) => {
        ctx.session.user.place = 'Саранск'
        ctx.answerCbQuery()
        ctx.scene.enter('fio')
    })

    chooseCDPS.use((ctx) => {
        ctx.reply('Пожалуйста, выберите ЦДПС')
        ctx.scene.reenter('cdps')
    })

    return chooseCDPS
}

function s2() {
    const fillPersonalData = new Scenes.BaseScene('fio')

    fillPersonalData.enter((ctx) => {
        ctx.reply(
            '2. ФИО (необязательно, но желательно указать для того чтобы мы могли связаться при необходимости)\nПример: Иванов Иван Иванович',
            keyboardSkip
        )
    })

    fillPersonalData.on('message', (ctx) => {
        ctx.session.user.fio = ctx.message.text
        ctx.scene.enter('q3')
    })

    return fillPersonalData
}

function s3() {
    const q3 = new Scenes.BaseScene('q3')
    q3.enter((ctx) => {
        ctx.reply(
            '3. Оцени в целом удовлетворенность запуском изменений в тарифах/услугах компании, где 5 – все отлично, 1 – все плохо',
            keyboardScore
        )
    })

    q3.action('1', (ctx) => {
        ctx.session.user.question3 = 1
        ctx.answerCbQuery()
        return ctx.scene.enter('q4')
    })

    q3.action('2', (ctx) => {
        ctx.session.user.question3 = 2
        ctx.answerCbQuery()
        return ctx.scene.enter('q4')
    })

    q3.action('3', (ctx) => {
        ctx.session.user.question3 = 3
        ctx.answerCbQuery()
        return ctx.scene.enter('q4')
    })

    q3.action('4', (ctx) => {
        ctx.session.user.question3 = 4
        ctx.answerCbQuery()
        return ctx.scene.enter('q4')
    })

    q3.action('5', (ctx) => {
        ctx.session.user.question3 = 5
        ctx.answerCbQuery()
        return ctx.scene.enter('q4')
    })

    q3.use((ctx) => {
        ctx.reply('Пожалуйста, выберите оценку')
        ctx.scene.reenter('q3')
    })

    return q3
}

function s4() {
    const q4 = new Scenes.BaseScene('q4')

    q4.enter((ctx) => {
        ctx.reply(
            '4.	Насколько качественной является информация в статье в KMS? Всего ли хватило?\n5 – все отлично, 1 – все плохо',
            keyboardScore
        )
    })

    q4.action('1', (ctx) => {
        ctx.session.user.question4 = { text: 1, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q5')
    })

    q4.action('2', (ctx) => {
        ctx.session.user.question4 = { text: 2, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q5')
    })

    q4.action('3', (ctx) => {
        ctx.session.user.question4 = { text: 3, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q5')
    })

    q4.action('4', (ctx) => {
        ctx.session.user.question4 = { text: 4, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q5')
    })

    q4.action('5', (ctx) => {
        ctx.session.user.question4 = { text: 5, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q5')
    })

    q4.use((ctx) => {
        ctx.reply('Пожалуйста, выберите оценку')
        ctx.scene.reenter('q4')
    })

    return q4
}

function s5() {
    const q5 = new Scenes.BaseScene('q5')

    q5.enter((ctx) => {
        ctx.reply('5. Напиши свои пожелания/комментарии', keyboardSkip)
    })

    q5.on('message', (ctx) => {
        ctx.session.user.question4.comment = ctx.message.text
        ctx.scene.enter('q6')
    })

    return q5
}

function s6() {
    const q6 = new Scenes.BaseScene('q6')

    q6.enter((ctx) => {
        ctx.reply(
            '6.	Насколько качественной была информация в коммуникации (от Quality_Info)?\nВсего ли хватило?\n5 – все отлично, 1 – все плохо',
            keyboardScore
        )
    })

    q6.action('1', (ctx) => {
        ctx.session.user.question6 = { text: 1, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q7')
    })

    q6.action('2', (ctx) => {
        ctx.session.user.question6 = { text: 2, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q7')
    })

    q6.action('3', (ctx) => {
        ctx.session.user.question6 = { text: 3, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q7')
    })

    q6.action('4', (ctx) => {
        ctx.session.user.question6 = { text: 4, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q7')
    })

    q6.action('5', (ctx) => {
        ctx.session.user.question6 = { text: 5, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q7')
    })

    q6.use((ctx) => {
        ctx.reply('Пожалуйста, выберите оценку')
        ctx.scene.reenter('q6')
    })

    return q6
}

function s7() {
    const q7 = new Scenes.BaseScene('q7')

    q7.enter((ctx) => {
        ctx.reply('7. Напиши свои пожелания/комментарии', keyboardSkip)
    })

    q7.on('message', (ctx) => {
        ctx.session.user.question6.comment = ctx.message.text
        ctx.scene.enter('q8')
    })

    return q7
}

function s8() {
    const q8 = new Scenes.BaseScene('q8')

    q8.enter((ctx) => {
        ctx.reply(
            '8. Оцени обучение по изменениям тарифов/услуг, где 5 – все понятно объяснили, 1 – я ни в чем не разобрался(-ась)',
            keyboardScore
        )
    })

    q8.action('1', (ctx) => {
        ctx.session.user.question8 = { text: 1, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q9')
    })

    q8.action('2', (ctx) => {
        ctx.session.user.question8 = { text: 2, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q9')
    })

    q8.action('3', (ctx) => {
        ctx.session.user.question8 = { text: 3, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q9')
    })

    q8.action('4', (ctx) => {
        ctx.session.user.question8 = { text: 4, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q9')
    })

    q8.action('5', (ctx) => {
        ctx.session.user.question8 = { text: 5, comment: '' }
        ctx.answerCbQuery()
        return ctx.scene.enter('q9')
    })

    q8.use((ctx) => {
        ctx.reply('Пожалуйста, выберите оценку')
        ctx.scene.reenter('q8')
    })

    return q8
}

function s9() {
    const q9 = new Scenes.BaseScene('q9')

    q9.enter((ctx) => {
        ctx.reply('9. Напиши свои пожелания/комментарии', keyboardSkip)
    })

    q9.on('message', (ctx) => {
        ctx.session.user.question8.comment = ctx.message.text
        ctx.scene.enter('q10')
    })

    return q9
}

function s10() {
    const q10 = new Scenes.BaseScene('q10')

    q10.enter((ctx) => {
        ctx.reply('10. Были ли ошибки в консультациях, связанные с изменениями продукта?', {
            reply_markup: {
                keyboard: [[{ text: 'Да' }, { text: 'Нет' }]],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        })
    })

    q10.hears(/Да/, (ctx) => {
        ctx.session.user.question10 = true
        return ctx.scene.enter('q11')
    })

    q10.hears(/Нет/, (ctx) => {
        ctx.session.user.question10 = false
        return ctx.scene.enter('q11')
    })

    q10.use((ctx) => {
        ctx.reply('Пожалуйста, укажите Да или Нет')
        ctx.scene.reenter('q10')
    })

    return q10
}

function s11() {
    const q11 = new Scenes.BaseScene('q11')

    q11.enter((ctx) => {
        ctx.reply('11. Что вызвало трудности/недопонимание?', keyboardSkip)
    })

    q11.on('message', (ctx) => {
        ctx.session.user.question11 = ctx.message.text
        ctx.scene.leave()
    })

    q11.leave((ctx) => {
        ctx.reply('Спасибо за уделенное время и за то, что помогаешь стать нам лучше!')

        console.log(ctx.session.user)
        User.create({
            username: ctx.session.user.username,
            fio: ctx.session.user.fio,
            place: ctx.session.user.place,
            question_3: ctx.session.user.question3,
            question_4: ctx.session.user.question4.text,
            question_5: ctx.session.user.question4.comment,
            question_6: ctx.session.user.question6.text,
            question_7: ctx.session.user.question6.comment,
            question_8: ctx.session.user.question8.text,
            question_9: ctx.session.user.question8.comment,
            question_10: ctx.session.user.question10,
            question_11: ctx.session.user.question11,
        })
            .then(() => {
                console.log('Данные успешно добавлены в таблицу')
                return ctx.scene.enter('q12')
            })
            .catch((err) => {
                console.log('Произошла ошибка при добавлении данных в таблицу', err)
            })
    })

    return q11
}

function s12() {
    const q12 = new Scenes.BaseScene('q12')

    q12.on('message', (ctx) => ctx.reply('Вы уже прошли опрос!'))

    return q12
}

module.exports = { s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12 }
