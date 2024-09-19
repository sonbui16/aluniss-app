import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';

import {StyleSheet, isTablet, scale} from 'react-native-size-scaling';
import HomeScreen from 'container/HomeScreen';
import LearnScreen from 'container/LearnScreen';
import SearchScreen from 'container/SearchScreen';
import CalendarScreen from 'container/CalendarScreen';
import DocumentScreen from 'container/DocumentScreen';

import AccountScreen from 'container/AccountScreen';
import {Icon} from '@rneui/themed';
// import Tabbar from '../../../../theme/components/Tabbarcustom';
import colors from 'colors';
// import {scale , isTablet } from 'react-native-size-scaling';

const Tab = createBottomTabNavigator();
const homeName = 'Trang chủ';
// const documentName = 'Ôn tập';
const learnName = 'Vào học';
// const searchName = 'Tìm kiếm';
const calendarName = 'Lịch học';
const accountName = 'Tài khoản';

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else 
          // if (rn === documentName) {
          //   iconName = focused
          //     ? 'file-document-edit'
          //     : 'file-document-edit-outline';
          // } else 
          if (rn === learnName) {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
            // } else if (rn === searchName) {
            //   iconName = focused ? 'magnify' : 'magnify';
          } else if (rn === calendarName) {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (rn === accountName) {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              type="material-community"
              size={size}
              color={color}
            />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: colors.blue2,
        tabBarInactiveTintColor: 'grey',
      })}>
      <Tab.Screen name={homeName} component={HomeScreen} />
      {/* <Tab.Screen name={documentName} component={DocumentScreen} /> */}
      <Tab.Screen name={learnName} component={LearnScreen} />
      {/* <Tab.Screen name={searchName} component={SearchScreen} /> */}
      <Tab.Screen name={calendarName} component={CalendarScreen} />
      <Tab.Screen name={accountName} component={AccountScreen} />
      {/* <Tab.Screen name={searchName} component={SearchScreen} />
      <Tab.Screen name={accountName} component={AccountScreen} /> */}
    </Tab.Navigator>
  );
}

export default Tabs;
