import express from 'express'
import { Calculation } from './assets/scripts/Calculation.js'
import { sendMail } from './assets/scripts/sendMail.js'

const router = express.Router()

router.get('/', async (req, res) => {
  res.send('Hello world')
})

router.get('/calculation', (req, res) => {
  const calc = new Calculation(req.body)
  res.send({ base: calc.baseNeed, work: calc.workNeed })
})

router.post('/profile', (req, res) => {
  const calc = new Calculation(req.body)
  console.log("server: ", req.body)
  res.send({ base: calc.baseNeed, work: calc.workNeed })
})

router.post('/calculate', (req, res) => {
  const calc = new Calculation(req.body)
  res.send(calc.feedTotal)
})

router.post('/tolerance', (req, res) => {
  const calc = new Calculation(req.body)
  res.send(calc.toxicAmounts)
})

router.post('/contact', (req, res) => {
  const { subject, message, email } = req.body.values

  sendMail(subject, message, email)
    .then((result) => {
      if (result.status === 200) {
        res.send(result)
      }
      else {
        res.sendStatus(500)
      }
    })
    .catch((error) => {
      res.send(error)
    })
})

router.get('/api', async (req, res) => {
  console.log('hello world')
  res.json({ message: 'Hello from server!' })
})

export default router
