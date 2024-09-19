import React, {Component} from 'react';
import {Image, TouchableOpacity , Text, View } from 'react-native';
// import Video from 'react-native-video';
import Modal from 'react-native-modal';

import {scale} from 'components/ScaleSheet';
import MediaControls, {PLAYER_STATES} from 'components/MediaControl';
import SettingVideoDocument from '../SettingVideoDocument';
import images from 'imagesApp/';
// import SettingVideo from '../../SettingVideo';

import vari from 'variables/platform';

import colors from 'colors/';
import styles from '../../../styles';

const dataRate = [
  {
    name: '0.25x',
    rate: 0.25,
  },
  {
    name: '0.5x',
    rate: 0.5,
  },
  {
    name: '0.75x',
    rate: 0.75,
  },
  {
    name: 'Bình thường',
    rate: 1.0,
  },
  {
    name: '1.25x',
    rate: 1.25,
  },
  {
    name: '1.5x',
    rate: 1.5,
  },
  {
    name: '7.5x',
    rate: 1.5,
  },
  {
    name: '2.0x',
    rate: 2.0,
  },
];

export class DocumentVideo extends React.PureComponent {
  videoPlayer;
  constructor(props) {
    super(props);
    this.onProgress = this.onProgress.bind(this);
    this.state = {
      // quality: null,
      quality:props.itemDoc[0].src,
      showTab: true,
      resizeMode: 'contain',
      rate: 1.0,
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      // paused: false ,
      paused: props.pauseVD,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
      currentVideo: 0,
      arrLessons: [],
      checkStatus: false,
      checkOnSeeking: true,
      visible: false,
      dataComplete: {},
    };
  }

  onPaused = (playerState) => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onEnd = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onLoad = (data) => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = () => this.setState({isLoading: true});

  onProgress = (data) => {
    const {isLoading, playerState} = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onFullScreen = () => {
    const {onFullScreen} = this.props;
    onFullScreen && onFullScreen();
  };
  onSeeking = (currentTime) => {
    this.setState({currentTime, checkOnSeeking: false});
  };

  onSeek = (seek) => {
    this.videoPlayer.seek(seek);
  };
  onVisible = () => {
    this.setState({visible: true});
  };
  onVisibleQualyti = () => {
    this.setState({visibleQualyti: true});
  };
  closeDocument = () => {
    const {closeDocument} = this.props;
    closeDocument && closeDocument();
  };
  renderRateControl = (rate) => {
    this.setState({rate: rate, visible: !this.state.visible});
  };
  renderQualytiControl = (quality, name) => {
    const isSelected = this.state.quality == quality;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            quality: quality,
            visibleQualyti: !this.state.visibleQualyti,
          });
        }}
        style={{flexDirection: 'row', padding: scale(10)}}>
        {isSelected ? (
        <Image
          resizeMode="contain"
          source={images.done}
          style={{height: scale(15), width: scale(15)}}
        />
        ) : (
          <View style={{width: scale(15)}} />
        )} 
        <Text
          size12
          style={{
            marginLeft: scale(10),
            fontWeight: isSelected ? 'bold' : 'normal',
          }}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {itemLearn, showTab, itemDoc} = this.props;
    const {visible, visibleQualyti} = this.state;
    return (
      <View style={{width: vari.width, height: vari.width / 2}}>
        <Video
          rate={this.state.rate}
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={(videoPlayer) => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          playWhenInactive={true}
          style={styles.mediaPlayer}
          volume={5.0}
          // controls={true}
          source={{
            uri: this.state.quality
          }} 
        />
        <Image
          resizeMode="contain"
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            tintColor: colors.blue3,
            width: scale(35),
            height: scale(35),
          }}
          source={{uri: itemLearn.logo_watermark_video}}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          indexBackward={0}
          totalArrVideo={0}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}>
          <SettingVideoDocument
            showTab={showTab}
          
            // navigation={navigation}
            closeDocument={this.closeDocument}
            onVisible={this.onVisible}
            onVisibleQualyti={this.onVisibleQualyti}
            itemLearn={itemLearn}
          />
        </MediaControls>

        <Modal
          isVisible={visible}
          swipeDirection={['up', 'left', 'right', 'down']}
          backdropOpacity={0.4}
          onBackdropPress={() => this.setState({visible: !visible})}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          ref={(ref) => (this.popup = ref)}>
          <View white style={{}}>
            {dataRate.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => this.renderRateControl(item.rate)}
                  style={{flexDirection: 'row', padding: scale(10)}}
                  key={index}>
                  {this.state.rate === item.rate ? (
                    <Image
                      resizeMode="contain"
                      source={images.done}
                      style={{height: scale(15), width: scale(15)}}
                    />
                  ) : (
                    <View style={{width: scale(15)}} />
                  )}
                  <Text
                    size12
                    style={{
                    
                      marginLeft: scale(10),
                      fontWeight:
                        this.state.rate === item.rate ? 'bold' : 'normal',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Modal>

        <Modal
          isVisible={visibleQualyti}
          swipeDirection={['up', 'left', 'right', 'down']}
          backdropOpacity={0.4}
          onBackdropPress={() =>
            this.setState({visibleQualyti: !visibleQualyti})
          }
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          ref={(ref) => (this.popup = ref)}>
          <View>
            {itemDoc &&
              itemDoc.map((item, index) => {
                return (
                  <View white style={{paddingVertical: scale(10)}}>
                    {this.renderQualytiControl(item.src, item.label)}
                  </View>
                );
              })}
          </View>
        </Modal>
      </View>
    );
  }
}

export default DocumentVideo;