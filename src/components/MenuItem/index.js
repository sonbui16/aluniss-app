import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { scale } from 'components/ScaleSheet';
import images from 'imagesApp';
import styles from './styles';


export class MenuItem extends React.PureComponent {
  render() {
    const { title, iconLeft, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>

          <Text style={{color : 'black', fontSize: 14, marginLeft: scale(20) }}>
            {title}{' '}
          </Text>
          {iconLeft && (
            <Image
              source={images.news}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />)}


        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: scale(50) }}>
          <Image
            source={images.iconNext}
            style={styles.img}
            resizeMode="contain"
          />

        </View>
      </TouchableOpacity>
    );
  }
}

export default MenuItem;
