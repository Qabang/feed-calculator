import createApp from './app.js'

const PORT = process.env.PORT || 3000

const main = async () => {
  try {
    const app = await createApp()
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
