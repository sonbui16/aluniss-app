import React, {Component} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Image,View 
} from 'react-native';
import styles from './styles';
import {getPlayerStateIcon} from './utiles';
import {PLAYER_STATES} from './playStates';
import {scale} from 'components/ScaleSheet';
import images from 'src/assets/images';

export class Controls extends React.PureComponent {
  render() {
    const {
      isLoading,
      mainColor,
      playerState,
      onReplay,
      onPause,
      onBackward,
      onForward,
      indexBackward,
      indexForward,
      totalArrVideo,
    } = this.props;
    const icon = getPlayerStateIcon(playerState);
    const pressAction =
      playerState === PLAYER_STATES.ENDED ? onReplay : onPause;
    const actionBackward = onBackward;
    const actionForward = onForward;
    const content = isLoading ? (
      <ActivityIndicator size="large" color="#FFF" />
    ) : (
      <View style ={{
        flexDirection: 'row',
      alignItems: 'center'
      }}>
        <TouchableHighlight
          underlayColor="#656262"
          disabled={indexBackward !== 0 ? false : true}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: scale(70),
            height: scale(70),
            borderRadius: scale(35),
          }}
          onPress={actionBackward}>
          {indexBackward !== 0 ? (
            <Image source={images.backward} style={styles.playIcon} />
          ) : (
            <Image
              source={images.backward}
              style={{
                height: 22,
                resizeMode: 'contain',
                width: 22,
                tintColor: '#4E4C4C',
              }}
            />
          )}
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#656262"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: scale(70),
            height: scale(70),
            borderRadius: scale(35),
          }}
          onPress={pressAction}>
          <Image source={icon} style={styles.playIcon} />
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#656262"
          disabled = {indexBackward === totalArrVideo ? true : false}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: scale(70),
            height: scale(70),
            borderRadius: scale(35),
          }}
          onPress={actionForward}>
          {indexBackward === totalArrVideo ? (
            <Image
              source={images.forward}
              style={{
                height: 22,
                resizeMode: 'contain',
                width: 22,
                tintColor: '#4E4C4C',
              }}
            />
          ) : (
            <Image source={images.forward} style={styles.playIcon} />
          )}
        </TouchableHighlight>
      </View>
    );
    return <View style={[styles.controlsRow]}>{content}</View>;
  }
}
