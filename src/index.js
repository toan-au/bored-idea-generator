
const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const port = 3000

// middleware
app.use(express.json())

// configure views folder
app.set('views', path.join(__dirname, '/views'));

app.get('/', async (req, res) => {
  try {
    // get idea
    const response = await axios.get("https://bored-api.appbrewery.com/random")
    const data = response.data
    console.log(data)

    // render page
    res.render("index.ejs", {idea: data})
  } catch(e) {
    console.error(e)
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
