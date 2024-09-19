import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Apptext from 'src/components/Apptext';
import {isTablet, scale} from 'react-native-size-scaling';

import LinearGradient from 'react-native-linear-gradient';
import {vScale} from 'components/ScaleSheet';
import vari from 'variables/platform';
import colors from 'colors';
import images from 'src/assets/images';

export const ToolbarImgLeft = props => {
  return (
    <TouchableOpacity style={styles.touch} onPress={props.onPress}>
      <Image style={styles.image} source={props.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
};
export const ToolbarImgRight = props => {
  return (
    <TouchableOpacity
      style={{
        width: scale(50),
        height: vScale(50),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={props.onPress}>
      <Image
        style={[{tintColor: props.styleImgRight}, styles.image]}
        source={props.icon}
        resizeMode="contain"
      />

      {props.cart && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            position: 'absolute',
            right: 5,
            top: 5,
            borderRadius: scale(8),
            width: scale(16),
            height: scale(16),
          }}>
          <Text size10 orange1 style={{fontSize: 10, color: colors.orange1}}>
            {props.cart}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export class Toolbar extends React.PureComponent {
  leftPress = () => {
    if (this.props.leftPress) {
      this.props.leftPress();
    }
  };
  rightPress = () => {
    if (this.props.rightPress) {
      this.props.rightPress();
    }
  };
  renderContent() {
    return (
      <View style={styles.toolbarContent}>
        <View style={styles.touch}>
          {this.props.iconLeft && (
            <ToolbarImgLeft
              onPress={this.leftPress}
              icon={this.props.iconLeft}
            />
          )}
        </View>
        {this.props.title && (
          <View
            style={{
              height: scale(50),
              width: '75%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{textAlign: 'center', color: 'red', fontSize: scale(16)}}
              numberOfLines={1}>
              {this.props.title}
            </Text>
          </View>
        )}

        <View style={styles.touch}>
          {this.props.iconRight && (
            <ToolbarImgRight
              cart={this.props.cart}
              onPress={this.rightPress}
              styleImgRight={this.props.styleImgRight}
              icon={this.props.iconRight}
            />
          )}
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={{height: vari.toolbarHeight, borderBottomWidth : 0.5 , borderBottomColor : '#bababa'}}>{this.renderContent()}</View>
    );
  }
}

export default Toolbar;
const styles = StyleSheet.create({
  toolbarContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  touch: {
    width: scale(50),
    height: vScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    tintColor :colors.blue2
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(5),
    padding: 5,
    height: 28,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    flex: 1,
  },
});
