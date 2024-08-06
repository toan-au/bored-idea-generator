
const express = require('express')
const path = require('path')
const axios = require('axios')
const sample = require('lodash.sample');

const app = express()
const port = 3000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// configure views folder
app.set('views', path.join(__dirname, '/views'));

app.get('/', async (req, res) => {
  try {
    const data = await getRandomIdea()
    // render page
    res.render("index.ejs", {idea: data})
  } catch(e) {
    console.error(e)
  }
})

app.post('/', async (req, res) => {
  try {
    const { type, participants } = req.body
    const validParams = {}
    if (type != "any") validParams["type"] = type
    if (participants > 0) validParams["participants"] = participants

    let data
    if (Object.keys(validParams).length != 0){
      data = await getFilteredIdea(validParams)
    } else {
      data = await getRandomIdea()
    }
    console.log(data)
    res.render("index.ejs", {idea: data})
  } catch(e) {
    res.render("index.ejs", {error: e})
  }
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

async function getFilteredIdea(params) {
  const response = await axios.get(`https://bored-api.appbrewery.com/filter`, { params })
                              .catch(e => {throw new Error(e.response.data.error)})

  const idea = sample(response.data) 
  return idea
}

async function getRandomIdea() {
  const response = await axios.get(`https://bored-api.appbrewery.com/random`)
  return response.data
}

