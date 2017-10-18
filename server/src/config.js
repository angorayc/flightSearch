// obtain API key from your Skyscanner contact
const APIKEY = process.env.APIKEY || ss630745725358065467897349852985;

if (!APIKEY) {
  console.error('APIKEY environment variable missing. ' +
    'Please re-run with `APIKEY=<key> npm run server`');
  process.exit(1);
}

module.exports = {
  apiKey: APIKEY,
  skyscannerApi: 'http://partners.api.skyscanner.net/',
  paramWhiteList: [
    'country',
    'currency',
    'locale',
    'locationSchema',
    'apikey',
    'grouppricing',
    'originplace',
    'destinationplace',
    'outbounddate',
    'inbounddate',
    'adults',
    'children',
    'infants',
    'cabinclass'
  ]
};
