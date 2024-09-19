import React, { Component } from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import { PLAYER_STATES } from './playStates';
import { Controls } from './Controls';
import { Slider } from './Slider';

export class MediaControls extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      opacity: new Animated.Value(0),
    };
  }
  cancelAnimation = () => {
    const { opacity } = this.state;
    opacity.stopAnimation(() => {
      this.setState({ isVisible: true });
    });
  };

  onPause = () => {
    const { playerState, onPaused, fadeOutDelay = 5000, } = this.props;
    const { PLAYING, PAUSED } = PLAYER_STATES;
    switch (playerState) {
      case PLAYING: {
        this.cancelAnimation();
        break;
      }
      case PAUSED: {
        this.fadeOutControls(fadeOutDelay);
        break;
      }
      default:
        break;
    }
    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };
  onReplay = () => {
    const { fadeOutDelay = 5000, onReplay } = this.props
    this.fadeOutControls(fadeOutDelay);
    onReplay();

  };
  onBackward = () => {
    const { onBackward } = this.props
    onBackward();
  }
  onForward = () => {
    const { onForward } = this.props
    onForward();
  }
  fadeOutControls = (delay = 0) => {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay,
      useNativeDriver: false,
    }).start((result) => {
      if (result.finished) {
        this.setState({ isVisible: false });
      }
    });
  };
  fadeInControls = (loop = true) => {
    const { opacity } = this.state;
    const { fadeOutDelay = 5000, } = this.props;
    this.setState({ isVisible: true });
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
      useNativeDriver: false,
    }).start(() => {
      if (loop) {
        this.fadeOutControls(fadeOutDelay);
      }
    });
  };
  toggleControls = () => {
    const { opacity } = this.state;
    opacity.stopAnimation((value) => {
      this.setState({ isVisible: !!value });
      return value ? this.fadeOutControls() : this.fadeInControls();
    });
  };
  toggleControls = () => {
    const { opacity } = this.state;
    opacity.stopAnimation((value) => {
      this.setState({ isVisible: !!value });
      return value ? this.fadeOutControls() : this.fadeInControls();
    });
  };
  componentDidMount() {
    this.toggleControls()
  }
  render() {
    const { isVisible, opacity } = this.state;
    const {
      children,
      duration,
      fadeOutDelay = 5000,
      isLoading = false,
      mainColor = 'rgba(12, 83, 175, 0.9)',
      onSeek,
      playerState,
      progress,
      totalArrVideo,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.toggleControls}>

        <Animated.View style={[styles.container, { opacity }]}>
          {isVisible && (
            <View style={styles.container}>
              <View style={[styles.controlsRow, styles.toolbarRow]}>
                {children}
              </View>

              <Controls
                onPause={this.onPause}
                onReplay={this.onReplay}
                onBackward={this.onBackward}
                onForward={this.onForward}
                indexBackward={this.props.indexBackward}
                totalArrVideo={totalArrVideo}
                isLoading={isLoading}
                mainColor={mainColor}
                playerState={playerState}
              />
              <Slider
                progress={progress}
                duration={duration}
                mainColor={mainColor}
                playerState={playerState}
                onSeek={onSeek}
                onPause={this.onPause}
              />

            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
export default MediaControls;
