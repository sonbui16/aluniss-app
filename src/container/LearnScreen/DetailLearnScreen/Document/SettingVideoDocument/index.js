import React, {Component} from 'react';
import {TouchableOpacity, Image , Text, View } from 'react-native';

import images from 'imagesApp';
import {scale} from 'src/components/ScaleSheet';
import styles from '../../../styles';

export class SettingVideoDocument extends React.PureComponent {
  onVisible = () => {
    const {onVisible} = this.props;
    onVisible && onVisible();
  };
  onVisibleQualyti = () => {
    const {onVisibleQualyti} = this.props;
    onVisibleQualyti && onVisibleQualyti();
  };
  closeDocument = () =>{
    const {closeDocument} = this.props;
    closeDocument && closeDocument();

  }
  render() {
    const {showTab, navigation , itemLearn } = this.props;
    return (
      <View style={{  marginTop: scale(20),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',}}>
       
        {!showTab ? (
          <TouchableOpacity onPress={this.closeDocument}>
            <Image
              resizeMode="contain"
              style={{ width: scale(15), height: scale(15)}}
              source={images.iconChevron}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {!showTab ? (
          <Text white size14 style={{width: '80%'}} />
        ) : <Text style={{width: '70%'}} />}
          <TouchableOpacity
            style={{marginRight: scale(5)}}
            onPress={this.onVisible}>
            <Image
              resizeMode="contain"
              style={{ width: scale(15),
                height: scale(15),}}
              source={images.settings}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onVisibleQualyti}>
            <Image
              resizeMode="contain"
              style={{ width: scale(15),
                height: scale(15),}}
              source={images.updateWhite}
            />
          </TouchableOpacity>
          
        </View>
    );
  }
}

export default SettingVideoDocument;
