import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {humanizeVideoDuration} from 'components/MediaControl/utiles';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import vari from 'variables/platform';
import {PLAYER_STATES} from './playStates';
import {scale} from 'react-native-size-scaling';
import images from 'src/assets/images';
import {getPlayerStateIcon} from './utiles';
import {Slider} from '@rneui/themed';
import ShowAlert from 'src/components/ShowAlert';
import {Watermark} from 'src/components/Watermark';

@connect(
  state => ({
    auth: state.auth.user,
    infoSite: state.auth.saveInfoSite,
    infoUser: state.auth.saveInfoUser,
    // infoSite :
  }),
  {},
)
export class VideoDetail extends React.PureComponent {
  videoPlayer;
  constructor(props) {
    super(props);
    this.onProgress = this.onProgress.bind(this);
    this.state = {
      currentTime: 0,
      duration: 0,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      currentVideo: 0,
      visible: false,
      mute: false,
      opacity: new Animated.Value(0),
      isVisible: false,
      visibleAlert: false,
      title: '',
      visibleVideo: false,
    };
  }

  onPaused = playerState => {
    const {pauseVD, onPressPauseVD} = this.props;

    onPressPauseVD && onPressPauseVD();
    if (pauseVD) {
      this.setState({
        paused: false,
      });
    } else {
      this.setState({
        paused: !this.state.paused,
        playerState: playerState,
      });
    }
  };
  showAlert = message => {
    switch (message) {
      case 'Vui lòng không tua và xem đầy đủ nội dung video':
        this.setState({
          visibleAlert: true,
          title: 'Vui lòng không tua và xem đầy đủ nội dung video',
        });
        break;
      default:
        break;
    }
  };
  onBackdropPress = () => {
    this.setState({visibleAlert: !this.state.visibleAlert});
  };
  onReplay = () => {
    this.videoPlayer.seek(0);
    this.setState({playerState: PLAYER_STATES.PLAYING});
  };
  onBackward = () => {
    const {arrLessons, onPress} = this.props;
    this.setState({
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
    });
    onPress && onPress(arrLessons[this.props.currentVideo - 1], arrLessons);
  };

  onEnd = () => {
    const {onPressComplete} = this.props;
    onPressComplete && onPressComplete();
  };
  onLoad = data => this.setState({duration: data.duration, isLoading: false});
  onLoadStart = () => this.setState({isLoading: true});
  onProgress = data => {
    const {isLoading, playerState} = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };
  onFullScreen = () => {
    const {onFullScreen} = this.props;
    onFullScreen && onFullScreen();
  };
  exitFullScreen = () => {
    const {exitFullScreen} = this.props;
    exitFullScreen && exitFullScreen();
  };
  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onVisible = () => {
    const {onVisible} = this.props;
    onVisible && onVisible(this.props.checkFull);
  };
  onVisibleQualyti = () => {
    const {onVisibleQualyti} = this.props;
    onVisibleQualyti && onVisibleQualyti(this.props.checkFull);
  };
  fadeOutControls = (delay = 0) => {
    const {opacity} = this.state;
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay,
      useNativeDriver: false,
    }).start(result => {
      if (result.finished) {
        this.setState({isVisible: false});
      }
    });
  };
  fadeInControls = (loop = true) => {
    const {opacity} = this.state;
    this.setState({isVisible: true});
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
      useNativeDriver: false,
    }).start(() => {
      if (loop) {
        this.fadeOutControls(5000);
      }
    });
  };
  toggleControls = () => {
    const {opacity} = this.state;
    opacity.stopAnimation(value => {
      this.setState({isVisible: !!value});
      return value ? this.fadeOutControls() : this.fadeInControls();
    });
  };
  onPress = () => {
    const {onPress} = this.props;
    onPress && onPress();
  };
  cancelAnimation = () => {
    const {opacity} = this.state;
    opacity.stopAnimation(() => {
      this.setState({isVisible: true});
    });
  };
  onPause = () => {
    const {playerState} = this.state;
    const {PLAYING, PAUSED} = PLAYER_STATES;
    switch (playerState) {
      case PLAYING: {
        this.cancelAnimation();
        break;
      }
      case PAUSED: {
        this.fadeOutControls(5000);
        break;
      }
      default:
        break;
    }
    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return this.onPaused(newPlayerState);
  };
  tenForward = () => {
    this.videoPlayer.seek(this.state.currentTime + 10);
  };
  tenBackward = () => {
    this.videoPlayer.seek(this.state.currentTime - 10);
  };
  showNameQuality = quality => {
    const {nameQuality} = this.props;
    return nameQuality;
  };

  render() {
    const {quality, rate, pauseVD, playerState1, infoUser, infoSite} =
      this.props;
    const {isVisible, opacity, playerState, title, visibleAlert, paused} =
      this.state;
    const isIphoneX = DeviceInfo.hasNotch();
    const landscapeStyles = {
      transform: [{rotate: '90deg'}],
    };
    const landscapeStylesa = {
      transform: [{rotate: '270deg'}],
    };
    const landscapeStylesc = {
      transform: [{rotate: '180deg'}],
    };
    const pressAction =
      playerState === PLAYER_STATES.ENDED ? this.onReplay() : this.onPause;
    const icon =
      playerState1 === 1
        ? getPlayerStateIcon(1)
        : getPlayerStateIcon(playerState);
    let text = infoSite?.setting_appear_security
      ? `${infoSite?.appear_email ? infoUser?.email : ''} ${
          infoSite?.appear_name ? infoUser?.fullname : ''
        } ${infoSite?.appear_phone ? infoUser?.phone : ''} ${
          infoSite?.appear_custom ? infoSite?.appear_custom : ''
        }`.trim()
      : '';
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <View
          style={
            this.props.checkFull
              ? {
                  width: this.props.videoWidth,
                  height: this.props.videoHeight,
                  transform: [{rotate: '90deg'}],
                }
              : {width: this.props.videoWidth, flex: 1}
          }>
          <Video
            onError={err => {
              Alert.alert('Thông báo', 'Link bài học chưa đúng');
            }}
            onBuffer={first => {
              this.setState({visibleVideo: first?.isBuffering});
            }}
            ignoreSilentSwitch={'ignore'}
            muted={this.state.mute}
            rate={rate}
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={pauseVD ? true : paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode={'contain'}
            playWhenInactive={true}
            source={{
              // uri :"https://stream3.unica.vn/edubit/3285/328410/1080p.m3u8",
              uri: quality?.src || quality,
            }}
            // style={
            //   this.props.checkFull
            //     ? {
            //         width: this.props.videoWidth,
            //         height: this.props.videoHeight,
            //         transform: [{rotate: '90deg'}],
            //       }
            //     : {width: this.props.videoWidth, flex: 1}
            // }
            style={{width: '100%', flex: 1}}
          />
          <Watermark
            height={this.props.videoHeight}
            width={this.props.videoWidth}
            text={text}
            fontSize={scale(infoSite?.font_size) || scale(14)}
            fullScreen = {this.props.checkFull}
          />
        </View>
        {this.state.visibleVideo ? (
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              flex: 1,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        ) : (
          <TouchableWithoutFeedback onPress={this.toggleControls}>
            <Animated.View
              style={[
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  flex: 1,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                this.props.checkFull && landscapeStylesc,
                {opacity},
              ]}>
              {isVisible && (
                <View
                  style={[
                    this.props.checkFull
                      ? {
                          width: this.props.videoWidth,
                          height: this.props.videoHeight,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }
                      : {
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          left: 0,
                          right: 0,
                          position: 'absolute',
                          top: 0,
                          flex: 1,
                          bottom: 0,
                        },
                    this.props.checkFull && landscapeStylesa,
                  ]}>
                  <View
                    style={[
                      {
                        alignSelf: 'stretch',
                        flex: 1,
                      },
                    ]}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: this.props.checkFull
                          ? isIphoneX
                            ? vari.width / 6.5
                            : scale(20)
                          : scale(10),
                      }}>
                      {this.props.checkFull ? (
                        <View style={{width: 50, height: 50}} />
                      ) : (
                        <TouchableOpacity
                          onPress={this.onPress}
                          style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: scale(18),
                              height: scale(18),
                              tintColor: 'white',
                            }}
                            source={images.iconBack}
                          />
                        </TouchableOpacity>
                      )}
                      {/* Chất lượng video */}
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => this.onVisibleQualyti()}
                          style={{
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'white', fontSize: 14}}>
                            {quality?.label || this.showNameQuality(quality)}
                          </Text>
                        </TouchableOpacity>
                        {/* Tốc độ video */}
                        <TouchableOpacity
                          onPress={() => this.onVisible()}
                          style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'white', fontSize: 14}}>
                            {rate.label || `${rate}X`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    {/* Trở về bài trước */}
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {/* Tua sau 10s */}
                      <TouchableOpacity
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        onPress={() => this.tenBackward()}>
                        <Image
                          source={images.tenBack}
                          style={{
                            height: scale(30),
                            resizeMode: 'contain',
                            width: scale(30),
                            tintColor: 'white',
                          }}
                        />
                      </TouchableOpacity>

                      <View
                        style={{
                          height: scale(30),
                          width: scale(30),
                        }}
                      />
                      {/* Dừng video */}

                      <TouchableOpacity
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={pressAction}>
                        <Image
                          source={icon}
                          style={{
                            height: scale(30),
                            resizeMode: 'contain',
                            width: scale(30),
                            tintColor: 'white',
                          }}
                        />
                      </TouchableOpacity>
                      {/* Tua trước 10s*/}
                      <View
                        style={{
                          height: scale(30),
                          width: scale(30),
                        }}
                      />
                      {/* Next bài tiếp theo */}

                      <TouchableOpacity
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        onPress={() => this.tenForward()}>
                        <Image
                          source={images.tenFor}
                          style={{
                            height: scale(30),
                            resizeMode: 'contain',
                            width: scale(30),
                            tintColor: 'white',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        paddingHorizontal: this.props.checkFull
                          ? isIphoneX
                            ? vari.width / 6.5
                            : scale(20)
                          : scale(10),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end',
                        }}>
                        <Text style={{color: 'white', fontSize: 12}}>
                          {humanizeVideoDuration(this.state.currentTime)} /
                          {humanizeVideoDuration(this.state.duration)}
                        </Text>

                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: scale(40),
                            height: scale(50),
                          }}
                          onPress={() => this.onFullScreen()}>
                          <Image
                            style={{
                              tintColor: 'white',
                              width: scale(20),
                              height: scale(20),
                            }}
                            source={
                              this.props.checkFull
                                ? images.fullscreen
                                : images.fullscreen1
                            }
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={
                          this.props.checkFull
                            ? {
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor :'red'
                                flexDirection: 'row',
                              }
                            : {}
                        }>
                        <Slider
                          orientation={
                            this.props.checkFull ? 'vertical' : 'horizontal'
                          }
                          style={
                            this.props.checkFull
                              ? [
                                  {
                                    height: isIphoneX
                                      ? vari.height / 1.2
                                      : vari.height / 1.05,
                                  },
                                  this.props.checkFull && landscapeStylesa,
                                ]
                              : [{}]
                          }
                          trackStyle={{borderRadius: 1, height: 2}}
                          thumbStyle={{
                            backgroundColor: 'red',
                            borderRadius: 30,
                            height: 15,
                            width: 15,
                          }}
                          minimumTrackTintColor={'red'}
                          maximumTrackTintColor="#ccc"
                          maximumValue={Math.floor(this.state.duration)}
                          onSlidingComplete={value => this.onSeek(value)}
                          thumbTintColor="#0c0"
                          value={Math.floor(this.state.currentTime)}
                          thumbTouchSize={{width: 40, height: 40}}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
        <ShowAlert
          isVisible={visibleAlert}
          onBackdropPress={() => this.onBackdropPress()}
          title={title}
          landscapeStylesa={this.props.checkFull && landscapeStyles}
        />
      </View>
    );
  }
}
export default VideoDetail;
