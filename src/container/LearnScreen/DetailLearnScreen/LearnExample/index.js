import React, {Component} from 'react';
import {TouchableOpacity, ActivityIndicator, Text, View} from 'react-native';
import SafeAreaView from 'components/SafeAreaView';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import Toolbar from 'components/Toolbar';
import {completeLesson} from 'store/actions/app';
// import * as Progress from 'react-native-progress';
import colors from 'colors/';
import vari from 'variables/platform';
import images from 'imagesApp';
import {scale} from 'react-native-size-scaling';
// import {DocumentView} from '@pdftron/react-native-pdf';

@connect(
  state => ({
    auth: state.auth.user,
  }),
  {
    completeLesson,
  },
)
export class LearnExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataComplete: {},
      checkLesson: false,
      isLoaded: false,
      progress: 0,
    };
  }

  completeLesson = (itemLearn, item) => {
    const {completeLesson, auth} = this.props;
    this.setState({checkLesson: true});
    const infoInput = {};
    infoInput.lesson_id = itemLearn.id_lesson.$id || itemLearn.id;
    infoInput.course_id = item.id.$id;
    infoInput.user_id = auth._id.$id;
    completeLesson(infoInput, (err, data) => {
      if (err) return;
      if (data?.data) {
        if (data?.data?.link_download_certificate) {
          this.setState({dataComplete: data?.data});
        }
        this.props.navigation.goBack();
      }
    });
  };
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
  showContent = itemLearn => {
    if (itemLearn.link_document) {
      return (
        // <DocumentView
        //   documentSliderEnabled={false}
        //   bottomToolbarEnabled={false}
        //   hideTopToolbars={true}
        //   document={encodeURI(itemLearn.link_document)}
        //   setVisibilityForAnnotation={false}
        //   readOnly={true}
        // />
        <View style={{flex: 1}}></View>
      );
    } else {
      return (
        <WebView
          ref={ref => {
            this.webview = ref;
          }}
          onLoadProgress={({nativeEvent}) =>
            this.setState({progress: nativeEvent.progress})
          }
          source={{
            uri: this.showWebView(itemLearn),
          }}
          onLoadEnd={() => this.setState({isLoaded: true})}
          renderLoading={this.renderLoading}
          style={{marginTop: 5}}
        />
      );
    }
  };
  showWebView = item => {
    if (item && item.link_quiz_test) {
      return `${item.link_quiz_test}`;
    } else if (item && item.text_content) {
      return `${item.text_content}`;
    }
  };
  render() {
    const {itemLearn, item} = this.props.route.params;
    const {checkLesson} = this.state;

    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Toolbar
          title={itemLearn.name}
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
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
        {this.showContent(itemLearn && itemLearn)}

        {itemLearn &&
          !itemLearn.check_passed &&
          !checkLesson &&
          !itemLearn.link_quiz_test && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.completeLesson(itemLearn, item)}
                style={{
                  backgroundColor: 'red',
                  width: vari.width / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  padding: scale(10),
                }}>
                <Text style={{color: 'white'}}>Hoàn thành</Text>
              </TouchableOpacity>
            </View>
          )}
      </SafeAreaView>
    );
  }
}
export default LearnExample;
