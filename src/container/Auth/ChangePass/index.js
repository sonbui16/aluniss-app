import React, {Component} from 'react';
import {Image, ScrollView, TouchableOpacity, Alert , View , Text } from 'react-native';
import {connect} from 'react-redux';
import FloatingLabelInput from 'components/FloatingLabelInput';
import ViewBackground from 'components/ViewBackground';
import {scale} from 'components/ScaleSheet';
import AuthButton from 'components/AuthButton';
import images from 'imagesApp';
import vari from 'variables/platform';
import {updateProfile} from 'store/actions/app';
import {isRequestPending} from 'selectors/common';
import colors from 'colors';

@connect(
  (state) => ({
    user: state.auth.user,
    loading: isRequestPending(state, 'updateProfile'),
  }),
  {
    updateProfile,
  },
)
export class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passOld: '',
      passNew: '',
      confirmPass: '',
    };
  }
  showAlert = (message) => {
    Alert.alert('Thông báo', `${message}`, [{text: 'Đồng ý'}], {
      cancelable: false,
    });
  };
  validateFied = (passOld, passNew, confirmPass) => {
    if (passOld === '' && passNew === '' && confirmPass === '') {
      this.showAlert(`Vui lòng điền đầy đủ thông tin`);
      return false;
    }
    if (passOld === '' || passNew === '' || confirmPass === '') {
      this.showAlert(`Vui lòng điền đầy đủ thông tin`);
      return false;
    }

    if (this.state.passNew.length < 6) {
      this.showAlert(`Mật khẩu phải tối thiểu 6 kí tự`);
      return false;
    }
    if (this.state.passNew !== this.state.confirmPass) {
      this.showAlert('Xác nhận mật khẩu không khớp');
      return false;
    }
    return true;
  };
  goChangePass = (values) => {
    const {updateProfile, user} = this.props;
    const infoInput = {};

    if (this.validateFied(values.passOld, values.passNew, values.confirmPass)) {
      infoInput.email = user.email;
      infoInput.old_pwd = values.passOld;
      infoInput.new_pwd = values.passNew;
      infoInput.fullname = user.fullname;
      infoInput.phone = user.phone;
      infoInput.birthday = user.birthday;
      updateProfile(user._id.$id, infoInput, (err, data) => {
        if (err) return;
        if (data && data.data && data.data.error === false) {
          Alert.alert(
            'Thông báo',
            `Thay đổi mật khẩu thành công`,
            [{text: 'Đồng ý', onPress: () => this.props.navigation.goBack()}],
            {cancelable: false},
          );
        } else {
          data &&
            data.data &&
            data.data.message &&
            data.data.message.map((item) => this.showAlert(`${item}`));
        }
      });
    }
  };
  render() {
    return (
      <ViewBackground
        style={{
          paddingHorizontal: scale(20),
          flex: 1,
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            justifyContent: 'flex-end',
            width: scale(50),
            height: vari.toolbarHeight,
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              resizeMode="contain"
              source={images.iconBack}
              style={{width: scale(20), height: scale(20)}}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
        <View style={{height: vari.width / 5.2}}></View>
          <View align justifyEnd style={{}}>
            <Image
              source={images.logo}
              style={{width: '50%', height: scale(90)}}
              resizeMode="contain"
            />
          </View>
          <Text white size14 style={{textAlign: 'center'}}>
            Thay đổi mật khẩu
          </Text>
          <View style={{height: vari.width, marginTop: scale(15)}}>
            <FloatingLabelInput
              secureTextEntry={true}
              returnKeyType="done"
              maxLength={25}
              iconImg={images.iconPass}
              label="Nhập mật khẩu cũ "
              value={this.state.passOld}
              onChangeText={(value) => this.setState({passOld: value})}
            />
            <FloatingLabelInput
              secureTextEntry={true}
              returnKeyType="done"
              maxLength={25}
              iconImg={images.iconPass}
              label="Nhập mật khẩu mới "
              value={this.state.passNew}
              onChangeText={(value) => this.setState({passNew: value})}
            />
            <FloatingLabelInput
              secureTextEntry={true}
              returnKeyType="done"
              maxLength={25}
              iconImg={images.iconPass}
              label="Nhập lại mật khẩu "
              value={this.state.confirmPass}
              onChangeText={(value) => this.setState({confirmPass: value})}
            />
            <AuthButton
            loading={this.props.loading}
            onPress={() =>
              this.goChangePass({
                passOld: this.state.passOld,
                passNew: this.state.passNew,
                confirmPass: this.state.confirmPass,
              })
            }
            text="THAY ĐỔI MẬT KHẨU"
          />
          </View>
        </ScrollView>
      </ViewBackground>
    );
  }
}

export default ChangePass;
