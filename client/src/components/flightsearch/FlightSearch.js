import React, { Component } from 'react';
/*
https://github.com/Skyscanner/backpack/tree/master/packages/bpk-component-input
*/
import BpkInput from 'bpk-component-input';
import BpkLabel from 'bpk-component-label';
import BpkButton from 'bpk-component-button';
import BpkDatepicker from 'bpk-component-datepicker';
import format from 'date-fns/format';
import { withButtonAlignment, withRtlSupport, withLargeButtonAlignment } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/arrow-down';
import ArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';

import InputContainer from '../common/InputContainer';
import { cssModules } from 'bpk-react-utils';
// import { colorWhite } from 'bpk-tokens/tokens/base.es6';

import STYLES from './forms.scss';

const getClassName = cssModules(STYLES);
const formClassName = getClassName('search__form');
// const placeClassName = getClassName('search__place');
const dateClassName = getClassName('search__date');
// const numberClassName = getClassName('search__number');
// const timeClassName = getClassName('search__time');
// const destinationClassName = getClassName('search__hotels-destination');
// const pickupClassName = getClassName('search__car-hire-pickup-location');
const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));
const AlignedArrowRightIcon = withLargeButtonAlignment(withRtlSupport(ArrowRightIcon));

const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');
const formatDate = date => format(date, 'YYYY-MM-DD');
const daysOfWeek = [
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 0,
    isWeekend: true,
  },
  {
    name: 'Monday',
    nameAbbr: 'Mon',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Tuesday',
    nameAbbr: 'Tue',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Wednesday',
    nameAbbr: 'Wed',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Thursday',
    nameAbbr: 'Thu',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Friday',
    nameAbbr: 'Fri',
    index: 5,
    isWeekend: false,
  },
  {
    name: 'Saturday',
    nameAbbr: 'Sat',
    index: 6,
    isWeekend: true,
  }
];

class FlightSearch extends Component {
  render() {
    return (
      <div className="search">
        <form>
          <div className={formClassName}>
            <BpkLabel htmlFor="input_origin" white={true}>From</BpkLabel>
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
            <BpkLabel htmlFor="input_destination" white={true}>To</BpkLabel>
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
          <div className={formClassName}>
            <BpkLabel htmlFor="input_depart" className={dateClassName} white={true}>Depart</BpkLabel>
            <BpkLabel htmlFor="input_return" className={dateClassName} white={true}>Return</BpkLabel>
            <InputContainer
              FormComponent={BpkDatepicker}
              id="input_depart"
              name="input_depart"
              date={new Date()}
              className={dateClassName}
              daysOfWeek={daysOfWeek}
              changeMonthLabel="Change month"
              closeButtonText="Close"
              title="Departure date"
              getApplicationElement={() => document.getElementById('root')}
              formatDate={formatDate}
              formatMonth={formatMonth}
              formatDateFull={formatDateFull}
              dockedFirst={true}
            />
            <InputContainer
              FormComponent={BpkDatepicker}
              id="input_return"
              name="input_return"
              date={new Date(new Date().getTime() + (24 * 60 * 60 * 1000))}
              className={dateClassName}
              onChange={() => null}
              daysOfWeek={daysOfWeek}
              changeMonthLabel="Change month"
              closeButtonText="Close"
              title="Departure date"
              getApplicationElement={() => document.getElementById('root')}
              formatDate={formatDate}
              formatMonth={formatMonth}
              formatDateFull={formatDateFull}
              docked={true}
            />
          </div>
          <div className={formClassName}>
            <BpkLabel htmlFor="input_destination" white={true}>Cabin Class & Travellers</BpkLabel>
            <BpkButton link className="search__button--cabin-travellers">
              <span>1 adult, Economy</span>
              <AlignedArrowIcon />
            </BpkButton>
          </div>
          <div>
            <BpkButton className="search__button--submit" large>
              <span>Search flights</span>
              <AlignedArrowRightIcon fill="white" />
            </BpkButton>
          </div>
        </form>
      </div>
    );
  }
}

export default FlightSearch;
