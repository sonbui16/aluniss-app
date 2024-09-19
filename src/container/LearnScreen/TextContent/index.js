import {Text, View, ActivityIndicator, ScrollView, Alert , BackHandler } from 'react-native';
import React, {Component} from 'react';
import Toolbar from 'components/Toolbar';
import SafeAreaViews from 'components/SafeAreaView';
import images from 'imagesApp';
import {WebView} from 'react-native-webview';
import colors from 'variables/colors';
import HTML from 'react-native-render-html';
import {scale} from 'react-native-size-scaling';
import {Button} from '@rneui/themed';
import {lessonsID} from 'store/actions/app';
import {connect} from 'react-redux';
import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';
import vari from 'variables/platform';


@connect(
  state => ({
    // auth: state.auth.listSite,
    auth: state.auth.user,
  }),
  {
    lessonsID,
  },
)
export class TextContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataComplete: {},
      checkLesson: false,
      isLoaded: false,
      progress: 0,
    };
  }

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
    const renderers = {
      iframe: IframeRenderer,
    };

    const customHTMLElementModels = {
      iframe: iframeModel,
    };
    const mixedStyle = {
      body: {
        color: 'black',
        fontSize: scale(14),
      },
    };
    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.backAction()}
          title={data.name}
        />
        <ScrollView>
          {/* <HTMLView
            // html={item.name}
            source={{html:  '<p>đâsdasdad</p>'}}
            //   containerStyle={{paddingHorizontal: scale(5)}}
            allowedStyles={[]}
          /> */}

          <HTML
            renderers={renderers}
            contentWidth={vari.width}
            source={{html: data?.text_content}}
            tagsStyles={mixedStyle}
            customHTMLElementModels={customHTMLElementModels}
            renderersProps={{
              iframe: {
                scalesPageToFit: true,
              },
              img: {
                enableExperimentalPercentWidth: true,
              },
            }}
            WebView={WebView}
            baseStyle={{
              fontSize: scale(14),
              color: 'black',
            }}
          />
          {/* 
<WebView
          ref={ref => {
            this.webview = ref;
          }}
          // onLoadProgress={({nativeEvent}) =>
          //   this.setState({progress: nativeEvent.progress})
          // }
          source={{
            uri:data?.text_content,
          }}
          // onLoadEnd={() => this.setState({isLoaded: true})}
          // renderLoading={this.renderLoading}
          style={{marginTop: 5}}
        /> */}
        </ScrollView>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Button
            title={'Hoàn thành'}
            color="error"
            onPress={() => this.completeCourse(data)}
            buttonStyle={{
              marginVertical: scale(10),
              width: 190,
            }}
          />
        </View>
      </SafeAreaViews>
    );
  }
}

export default TextContent;
