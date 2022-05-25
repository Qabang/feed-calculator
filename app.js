import express from 'express'
import 'dotenv/config'
import router from './router.js'

const app = express()

const createApp = async () => {
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(router)

  return app
}

export default createApp
