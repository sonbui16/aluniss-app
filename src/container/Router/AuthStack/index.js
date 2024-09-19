import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import TabNavigation from 'container/Router/TabNavigation';
import SplashScreen from '../../SplashScreen';

import Settings from '../../AccountScreen/Settings';
import DeleteAcount from '../../AccountScreen/DeleteAcount';

import ForgetPass from '../../Auth/ForgetPass';
import LoginScreen from 'container/Auth/LoginScreen';
import RegisterScreen from 'container/Auth/RegisterScreen';
import DetailLearnScreen from 'container/LearnScreen/DetailLearnScreen';
import CourseDetail from '../../HomeScreen/CourseDetail';
import VideoTrial from 'container/HomeScreen/VideoTrial';

import DocumentInfo from 'container/LearnScreen/DocumentInfo';
import TestScreen from 'container/LearnScreen/TestScreen';
import TextContent from 'container/LearnScreen/TextContent';
import RenderDocument from 'container/LearnScreen/DetailLearnScreen/RenderDocument';
import NextScreen from 'src/container/HomeScreen/NextScreen';
import InstructScreen from 'src/container/InstructScreen';
import TrainingPlan from 'src/container/TrainingPlan';
import UpdateScreen from 'src/container/UpdateScreen';
import DetailCalendar from 'src/container/CalendarScreen/DetailCalendar';
import ListQuestion from 'container/DocumentScreen/ListQuestion';
import DetailQuestion from 'container/DocumentScreen/DetailQuestion';
import SimulationScreen from 'container/DocumentScreen/SimulationScreen';
import LinkQuestion from 'container/DocumentScreen/LinkQuestion';
import RegisterUser from 'container/AccountScreen/RegisterUser';
import Demo from 'container/Demo';
import CalendarScreen from 'container/CalendarScreen';
import ListNoti from 'container/AccountScreen/ListNoti';
import LearnScreen from 'container/LearnScreen';

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios',
        presentation: 'card',
      }}
      initialRouteName="SplashScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'wqeqe',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="DeleteAcount" component={DeleteAcount} />
      <Stack.Screen name="CourseDetail" component={CourseDetail} />
      <Stack.Screen name="DetailLearnScreen" component={DetailLearnScreen} />
      <Stack.Screen name="NextScreen" component={NextScreen} />
      <Stack.Screen name="DocumentInfo" component={DocumentInfo} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="TextContent" component={TextContent} />
      <Stack.Screen name="RenderDocument" component={RenderDocument} />
      <Stack.Screen name="InstructScreen" component={InstructScreen} />
      <Stack.Screen name="TrainingPlan" component={TrainingPlan} />
      <Stack.Screen name="Demo" component={Demo} />
      <Stack.Screen name="LearnScreen" component={LearnScreen} />

      <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
      <Stack.Screen name="DetailCalendar" component={DetailCalendar} />
      <Stack.Screen name="VideoTrial" component={VideoTrial} />

      <Stack.Screen name="ListQuestion" component={ListQuestion} />
      <Stack.Screen name="DetailQuestion" component={DetailQuestion} />

      <Stack.Screen name="SimulationScreen" component={SimulationScreen} />
      <Stack.Screen name="LinkQuestion" component={LinkQuestion} />

      <Stack.Screen name="RegisterUser" component={RegisterUser} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="ListNoti" component={ListNoti} />

      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
  );
}
export default AuthStack;
