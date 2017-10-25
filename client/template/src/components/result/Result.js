import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkButton from 'bpk-component-button'
import BpkAlertIcon from 'bpk-component-icon/sm/price-alerts';
import { BpkSpinner } from 'bpk-component-spinner';

import CardResult from './CardResult';
import { withAlignment, withRtlSupport, withButtonAlignment } from 'bpk-component-icon';
import { colorBlue500, iconSizeSm, lineHeightLg } from 'bpk-tokens/tokens/base.es6';
import './Result.scss';

const AlignedBpkAlertIcon = withButtonAlignment(withRtlSupport(BpkAlertIcon));
const AlignedBpkButton = withAlignment(BpkButton, iconSizeSm, lineHeightLg);

class Result extends Component {

  render() {
    let { Itineraries } = this.props
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
            <CardResult itineraries={Itineraries} />
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

Result.propTypes = {
  Itineraries: PropTypes.array
}


export default Result