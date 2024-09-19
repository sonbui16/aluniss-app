import React, {Component, PureComponent} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle , View, Text , TouchableWithoutFeedback } from 'react-native';

import color from 'colors/';

export class ModalRate extends PureComponent {
  static defaultProps = {
    title: 'Title modal',
    // txtSubmit: 'Save',
    txtCancel: 'Discard',
    indicatorColor: color.primary,
    type: 'primary',
    visibleBottom: true,
    justButtonCancel: false,
  };
  render() {
    if (!this.props.visible) return null;
    const {
      type,
      visibleBottom,
      title,
      // containerStyles,
      justButtonCancel,
      checkFull
    } = this.props;
    return (
      <View
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 , zIndex : 999 }}>

        <View style={{flex: 1, backgroundColor: '#000000', opacity: 0.4}} />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            // paddingHorizontal: 16,
          }}>
          <View
            style={[
              {
                backgroundColor: '#ffffff',
                width: '85%',
                paddingHorizontal: 22,
                paddingVertical: 16,
                borderRadius: 5,
              },
              checkFull ? {transform: [{rotate: '90deg'}]} : {},
              // containerStyles,
            ]}>
            {/* {title ? (
              <Text style={{color: 'green'}}>{this.props.title}</Text>
            ) : null} */}
            {this.props.children}
          
          </View>
        </View>
      </View>
    );
  }
}

export default ModalRate;
