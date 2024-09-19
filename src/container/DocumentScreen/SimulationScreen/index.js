import {Text, View, Linking} from 'react-native';
import React, {Component} from 'react';
import SafeAreaView from 'components/SafeAreaView';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import {scale} from 'react-native-size-scaling';
import {infoSites} from 'actions/auth';
import {connect} from 'react-redux';
import {site_id} from 'store/api/common';
import WebView from 'react-native-webview';

@connect(
  state => ({
    auth: state.auth.user,
  }),
  {infoSites},
)
export class SimulationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInfo: {},
    };
  }
  componentDidMount() {
    const {infoSites, auth} = this.props;

    infoSites(site_id, auth?.access_token, (err, data) => {
      if (err) {
      } else {
        this.setState({dataInfo: data});
      }
    });
  }
  render() {
    const {dataInfo} = this.state;
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
          title="Ôn tập mô phỏng"></Toolbar>

        <WebView
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          source={{uri: dataInfo?.setting_urls?.simulation_review}}
          startInLoadingState={true}
          style={{height: 200}}
          onLoadProgress={({nativeEvent}) => {}}
          onLoadEnd={() => {}}
        />

        {/* <View style={{alignItems: 'center', padding: scale(10), flex: 1}}>
          <Text style={{fontSize: scale(14)}}>
            Link tải phần mềm ôn tập mô phỏng:
          </Text>
          <Text
            style={{textAlign: 'center', fontSize: scale(14), color: 'blue'}}
            onPress={() => {
              Linking.openURL(dataInfo?.setting_urls?.simulation_review);
            }}>
            {dataInfo?.setting_urls?.simulation_review}
          </Text>

          <Text
            style={{
              fontSize: scale(14),
            }}>
            Học viên tải phần mềm và cài đặt trên máy tính để ôn tập!
          </Text>
        </View> */}
      </SafeAreaView>
    );
  }
}

export default SimulationScreen;
