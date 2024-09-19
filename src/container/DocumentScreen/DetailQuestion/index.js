import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import SafeAreaView from 'components/SafeAreaView';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import {WebView} from 'react-native-webview';
import {ListItem, Button, Icon, Avatar} from '@rneui/themed';
import {scale} from 'react-native-size-scaling';
  import { listQuizTest } from 'store/actions/app';
  import {useSelector, useDispatch} from 'react-redux';
  import React, {Component, useEffect, useState} from 'react';

const DetailQuestion = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.user.access_token);
  const userId = useSelector(state => state.auth.saveInfoUser._id);

  const {item} = props.route.params;
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(
      listQuizTest(item._id, userId, token, (err, data) => {
        if (err) {
          return;
        } else {
          setData(data?.data);
        }
      }),
    );
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Toolbar
        iconLeft={images.iconBack}
        leftPress={() => props.navigation.goBack()}
        title={item.name}></Toolbar>

      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'grey',
          padding: scale(10),
          backgroundColor: `rgba(0, 0, 0, .03)`,
        }}>
        <Text style={{fontSize: scale(16) , fontWeight :'bold' , color :'black'}}>Danh sách đề thi</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('LinkQuestion' , {item})}
              key={item?.id}
              style={{
                justifyContent: 'center',
                marginHorizontal: scale(10),
                borderBottomWidth: 1,
                paddingVertical: scale(10),
                borderColor: 'grey',
              }}>
              <Text style={{fontSize: scale(14), width: '80%', color :'black'}}>
                {item?.quiz_title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default DetailQuestion;
