import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import CancelLogin from 'container/CancelLogin/index';
import BtnLogin from 'components/BtnLogin/index';
import ListLearnScreen from 'container/LearnScreen/ListLearnScreen';
import images from 'imagesApp';
import {TextInput} from 'react-native-paper';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {scale} from 'react-native-size-scaling';
import {CheckBox, Button} from '@rneui/themed';
import {inforUser, updateProfile} from 'actions/app';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

@connect(
  state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
  }),
  {
    inforUser,
    updateProfile,
  },
)
export class UpdateScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullname: '',
      phone: '',
      dataUser: {},
      birthday: '',
      open: false,
      date: new Date(),
      passport: '',
    };
  }
  componentDidMount() {
    const {inforUser, user} = this.props;
    inforUser(user.access_token, (err, data) => {
      if (err) {
        return;
      } else {
        this.setState({
          dataUser: data,
          email: data?.email,
          fullname: data?.fullname,
          phone: data?.phone,
          birthday: data?.birthday,
          passport: data?.passport,
        });
      }
    });
  }
  updateUser = () => {
    const {updateProfile, user} = this.props;
    const {dataUser, birthday, phone, fullname} = this.state;
  
    const info = {
      birthday: birthday,
      phone: phone,
      fullname: fullname,
      sex: '1',
    };
    updateProfile(info, user.access_token, (err, data) => {
      if (err) {
        const errResponse = err?.message?.errors;
        if (errResponse) {
          const constraints = errResponse[0]?.constraints;
          const firstConstraint = Object.values(constraints)[0];
          Alert.alert('Thông báo', firstConstraint);
        } else {
          Alert.alert('Thông báo', err?.message?.message);
        }
        return;
      } else {
        Alert.alert('Cập nhật thông tin thành công');
      }
    });
  };
  handleConfirm = date => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    this.setState({birthday: formattedDate, open: false});
  };
  render() {
    const {email, dataUser, fullname, phone, birthday, open, date, passport} =
      this.state;
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
          title="Cập nhật thông tin"></Toolbar>
        <View style={{flex: 1, padding: scale(20)}}>
          <Text
            style={{
              fontSize: scale(14),
              paddingVertical: scale(10),
              color: 'black',
            }}>
            Họ và tên <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            textColor="black"
            dense
            style={{backgroundColor: 'white'}}
            activeOutlineColor="red"
            mode="outlined"
            // label="Họ và tên"
            value={fullname}
            onChangeText={text => {
              this.setState({fullname: text});
            }}
          />
          <Text
            style={{
              fontSize: scale(14),
              paddingVertical: scale(10),
              color: 'black',
            }}>
            Email <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput dense disabled mode="outlined" value={email} />
          {passport && (
            <View>
              <Text
                style={{
                  fontSize: scale(14),
                  paddingVertical: scale(10),
                  color: 'black',
                }}>
                CMND/CCCD
              </Text>
              <TextInput dense disabled mode="outlined" value={passport} />
            </View>
          )}
          <Text
            style={{
              fontSize: scale(14),
              paddingVertical: scale(10),
              color: 'black',
            }}>
            Số điện thoại
          </Text>
          <TextInput
            textColor="black"
            dense
            style={{backgroundColor: 'white'}}
            activeOutlineColor="red"
            mode="outlined"
            value={phone}
            onChangeText={text => {
              this.setState({phone: text});
            }}
          />
          {/* <Text style={{fontSize: scale(14), paddingTop: scale(10)}}>
            Giới tính
          </Text>
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              title="Nam"
              checked={true}
              onPress={() => setIndex(0)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <CheckBox
              title="Nữ"
              checked={false}
              onPress={() => setIndex(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
          </View> */}
          <Text
            style={{fontSize: scale(14), marginTop: scale(10), color: 'black'}}>
            Ngày sinh
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({open: true});
            }}
            style={{
              borderWidth: 1,
              padding: scale(15),
              borderRadius: scale(5),
              borderColor: 'grey',
              marginVertical: scale(10),
            }}>
            <Text style={{fontSize: scale(14), color: 'black'}}>
              {birthday}
            </Text>
          </TouchableOpacity>
          <Button
            title="Cập nhật"
            onPress={() => this.updateUser()}
            style={{marginTop: scale(50)}}
          />
        </View>
        <DatePicker
          modal
          open={open}
          date={this.state.date}
          mode="date"
          locale="vi"
          confirmText="Đồng ý"
          cancelText="Từ chối"
          onConfirm={date => this.handleConfirm(date)}
          onCancel={() => {
            this.setState({open: false});
          }}
        />
      </SafeAreaView>
    );
  }
}

export default UpdateScreen;
