import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkDatepicker from 'bpk-component-datepicker';

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
    switch(component) {
      case BpkCheckbox:
        return {
          valueProp: 'checked',
          changeProp: 'onChange',
          callbackForChange: e => this.setState({ value: e.target.checked })
        }
      case BpkDatepicker:
        return {
          valueProp: 'date',
          changeProp: 'onDateSelect',
          callbackForChange: date => console.log('date', date)//this.setState({ value: date })
        }
      default:
        return {
          valueProp: 'value',
          changeProp: 'onChange',
          callbackForChange: e => this.setState({ value: e.target.value }),
        }
    }
  }

  render() {
    const { FormComponent, ...rest } = this.props;

    // let overrideProps = {};

    // if (FormComponent === BpkCheckbox) {
    //   overrideProps = {
    //     checked: this.state.value,
    //     onChange: e => this.setState({ value: e.target.checked }),
    //   };
    // } else {
    //   overrideProps = {
    //     value: this.state.value,
    //     onChange: e => this.setState({ value: e.target.value }),
    //   };
    // }
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
};

export default InputContainer;