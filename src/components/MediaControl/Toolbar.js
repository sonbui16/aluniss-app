import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class Toolbar extends Component {
  render() {
    return (
      <View style ={{backgroundColor :'red'}}>
        {this.props.children}
      </View>
    )
  }
}

