import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {connect} from 'react-redux';
import {completeLesson, lessonsID} from 'store/actions/app';
import vari from 'variables/platform';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Icon} from '@rneui/themed';
import {scale} from 'react-native-size-scaling';
import ModalRate from 'components/ModalRate';
import images from 'src/assets/images';
import {getPlayerStateIcon} from '../../DetailLearnScreen/VideoDetail/utiles';
import {PLAYER_STATES} from '../../DetailLearnScreen/VideoDetail/playStates';
const dataRate = [
  {
    name: '0.5x',
    rate: 0.5,
  },

  {
    name: '1X',
    rate: 1,
  },

  {
    name: '1.5x',
    rate: 1.5,
  },

  {
    name: '2.0x',
    rate: 2.0,
  },
];

@connect(
  state => ({
    auth: state.auth.user,
  }),
  {
    completeLesson,
    lessonsID,
  },
)
export class YoutubeDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      elapsed: false,
      playing: true,
      currentTime: 0,
      sliderTime: 0,
      isMute: false,
      replay: false,
      unstarted: false,
      duration: 0,
      visibleSpeed: false,
      opacity: new Animated.Value(0),
      playerState: PLAYER_STATES.PLAYING,
      speed: {
        name: '1X',
        rate: 1,
      },
    };
    this.playerRef = React.createRef();
  }
  // tăng
  tenForward = async () => {
    // const {itemLearn} = this.props;
    await this.playerRef.current?.seekTo(this.state.sliderTime + 10);
  };
  // giảm
  tenBackward = async () => {
    await this.playerRef.current?.seekTo(this.state.sliderTime - 10);
  };
  onSeek = seek => {
    this.playerRef.current?.getCurrentTime().then(currentTime => {
      const elapsed_ms = Math.floor(currentTime * 1000);
      const min = Math.floor(elapsed_ms / 60000);
      const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);
      this.setState({
        currentTime:
          min.toString().padStart(2, '0') +
          ':' +
          seconds.toString().padStart(2, '0'),
      });
      this.playerRef.current?.seekTo(seek, true);
    });
  };
  onPress = () => {
    const {onPress} = this.props;
    onPress && onPress();
  };
  onFullScreenYoutube = () => {
    const {onFullScreenYoutube} = this.props;
    onFullScreenYoutube && onFullScreenYoutube();
  };
  async componentDidMount() {
    const {item} = this.props;
    const elapsed_sec2 = item?.lesson_info?.duration;
    const elapsed_ms2 = Math.floor(elapsed_sec2 * 1000);
    const min2 = Math.floor(elapsed_ms2 / 60000);
    const seconds2 = Math.floor((elapsed_ms2 - min2 * 60000) / 1000);
    this.setState({
      duration:
        min2.toString().padStart(2, '0') +
        ':' +
        seconds2.toString().padStart(2, '0'),
    });
    // this.interval = setInterval(async () => {
    //   const elapsed_sec = await this.playerRef.current.getCurrentTime() || 0;
    //   // calculations
    //   const elapsed_ms = Math.floor(elapsed_sec * 1000);
    //   const min = Math.floor(elapsed_ms / 60000);
    //   const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);
    //   this.setState({
    //     currentTime:
    //       min.toString().padStart(2, '0') +
    //       ':' +
    //       seconds.toString().padStart(2, '0'),
    //     sliderTime: elapsed_sec,
    //   });
    // }, 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  renderRateControl = item => {
    this.setState({speed: item, visibleSpeed: !this.state.visibleSpeed});
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
  cancelAnimation = () => {
    const {opacity} = this.state;
    opacity.stopAnimation(() => {
      this.setState({isVisible: true});
    });
  };
  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };
  onPause = () => {
    const {playerState, playing} = this.state;
    const {PLAYING, PAUSED} = PLAYER_STATES;
    switch (playerState) {
      case PLAYING: {
        this.cancelAnimation();
        this.setState({playing: false});
        break;
      }
      case PAUSED: {
        this.setState({playing: true});
        this.fadeOutControls(5000);
        break;
      }
      default:
        break;
    }
    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return this.onPaused(newPlayerState);
  };
  onReplay = () => {
    this.videoPlayer.seek(0);
    this.setState({playerState: PLAYER_STATES.PLAYING});
  };
  completeCourse = item => {
    const {onPressComplete} = this.props;
    onPressComplete && onPressComplete();
  };
  render() {
    const {item} = this.props;
    const {
      playing,
      isMute,
      speed,
      visibleSpeed,
      opacity,
      isVisible,
      playerState,
    } = this.state;
    const pressAction =
      playerState === PLAYER_STATES.ENDED ? this.onReplay() : this.onPause;
    const icon = getPlayerStateIcon(playerState);
    const isIphoneX = DeviceInfo.hasNotch();
    return (
      // <View
      //   style={
      //     this.props.checkFullYoutube
      //       ? {
      //           width: vari.width,
      //           height: vari.height,
      //           justifyContent: 'center',
      //           alignItems: 'center',
      //         }
      //       : {
      //           flex: 1,
      //           justifyContent: 'center',
      //           alignItems: 'center',
      //         }
      //   }>
      //   <View
      //     style={
      //       this.props.checkFullYoutube
      //         ? {
      //             width: vari.height,
      //             height: vari.width,
      //             transform: [{rotate: '90deg'}],
      //             justifyContent: 'center',
      //             alignItems: 'center',
      //           }
      //         : {
      //             flex: 1,
      //             justifyContent: 'center',
      //             alignItems: 'center',
      //           }
      //     }>
      //     <YoutubePlayer
      //       playbackRate={speed.rate}
      //       mute={isMute}
      //       height={this.props.checkFullYoutube ? vari.width : scale(250)}
      //       width={this.props.checkFullYoutube ? vari.height / 1.2 : vari.width}
      //       initialPlayerParams={{
      //         controls: false,
      //       }}
      //       play={playing}
      //       videoId={`${item?.lesson_info?.video_id}`}
      //       ref={this.playerRef}
      //       onChangeState={e => {
      //         if (e === 'unstarted') {
      //           this.setState({unstarted: true});
      //         } else if (e === 'playing') {
      //           this.setState({playing: true});
      //         } else if (e === 'paused') {
      //           this.setState({playing: false});
      //         } else if (e === 'ended') {
      //           // Kết thúc video thì gọi api hoàn thành
      //           this.completeCourse(item);
      //         }
      //       }}
      //     />
      //   </View>

      //   <TouchableWithoutFeedback onPress={this.toggleControls}>
      //     <Animated.View
      //       style={[
      //         this.props.checkFullYoutube
      //           ? {
      //               backgroundColor: 'rgba(0, 0, 0, 0.5)',
      //               flex: 1,
      //               position: 'absolute',
      //               left: 0,
      //               right: 0,
      //               top: 0,
      //               bottom: 0,
      //               justifyContent: 'center',
      //               alignItems: 'center',
      //             }
      //           : {
      //               backgroundColor: 'rgba(0, 0, 0, 0.5)',
      //               flex: 1,
      //               position: 'absolute',
      //               left: 0,
      //               right: 0,
      //               top: 0,
      //               bottom: 0,
      //               justifyContent: 'center',
      //               alignItems: 'center',
      //             },
      //         {opacity},
      //       ]}>
      //       {isVisible && (
      //         <View
      //           style={[
      //             this.props.checkFullYoutube
      //               ? {
      //                   width: vari.height,
      //                   height: vari.width,
      //                   flexDirection: 'column',
      //                   justifyContent: 'center',
      //                   alignItems: 'center',
      //                   transform: [{rotate: '90deg'}],
      //                 }
      //               : {
      //                   flexDirection: 'column',
      //                   justifyContent: 'center',
      //                   alignItems: 'center',
      //                   left: 0,
      //                   right: 0,
      //                   position: 'absolute',
      //                   top: 0,
      //                   flex: 1,
      //                   bottom: 0,
      //                 },
      //           ]}>
      //           <View
      //             style={[
      //               {
      //                 alignSelf: 'stretch',
      //                 flex: 1,
      //               },
      //             ]}>
      //             <View
      //               style={{
      //                 width: '100%',
      //                 flexDirection: 'row',
      //                 justifyContent: 'space-between',
      //                 paddingHorizontal: this.props.checkFullYoutube
      //                   ? isIphoneX
      //                     ? vari.width / 6.5
      //                     : scale(20)
      //                   : scale(10),
      //               }}>
      //               {this.props.checkFullYoutube ? (
      //                 <View style={{width: 50, height: 50}} />
      //               ) : (
      //                 <TouchableOpacity
      //                   onPress={this.onPress}
      //                   style={{
      //                     width: 50,
      //                     height: 50,
      //                     justifyContent: 'center',
      //                     alignItems: 'center',
      //                   }}>
      //                   <Image
      //                     resizeMode="contain"
      //                     style={{
      //                       width: scale(18),
      //                       height: scale(18),
      //                       tintColor: 'white',
      //                     }}
      //                     source={images.iconBack}
      //                   />
      //                 </TouchableOpacity>
      //               )}
      //               <View style={{flexDirection: 'row'}}>
      //                 <TouchableOpacity
      //                   onPress={() => this.onVisibleQualyti()}
      //                   style={{
      //                     height: 50,
      //                     justifyContent: 'center',
      //                     alignItems: 'center',
      //                   }}>
      //                   <Text style={{color: 'white', fontSize: 14}}></Text>
      //                 </TouchableOpacity>
      //                 <TouchableOpacity
      //                   onPress={() => this.onVisible()}
      //                   style={{
      //                     width: 50,
      //                     height: 50,
      //                     justifyContent: 'center',
      //                     alignItems: 'center',
      //                   }}>
      //                   <Text style={{color: 'white', fontSize: 14}}></Text>
      //                 </TouchableOpacity>
      //               </View>
      //             </View>
      //           </View>
      //           <View
      //             style={{
      //               flexDirection: 'row',
      //               flex: 1,
      //             }}>
      //             <View
      //               style={{
      //                 width: '100%',
      //                 justifyContent: 'space-evenly',
      //                 flexDirection: 'row',
      //                 alignItems: 'center',
      //               }}>
      //               <TouchableOpacity
      //                 style={{
      //                   justifyContent: 'space-between',
      //                   alignItems: 'center',
      //                 }}
      //                 onPress={() => this.tenBackward()}>
      //                 <Image
      //                   source={images.tenBack}
      //                   style={{
      //                     height: scale(30),
      //                     resizeMode: 'contain',
      //                     width: scale(30),
      //                     tintColor: 'white',
      //                   }}
      //                 />
      //               </TouchableOpacity>
      //               <View
      //                 style={{
      //                   height: scale(30),
      //                   width: scale(30),
      //                 }}
      //               />
      //               <TouchableOpacity
      //                 style={{
      //                   justifyContent: 'space-between',
      //                   flexDirection: 'row',
      //                   alignItems: 'center',
      //                 }}
      //                 onPress={pressAction}>
      //                 <Image
      //                   source={icon}
      //                   style={{
      //                     height: scale(30),
      //                     resizeMode: 'contain',
      //                     width: scale(30),
      //                     tintColor: 'white',
      //                   }}
      //                 />
      //               </TouchableOpacity>
      //               <View
      //                 style={{
      //                   height: scale(30),
      //                   width: scale(30),
      //                 }}
      //               />

      //               <TouchableOpacity
      //                 style={{
      //                   justifyContent: 'space-between',
      //                   alignItems: 'center',
      //                 }}
      //                 onPress={() => this.tenForward()}>
      //                 <Image
      //                   source={images.tenFor}
      //                   style={{
      //                     height: scale(30),
      //                     resizeMode: 'contain',
      //                     width: scale(30),
      //                     tintColor: 'white',
      //                   }}
      //                 />
      //               </TouchableOpacity>
      //             </View>
      //           </View>
      //           <View
      //             style={{
      //               alignItems: 'center',
      //               flex: 1,
      //               flexDirection: 'row',
      //             }}>
      //             <View
      //               style={{
      //                 flex: 1,
      //                 paddingHorizontal: this.props.checkFullYoutube
      //                   ? isIphoneX
      //                     ? vari.width / 6.5
      //                     : scale(20)
      //                   : scale(10),
      //               }}>
      //               <View
      //                 style={{
      //                   flexDirection: 'row',
      //                   justifyContent: 'space-between',
      //                   alignItems: 'flex-end',
      //                 }}>
      //                 <Text style={{color: 'white', fontSize: scale(12)}}>
      //                   {this.state.currentTime} /{this.state.duration}
      //                 </Text>

      //                 <TouchableOpacity
      //                   style={{
      //                     alignItems: 'center',
      //                     justifyContent: 'flex-end',
      //                     width: scale(40),
      //                     height: scale(50),
      //                   }}
      //                   onPress={() => this.onFullScreenYoutube()}>
      //                   <Image
      //                     style={{
      //                       tintColor: 'white',
      //                       width: scale(20),
      //                       height: scale(20),
      //                     }}
      //                     source={
      //                       this.props.checkFullYoutube
      //                         ? images.fullscreen
      //                         : images.fullscreen1
      //                     }
      //                   />
      //                 </TouchableOpacity>
      //               </View>
      //               <View
      //                 style={
      //                   this.props.checkFullYoutube
      //                     ? {
      //                         flex: 1,

      //                         flexDirection: 'row',
      //                       }
      //                     : {}
      //                 }>
      //                 <YoutubeDetail
      //                   orientation={'horizontal'}
      //                   style={
      //                     this.props.checkFullYoutube
      //                       ? [
      //                           {
      //                             width: 690,
      //                           },
      //                         ]
      //                       : [{}]
      //                   }
      //                   trackStyle={{borderRadius: 1, height: scale(3)}}
      //                   thumbStyle={{
      //                     backgroundColor: 'red',
      //                     borderRadius: scale(17 / 2),
      //                     height: scale(17),
      //                     width: scale(17),
      //                   }}
      //                   minimumTrackTintColor={'red'}
      //                   maximumTrackTintColor="#ccc"
      //                   maximumValue={item?.lesson_info?.duration}
      //                   onSlidingComplete={value => this.onSeek(value)}
      //                   value={Math.floor(this.state.sliderTime)}
      //                   thumbTintColor="#0c0"
      //                   thumbTouchSize={{width: scale(30), height: scale(30)}}
      //                 />
      //               </View>
      //             </View>
      //           </View>
      //         </View>
      //       )}
      //     </Animated.View>
      //   </TouchableWithoutFeedback>

      //   <ModalRate
      //     checkFull={this.props.checkFullYoutube}
      //     visible={visibleSpeed}
      //     backdropOpacity={0.7}>
      //     <View style={[{backgroundColor: 'white'}]}>
      //       <View
      //         style={{
      //           flexDirection: 'row',
      //           alignItems: 'center',
      //           justifyContent: 'space-between',
      //         }}>
      //         <Text style={{fontSize: scale(14), color: 'black'}}>
      //           Tốc độ video
      //         </Text>

      //         <Icon
      //           onPress={() => {
      //             this.setState({
      //               visibleSpeed: !this.state.visibleSpeed,
      //             });
      //           }}
      //           color={'black'}
      //           name={'close'}
      //           size={scale(25)}
      //           type="material-community"
      //         />
      //       </View>

      //       {dataRate.map((item, index) => {
      //         return (
      //           <TouchableOpacity
      //             onPress={() => this.renderRateControl(item)}
      //             style={{flexDirection: 'row', padding: scale(10)}}
      //             key={index}>
      //             <Text
      //               style={{
      //                 color: 'black',
      //                 marginLeft: scale(10),
      //                 fontSize: scale(12),
      //               }}>
      //               {item.name}
      //             </Text>
      //           </TouchableOpacity>
      //         );
      //       })}
      //     </View>
      //   </ModalRate>
      // </View>

      <View>
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
        <YoutubePlayer
          playbackRate={speed.rate}
          mute={isMute}
          height={this.props.checkFullYoutube ? vari.width : scale(250)}
          width={this.props.checkFullYoutube ? vari.height / 1.2 : vari.width}
          // initialPlayerParams={{
          //   controls: false,
          // }}
          play={true}
          videoId={`${item?.lesson_info?.video_id}`}
          ref={this.playerRef}
          onChangeState={e => {
            if (e === 'unstarted') {
              this.setState({unstarted: true});
            } else if (e === 'playing') {
              this.setState({playing: true});
            } else if (e === 'paused') {
              this.setState({playing: false});
            } else if (e === 'ended') {
              // Kết thúc video thì gọi api hoàn thành
              this.completeCourse(item);
            }
          }}
        />
      </View>
    );
  }
}
export default YoutubeDetail;
