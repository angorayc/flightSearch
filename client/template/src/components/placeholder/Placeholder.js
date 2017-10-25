import React from 'react';
import BpkText from 'bpk-component-text'
import BpkLargeArrowIcon from 'bpk-component-icon/lg/long-arrow-right';
import { withAlignment } from 'bpk-component-icon';
import { iconSizeLg, lineHeightXxl } from 'bpk-tokens/tokens/base.es6';
import './Placeholder.scss';

const AlignedBpkLargeArrowIcon = withAlignment(BpkLargeArrowIcon, iconSizeLg, lineHeightXxl);


const Placeholder = ({destinationplace, originplace, travellers, cabinclass}) => (
  <div className="placeholder">
    <BpkText tagName="h1" textStyle="xxl">{ originplace }<AlignedBpkLargeArrowIcon fill="white"/>{ destinationplace }</BpkText>
    <BpkText tagName="h3" textStyle="lg">{`${travellers} travellers, ${cabinclass}`}</BpkText>
  </div>
)


export default Placeholder