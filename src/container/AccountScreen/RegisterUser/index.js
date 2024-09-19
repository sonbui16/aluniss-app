import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import SafeAreaView from 'components/SafeAreaView';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import {WebView} from 'react-native-webview';
import {ListItem, Button, Icon, Avatar} from '@rneui/themed';
import {scale} from 'react-native-size-scaling';
import {listQuizTest} from 'store/actions/app';
import {useSelector, useDispatch} from 'react-redux';
import React, {Component, useEffect, useState} from 'react';
import colors from 'colors';
import FloatingLabelInput from 'components/FloatingLabelInput';
import AuthButton from 'components/AuthButton';
import axios from 'axios';
import {categories} from 'store/actions/app';
import {site_id} from 'store/api/common';
import {isRequestPending} from 'src/store/selectors';

const RegisterUser = props => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  // const [dataCate, setDataCate] = useState('');

  const dataCate = [{name: 'Hạng B1'}, {name: 'Hạng B2'}, {name: 'Hạng C'}];
  goRegister = async () => {
    const url =
      'https://daotaothanhan.edubit.vn/api/lead/create/66a34278e275cb1288b25a6c';
    setLoading(true);
    const params = {phone: phone, full_name: name, content: content};
    const formData = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        formData.append(key, params[key]);
      }
    }
    try {
      const response = await axios.post(url, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      //   if (response?.data?.success) {
      setLoading(false);
      Alert.alert('Thông báo', response?.data?.message, [
        {text: 'OK', onPress: () => props.navigation.goBack()},
      ]);
    } catch (error) {
      console.error('Error calling the API:', error);
    }
  };

  useEffect(() => {
    // dispatch(
    //   categories(site_id, (err, data) => {
    //     if (err) {
    //     } else {
    //       // this.setState({setDataCate: data?.data});
    //       setDataCate(data?.data);
    //     }
    //   }),
    // );
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Toolbar
        iconLeft={images.iconBack}
        leftPress={() => props.navigation.goBack()}
        title={'Đăng ký học'}></Toolbar>
      <View style={{flex: 1, margin: scale(20)}}>
        <View style={{alignItems: 'center', marginBottom: scale(20)}}>
          <Image
            source={images.logo}
            style={{width: '70%', height: scale(75)}}
            resizeMode="contain"
          />
        </View>

        <FloatingLabelInput
          maxLength={34}
          iconImg={images.persion}
          label={'Họ và tên'}
          value={name}
          onChangeText={value => setName(value)}
        />
        {/* Phone */}
        <FloatingLabelInput
          keyboardType={'phone-pad'}
          maxLength={34}
          iconImg={images.phone}
          label="Số điện thoại"
          value={phone}
          onChangeText={value => setPhone(value)}
        />
        
        <AuthButton
          disabled={
            name === '' || phone === '' || content === '' ? true : false
          }
          loading={loading}
          onPress={goRegister}
          text="ĐĂNG KÝ"
          containerStyle={{backgroundColor: colors.blue3}}
        />
      </View>
    </SafeAreaView>
  );
};
export default RegisterUser;
