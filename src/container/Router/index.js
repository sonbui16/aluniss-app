import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RouterService from './RouterService';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

async function onAppBootstrap(token1) {
  try {
    // Đăng ký thiết bị với FCM
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        console.log('Device registered for remote messages');
      })
      .catch(error => {
        console.error('Error registering device for remote messages:', error);
      });

    // Lấy token
    const token = await messaging().getToken();
    fetch('https://api.edubit.vn/v1/user-fcm-token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token1}`,
      },
      body: JSON.stringify({
        token_fcm: token,
        type: 'app',
      }),
    })
      .then(response => {
        if (!response.ok) {
          // Nếu mã trạng thái không nằm trong khoảng 200-299
          throw new Error(`Response data1: ${response.status}`);
        }
        return response.json(); // Chuyển đổi phản hồi thành JSON
      })
      .then(data => {
        console.log('Response data2:', data); // Hiển thị nội dung response
      })
      .catch(error => {
        console.error('Response data31:', error); // Hiển thị lỗi nếu có
      });
  } catch (error) {
    console.error('Response data4:', error);
  }
}
const Router = () => {
  const token1 = useSelector(state => state.auth.user.access_token);
  token1 && onAppBootstrap(token1);
  return <AuthStack />;
};
export default Router;
