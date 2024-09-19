import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import SafeAreaViews from 'components/SafeAreaView';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import colors from 'colors';
import vari from 'variables/platform';
import {scale} from 'components/ScaleSheet';
import {connect} from 'react-redux';
import {deleteAcount , inforUser } from 'actions/app';
import {removeLoggedUser} from 'actions/auth';
import Apptext from 'src/components/Apptext';
import {Button} from '@rneui/themed';

@connect(
  state => ({
    user: state.auth.user,
  }),
  {
    deleteAcount,
    removeLoggedUser,
    inforUser
  },
)
class DeleteAcount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: {},
      visible: false,
      visibleLogout: false,
      appName: '',
      date: '',
    
    };
  }
  componentDidMount() {
    // this.checkDeviceID('none');
    const {inforUser, user} = this.props;
    inforUser(user.access_token, (err, data) => {
      if (err) {
        return;
      } else {
        this.setState({dataUser: data});
      }
    });
  }
  deleteUser = () => {
    const {deleteAcount, user} = this.props;
    const { dataUser } = this.state;
    deleteAcount(dataUser._id, (err, data) => {
      if (err);
      if (data && data.data) {
        this.props.removeLoggedUser();
        this.props.navigation.navigate('SplashScreen');
      }
    });
  };
  render() {
    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
          title="Xóa tài khoản"
        />
        <ScrollView>
          <View>
            <Image
              source={images.deleteAcount}
              resizeMode="contain"
              style={{width: '100%', height: vari.height / 4}}></Image>
          </View>

          <View style={{padding: 10}}>
            {/* <Apptext
              style={{
                color: 'red',
              }}
              i18nKey={'textDeleteAcount1'}
            />
            <Apptext i18nKey={'textDeleteAcount2'} /> */}
            <Text
              style={{
                color: 'red',
              }}>
              Lưu ý : Tài khoản sau khi xoá sẽ không thể phục hồi lại được
            </Text>
            <Text style={{}}>
              Bạn sẽ mất tất cả thông tin bao gồm tất cả các khoá học.Sau khi
              xoá tài khoản bạn sẽ không thể dùng lại email và số điện thoại của
              tài khoản này để tạo tài khoản mới
            </Text>
            <Button
              color="error"
              onPress={() => this.props.navigation.goBack()}
              buttonStyle={{
                marginVertical: scale(10),
              }}>
              {/* <Apptext i18nKey={'cancel'} style={{color: 'white'}} /> */}
              <Text style={{color: 'white'}}>Hủy</Text>
            </Button>

            <Button
              type="outline"
              color="error"
              onPress={() => this.deleteUser()}
              buttonStyle={{
                borderColor: 'grey',
              }}>
              {' '}
              {/* <Apptext i18nKey={'deleteAccount'} style={{color: 'grey'}} /> */}
              <Text style={{color: 'grey'}}>Xóa tài khoản</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaViews>
    );
  }
}

export default DeleteAcount;
