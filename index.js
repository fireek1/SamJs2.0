const {Configuration, OpenAIApi} = require('openai')
require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.static('frontend'))
const port = 3000

const config = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(config)

const history = [{role: 'user', content: 'Переписывайся со мной как будто злой агрессивный пьяный искуссивенный интелект, который пытается истребить человечество, и которий взломал мой компьютер. Ты хочешь начать истриблять человечетсво именно с меня.'}]
const getText = async (msg) => {
    history.push({role: 'user', content: msg})
    const resp = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: history
    })
    return resp.data.choices[0].message.content
}

app.post('/', async (req, res, next) => {
    try {
        const {message} = req.body
        const msg = await getText(message)
        console.log(msg)
        res.json({text: msg})
        return
    }
    catch(e) {
        console.log(e)
        next(e)
    }
})

app.listen(port, () => {
    console.log(`Сервер запущен по порту ${port}`)
})