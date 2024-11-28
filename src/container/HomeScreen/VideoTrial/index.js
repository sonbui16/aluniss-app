import {Text, View, Linking} from 'react-native';
import React, {Component} from 'react';
import {Icon} from '@rneui/themed';
import {scale} from 'react-native-size-scaling';
import colors from 'colors/';
import YoutubePlayer from 'react-native-youtube-iframe';
import vari from 'variables/platform';
import {getIdYoutube} from 'utils/index';
import HTMLView from 'react-native-render-html';
import Video from 'react-native-video';
import {Vimeo} from 'react-native-vimeo-iframe';

export class VideoTrial extends Component {
  getYouTubeVideoId = url => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };
  showContent = () => {
    const {item} = this.props.route.params;

    if (item?.text_content) {
      return (
        <View style={{flex: 1}}>
          <HTMLView
            tagsStyles={{
              div: {color: 'white'},
              li: {color: 'white'},
              p: {color: 'white'},
              span: {color: 'white'},
            }}
            // html={item.name}
            source={{html: item?.text_content}}
            allowedStyles={[]}
            onLinkPress={(event, href) => {
              Linking.openURL(href);
            }}
          />
        </View>
      );
    }
    if (item?.lesson_info) {
      switch (item?.lesson_info?.type) {
        case 'youtube':
          return (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <YoutubePlayer
                height={vari.width / 1.8}
                width={vari.width}
                play={true}
                videoId={this.getYouTubeVideoId(item?.lesson_info?.url)}
              />
            </View>
          );
        case 'video':
          return (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Video
                controls
                playWhenInactive={true}
                style={{
                  height: vari.width / 1.8,
                  width: vari.width,
                }}
                volume={5.0}
                source={{
                  uri: item?.lesson_info?.source,
                }}
              />
            </View>
          );
        case 'vimeo':
          return (
            <Vimeo
              videoId={item?.lesson_info?.video_id}
              params={'api=1&autoplay=0'}
              // params={'api=1&autoplay=0'}
              // params={`h=${item.hash}&controls=1`}
              // handlers={{
              //   timeupdate: data => console.log('timeupdate: ', data),
              //   play: data => console.log('playvimeo: ', data),
              //   pause: data => {
              //     this.setState({visible: 'data'});
              //   },
              //   fullscreenchange: data =>
              //   ended: data => console.log('ended: ', data),
              //   controlschange: data => console.log('controlschange: ', data),
              // }}
            />
          );

        default:
          break;
      }
    }
    if (item?.document_info) {
      return (
        <View style={{flex: 1}}>
          <Text style={{color: 'white'}}>Show PDF</Text>
        </View>
      );
    }
  };
  render() {
    const {item} = this.props.route.params;

    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Icon
          onPress={() => this.props.navigation.goBack()}
          style={{alignSelf: 'flex-start', margin: scale(10)}}
          name={'close'}
          type="material-community"
          size={scale(20)}
          color={colors.blue3}
        />
        {this.showContent()}
      </View>
    );
  }
}

export default VideoTrial;
