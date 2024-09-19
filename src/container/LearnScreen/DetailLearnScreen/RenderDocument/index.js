import React, {Component} from 'react';
import {View, Text, Platform, TouchableOpacity, Image} from 'react-native';
import SafeAreaViews from 'components/SafeAreaView';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import {scale} from 'components/ScaleSheet';
// import {DocumentView} from '@pdftron/react-native-pdf';
import Video from 'react-native-video';
import colors from 'colors/';
import {PLAYER_STATES} from 'container/LearnScreen/DetailLearnScreen/VideoDetail/playStates';
import {getPlayerStateIcon} from 'container/LearnScreen/DetailLearnScreen/VideoDetail/utiles';
import vari from 'variables/platform';
import {humanizeVideoDuration} from 'components/MediaControl/utiles';
import {Slider, Icon} from '@rneui/themed';
import {WebView} from 'react-native-webview';

class RenderDocument extends Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      playerState: PLAYER_STATES.PLAYING,
      isLoading: true,
      duration: 0,
      paused: false,
      isMute: false,
      showWebView: false,
    };
  }
  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };
  onProgress = data => {
    const {isLoading, playerState} = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };
  onLoad = data => this.setState({duration: data.duration, isLoading: false});
  onLoadStart = () => this.setState({isLoading: true});
  onEnd = () => {
    this.props.navigation.goBack();
  };
  onReplay = () => {
    this.videoPlayer.seek(0);
    this.setState({playerState: PLAYER_STATES.PLAYING});
  };
  onPause = () => {
    const {playerState} = this.state;
    const {PLAYING, PAUSED} = PLAYER_STATES;

    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return this.onPaused(newPlayerState);
  };
  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };
  render() {
    const {link_document} = this.props.route.params;
    const {playerState, showWebView} = this.state;
    const containsMp3 = link_document.includes('mp3');
    const pressAction =
      playerState === PLAYER_STATES.ENDED ? this.onReplay() : this.onPause;
    const icon = getPlayerStateIcon(playerState);

    // const text =
    //   'Học tiếng Hàn qua hội thoại] 10살로 돌아간다면🌻《Nếu được trở về lúc 10 tuổi》💭.doc';

    // const hasMP3Extension = /\.mp3\b/.test(text);
    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
          title="document"
        />
        {showWebView ? (
          <WebView
            // ref={ref => {
            //   this.webview = ref;
            // }}
            // onLoadProgress={({nativeEvent}) =>
            //   this.setState({progress: nativeEvent.progress})
            // }
            source={{
              uri: link_document,
            }}
            // onLoadEnd={() => this.setState({isLoaded: true})}
            // renderLoading={this.renderLoading}
            // style={{marginTop: 5}}
          />
        ) : containsMp3 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
            }}>
            <Video
              ref={videoPlayer => (this.videoPlayer = videoPlayer)}
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                // bottom: 0,
                // right: 0,
                width: '100%',
                height: 50,
                // backgroundColor: Platform.OS === 'android' ? 'red' : 'black',
              }}
              muted={this.state.isMute}
              source={{uri: link_document}}
              onProgress={this.onProgress}
              // paused={true} // Tắt tự động phát âm thanh
              onEnd={this.onEnd}
              onLoad={this.onLoad}
              onLoadStart={this.onLoadStart}
              paused={this.state.paused}
            />
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: scale(60),
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: scale(30),
              }}>
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
                    height: scale(10),
                    resizeMode: 'contain',
                    width: scale(10),
                    tintColor: 'black',
                  }}
                />
              </TouchableOpacity>
              <Text style={{color: 'black', fontSize: scale(12)}}>
                {humanizeVideoDuration(this.state.currentTime)} /
                {humanizeVideoDuration(this.state.duration)}
              </Text>
              <View style={{width: vari.width / 3}}>
                <Slider
                  style={{}}
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
              <Icon
                onPress={() => {
                  this.setState({isMute: !this.state.isMute});
                }}
                color={'black'}
                name={this.state.isMute ? 'volume-off' : 'volume-high'}
                size={scale(15)}
                type="material-community"
              />
            </View>
          </View>
        ) : (
          // <DocumentView
          //   documentSliderEnabled={false}
          //   bottomToolbarEnabled={false}
          //   hideTopToolbars={true}
          //   document={encodeURI(link_document)}
          //   setVisibilityForAnnotation={false}
          //   readOnly={true}
          //   onDocumentError={error => {
          //     this.setState({showWebView: true});
          //   }}
          // />
          <View style={{flex: 1}}></View>
        )}
      </SafeAreaViews>
    );
  }
}

export default RenderDocument;
