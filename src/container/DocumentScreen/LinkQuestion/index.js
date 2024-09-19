import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {Component, useState} from 'react';
import SafeAreaView from 'components/SafeAreaView';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import {WebView} from 'react-native-webview';
import {ListItem, Button, Icon, Avatar} from '@rneui/themed';
import {scale} from 'react-native-size-scaling';
import {useSelector, useDispatch} from 'react-redux';

const LinkQuestion = props => {
    const {item} = props.route.params;
    const domainSite = useSelector(state => state.auth.saveInfoSite);
  const userId = useSelector(state => state.auth.saveInfoUser._id);

    const domain = domainSite?.domain
    ? domainSite?.domain
    : domainSite?.subdomain + `.edubit.vn`;
  console.log("objectitem" , `https://${domain}/quiz/${item?.code_join_quiz}&user_id=${userId}` )
  
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Toolbar
        iconLeft={images.iconBack}
        leftPress={() => props.navigation.goBack()}
        title={item?.quiz_title}></Toolbar>

      

      <WebView
          containerStyle={{backgroundColor: 'red'}}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          source={{uri: `https://${domain}/quiz/${item?.code_join_quiz}?user_id=${userId}`}}
          startInLoadingState={true}
          black
          style={{height: 200}}
          onLoadProgress={({nativeEvent}) => {}}
          onLoadEnd={() => {
           
          }}
        />

      
    </SafeAreaView>
  );
};
export default LinkQuestion;
