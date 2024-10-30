import React, {Component} from 'react';
import {Image, ActivityIndicator, Alert, View, Text} from 'react-native';
import {connect} from 'react-redux';
import colors from 'colors/';
import vari from 'variables/platform';
import images from 'imagesApp';
import {login, saveLoggedUser} from 'store/actions/auth';
import {saveLogin, checkDevice, refresh} from 'store/actions/app';
import RouterService from '../Router/RouterService';
import {scale} from 'react-native-size-scaling';
@connect(
  state => ({
    user: state.auth.user,
    loggedIn: state.auth.loggedIn,
    userPass: state.auth.saveLogin,
  }),
  {
    login,
    saveLogin,
    saveLoggedUser,
    checkDevice,
    refresh,
  },
)
export class SplashScreen extends Component {
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.loadApp();
    }, 4000);
  }
  resetLogin = async () => {
    const {user, refresh} = this.props;
    const infor = {
      refresh_token: user?.refresh_token,
    };
    refresh(infor, (err, data) => {
      if (err) {
        Alert.alert(
          'Phiên đã hết hạn',
          `Vui lòng đăng nhập lại`,
          [
            {
              text: 'OK',
              onPress: () => {
                RouterService.reset('LoginScreen');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        this.props.saveLoggedUser(data);
        RouterService.reset('TabNavigation');
      }
    });
  };
  loadApp = () => {
    if (this.props.loggedIn) {
      this.resetLogin();
      return;
    } else {
      RouterService.reset('TabNavigation');
    }
  };
  render() {
    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.blue3,
          },
        ]}>
        <Image
          source={images.logo}
          style={{
            height: vari.width / 3.5,
            width: '70%',
            // tintColor: 'white',
            // backgroundColor :'yellow'
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: scale(20),
            color: '#ED1C22',
            marginVertical: scale(10),
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          HỌC NHẸ NHỚ DAI TIẾNG TRUNG
        </Text>
        <Text
          style={{
            fontSize: scale(14),
            color: '#ED1C22',
            textAlign: 'center',
          }}>
          Chào mừng học viên đến với Aluniss
        </Text>
        <View style={{flexDirection: 'row' , marginVertical : 10}}>
          <Text
            style={{
              fontSize: scale(16),
              color: '#ED1C22',
              fontWeight: 'bold',
            }}>
            Lưu ý (*):{' '}
          </Text>
          <View>
            <Text
              style={{
                fontSize: scale(14),
                color: '#ED1C22',
              }}>
              Học viên đến mục Vào học để xem video
            </Text>
            <Text
              style={{
                fontSize: scale(14),
                color: '#ED1C22',
              }}>
              Khóa màn hình dọc để video hiển thị dễ xem
            </Text>
          </View>
        </View>

        <ActivityIndicator size={'large'} color={'#ED1C22'} />
      </View>
    );
  }
}

export default SplashScreen;
