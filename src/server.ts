import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyparser from 'body-parser'

const app = express()

app.use(bodyparser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.status(200).json({message: 'server is running'})
})

export default app
