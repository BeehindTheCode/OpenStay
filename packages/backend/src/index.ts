import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'

// Express application
const app: Application = express()
const port = 4000

const corsOptions = {
  origin: '*',
  credentials: true
}

const start = () => {
  app.use(cors(corsOptions))

  // Cookies
  app.use(cookieParser())

  app.use(bodyParser.json())

  app.get('/api', (req: Request, res: Response) => {
    res.send('Hello, world!')
  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

start()
