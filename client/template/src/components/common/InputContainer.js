import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkDatepicker from 'bpk-component-datepicker';
import BpkNudger from 'bpk-component-nudger';
import moment from 'moment';

class InputContainer extends Component {
  constructor(props) {
    super(props);
    let { valueProp } = this._getComponent(props.FormComponent);

    this.state = {
      value: props[valueProp],
    };
    this._getComponent = this._getComponent.bind(this)
  }

  _getComponent(component) {
    let { updateForm } = this.props
    switch(component) {
      case BpkCheckbox:
        return {
          valueProp: 'checked',
          changeProp: 'onChange',
          callbackForChange: e => {
            let { checked } = e.target;
            let { name } = this.props;
            this.setState({ value: checked })
            updateForm(name, checked);
          }
        }
      case BpkDatepicker:
        return {
          valueProp: 'date',
          changeProp: 'onDateSelect',
          callbackForChange: date => {
            let { name } = this.props;
            this.setState({ value: date })
            console.log(moment(date).format('YYYY-MM-DD'))
            updateForm(name, moment(date).format('YYYY-MM-DD'));
          }
        }
      case BpkNudger:
        return {
          valueProp: 'value',
          changeProp: 'onChange',
          callbackForChange: value => {
            let { name } = this.props;
            this.setState({ value })
            updateForm(name, value);
          }
        }
      default:
        return {
          valueProp: 'value',
          changeProp: 'onChange',
          callbackForChange: e => {
            let { value } = e.target;
            let { name } = this.props;
            value = value.trim();
            if (name === 'originplace' || name === 'destinationplace')
              value = value.toUpperCase();
            this.setState({ value })
            updateForm(name, value)
          }
        }
    }
  }

  render() {
    const { FormComponent, updateForm, ...rest } = this.props;

    let { valueProp, callbackForChange, changeProp } = this._getComponent(FormComponent);
    let overrideProps = {
      [valueProp]: this.state.value,
      [changeProp]: callbackForChange
    };

    return (
      <FormComponent
        {...rest}
        {...overrideProps}
      />
    );
  }
}

InputContainer.propTypes = {
  FormComponent: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired
};

export default InputContainer;