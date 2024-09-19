import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
// import RNSlider from "react-native-slider";
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
          {/* <RNSlider
            style={styles.progressSlider}
            onSlidingComplete={(value) => this.seekVideo(value)}
            maximumValue={Math.floor(duration)}
            value={Math.floor(progress)}
            trackStyle={styles.track}
            thumbStyle={[styles.thumb, { borderColor: "red" }]}
            minimumTrackTintColor={'red'}
          /> */}
        </View>
      </View>
    );
  }
}
