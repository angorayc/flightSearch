import React from 'react';
import BpkSelect from 'bpk-component-select';
import BpkNudger from 'bpk-component-nudger';
import { get as _get } from 'lodash';

export default function() {
  let form = _get(this, 'state.form', {});

  return [
    {
      labels: [
        {
          htmlFor: 'cabin',
          children: 'Cabin Class'
        }
      ],
      inputs: [
        {
          FormComponent: BpkSelect,
          id: 'cabin',
          name: 'cabinclass',
          value: form.cabinclass || 'Economy',
          children: [
              {option: 'Economy', value: 'Economy'},
              {option: 'Premium Economy', value: 'PremiumEconomy'},
              {option: 'Business class', value: 'Business'},
              {option: 'First class', value: 'First'},
          ].map((option, i) => <option value={_get(option, 'value', '')}>{_get(option, 'option', '')}</option>)
        }
      ]
    },
    {
      labels: [
        {
          htmlFor: 'adults',
          children: 'Adults'
        }
      ],
      inputs: [
        {
          FormComponent: BpkNudger,
          id: 'adults',
          name: 'adults',
          min: 1,
          max: 10,
          value: form.adults || 1,
          decreaseButtonLabel: "Decrease",
          increaseButtonLabel: "Increase",
        }
      ]
    },
    {
      labels: [
        {
          htmlFor: 'children',
          children: 'Children'
        }
      ],
      inputs: [
        {
          FormComponent: BpkNudger,
          id: 'children',
          name: 'children',
          min: 0,
          max: 10,
          value: form.children || 0,
          decreaseButtonLabel: "Decrease",
          increaseButtonLabel: "Increase",
        }
      ]
    }
  ];
}

