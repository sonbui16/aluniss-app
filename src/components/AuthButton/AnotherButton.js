import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import images from 'src/assets/images';
import {scale} from '../ScaleSheet';
import vari from 'variables/platform';
class AnotherButton extends Component {
  render() {
    const {img, onPress} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.1}
        onPress={onPress}
        style={[styles.container, {...this.props.containerStyle}]}>
        {!this.props.loading ? (
          <View style={{flexDirection: 'row'}}>
            {img ? (
              <Image
                source={img}
                style={{
                  height: scale(19),
                  width: scale(19),
                  marginHorizontal: 15,
                }}
                resizeMode="contain"
              />
            ) : null}
            <Text style={[styles.text, {...this.props.textStyle}]}>
              {this.props.text}
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}
      </TouchableOpacity>
    );
  }
}
export default AnotherButton;
AnotherButton.defaultProps = {
  containerStyle: {},
  textStyle: {},
  loading: false,
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58233',
    borderRadius: scale(30),
    padding: scale(15),
    flex:1
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});