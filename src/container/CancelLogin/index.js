import {Text, View, Image} from 'react-native';
import React, {Component} from 'react';
import {scale} from 'react-native-size-scaling';
import images from 'imagesApp/index';

export class CancelLogin extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            width: scale(200),
            height: scale(200),
          }}
          resizeMode="contain"
          source={images.deleteAcount}
        />
        <Text
          style={{
            color: 'black',
            marginHorizontal: scale(20),
            fontSize: scale(14),
            textAlign: 'center',
          }}>
          Nội dung này chỉ dành cho học viên đã đăng nhập. Vui lòng đăng nhập để
          xem được đầy đủ nội dung .
        </Text>
      </View>
    );
  }
}

export default CancelLogin;
