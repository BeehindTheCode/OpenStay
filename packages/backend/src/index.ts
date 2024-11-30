import express, { Application, Request, Response } from 'express'

// Express application
const app: Application = express()
const port = 4000

const start = () => {
  app.get('/api', (req: Request, res: Response) => {
    res.send('Hello, world!')
  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

start()
