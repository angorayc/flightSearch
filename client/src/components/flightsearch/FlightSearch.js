import React, { Component } from 'react';
/*
https://github.com/Skyscanner/backpack/tree/master/packages/bpk-component-input
*/
import BpkInput from 'bpk-component-input';
import BpkLabel from 'bpk-component-label';
import InputContainer from '../common/InputContainer';
import { cssModules } from 'bpk-react-utils';
import STYLES from './forms.scss';

const getClassName = cssModules(STYLES);
const formClassName = getClassName('search__form');
// const placeClassName = getClassName('search__place');
const dateClassName = getClassName('search__date');
// const numberClassName = getClassName('search__number');
// const timeClassName = getClassName('search__time');
// const destinationClassName = getClassName('search__hotels-destination');
// const pickupClassName = getClassName('search__car-hire-pickup-location');


class FlightSearch extends Component {
  render() {
    return (
      <div className="search">
        <form>
          <div className={formClassName}>
            <BpkLabel htmlFor="input_origin">From</BpkLabel>
            <InputContainer
              FormComponent={BpkInput}
              id="input_origin"
              name="input_origin"
              value="Edinburgh"
              placeholder="Country, city or airport"
              onChange={() => null}
              docked={false}
            />
          </div>
          <div className={formClassName}>
            <BpkLabel htmlFor="input_destination">To</BpkLabel>
            <InputContainer
              FormComponent={BpkInput}
              id="input_destination"
              name="input_destination"
              value=""
              placeholder="Country, city or airport"
              onChange={() => null}
              docked={false}
            />
          </div>
          <div>
            <BpkLabel htmlFor="input_depart" className={dateClassName}>Depart</BpkLabel>
            <BpkLabel htmlFor="input_return" className={dateClassName}>Return</BpkLabel>
          </div>
          <div className={formClassName}>
            <InputContainer
              FormComponent={BpkInput}
              id="input_depart"
              name="input_depart"
              value=""
              className={dateClassName}
              placeholder="mm/dd/yyyy"
              onChange={() => null}
              docked={true}
            />
            <InputContainer
              FormComponent={BpkInput}
              id="input_return"
              name="input_return"
              value=""
              className={dateClassName}
              placeholder="mm/dd/yyyy"
              onChange={() => null}
              docked={true}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default FlightSearch;
