import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {humanizeVideoDuration} from './utiles';
import {PLAYER_STATES} from './playStates';
import styles from './styles';
import images from 'src/assets/images';

export class Slider extends React.PureComponent {
  seekVideo = value => {
    this.props.onSeek(value);
  };
  render() {
    const {
      progress,
      duration,
      mainColor,
      onFullScreen,
      isFullScreen,
      exitFullScreen,
    } = this.props;
    return (
      <View style={[styles.controlsRow, styles.progressContainer]}>
        <View style={styles.progressColumnContainer}>
          <View style={[styles.timerLabelsContainer]}>
            <Text style={styles.timerLabel}>
              {humanizeVideoDuration(progress)}
            </Text>
            <Text style={styles.timerLabel}>
              {humanizeVideoDuration(duration)}
            </Text>
          </View>
          
        </View>
      </View>
    );
  }
}
