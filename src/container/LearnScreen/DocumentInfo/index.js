import {Text, View, ActivityIndicator, Alert, BackHandler} from 'react-native';
import React, {Component} from 'react';
import Toolbar from 'components/Toolbar';
import SafeAreaViews from 'components/SafeAreaView';
import images from 'imagesApp';
import {WebView} from 'react-native-webview';
import colors from 'variables/colors';
import {DocumentView} from '@pdftron/react-native-pdf';
import {Button} from '@rneui/themed';
import {lessonsID} from 'store/actions/app';
import {connect} from 'react-redux';

@connect(
  state => ({
    // auth: state.auth.listSite,
    auth: state.auth.user,
  }),
  {
    lessonsID,
  },
)
export class DocumentInfo extends Component {
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
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        size="small"
        color={colors.blue3}
      />
    );
  };
  showPDFTron = () => {
    const {data} = this.props.route.params;
    return (
      <DocumentView
        documentSliderEnabled={false}
        bottomToolbarEnabled={false}
        hideTopToolbars={true}
        setVisibilityForAnnotation={false}
        readOnly={true}
        document={encodeURI(data.document_info.url)}
      />
    );
  };

  completeCourse = data => {
    // this.props.navigation.navigate("Demo")
    const {lessonsID, auth} = this.props;
    const info = {
      complete_status: 1,
    };
    lessonsID('patch', auth.access_token, data._id, info, (err, data) => {
      if (err) {
        Alert.alert('Thông báo', err?.message?.message);
        return;
      } else {
        Alert.alert(
          'Thông báo',
          `${data?.message}`,
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
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
    const {data} = this.props.route.params;
    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.backAction()}
          // this.props.navigation.goBack();
          title={data.name}
        />
        {data?.document_info?.type === 'scorm' ? (
          <WebView
            ref={ref => {
              this.webview = ref;
            }}
            onLoadProgress={({nativeEvent}) =>
              this.setState({progress: nativeEvent.progress})
            }
            source={{
              uri: data?.document_info?.embed,
            }}
            onLoadEnd={() => this.setState({isLoaded: true})}
            renderLoading={this.renderLoading}
            style={{marginTop: 5}}
            onMessage={data => {}}
          />
        ) : (
          this.showPDFTron()
        )}

        {data?.complete ? null : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button
              title={'Hoàn thành'}
              color="error"
              onPress={() => this.completeCourse(data)}
              buttonStyle={{
                marginVertical: 10,
                width: 190,
              }}
            />
          </View>
        )}
      </SafeAreaViews>
    );
  }
}

export default DocumentInfo;
