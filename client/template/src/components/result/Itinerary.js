import React, { Component } from 'react';
import BpkArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
import { get as _get } from 'lodash'

import { withAlignment } from 'bpk-component-icon';
import { iconSizeSm, lineHeightBase, colorGray300 } from 'bpk-tokens/tokens/base.es6';
const HOUR = 60
const AlignedSpan = withAlignment('span', iconSizeSm, lineHeightBase);

class Itinerary extends Component {
  render() {
    let { data, type } = this.props;
    let leg = _get(data, `${type}LegId`, {});
    let originStationCode = _get(leg, 'OriginStation.Code', '');
    let destinationStationCode = _get(leg, 'DestinationStation.Code', '');
    let departureTime = _get(leg, 'Departure', '').split('T')[1].split(':');
    let departureHour = departureTime[0] || '';
    let departureMin = departureTime[1];
    let arrivalTime = _get(leg, 'Arrival', '').split('T')[1].split(':');
    let arrivalHour = arrivalTime[0] || '';
    let arrivalMin = arrivalTime[1] || '';
    let duration = _get(leg, 'Duration', '')
    let durationHour = Math.floor(duration / HOUR)
    let durationMin = duration % HOUR
    let isDirect = _get(leg, 'Stops', []).length === 0

    return (
      <div className="itinerary">
        <div className="itinerary__time">
          <span className="itinerary__ez" />
          <AlignedSpan className="itinerary__from">
            <span className="itinerary__mapped-time">{`${departureHour}:${departureMin}`}</span>
            <span className="itinerary__code">{originStationCode}</span>
          </AlignedSpan>
          <BpkArrowIcon className="itinerary__bpk-arrow-icon" fill={colorGray300} />
          <AlignedSpan className="itinerary__to">
            <span className="itinerary__mapped-time">{`${arrivalHour}:${arrivalMin}`}</span>
            <span className="itinerary__code">{destinationStationCode}</span>
          </AlignedSpan>
        </div>
        <div className="itinerary__duration">
          <span className="itinerary__mapped-time">{`${durationHour}h${durationMin}`}</span>
          { isDirect ? <span className="itinerary__direct">Direct</span> : false }
        </div>
      </div>
    )
  }
}
export default Itinerary 