/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  EventType,
  AndroidImportance,
  AndroidColor,
} from '@notifee/react-native';
import {firebase} from '@react-native-firebase/messaging';
//
// notifee.onForegroundEvent(({type, detail}) => {
//   console.log('typeobj', type, detail);
//   switch (type) {
//     case EventType.DISMISSED:
//       console.log('User dismissed notification', detail.notification);
//       // notifee.decrementBadgeCount();
//       break;
//     case EventType.PRESS:
//       console.log('Người dùng nhấn thông báo', detail.notification);
//       notifee.decrementBadgeCount();
//       RouterService.navigate('ForgetPass')
//       break;
//   }
// });
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('User pressed the notification.', detail.pressAction.id);
  }
});

// async function onAppBootstrap() {
//   try {
//     // Đăng ký thiết bị với FCM
//     await messaging()
//       .registerDeviceForRemoteMessages()
//       .then(() => {
//         console.log('Device registered for remote messages');
//       })
//       .catch(error => {
//         console.error('Error registering device for remote messages:', error);
//       });

//     // Lấy token
//     const token = await messaging().getToken();
//     fetch('https://api.edubit.vn/v1/user-fcm-token', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: '',
//       },
//       body: JSON.stringify({
//         token_fcm: 'token',
//         type: 'app',
//       }),
//     })
//       .then(response => {
//         if (!response.ok) {
//           // Nếu mã trạng thái không nằm trong khoảng 200-299
//           throw new Error(`Response data1: ${response.status}`);
//         }
//         return response.json(); // Chuyển đổi phản hồi thành JSON
//       })
//       .then(data => {
//         console.log('Response data2:', data); // Hiển thị nội dung response
//       })
//       .catch(error => {
//         console.error('Response data3:', error); // Hiển thị lỗi nếu có
//       });
//     console.log('data1233123', token);

//     // Lưu token lên server
//     //   await postToApi('/users/1234/tokens', { token });

//     // notifee.displayNotification({
//     //   title: 'Token Received12',
//     //   body: `Your token is: ${token}`,
//     // });
//   } catch (error) {
//     console.error('Response data4:', error);
//   }
// }
function onMessageReceived(message) {
  console.log('obj123', message?.notification?.title);
  notifee.displayNotification({
    title: message?.notification?.title,
    body: message?.notification?.body,
    android: {
      channelId: 'thanhAn',
      //   color: AndroidColor.RED,
      // colorized: true,
    },
  });
  notifee.incrementBadgeCount();
  // notifee.setBadgeCount(3).then(() => console.log('Badge count set!'));
  // notifee.displayNotification(JSON.parse(message.data.notifee));
}
async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'thanhAn',
    name: 'Thành An',
    lights: false,
    vibration: true,
    importance: AndroidImportance.DEFAULT,
  });
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

// onAppBootstrap();
createNotificationChannel();
const AppWrapper = () => {
  return <App />;
};
AppRegistry.registerComponent(appName, () => AppWrapper);
