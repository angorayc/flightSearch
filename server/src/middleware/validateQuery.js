const { sanitizeQuery, query } = require('express-validator/filter')
const { paramWhiteList } = require('../config')

const validateQuery = () => {
  let rules = paramWhiteList.map((paramName) => {
    switch(paramName) {
      case 'adults':
      case 'children':
      case 'infants':
        return sanitizeQuery(paramName).toInt()
      default:
        return sanitizeQuery(paramName)
    }
  })
  return rules
}

module.exports  = validateQuery()