import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Text,
  View,
  DevSettings,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
// import Toolbar from 'components/Toolbar';
// import MenuItem from 'components/MenuItem';
import SafeAreaViews from 'components/SafeAreaView';
import {scale} from 'react-native-size-scaling';

import images from 'imagesApp';
import {removeLoggedUser} from 'actions/auth';
import colors from 'colors';
import DeviceInfo from 'react-native-device-info';
import vari from '../../../theme/variables/platform';
import Toolbar from '../../components/Toolbar';
import {Dialog, Portal, PaperProvider} from 'react-native-paper';
import RouterService from 'container/Router/RouterService';
import {
  listSourceCategory,
  checkDevice,
  inforUser,
  saveReceipt,
} from 'actions/app';
import {ListItem, Button, Icon, Avatar} from '@rneui/themed';

let version = DeviceInfo.getVersion();

@connect(
  state => ({
    user: state.auth.user,
    loggedIn: state.auth.loggedIn,
    dataUser: state.auth.saveInfoUser,
  }),
  {
    removeLoggedUser,
    listSourceCategory,
    checkDevice,
    inforUser,
    saveReceipt,
  },
)
export class AccountScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleLogout: false,
      appName: '',
      date: '',
      detailUser: [],
    };
  }

  stateVisibleLogout = () => {
    this.setState({visibleLogout: !this.state.visibleLogout});
  };

  logout = () => {
    this.props.removeLoggedUser();
    this.setState({visibleLogout: !this.state.visibleLogout});
    RouterService.reset('SplashScreen');
  };
  componentDidMount() {
    // this.checkDeviceID('none');
    // const {inforUser, user} = this.props;
    // inforUser(user.access_token, (err, data) => {
    //   if (err) {
    //     return;
    //   } else {
    //     this.setState({dataUser: data});
    //   }
    // });
  }

  checkDeviceID = async type => {
    switch (type) {
      case 'none':
        break;
      case 'customer':
        Linking.openURL(`tel:` + '0568838485');
        break;
      case 'training':
        this.props.navigation.navigate('TrainingPlan');

        break;

      case 'reviewApp':
        Linking.openURL(
          Platform.OS === 'ios'
            ? `itms-apps://itunes.apple.com/us/app/id${6504210413}?mt=8`
            : `market://details?id=com.thanhan`,
        );
        break;
      case 'screenSetting':
        this.props.navigation.navigate('DeleteAcount');
        break;
      case 'listSchools':
        this.props.navigation.navigate('ListSchools');
        break;
      case 'updateUser':
        this.props.navigation.navigate('UpdateScreen');
        break;
      case 'instruct':
        this.props.navigation.navigate('InstructScreen');
      default:
        break;
    }
  };

  render() {
    const {loggedIn, dataUser} = this.props;
    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar title="Tài khoản" />

        {/* {loggedIn && (
          <View
            style={{
              paddingHorizontal: 10,
              height: vari.width / 2,
              backgroundColor: 'white',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginVertical: scale(5),
            }}>
            <Avatar
              size={'large'}
              rounded
              source={{
                uri: dataUser?.photo,
              }}
            />
            <Text
              style={{
                fontSize: scale(16),
                color: colors.blue3,
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              {dataUser.fullname}
            </Text>
            <Text style={{fontSize: scale(14), color: colors.grey2}}>
              {dataUser.email}
            </Text>
          </View>
        )} */}

        {/* Chăm sóc khách hàng */}
        <ListItem onPress={() => this.checkDeviceID('customer')}>
          <ListItem.Content>
            <Text style = {{color :"black"}}>Liên hệ</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        {/* <ListItem onPress={() => this.checkDeviceID('customer')}>
          <ListItem.Content>
            <Text>Thông báo</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem> */}
        {loggedIn && (
          <ListItem onPress={() => this.checkDeviceID('training')}>
            <ListItem.Content>
              <Text style = {{color :"black"}} >Kế hoạch đào tạo</Text>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        {/* <ListItem onPress={() => this.checkDeviceID('customer')}>
          <ListItem.Content>
            <Text>Đánh giá ứng dụng</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem> */}
        {loggedIn && (
          <ListItem onPress={() => this.checkDeviceID('updateUser')}>
            <ListItem.Content>
              <Text style = {{color :"black"}} >Chỉnh sửa thông tin</Text>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        <ListItem onPress={() => this.checkDeviceID('instruct')}>
          <ListItem.Content>
            <Text style = {{color :"black"}} >Hướng dẫn tự học</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        {/* Xoá tài khoản */}
        {loggedIn && (
          <ListItem onPress={() => this.checkDeviceID('screenSetting')}>
            <ListItem.Content>
              <Text style = {{color :"black"}}>Xoá tài khoản </Text>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}

        {Platform.OS === 'android' && (
          <ListItem
            onPress={() => this.props.navigation.navigate('RegisterUser')}>
            <ListItem.Content>
              <Text style = {{color :"black"}} >Đăng ký học </Text>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        {loggedIn && (
        <ListItem
          onPress={() => this.props.navigation.navigate('ListNoti')}>
          <ListItem.Content>
            <Text style = {{color :"black"}}>Thông báo </Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>)}

        {/* Đánh giá ứng dụng */}
        <ListItem onPress={() => this.checkDeviceID('reviewApp')}>
          <ListItem.Content>
            <Text style = {{color :"black"}} >Đánh giá ứng dụng</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <Button
          onPress={() =>
            loggedIn
              ? this.setState({visibleLogout: !this.state.visibleLogout})
              : this.props.navigation.navigate('LoginScreen')
          }
          buttonStyle={{marginHorizontal: scale(20)}}
          title={loggedIn ? 'ĐĂNG XUẤT' : 'ĐĂNG NHẬP'}
          titleStyle={{color: 'white', fontSize: scale(14)}}
          color="error"
        />

        <View style={{marginTop: scale(20)}}>
          <Text
            style={{
              fontSize: scale(12),
              textAlign: 'center',
              justifyContent: 'flex-end',
             color :"black"
            }}>
            ĐÀO TẠO THÀNH AN v{version}
          </Text>
        </View>
        <View>
          <Portal>
            <Dialog
              visible={this.state.visibleLogout}
              style={{
                backgroundColor: 'white',
                borderRadius: scale(15),
              }}
              onDismiss={() => this.stateVisibleLogout()}>
              <Dialog.Title
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: scale(16),
                  color :'black'
                }}>
                Đăng xuất
              </Dialog.Title>
              <Dialog.Content>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: scale(14),
                    color: 'black',
                  }}>
                  Bạn có chắc chắn muốn đăng xuất?
                </Text>
              </Dialog.Content>
              <Dialog.Actions style={{flexDirection: 'row'}}>
                <Button
                  title={'Bỏ qua'}
                  titleStyle={{color: 'white', fontSize: scale(14)}}
                  color="error"
                  onPress={() => this.stateVisibleLogout()}
                />

                <Button
                  onPress={() => this.logout()}
                  title={'Đồng ý'}
                  titleStyle={{color: 'white', fontSize: scale(14)}}
                  buttonStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 3,
                    marginLeft: scale(10),
                  }}
                />
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </SafeAreaViews>
    );
  }
}

export default AccountScreen;
