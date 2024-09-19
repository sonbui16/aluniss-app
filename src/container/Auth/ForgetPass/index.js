import {
  Alert,
  Image,
  View,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import ViewBackground from 'src/components/ViewBackground';
import {checkValidMail} from 'src/utils/validate';
import FloatingLabelInput from 'src/components/FloatingLabelInput';
import images from 'src/assets/images';
import AuthButton from 'src/components/AuthButton';
import {changePass} from 'store/actions/auth';
import vari from 'variables/platform';
import {isRequestPending} from 'src/store/selectors';
import colors from 'colors/';
import Apptext from 'src/components/Apptext';
import ShowAlert from 'src/components/ShowAlert';
import {scale} from 'react-native-size-scaling';
import {Appbar} from 'react-native-paper';
import {site_id} from 'store/api/common';
@connect(
  state => ({
    loading: isRequestPending(state, 'changePass'),
  }),
  {
    changePass,
  },
)
export default class ForgetPass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      visible: false,
      title: '',
    };
  }
  showAlert = message => {
    switch (message) {
      case 'Email không tồn tại':
        this.setState({visible: true, title: 'noEmail'});
        break;
      case 'Chưa nhập đúng định dạng email':
        this.setState({visible: true, title: 'emailIncorrect'});
      case 'Lấy mật khẩu thành công':
        this.setState({visible: true, title: 'getPassSucc'});
        break;
      default:
        break;
    }
  };

  disButton = () => {
    const {email} = this.state;
    if (email === '') {
      return true;
    } else return false;
  };
  goForgetPass = values => {
    const {changePass} = this.props;
    const infoInput = {};
    infoInput.email = values.email;
    infoInput.site_id = site_id;
    if (infoInput.site_id !== undefined) {
      changePass(infoInput, (err, data) => {
        if (err) {
          Alert.alert('Thông báo', err.message.errors[0].constraints.isEmail);
        }
        if (data) {
          Alert.alert(
            'Thành công',
            'Chúng tôi đã gửi yêu cầu ,vui lòng kiểm tra email của bạn !',
          );
        }
      });
    } else {
      Alert.alert(
        'Thông báo',
        'Bạn chưa nhập trường! Vui lòng quay lại để chọn trường',
      );
    }
  };
  onBackdropPress = () => {
    this.setState({visible: !this.state.visible});
  };
  renderForget = () => {
    const {email} = this.state;
    return (
      <ViewBackground style={{flex: 1}}>
        <Appbar.Header
          style={{
            backgroundColor: colors.blue3,
          }}>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack()}
            size={scale(20)}
            color={colors.blue2}
          />
        </Appbar.Header>
        <View
          style={{
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={images.logo}
              style={{width: '50%', height: vari.width / 3}}
              resizeMode="contain"
            />

            <Apptext
              style={{
                color: colors.blue2,
                marginTop: scale(20),
                fontSize: scale(16),
              }}
              i18nKey={'Lấy lại mật khẩu'}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              margin: scale(10),
            }}>
            {/* Email */}
            <FloatingLabelInput
              maxLength={34}
              iconImg={images.iconEmail}
              label="Email"
              value={email}
              onChangeText={value => this.setState({email: value})}
            />
            {/* Nhập số điện thoại */}
            <AuthButton
              disabled={this.disButton()}
              loading={this.props.loading}
              onPress={() => this.goForgetPass({email})}
              text="XÁC NHẬN"
              //GỬI MẬT KHẨU CHO TÔI
              containerStyle={{backgroundColor: colors.blue3}}
            />
          </View>
        </View>
      </ViewBackground>
    );
  };
  render() {
    const {title, visible} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.renderForget()}

        <ShowAlert
          isVisible={visible}
          onBackdropPress={() => this.onBackdropPress()}
          title={title}
        />
      </SafeAreaView>
    );
  }
}
