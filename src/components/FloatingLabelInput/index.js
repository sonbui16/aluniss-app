import React, {Component} from 'react';
import {
  View,
  // TextInput,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import colors from 'colors';
const {width} = Dimensions.get('screen');
import {scale} from 'react-native-size-scaling';
import {Button, Icon} from '@rneui/themed';
import {TextInput} from 'react-native-paper';

export class FloatingLabelInput extends Component {
  onPressShowPass = () => {
    const {onPressShowPass} = this.props;
    onPressShowPass && onPressShowPass();
  };
  render() {
    const {label, showIcon, isShowPass, ...props} = this.props;
    const labelInput = {
      color: 'green',
      // height: scale(50),
      fontSize: scale(14),
      color: colors.black,
      // margin: scale(5),
      backgroundColor :'white',
    };
    return (
      <TextInput
      textColor='black'
        mode="outlined"
        label={label}
        outlineStyle={{borderRadius: scale(10) , backgroundColor :'white'}}
        placeholderTextColor={'#E9E9E9'}
        autoCapitalize="none"
        {...props}
        style={labelInput}
        blurOnSubmit
        activeOutlineColor={colors.blue2}

      />
    
    );
  }
}

export default FloatingLabelInput;
