import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import Toolbar from 'components/Toolbar';
import SafeAreaViews from 'components/SafeAreaView';
import images from 'imagesApp';
import {WebView} from 'react-native-webview';
import colors from 'variables/colors';
import {scale} from 'react-native-size-scaling';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';

@connect(
  state => ({
    domainSite: state.auth.saveInfoSite,
  }),
  {},
)
export class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataComplete: {},
      checkLesson: false,
      isLoaded: false,
      progress: 0,
    };
  }
  renderLoading = () => {
    return (
      <ActivityIndicator
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        size="small"
        color={colors.blue3}
      />
    );
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }
  backAction = () => {
    this.props.navigation.goBack();
  };
  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }
  render() {
    const {data, datalUser} = this.props.route.params;
    const {domainSite} = this.props;
    const domain = domainSite?.domain
      ? domainSite?.domain
      : domainSite?.subdomain + `.edubit.vn`;

    console.log(
      'object11',
      `https://${domain}/quiz/${data.quiz_test_id[0]}?lid=${data._id}&user_id=${datalUser._id}`,
    );

    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.backAction()}
          title={data.name}
        />
        {!this.state.isLoaded ? (
          <Progress.Bar
            borderWidth={0}
            borderRadius={0}
            color="orange"
            progress={this.state.progress}
            width={null}
            height={4}
          />
        ) : null}
        <WebView
          ref={ref => {
            this.webview = ref;
          }}
          onLoadProgress={({nativeEvent}) =>
            this.setState({progress: nativeEvent.progress})
          }
          source={{
            uri: `https://${domain}/quiz/${data.quiz_test_id[0]}?lid=${data._id}&user_id=${datalUser._id}`,
          }}
          onLoadEnd={() => this.setState({isLoaded: true})}
          renderLoading={this.renderLoading}
          style={{marginTop: 5}}
        />
      </SafeAreaViews>
    );
  }
}

export default TestScreen;
