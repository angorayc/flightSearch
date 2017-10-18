// obtain API key from your Skyscanner contact
const APIKEY = process.env.APIKEY || ss630745725358065467897349852985

if (!APIKEY) {
  console.error('APIKEY environment variable missing. ' +
    'Please re-run with `APIKEY=<key> npm run server`')
  process.exit(1)
}

module.exports = {
  apiKey: APIKEY,
  skyscannerApi: 'http://partners.api.skyscanner.net/',
  paramsFlightsLivePrices: {
    country: {
      isRequired: true,
      message: 'country is required'
    },
    currency: {
      isRequired: true,
      message: 'currency is required'
    },
    locale: {
      isRequired: true,
      message: 'locale is required'
    },
    locationSchema: {
      isRequired: false
    },
    apikey: {
      isRequired: true,
      message: 'apikey is required'
    },
    grouppricing: {
      isRequired: false
    },
    originplace: {
      isRequired: true,
      message: 'originPlace is required'
    },
    destinationplace: {
      isRequired: true,
      message: 'destinationplace is required'
    },
    outbounddate: {
      isRequired: true,
      maches: /\d{4}-\d{2}-\d{2}/,
      message: 'destinationplace is required in format “yyyy-mm-dd”'
    },
    inbounddate: {
      isRequired: false,
      maches: /\d{4}-\d{2}-\d{2}/,
      message: 'valid format for inbounddate is “yyyy-mm-dd”'
    },
    adults: {
      isRequired: true,
      isNumber: true,
      message: 'adults is required in number'
    },
    children: {
      isRequired: false,
      isNumber: true
    },
    infants: {
      isRequired: false,
      isNumber: true
    },
    cabinclass: {
      isRequired: false
    }
  }
}
