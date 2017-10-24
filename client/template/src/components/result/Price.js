import React, { Component } from 'react'
import { get as _get } from 'lodash'

class Price extends Component {
  render() {
    let { data } = this.props;
    let lowestPriceInfo = _get(data, 0, {});
    let lowestPrice = _get(lowestPriceInfo, 'Price', '');
    let agent = _get(lowestPriceInfo, 'Agents.0.Name', '');
    return (
      <div>
        { lowestPrice ? <span className="result__price">{`£${lowestPrice}`}</span> : false }
        { agent ? <span className="result__agent">{agent}</span> : false }
      </div>
    )
  }
}

export default Price;