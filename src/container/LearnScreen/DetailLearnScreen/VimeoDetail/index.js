import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {Vimeo} from 'react-native-vimeo-iframe';
import vari from 'variables/platform';

const videoCallbacks = {};

export class VimeoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: {},
      visible: 0,
      netInfo: '',
      wifiConnected: true,
    };
    // RNPdftron.initialize('Insert commercial license key here after purchase');
    // RNPdftron.enableJavaScript(true);
  }
  componentDidMount() {
  }
  render() {
    const {item} = this.props;

    return (
      <View style={{height: 190, width: vari.width, backgroundColor: 'red'}}>
        <Vimeo
          videoId={item.video_id}
          // params={'api=1&autoplay=0'}
          params={`h=${item.hash}&controls=1`}
          
          handlers={{
            timeupdate: data => console.log('timeupdate: ', data),
            play: data => console.log('playvimeo: ', data),
            pause: data => {
              this.setState({visible : "data"})
            },
            fullscreenchange: data => console.log('fullscreenchange: ', data),
            ended: data => console.log('ended: ', data),
            controlschange: data => console.log('controlschange: ', data),
          }}
        />
      </View>
    );
  }
}

export default VimeoDetail;
