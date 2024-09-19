import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import WebView from 'react-native-webview';
import notifee from '@notifee/react-native';
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Button
          title="Display Notification"
          onPress={() => this.onDisplayNotification()}
        />
      </View>
    );
  }
}
export default Demo;
