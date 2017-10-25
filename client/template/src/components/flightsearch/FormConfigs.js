import BpkInput from 'bpk-component-input';
import BpkDatepicker from 'bpk-component-datepicker';
import DaysOfWeekConfig from './DaysOfWeekConfig'
import format from 'date-fns/format';
import STYLES from './Form.scss';
import { cssModules } from 'bpk-react-utils';
import { get as _get } from 'lodash';
import moment from 'moment';

const getClassName = cssModules(STYLES);
const dateClassName = getClassName('search__date');

const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');
const formatMonth = date => format(date, 'MMMM YYYY');
const formatDate = date => format(date, 'YYYY-MM-DD');

export default function() {
  let form = _get(this, 'state.form', {});
  return [
    {
      labels: [
        {
          htmlFor: 'input_origin',
          white: true,
          children: 'From'
        }
      ],
      inputs: [
        {
          FormComponent: BpkInput,
          id: 'input_origin',
          name: 'originplace',
          value: (form.originplace || '').toUpperCase(),
          placeholder: 'Country, city or airport',
          docked: false
        }
      ]
    },
    {
      labels: [
        {
          htmlFor: 'input_destination',
          white: true,
          children: 'To'
        }
      ],
      inputs: [
        {
          FormComponent: BpkInput,
          id: 'input_destination',
          name: 'destinationplace',
          value: (form.destinationplace || '').toUpperCase(),
          placeholder: 'Country, city or airport',
          onChange: () => null,
          docked: false
        }
      ]
    },
    {
      labels: [
        {
          htmlFor: 'input_depart',
          white: true,
          children: 'Depart',
          className: dateClassName
        },
        {
          htmlFor: 'input_return',
          white: true,
          children: 'Return',
          className: dateClassName
        }
      ],
      inputs: [
        {
          FormComponent: BpkDatepicker,
          id: 'input_depart',
          name: 'outbounddate',
          date: moment(form.outbounddate).toDate() || '',
          className: dateClassName,
          daysOfWeek: DaysOfWeekConfig,
          changeMonthLabel: 'Change month',
          closeButtonText: 'Close',
          title: 'Departure date',
          getApplicationElement: () => document.getElementById('root'),
          formatDate: formatDate,
          formatMonth: formatMonth,
          formatDateFull: formatDateFull,
          dockedFirst: true
        },
        {
          FormComponent: BpkDatepicker,
          id: 'input_return',
          name: 'inbounddate',
          date: moment(form.inbounddate).toDate() || '',
          className: dateClassName,
          daysOfWeek: DaysOfWeekConfig,
          changeMonthLabel: 'Change month',
          closeButtonText: 'Close',
          title: 'Return date',
          getApplicationElement: () => document.getElementById('root'),
          formatDate: formatDate,
          formatMonth: formatMonth,
          formatDateFull: formatDateFull,
          dockedFirst: true
        }
      ]
    }
  ]
}
