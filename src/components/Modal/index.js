import React, {Component, PureComponent} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle , View, Text } from 'react-native';

import color from 'colors/';

export class Modal extends PureComponent {
  static defaultProps = {
    title: 'Title modal',
    txtSubmit: 'Save',
    txtCancel: 'Discard',
    indicatorColor: color.primary,
    type: 'primary',
    visibleBottom: true,
    justButtonCancel: false,
  };
  render() {
    if (!this.props.visible) return null;
    const {type, visibleBottom, title, containerStyles, justButtonCancel} =
      this.props;
    return (
      <View
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
        <View style={{flex: 1}} />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,

            bottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}>
          <View
            style={[
              {
                // backgroundColor: '#3333336e',
                width: '85%',
                paddingHorizontal: 22,
                // paddingVertical: 16,
                borderRadius: 8,
              },
              containerStyles,
            ]}>
            {title ? (
              <Text style={{color: 'white', marginTop: 10, fontWeight: 'bold', textAlign: 'center'}}>{this.props.title}</Text>
            ) : null}
            {this.props.children}
            {visibleBottom && (
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  style={{marginRight: 16}}
                  onPress={this.props.onCancel}
                  activeOpacity={0.3}>
                  <Text style={{color: color.text}}>
                    {this.props.txtCancel}
                  </Text>
                </TouchableOpacity>

                {!justButtonCancel && (
                  <TouchableOpacity
                    onPress={this.props.onSubmit}
                    // loading={this.props.loading}
                    style={{
                      backgroundColor: 'transparent',
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                    }}
                    indicatorColor={
                      type === 'primary' ? color.primary : color.red
                    }>
                    <Text
                      style={{
                        color: type === 'primary' ? color.primary : color.red,
                      }}>
                      {this.props.txtSubmit}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default Modal;
