import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import CancelLogin from 'container/CancelLogin/index';
import BtnLogin from 'components/BtnLogin/index';
import ListLearnScreen from 'container/LearnScreen/ListLearnScreen';
import {infoSites} from 'actions/auth';
import images from 'imagesApp';
import {Text} from 'react-native';
import {site_id} from 'store/api/common';
import WebView from 'react-native-webview';

@connect(
  state => ({
    loggedIn: state.auth.loggedIn,
    auth: state.auth.user,
  }),
  {infoSites},
)
export class InstructScreen extends React.PureComponent {
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
          title="Hướng dẫn tự học"
        />
        <WebView
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          source={{uri:'https://daotaothanhan.edubit.vn/p/huong-dan-tu-hoc'}}
          startInLoadingState={true}
          black
          style={{height: 200}}
          onLoadProgress={({nativeEvent}) => {}}
          onLoadEnd={() => {}}
        />
      </SafeAreaView>
    );
  }
}

export default InstructScreen;
