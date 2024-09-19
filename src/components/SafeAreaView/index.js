import React, { Component, Fragment } from 'react';
import { SafeAreaView } from 'react-native';
import colors from 'colors';



export default class SafeAreaViews extends Component {
  render() {
    const { children , bgTeach } = this.props;
    return (
      <Fragment>
        <SafeAreaView style={{
          flex: 0,
          backgroundColor:bgTeach ? bgTeach : colors.blue3 
          // backgroundColor:'red' 

        }} />
        <SafeAreaView style={[ this.props.style, { flex: 1,  }]}>
          {children}
        </SafeAreaView>
      </Fragment>
    );
  }
}
