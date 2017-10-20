const _get = require('lodash/get')
const _set = require('lodash/set')

const flightSearchParser = (data) => {
  let itineraries = _get(data, 'Itineraries', [])
  if (!data || !itineraries.length)
    return data

  let dataAgents = _get(data, 'Agents', [])
  let agents = {}
  dataAgents.forEach((val) => {
    let agentId = _get(val, 'Id')
    if (agentId)
      _set(agents, agentId, val)
  })

  let dataCarriers = _get(data, 'Carriers', [])
  let carriers = {}
  dataCarriers.forEach((val) => {
    let carrierId = _get(val, 'Id')
    if (carrierId)
      _set(carriers, carrierId, val)
  })

  let dataPlaces = _get(data, 'Places', [])
  let places = {}
  dataPlaces.forEach((val) => {
    let placeId = _get(val, 'Id')
    if (placeId)
      _set(places, placeId, val)
  })

  let dataSegments = _get(data, 'Segments', [])
  let segments = {}
  dataSegments.forEach((val) => {
    let segmentId = _get(val, 'Id')
    if (segmentId)
      _set(segments, segmentId, val)
  })

  let legs = {}
  let dataLegs = _get(data, 'Legs', [])
  dataLegs.forEach((leg, i) => {
    let carriersInLeg = _get(leg, 'Carriers', [])
    let operatingCarriersInLeg = _get(leg, 'OperatingCarriers', [])
    let legFlightNumbers = _get(leg, 'FlightNumbers', [])
    carriersInLeg.forEach((carrierId, j) => {
      let carrierInfo = _get(carriers, carrierId, carrierId)
      _set(leg, ['Carriers', j], carrierInfo)
    })

    operatingCarriersInLeg.forEach((opCarrierId, j) => {
      let operatingCarriersInfo = _get(carriers, opCarrierId, opCarrierId)
      _set(leg, ['OperatingCarriers', j], operatingCarriersInfo)
    })

    if (legFlightNumbers.length) {
      legFlightNumbers.forEach((flightNumber, j) => {
        let flightNumberCarrierId = _get(flightNumber, 'CarrierId')
        let flightNumberInfo = _get(carriers, flightNumberCarrierId)
        if (flightNumberInfo)
          _set(leg, ['FlightNumbers', j, 'Carrier'], flightNumberInfo)
      })
    }

    let destinationStationId = _get(leg, 'DestinationStation')
    let originStationId = _get(leg, 'OriginStation')
    let destinationStationInfo = _get(places, destinationStationId, destinationStationId)
    let originStationInfo = _get(places, originStationId, originStationId)
    _set(leg, 'DestinationStation', destinationStationInfo)
    _set(leg, 'OriginStation', originStationInfo)

    let legStops = _get(leg, 'Stops', [])
    legStops.forEach((stopId, j) => {
      let placeInfo = _get(places, stopId, stopId)
      _set(leg, ['Stops', j], placeInfo)
    })

    let legId = _get(leg, 'Id')
    if (legId)
      _set(legs, legId, leg)
  })

  itineraries.forEach((it, i) => {

    let pricingOptions = _get(it, 'PricingOptions', [])
    pricingOptions.forEach((po, j) => {
      let agentsInPO = _get(po, 'Agents', [])
      agentsInPO.forEach((agentId, k) => {
        let agentInfo = _get(agents, agentId, agentId)
        _set(data, ['Itineraries', i, 'PricingOptions', j, 'Agents', k], agentInfo)  
      })
    })

    let outboundLegId = _get(it, 'OutboundLegId')
    let outboundLegInfo = _get(legs, outboundLegId, outboundLegId)
    let inboundLegId = _get(it, 'InboundLegId')
    let inboundLedInfo = _get(legs, inboundLegId, inboundLegId)
    let segmentIdInOutboundLegInfo = _get(outboundLegInfo, 'SegmentIds', [])
    let segmentIdInInboundLegInfo = _get(inboundLedInfo, 'SegmentIds', [])
    segmentIdInOutboundLegInfo.forEach((sId, l) => {
      let segmentInfo = _get(segments, sId)
      if(segmentInfo)
        _set(segmentIdInOutboundLegInfo, l, segmentInfo)
    })
    segmentIdInInboundLegInfo.forEach((sId, l) => {
      let segmentInfo = _get(segments, sId)
      if(segmentInfo)
        _set(segmentIdInInboundLegInfo, l, segmentInfo)
    })

    _set(data, ['Itineraries', i, 'OutboundLegId'], outboundLegInfo)
    _set(data, ['Itineraries', i, 'InboundLegId'], inboundLedInfo)

  })

  return { Itineraries: itineraries }
}

module.exports = flightSearchParser