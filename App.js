import React, {Component} from 'react';
import {
  Text,
  View,
  LogBox,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Platform,
  PermissionsAndroid
} from 'react-native';
import {Provider} from 'react-redux';
import Router from './src/container/Router';
import {PaperProvider} from 'react-native-paper';
import colors from 'colors';
LogBox.ignoreAllLogs(true);
import store from 'store';
// import vari from 'variables/platform';
import {RNPdftron} from '@pdftron/react-native-pdf';
import {scale} from 'react-native-size-scaling';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import RouterService from 'src/container/Router/RouterService';
import {NavigationContainer} from '@react-navigation/native';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <SafeAreaView>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </SafeAreaView>
);
notifee.onForegroundEvent(({type, detail}) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      // notifee.decrementBadgeCount();
      break;
    case EventType.PRESS:
      console.log('Người dùng nhấn thông báo1', detail.notification);
      notifee.decrementBadgeCount();
      RouterService.navigate('CalendarScreen');
      break;
  }
});
export class App extends Component {
  constructor(props) {
    super(props);
    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);
    // notifee.setBadgeCount(0)
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  requestAndroidPermissions = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  };
  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestAndroidPermissions();
    } else if (Platform.OS === 'ios') {
      this.requestUserPermission();
    }
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <PaperProvider>
          <Provider store={store}>

            <MyStatusBar
              backgroundColor={colors.blue3}
              barStyle="dark-content"
            />
            <NavigationContainer ref={RouterService.refRouter}>
              <Router />
            </NavigationContainer>
          </Provider>
        </PaperProvider>
      </SafeAreaView>
    );
  }
}
export default App;
