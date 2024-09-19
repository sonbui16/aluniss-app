import React, {Component} from 'react';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import images from 'imagesApp';
import {WebView} from 'react-native-webview';
export class LearnExampleVideo extends Component {
  render() {
    const { itemLearn } = this.props.route.params;
    return (
      <SafeAreaView style={{ backgroundColor: 'white' }}>
      <Toolbar
        title={itemLearn.name}
        iconLeft={images.iconBack}
        leftPress={() => this.props.navigation.goBack()}
      />
      <WebView startInLoadingState={true} source={{uri: `${itemLearn.link_quiz_test}`}} />
   
      </SafeAreaView>
    )
  }
}

export default LearnExampleVideo
