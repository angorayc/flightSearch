import React from 'react';
import './TopNav.scss';
//import logo from '../..//logo.svg';
import Logo from './Logo'
import BpkLargeMenuIcon from 'bpk-component-icon/lg/menu';
import { withAlignment } from 'bpk-component-icon';
import { colorBlue500, iconSizeLg, lineHeightBase } from 'bpk-tokens/tokens/base.es6';


const AlignedBpkLargeMenuIcon = withAlignment(BpkLargeMenuIcon, iconSizeLg, lineHeightBase);


const TopNav = () => (
  <header className="header">
    <a href="/" className="header__logo">
      <span className="logoText">Skyscanner</span>
      <Logo />
    </a>
    <AlignedBpkLargeMenuIcon fill={colorBlue500} />
  </header>
)

export default TopNav;
