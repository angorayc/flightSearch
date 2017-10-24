import React, { Component } from 'react'
import Itinerary from './Itinerary';
import Price from './Price';
import BpkButton from 'bpk-component-button'
import BpkCard from 'bpk-component-card';

class CardResult extends Component {
  render() {
    let { itineraries } = this.props
    return (
      <div className="result">
        {
          itineraries.map((itinerary = {}, i) => (
            <BpkCard key={`card-${i}`} className="result__bpk-card">
              <Itinerary data={itinerary} type="Outbound"/>
              <Itinerary data={itinerary} type="Inbound"/>
              <div className="result__price-info">
                <Price data={itinerary.PricingOptions || []} />
                <span>
                  <BpkButton>Select</BpkButton>
                </span>
              </div>
            </BpkCard>
          ))
        }
      </div>
    )
  }
}

export default CardResult;