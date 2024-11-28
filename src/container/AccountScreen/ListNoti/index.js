import React, {Component, useEffect, useState , useCallback} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  Dimensions
} from 'react-native';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import images from 'imagesApp';
import {useSelector, useDispatch} from 'react-redux';
import {notification, readnoti} from 'store/actions/app';
import HTML from 'react-native-render-html';
import {scale} from 'react-native-size-scaling';
import moment from 'moment';
import {Icon} from '@rneui/themed';
import {useFocusEffect} from '@react-navigation/native';

const ListNoti = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.user.access_token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(
  //     notification(token, (err, data) => {
  //       setLoading(false);
  //       if (err) {
  //         return;
  //       } else {
  //         setData(data?.data);
  //       }
  //     }),
  //   );
  // }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications(); // Gọi lại API khi người dùng quay lại màn hình này
    }, [fetchNotifications]),
  );

  // Hàm gọi API để lấy dữ liệu notification
  const fetchNotifications = useCallback(() => {
    setLoading(true); // Bật trạng thái loading
    dispatch(
      notification(token, (err, data) => {
        setLoading(false); // Tắt trạng thái loading
        if (err) {
          return;
        } else {
          setData(data?.data);
        }
      }),
    );
  }, [dispatch, token]);
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
    <SafeAreaView style={{backgroundColor: 'white', flex : 1}}>
      <Toolbar
        iconLeft={images.iconBack}
        leftPress={() => props.navigation.goBack()}
        title="Danh sách thông báo"></Toolbar>
      {loading ? (
        // Hiển thị loading khi dữ liệu đang được tải
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
        contentContainerStyle={{flex: 1}}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style = {{color :'black'}}>Bạn không có thông báo nào</Text>
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={{padding: 10}}
                onPress={() => navigateScreen(item)}>
                <Text
                  style={{
                    fontSize: scale(14),
                    color: 'black',
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
                      color: 'black',
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
                    source={{
                      html: `<div>${item?.notification?.body}</div>` || '',
                    }}
                    containerStyle={{paddingHorizontal: scale(5)}}
                    allowedStyles={[]}
                    baseStyle={{
                      fontSize: scale(14),
                      color: item?.is_read ? 'black' : 'white',
                    }}
                    defaultTextProps={{numberOfLines: 2}}
                    contentWidth={Dimensions.get('window').width}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
export default ListNoti;
