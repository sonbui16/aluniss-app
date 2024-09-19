import React, { Component } from 'react'
import AppNavigator from './router';
import { View, Text } from 'react-native';

export class AppContainer extends Component {
  render() {
    return (
        <View style = {{flex : 1 }}>
          <AppNavigator />
        </View>
    )
  }
}

export default AppContainer
