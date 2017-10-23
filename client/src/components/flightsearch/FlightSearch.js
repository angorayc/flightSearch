import React, { Component } from 'react';
/*
https://github.com/Skyscanner/backpack/tree/master/packages/bpk-component-input
*/
import BpkLabel from 'bpk-component-label';
import BpkButton from 'bpk-component-button';
import BpkSelect from 'bpk-component-select';
import BpkNudger from 'bpk-component-nudger';
//import format from 'date-fns/format';
import { withButtonAlignment, withRtlSupport, withLargeButtonAlignment } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/arrow-down';
import ArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import BpkModal from 'bpk-component-modal';
import FormConfigs from './FormConfigs'
import InputContainer from '../common/InputContainer';
import { cssModules } from 'bpk-react-utils';
// import { colorWhite } from 'bpk-tokens/tokens/base.es6';

import STYLES from './Form.scss';

const getClassName = cssModules(STYLES);
const formClassName = getClassName('search__form');
// const placeClassName = getClassName('search__place');
// const dateClassName = getClassName('search__date');
// const numberClassName = getClassName('search__number');
// const timeClassName = getClassName('search__time');
// const destinationClassName = getClassName('search__hotels-destination');
// const pickupClassName = getClassName('search__car-hire-pickup-location');
const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));
const AlignedArrowRightIcon = withLargeButtonAlignment(withRtlSupport(ArrowRightIcon));

// const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
// const formatMonth = date => format(date, 'MMMM YYYY');
// const formatDate = date => format(date, 'YYYY-MM-DD');

class FlightSearch extends Component {

  constructor() {
    super();

    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._handleAdultChange = this._handleAdultChange.bind(this);

    this.state = {
      isOpen: false,
      form: {
        adult: 1,
        children: 0
      }
    };
  }

  _onOpen() {
    this.setState({
      isOpen: true,
    });
  }

  _onClose() {
    this.setState({
      isOpen: false,
    });
  }

  _handleAdultChange(value) {
    this.setState({ form: {
      adult: value
    } });
  }

  _handleChidrenChange(value) {
    this.setState({ form: {
      children: value
    } });
  }

  render() {
    return (
      <div className="search">
        <form>

          {
            FormConfigs.map((config, i) => (
              <div className={formClassName} key={`search-form-${i}`}>
                { (config.labels || []).map((label, j) => <BpkLabel key={`search-label-${i}${j}`} {...label}/>) }
                { (config.inputs || []).map((input, j) => <InputContainer key={`search-input-${i}${j}`} {...input}/>) }
              </div>
            ))
          }

          <div className={formClassName}>
            <BpkLabel htmlFor="input_class-travellers" white={true}>Cabin Class & Travellers</BpkLabel>
            <BpkButton link className="search__button--cabin-travellers" onClick={this._onOpen}>
              <span>1 adult, Economy</span>
              <AlignedArrowIcon />
            </BpkButton>
            <BpkModal
              id="modal"
              className="input_class-travellers"
              getApplicationElement={() =>
                document.getElementById('root')
              }
              isOpen={this.state.isOpen}
              onClose={this._onClose}
              title="Cabin Class & Travellers"
              closeLabel="Close modal"
              closeText="Done"
            >
              <div className={formClassName}>
                <BpkLabel htmlFor="cabin">Cabin Class</BpkLabel>
                <InputContainer
                  FormComponent={BpkSelect}
                  id="cabin"
                  name="input_cabin"
                  value="Economy"
                  onChange={() => console.log('select changed')}
                  children={
                    [
                      {option: 'Economy', value: 'Economy'},
                      {option: 'Premium Economy', value: 'PremiumEconomy'},
                      {option: 'Business class', value: 'Business'},
                      {option: 'First class', value: 'First'}
                    ].map((option, i) => <option value={option.value}>{option.option}</option>)
                  }
                />
              </div>
              <div className={formClassName}>
                <BpkLabel htmlFor="adult">Adult</BpkLabel>
                <InputContainer
                  FormComponent={BpkNudger}
                  id="adult"
                  name="adult"
                  min={1}
                  max={10}
                  value={this.state.form.adult}
                  onChange={this._handleAdultChange}
                  decreaseButtonLabel="Decrease"
                  increaseButtonLabel="Increase"
                />
              </div>
              <div className={formClassName}>
                <BpkLabel htmlFor="children">Children</BpkLabel>
                <InputContainer
                  FormComponent={BpkNudger}
                  id="children"
                  name="children"
                  min={1}
                  max={10}
                  value={this.state.form.children}
                  onChange={this._handleChildrenChange}
                  decreaseButtonLabel="Decrease"
                  increaseButtonLabel="Increase"
                />
              </div>
            </BpkModal>
          </div>
          <div>
            <BpkButton className="search__button--submit" large>
              <span>Search flights </span>
              <AlignedArrowRightIcon fill="white" />
            </BpkButton>
          </div>
        </form>
      </div>
    );
  }
}


export default FlightSearch;
