import React, {Component, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Text,
  View,
  DevSettings,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import images from 'imagesApp';
import {useSelector, useDispatch} from 'react-redux';
import {notification, readnoti} from 'store/actions/app';
import HTML from 'react-native-render-html';
import {scale} from 'react-native-size-scaling';
import colors from 'colors';
import moment from 'moment';
import {Icon} from '@rneui/themed';

const ListNoti = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.user.access_token);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(
      notification(token, (err, data) => {
        if (err) {
          return;
        } else {
          setData(data?.data);
         
        }
      }),
    );
  }, [data]);
  const navigateScreen = item => {
    const cases = {
      student_course: 'LearnScreen',
      student_calendar: 'CalendarScreen',
    };
    if (item?.is_read) {
      return props.navigation.navigate(`${cases[item?.notification?.type]}`);
    } else {
      dispatch(
        readnoti(item?._id, token, (err, data) => {
          if (err) {
          } else {
            return props.navigation.navigate(
              `${cases[item?.notification?.type]}`,
            );
          }
        }),
      );
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Toolbar
        iconLeft={images.iconBack}
        leftPress={() => props.navigation.goBack()}
        title="Danh sách thông báo"></Toolbar>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{padding: 10}}
              onPress={
                () => navigateScreen(item)
              }>
              <Text
                style={{
                  fontSize: scale(14),
                  color :'black'
                }}>
                {moment(item?.notification?.created_at).format('DD/MM/YYYY')}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name={'check-all'}
                  type="material-community"
                  size={scale(14)}
                />
                <Text
                  style={{
                    fontSize: scale(14),
                    marginVertical: scale(3),
                    color :'black'
                  }}>
                  {moment(item?.notification?.created_at).format('HH:mm')}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: item?.is_read
                    ? 'white'
                    : 'rgba(255, 0, 0, 0.6);',
                  borderRadius: 5,
                  padding: item?.is_read ? 0 : 5,
                }}>
                <HTML
                  source={{html: `<div>${item?.notification?.body}</div>`}}
                  allowedStyles={[]}
                  baseStyle={{
                    fontSize: scale(14),
                    color: item?.is_read ? 'black' : 'white',
                  }}
                  defaultTextProps={{numberOfLines: 2}}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default ListNoti;
