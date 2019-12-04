import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyparser from 'body-parser'
import userRouter from './resources/User/user.router'
import authRouter from './resources/Auth/auth.router'
import initPassport from './services/passport/passport'

const app = express()

app.use(bodyparser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.status(200).json({message: 'server is running'})
})

initPassport()

app.use('/users', userRouter)
app.use('/auth', authRouter)

export default app
