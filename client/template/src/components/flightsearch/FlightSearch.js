import React, { Component } from 'react';
/*
https://github.com/Skyscanner/backpack/tree/master/packages/bpk-component-input
*/
import BpkLabel from 'bpk-component-label';
import BpkButton from 'bpk-component-button';

//import format from 'date-fns/format';
import { withButtonAlignment, withRtlSupport, withLargeButtonAlignment } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/arrow-down';
import ArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import BpkModal from 'bpk-component-modal';
import FormConfigs from './FormConfigs';
import ModalConfigs from './ModalConfigs';
import Qs from 'qs';
import InputContainer from '../common/InputContainer';
import { cssModules } from 'bpk-react-utils';
import { merge as _merge } from 'lodash';
import moment from 'moment';
import Placeholder from '../placeholder';
import Result from '../result';

import STYLES from './Form.scss';
const getClassName = cssModules(STYLES);
const inputClassName = getClassName('search__input');

const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));
const AlignedArrowRightIcon = withLargeButtonAlignment(withRtlSupport(ArrowRightIcon));


let formConfigs;
let modalConfigs;


class FlightSearch extends Component {

  constructor() {
    super();

    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this._generateInputs = this._generateInputs.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    formConfigs = FormConfigs.bind(this);
    modalConfigs = ModalConfigs.bind(this);

    this.state = {
      isOpen: false,
      isShowResult: false,
      Itineraries: [],
      form: {
        country: 'UK',
        currency: 'GBP',
        locale: 'en-GB',
        locationSchema: 'iata',
        apikey: 'ss630745725358065467897349852985',
        grouppricing: 'on',
        originplace: 'EDI',
        destinationplace: 'LHR',
        outbounddate: moment().day(8).format('YYYY-MM-DD'), // next Monday (1 + 7)
        inbounddate: moment().day(15).format('YYYY-MM-DD'), // next next Monday (1 + 7 + 7)
        adults:1,
        children:0,
        infants:0,
        cabinclass: 'Economy'
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

  _handleFormChange(name, value) {
    let state = Object.assign({}, this.state)
    let { form } = state
    _merge(form, {
      [name]: value
    })
    this.setState({
      form
    })
  }

  _generateInputs(cfg = []) {
    return cfg.map((config, i) => (
      <div className={inputClassName} key={`search-form-${i}`}>
        { (config.labels || []).map((label, j) => <BpkLabel key={`search-label-${i}${j}`} {...label}/>) }
        {
          (config.inputs || []).map((input, j) => (
            <InputContainer key={`search-input-${i}${j}`}
              updateForm={this._handleFormChange}
              {...input} />)
          )
        }
      </div>
    ))
  }

  _handleSubmit() {
    let { form } = this.state;
    let query = Qs.stringify(form);
    this.setState({ isShowResult: true });
    fetch(`http://localhost:4000/api/search?${query}`)
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
    let { Itineraries, isShowResult, isOpen, form } = this.state;
    let { destinationplace, originplace, cabinclass, adults, children, infants } = form;
    let travellers = adults + children + infants;
    return (
      <div className="search">
        <form className="search__form">

          { this._generateInputs(formConfigs()) }

          <div className={inputClassName}>
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
              isOpen={isOpen}
              onClose={this._onClose}
              title="Cabin Class & Travellers"
              closeLabel="Close modal"
              closeText="Done"
            >
              { this._generateInputs(modalConfigs()) }

            </BpkModal>
          </div>
          <div>
            <BpkButton className="search__button--submit" onClick={this._handleSubmit} large>
              <span>Search flights </span>
              <AlignedArrowRightIcon fill="white" />
            </BpkButton>
          </div>
        </form>
        {
          isShowResult ? (
            <div>
              <Placeholder destinationplace={destinationplace}
                originplace={originplace}
                travellers={travellers}
                cabinclass={cabinclass} />
              <Result Itineraries={Itineraries} />
            </div>
          ) : false
        }
      </div>
    );
  }
}


export default FlightSearch;
