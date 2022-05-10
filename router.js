import express from 'express'
import { Calculation } from './assets/scripts/Calculation.js'

const router = express.Router()

router.get('/', async (req, res) => {
  res.send('Hello world')
})

router.get('/calculation', (req, res) => {
  const calc = new Calculation(req.body)
  res.send({ base: calc.baseNeed, work: calc.workNeed })
})

router.post('/profile', (req, res) => {
  // Handle empty numerical values that are empty strings on submit.
  req.body.values.walkTime =
    req.body.values.walkTime === '' ? 0 : req.body.values.walkTime
  req.body.values.trotTime =
    req.body.values.trotTime === '' ? 0 : req.body.values.trotTime

  const calc = new Calculation(req.body)
  res.send({ base: calc.baseNeed, work: calc.workNeed })
})

router.post('/calculate', (req, res) => {
  const calc = new Calculation(req.body)
  res.send(calc.feedTotal)
})

router.get('/api', async (req, res) => {
  console.log('hello world')
  res.json({ message: 'Hello from server!' })
})

export default router
