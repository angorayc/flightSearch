const { check } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');
const { paramsFlightsLivePrices } = require('../config')
const _get = require('lodash/get')

const sanitizeQueryArray = Object.keys(paramsFlightsLivePrices).map((paramName) => {
  let paramConfig = _get(paramsFlightsLivePrices, paramName, {})
  let paramIsNumber = _get(paramConfig, 'isNumber', false)
  let sanitizeQueryParam = sanitizeQuery(paramName)
  return paramIsNumber ? sanitizeQueryParam.toInt() : sanitizeQueryParam
})

const checkQueryArray = Object.keys(paramsFlightsLivePrices).map((paramName) => {
  let paramConfig = _get(paramsFlightsLivePrices, paramName, {})
  let paramIsRequired = _get(paramConfig, 'isRequired', false)
  let message = _get(paramConfig, 'message', '')
  let paramRegx = _get(paramConfig, 'matches')
  let checkQueryParam = check(paramName).withMessage(message)
  let validation = paramIsRequired ? checkQueryParam.exists() : checkQueryParam
  validation = paramRegx ? validation.matches(paramRegx) : validation
  return validation
})

module.exports = sanitizeQueryArray.concat(checkQueryArray)