import React, { Component } from 'react';
import BpkButton from 'bpk-component-button'
import BpkAlertIcon from 'bpk-component-icon/sm/price-alerts';
import BpkCard from 'bpk-component-card';
import { BpkSpinner } from 'bpk-component-spinner';
import Itinerary from './Itinerary';
import Price from './Price';
import { withAlignment, withRtlSupport, withButtonAlignment } from 'bpk-component-icon';
import { colorBlue500, iconSizeSm, lineHeightLg } from 'bpk-tokens/tokens/base.es6';
import './Result.scss';

const AlignedBpkAlertIcon = withButtonAlignment(withRtlSupport(BpkAlertIcon));
const AlignedBpkButton = withAlignment(BpkButton, iconSizeSm, lineHeightLg);

class Result extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Itineraries: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/search?country=UK&currency=GBP&locale=en-GB&locationSchema=iata&apikey=ss630745725358065467897349852985&grouppricing=on&originplace=EDI&destinationplace=LHR&outbounddate=2017-10-30&inbounddate=2017-11-06&adults=1&children=0&infants=0&cabinclass=Economy')
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        //console.log('TODO: something with these results:');
        //console.log(results);
        this.setState({
          Itineraries: results.Itineraries || []
        })
      })
      .catch(console.error);
  }

  render() {
    let { Itineraries } = this.state
    return (
      <div>
        <div className="tools">
          <span>
            <AlignedBpkButton className="tools__left-btn" link>Filter</AlignedBpkButton>
            <AlignedBpkButton className="tools__left-btn" link>Sort</AlignedBpkButton>
          </span>
          <BpkButton className="tools__right" link>
            <AlignedBpkAlertIcon fill={colorBlue500} />
            <span>Price alerts</span>
          </BpkButton>
        </div>
        {
          Itineraries.length ? (
            <div className="result">
              {
                Itineraries.map((itinerary = {}, i) => (
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
          ) : (
            <div className="result__spinner">
              <BpkSpinner />
            </div>
          )
        }
      </div>
    )
  }
}


export default Result