import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  Alert,
  View,
  Text,
  Platform,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import images from 'imagesApp';
import {scale} from 'react-native-size-scaling';
import {isRequestPending} from 'selectors/common';
import {
  login,
  saveLoggedUser,
  setAuthState,
  saveMemSite,
  saveListSite,
  removeLoggedUser,
  loginV2,
} from 'store/actions/auth';
import FloatingLabelInput from 'components/FloatingLabelInput';
import AuthButton from 'components/AuthButton';
import ViewBackground from 'components/ViewBackground';
import vari from 'variables/platform';
import colors from 'colors/';
import DeviceInfo from 'react-native-device-info';
import Apptext from 'src/components/Apptext';
import _ from 'lodash';
import {TextInput} from 'react-native-paper';
import {CheckBox, Icon} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RouterService from 'src/container/Router/RouterService';
import {site_id} from 'store/api/common';
import SafeAreaViews from 'src/components/SafeAreaView';

@connect(
  state => ({
    loading: isRequestPending(state, 'userSites'),
  }),
  {
    login,
    saveLoggedUser,
    setAuthState,
    saveMemSite,
    saveListSite,
    removeLoggedUser,
    loginV2,
  },
)
export class LoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      token: null,
      email: '',
      password: '',
      isLoggedIn: false,
      error: null,
      visible: false,
      date: '',
      title: '',
      isShowPass: true,
      checkSaveAccount: false,
    };
  }
  disButton = () => {
    const {email, password} = this.state;
    if (email && password) {
      return false;
    } else return true;
  };

  async componentDidMount() {
    const value = await AsyncStorage.getItem('saveAccount');
    const {devices} = this.props;

    this.setState({
      checkSaveAccount: value ? true : false,
      email: JSON.parse(value).emailStore,
      password: JSON.parse(value).passwordStore,
    });
  }
  onPressShowPass = () => {
    this.setState({isShowPass: !this.state.isShowPass});
  };
  onPressSaveAccount = () => {
    const {checkSaveAccount} = this.state;
    this.setState({checkSaveAccount: !checkSaveAccount}, async () => {});
  };

  goLogin = async values => {
    const {loginV2} = this.props;
    const infoInput = {};
    if (/^\d+$/.test(values.email)) {
      infoInput.passport = values.email;
    } else {
      infoInput.username = values.email;
    }
    infoInput.password = values.password;
    infoInput.site_id = site_id;
    loginV2(infoInput, async (err, data) => {
      if (err) {
        if (_.isArray(err?.message?.errors)) {
          const errMessage = err?.message?.errors[0]?.constraints;
          const valueErr = Object.values(errMessage)[0];
          Alert.alert('Thông báo', `${valueErr}`, [{text: 'Đồng ý'}], {
            cancelable: false,
          });
        } else {
          if (err?.message?.message === 'Unauthorized') {
            Alert.alert(
              'Thông báo',
              `Email hoặc mật khẩu không đúng.Vui lòng thử lại`,
              [{text: 'Đồng ý'}],
              {
                cancelable: false,
              },
            );
          } else {
            Alert.alert(
              'Thông báo',
              `${err?.message?.message}`,
              [{text: 'Đồng ý'}],
              {
                cancelable: false,
              },
            );
          }
        }
      } else {
        const info = {};
        info.emailStore = this.state.checkSaveAccount ? this.state.email : '';
        info.passwordStore = this.state.checkSaveAccount
          ? this.state.password
          : '';
        try {
          await AsyncStorage.setItem('saveAccount', JSON.stringify(info));
        } catch (err) {
          alert(err);
        }
        this.props.saveLoggedUser(data);
        this.props.setAuthState(true);
        this.props.navigation.navigate('TabNavigation');
      }
    });
  };
  render() {
    const {email, checkSaveAccount} = this.state;

    return (
      <SafeAreaViews style={{backgroundColor: 'white' }}>

        <Icon
          onPress={() => RouterService.goBack()}
          style={{alignSelf: 'flex-end', marginHorizontal: scale(10)}}
          name={'close'}
          type="material-community"
          size={scale(20)}
          color={colors.blue2}
        />
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={images.logo}
            style={{width: '50%', height: vari.width /3}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: scale(14),
              marginVertical: scale(20),
              color: colors.blue2,
              fontWeight: 'bold',
            }}>
            Trung tâm giáo dục nghề nghiệp Thành An
          </Text>
          <Apptext
            style={{
              color: colors.blue2,
              fontSize: scale(20),
              fontWeight: 'bold',
            }}
            i18nKey={'ĐĂNG NHẬP'}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            margin: scale(10),
            paddingHorizontal: scale(10),
            borderRadius: scale(7),
            justifyContent: 'space-evenly',
          }}>
          <FloatingLabelInput
            iconImg={images.iconEmail}
            label="Email hoặc CMND/CCCD"
            value={email}
            onChangeText={value => this.setState({email: value})}
          />
          <FloatingLabelInput
            onPressShowPass={() => this.onPressShowPass()}
            showIcon={true}
            secureTextEntry={this.state.isShowPass}
            iconImg={'lock-outline'}
            right={
              <TextInput.Icon
                onPress={() => {
                  this.onPressShowPass();
                }}
                icon={this.state.isShowPass ? 'eye-off' : 'eye'}
                style={{alignItems: 'center', marginTop: scale(10)}}
              />
            }
            label={'Mật khẩu'}
            value={this.state.password}
            onChangeText={value => {
              this.setState({password: value});
            }}
          />

          <AuthButton
            disabled={this.disButton()}
            containerStyle={{backgroundColor: colors.blue2}}
            loading={this.props.loading}
            onPress={() =>
              this.goLogin({
                email: this.state.email,
                password: this.state.password,
                // email: 'buivane@laixelaixe.edubit.vn',
                // password: '123456',
                // email:"ttnga05@gmail.com",
                // password :"nga1999"
              })
            }
            text="ĐĂNG NHẬP"
          />
          <AuthButton
            // disabled={this.disButton()}
            onPress={() => this.props.navigation.navigate('InstructScreen')}
            text="HƯỚNG DẪN TỰ HỌC"
          />
          {/* <CheckBox
            containerStyle={{
              marginTop: scale(10),
            }}
            title={'Lưu tài khoản'}
            textStyle={{
              fontSize: scale(14),
              color: 'grey',
              fontWeight: 'normal',
            }}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color={colors.blue2}
                size={20}
                iconStyle={{marginRight: 10}}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={20}
                iconStyle={{marginRight: 10}}
              />
            }
            size={scale(17)}
            onPress={() => this.onPressSaveAccount()}
            checked={checkSaveAccount}
          /> */}

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical : scale(20)}}>
            <Text
              style={{
                fontSize: scale(14),
                color: 'black',
              }}
              onPress={() => this.props.navigation.navigate('RegisterScreen')}>
              Đăng ký tài khoản
            </Text>
            <Text
              onPress={() => this.props.navigation.navigate('ForgetPass')}
              style={{
                color: 'black',
                fontSize: scale(14),
                // color: colors.blue3,
              }}>
              Quên mật khẩu ?
            </Text>
          </View>
        </View>
      </SafeAreaViews>
    );
  }
}
export default LoginScreen;
