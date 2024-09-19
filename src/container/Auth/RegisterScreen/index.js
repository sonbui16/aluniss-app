import React, {Component} from 'react';
import {
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import vari from 'variables/platform';
import {isRequestPending} from 'selectors/common';
import {register, registerEdubit2} from 'store/actions/auth';
import images from 'imagesApp';
import FloatingLabelInput from 'components/FloatingLabelInput';
import AuthButton from 'components/AuthButton';
import ViewBackground from 'components/ViewBackground';
import {scale} from 'src/components/ScaleSheet';
import colors from 'colors/';
import Apptext from 'src/components/Apptext';
import ShowAlert from 'src/components/ShowAlert';
import {TextInput} from 'react-native-paper';
import {CheckBox, Icon} from '@rneui/themed';
import {site_id} from 'store/api/common';

@connect(
  state => ({
    loading: isRequestPending(state, 'registerEdubit2'),
  }),
  {
    register,
    registerEdubit2,
  },
)
export class RegisterScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassWord: '',
      phone: '',
      visible: false,
      title: '',
      isShowPass: true,
      isShowRePass: true,
    };
  }

  showAlert = message => {
    Alert.alert('Thông báo', message);
  };
  onPressShowPass = () => {
    this.setState({isShowPass: !this.state.isShowPass});
  };
  onPressShowRePass = () => {
    this.setState({isShowRePass: !this.state.isShowRePass});
  };
  goRegister = values => {
    const {register, registerEdubit2} = this.props;
    const {password, confirmPassWord} = this.state;
    const infoInput = {};
    infoInput.name = values.name;
    infoInput.email = values.email;
    infoInput.password = values.password;
    // infoInput.repassword = values.confirmPassWord;
    infoInput.phone = values.phone;
    infoInput.site_id = site_id;

    let errorMessage = [];
    if (password !== confirmPassWord) {
      this.showAlert('Nhập lại mật khẩu không khớp');
    } else if (password.length < 6) {
      this.showAlert(`Mật khẩu phải tối thiểu 6 kí tự`);
    } else {
      register(infoInput, (err, data) => {
        if (err) {
          if (err?.message?.statusCode === 409) {
            this.showAlert(err?.message?.message);
          } else {
            errorMessage = err.message.errors[0].constraints;
            this.showAlert(`${Object.values(errorMessage)}`);
          }
          return;
        } else {
          this.showAlert('Đăng kí tài khoản thành công');
        }
      });
    }
  };
  onBackdropPress = () => {
    this.setState({visible: !this.state.visible});
  };
  disButton = () => {
    const {email, name, password, confirmPassWord} = this.state;
    if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmPassWord === ''
    ) {
      return true;
    } else return false;
  };
  renderContainer = () => {
    const {name, email, password, confirmPassWord, phone} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ViewBackground
          style={{
            paddingHorizontal: scale(20),
            height: scale(120),
            overflow: 'hidden',
          }}>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: 'transparent',
              justifyContent: 'space-evenly',
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Image
                source={images.logo}
                style={{width: '70%', height: scale(75)}}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginVertical: vari.ipad ? 20 : 10,
              }}></View>
          </ScrollView>
        </ViewBackground>
        <View style={{flex: 1, backgroundColor: colors.blue3}}>
          <ScrollView
            style={{
              backgroundColor: 'white',
              paddingHorizontal: scale(20),
              flex: 2,
              borderTopLeftRadius: scale(25),
              borderTopRightRadius: scale(25),
            }}>
            <Apptext
              style={{
                color: colors.blue2,
                textAlign: 'center',
                fontSize: scale(17),
                fontWeight: '700',
              }}
              i18nKey={'Tạo Tài Khoản'}
            />
            <View style={{}}>
            <Text style={{marginVertical: scale(10), fontSize: scale(14) , color :'black'}}>
                Họ và tên<Text style={{color: 'red'}}>*</Text>
              </Text>
              {/* Họ và tên */}
              <FloatingLabelInput
                maxLength={34}
                iconImg={images.persion}
                label={'Họ và tên'}
                value={name}
                onChangeText={value => this.setState({name: value})}
              />
              {/* Email */}
              <Text style={{marginVertical: scale(10), fontSize: scale(14), color :'black' }}>
                Email<Text style={{color: 'red'}}>*</Text>
              </Text>
              <FloatingLabelInput
                maxLength={34}
                iconImg={images.iconEmail}
                label="Email"
                value={email}
                onChangeText={value => this.setState({email: value})}
              />

              {/* Nhập số điện thoại */}
              <Text style={{fontSize: scale(14), marginVertical: scale(10) , color :'black' }}>
                Số điện thoại
              </Text>
              <FloatingLabelInput
                keyboardType={'phone-pad'}
                maxLength={25}
                iconImg={images.phone}
                label={'Nhập số điện thoại'}
                value={phone}
                onChangeText={value => this.setState({phone: value})}
              />
              {/* Mật khẩu */}
              <Text style={{fontSize: scale(14), marginVertical: scale(10) , color :'black' }}>
                Mật khẩu<Text style={{color: 'red'}}>*</Text>
              </Text>
              <FloatingLabelInput
                onPressShowPass={() => this.onPressShowPass()}
                showIcon={true}
                isShowPass={this.state.isShowPass}
                secureTextEntry={this.state.isShowPass}
                maxLength={25}
                right={
                  <TextInput.Icon
                    onPress={() => {
                      this.onPressShowPass();
                    }}
                    icon={this.state.isShowPass ? 'eye-off' : 'eye'}
                    style={{alignItems: 'center', marginTop: scale(10)}}
                  />
                }
                iconImg={images.iconPass}
                label={'Mật khẩu'}
                value={password}
                onChangeText={value => this.setState({password: value})}
              />
              {/* Nhập lại mật khẩu */}
              <Text style={{fontSize: scale(14), marginVertical: scale(10), color :'black'}}>
                Nhập lại mật khẩu<Text style={{color: 'red'}}>*</Text>
              </Text>
              <FloatingLabelInput
                onPressShowPass={() => this.onPressShowRePass()}
                isShowPass={this.state.isShowRePass}
                showIcon={true}
                secureTextEntry={this.state.isShowRePass}
                maxLength={25}
                iconImg={images.iconPass}
                label={'Nhập lại mật khẩu'}
                right={
                  <TextInput.Icon
                    onPress={() => {
                      this.onPressShowRePass();
                    }}
                    icon={this.state.isShowRePass ? 'eye-off' : 'eye'}
                    style={{alignItems: 'center', marginTop: scale(10)}}
                  />
                }
                value={confirmPassWord}
                onChangeText={value => this.setState({confirmPassWord: value})}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: scale(300),
                }}></View>
              <AuthButton
                disabled={this.disButton()}
                loading={this.props.loading}
                onPress={() =>
                  this.goRegister({
                    name,
                    email,
                    password,
                    confirmPassWord,
                    phone,
                  })
                }
                text="ĐĂNG KÝ"
                containerStyle={{backgroundColor: colors.blue3}}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginVertical: vari.ipad ? 20 : 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Apptext
                  style={{color: colors.grey2}}
                  i18nKey={'Bạn đã có tài khoản? '}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Apptext
                    style={{color: colors.blue2, fontWeight: '600'}}
                    i18nKey={'Đăng nhập'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Apptext></Apptext>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  render() {
    const {visible, title} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ShowAlert
          isVisible={visible}
          onBackdropPress={() => this.onBackdropPress()}
          title={title}
        />
        {this.renderContainer()}
      </SafeAreaView>
    );
  }
}

export default RegisterScreen;
