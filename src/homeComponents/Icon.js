import React, { PureComponent } from 'react';
import { Image } from 'react-native';

const menuIcon = (
  <Image
    source={require('../../assets/Icons/menu.png')}
    style={{ height: 14, width: 18 }}
  />
);

export default class Icon extends PureComponent {
  render() {
    const { menu, children } = this.props;

    if (menu) return menuIcon;

    return children || null;
  }
}
