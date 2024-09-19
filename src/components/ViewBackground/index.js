import React, {Component} from 'react';
import {Text, View ,ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import images from 'imagesApp';
import vari from 'variables/platform';
import colors from 'colors';

export class ViewBackground extends Component {
  render() {
    const {style} = this.props;
    return (
      <LinearGradient
      end={{x: 1, y: 1}}
      colors={[colors.blue3, colors.blue3]}
      locations={[0, 1]}
      style={style}>
      {this.props.children}
    </LinearGradient>



    );
  }
}

export default ViewBackground;
