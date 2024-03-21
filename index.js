import express from 'express'
import createApp from './app.js'

const PORT = process.env.PORT || 3001

if (!express) {
  console.warn('no express')
}

const main = async () => {
  try {
    const app = await createApp()
    app.listen(PORT, () => {
      console.log(`Server is up and listening on port ${PORT}`)
    })
  } catch (error) {
    console.error("Can't connect to the server")
  }
}

main()
