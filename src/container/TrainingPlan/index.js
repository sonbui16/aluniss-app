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
import {DocumentView} from '@pdftron/react-native-pdf';

@connect(
  state => ({
    loggedIn: state.auth.loggedIn,
    auth: state.auth.user,
  }),
  {infoSites},
)
export class TrainingPlan extends React.PureComponent {
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
    const {loggedIn} = this.props;
    const {dataInfo} = this.state;

    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
          title="Kế hoạch đào tạo"
        />
         {dataInfo?.setting_urls?.training_plan &&
        <WebView
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          source={{uri: dataInfo?.setting_urls?.training_plan}}
          startInLoadingState={true}
          // style={{height: 200}}
          onLoadProgress={({nativeEvent}) => {}}
          onLoadEnd={() => {}}
        />}
        {/* {dataInfo?.setting_urls?.training_plan && (
          <DocumentView
            documentSliderEnabled={false}
            bottomToolbarEnabled={false}
            hideTopToolbars={true}
            setVisibilityForAnnotation={false}
            readOnly={true}
            document={'https://daotaothanhan.edubit.vn/p/ke-hoach-dao-tao'
              // dataInfo?.setting_urls?.training_plan 
            }
          />
        )} */}
      </SafeAreaView>
    );
  }
}

export default TrainingPlan;
