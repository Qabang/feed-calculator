import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  console.log('hej')
  res.send('hello world')
})

export default router
