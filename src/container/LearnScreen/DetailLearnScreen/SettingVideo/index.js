import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';

import images from 'imagesApp';
import {scale} from 'src/components/ScaleSheet';
import styles from './styles';

export class SettingVideo extends React.PureComponent {
  onVisible = () => {
    const {onVisible} = this.props;
    onVisible && onVisible();
  };

  onMute = () => {
    const {onMute} = this.props;
    onMute && onMute();
  };
  onVisibleQualyti = () => {
    const {onVisibleQualyti} = this.props;
    onVisibleQualyti && onVisibleQualyti();
  };
  txtRate = rate => {
    switch (rate) {
      case 0.25:
        return '0.25x';
      case 0.5:
        return '0.5X';
      case 0.75:
        return '0.75X';
      case 1:
        return '1.0X';
      case 1.25:
        return '1.25X';
      case 1.5:
        return '1.5X';
      case 1.75:
        return '1.75X';
      case 2.0:
        return '2.0X';

      default:
        break;
    }
  };
  render() {
    const {showTab, navigation, itemLearn, mute} = this.props;
    return (
      <View style={styles.view}>
        {/* {!showTab ? (
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ width: scale(20), height: scale(20), }}
              source={images.iconBack}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {!showTab ? (
          <Text style={{ fontSize: 14, color: 'white', width: '80%' }} numberOfLines={1}>
            {itemLearn.name} 23
          </Text>
        ) : <Text style={{ width: '70%' }} />} */}

        <View
          style={{
            width: scale(30),
            height: scale(30),
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          {this.props.isFullScreen ? (
            <TouchableOpacity onPress={this.props.exitFullScreen}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={images.fullscreen1}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.props.onFullScreen}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={images.fullscreen}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{flexDirection: 'row'}}>
          {/* Tốc độ */}
          <TouchableOpacity onPress={this.onVisible}>
            <View
              style={{
                width: scale(33),
                height: scale(30),
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginRight : 6
              }}>
              {/* <Image
                resizeMode="contain"
                style={styles.img}
                source={images.volume}
              /> */}
              <Text style={{fontSize: 10}}>
                {this.txtRate(this.props.rate)}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Âm thanh */}
          {/* <View style={{
            width: scale(30), height: scale(30), borderRadius: 7, justifyContent: 'center',
            alignItems: 'center', backgroundColor: "white", marginRight : 5 
          }}>

            <TouchableOpacity

              onPress={this.onMute}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={mute ? images.volumeOff : images.volume}
              />
            </TouchableOpacity>
          </View> */}

          {/* Chất lượng */}
          <View
            style={{
              width: scale(30),
              height: scale(30),
              borderRadius: 7,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <TouchableOpacity onPress={this.onVisibleQualyti}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={images.dots}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SettingVideo;
