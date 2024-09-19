import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import {StyleSheet, isTablet, scale} from 'react-native-size-scaling';
import colors from 'colors';
import {Button} from '@rneui/themed';
class BtnLogin extends Component {
  render() {
    return (
      <View
        style={{
          // flexDirection: 'row',
          // padding: scale(10),
          // justifyContent: 'space-evenly',
        }}>
        <Button
          onPress={() => this.props.navigation.navigate('LoginScreen')}
          title={'ĐĂNG NHẬP'}
          titleStyle={{color: 'white', fontSize: scale(14)}}
          buttonStyle={{borderColor: 'black'}}
          // type="outline"
        />
        {/* {Platform.OS === 'android' && (
          <Button
            onPress={() => this.props.navigation.navigate('RegisterUser')}
            title={'ĐĂNG KÝ HỌC'}
            titleStyle={{color: 'black', fontSize: scale(14)}}
            buttonStyle={{borderColor: 'black', borderRadius: scale(5)}}
            type="outline"
          />
        )} */}
      </View>
    );
  }
}

export default BtnLogin;
const styles = StyleSheet.create({
  touch1: {
    padding: 10,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt3: {
    color: 'white',
    fontSize: 16,
  },
});
