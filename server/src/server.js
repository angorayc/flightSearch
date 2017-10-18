require('isomorphic-fetch')
require('es6-promise').polyfill()

const express = require('express')
const app = express()
const api = require('./api/')
const validateFlightSearchQuery = require('./middleware/validateFlightSearchQuery')
const { validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter');



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
  Simple flight search api wrapper.

  TODO: client should provide params

  Api params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', validateFlightSearchQuery, (req, res) => {
  // TODO client to provide params
  // check in api docs what client should provide
  let params = matchedData(req)
  // console.log('params:', params)
  try {
    // validationResult(req).throw();
    api.livePricing.search(params)
    .then((results) => {
      // TODO - a better format for displaying results to the client
      console.log('TODO: transform results for consumption by client');
      res.json(results);
    })
    .catch(console.error);
  } catch (err) {
    // Oh noes. This user doesn't have enough skills for this...
    res.status(422).json({error: validationResult(req).mapped()})
  }
  
})

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000')
})