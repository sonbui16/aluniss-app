import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import colors from 'variables/colors';

import React, {Component, useEffect, useState} from 'react';
import SafeAreaView from 'components/SafeAreaView';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import {scale} from 'react-native-size-scaling';
import {useSelector, useDispatch} from 'react-redux';
import {comboQuizTest, studentMapCombo} from 'store/actions/app';
import vari from 'variables/platform';
const numColumns = 2;

const ListQuestion = props => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.user.access_token);
  const userId = useSelector(state => state.auth.saveInfoUser._id);

  useEffect(() => {
    dispatch(
      comboQuizTest(token, (err, data) => {
        if (err) {
          return;
        } else {
          setData(data?.data);
        }
      }),
    );
  }, []);
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data?.length / numColumns);
    let numberOfElement = data?.length - numberOfFullRows * numColumns;
    while (numberOfElement !== numColumns && numberOfElement !== 0) {
      data.push({name: '', cover: '', empty: true});
      numberOfElement = numberOfElement + 1;
    }
    return data;
  };
  const checkStudentCombo = item => {
    const info = {};
    info.combo_id = item._id;
    info.user_id = userId;
    info.type = item.type;

    dispatch(
      studentMapCombo(info, token, (err, data) => {
        if (err) {
          return;
        } else {
          if(data) {
            props.navigation.navigate('DetailQuestion', {item})
          }
          else {
            Alert.alert("Tài khoản chưa được gắn ")
          }
        }
      }),
    );
    // 
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Toolbar
        iconLeft={images.iconBack}
        leftPress={() => props.navigation.goBack()}
        title="Ôn tập 600 câu hỏi lý thuyết"></Toolbar>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        extraData={this.state}
        contentContainerStyle={{flexGrow: 1}}
        numColumns={numColumns}
        data={data ? formatData(data, numColumns) : []}
        renderItem={({item, index}) => {
          if (item.empty) {
            return (
              <View
                style={{
                  height: vari.width / 1.7,
                  flex: 1,
                  margin: scale(10),
                }}
              />
            );
          }
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => checkStudentCombo(item)}
              style={{
                borderWidth: 1,
                borderColor: '#C2C6C9',
                overflow: 'hidden',
                height: vari.width / 2.0,
                backgroundColor: 'white',
                borderRadius: scale(5),
                justifyContent: 'space-between',
                paddingBottom: scale(7),
                shadowColor: '#282828',
                shadowRadius: 10,
                shadowOpacity: 0.8,
                elevation: 4,
                shadowOffset: {width: 0, height: 1},
                flex: 1,
                margin: scale(10),
              }}>
              <ImageBackground
                resizeMode="stretch"
                defaultSource={images.noThumb}
                source={{
                  uri: item.thumbnail_url,
                }}
                style={{
                  alignItems: 'flex-end',
                  width: '100%',
                  height: vari.width / 3.5,
                }}></ImageBackground>

              <Text
                style={{
                  fontSize: scale(14),
                  fontWeight: 'bold',
                  color: colors.blue2,
                  marginLeft: scale(10),
                }}>
                {item?.name}
              </Text>
              <Text style={{fontSize: scale(14), marginLeft: scale(10), color :'black'}}>
                Combo {item?.item_ids.length} đề thi
              </Text>
            </TouchableOpacity>
          );
        }}></FlatList>

      {/* {!this.props.loggedIn && (
      <BtnLogin navigation={this.props.navigation} />
    )} */}
    </SafeAreaView>
  );
};
// export class ListQuestion extends Component {
//   render() {
//     return (
//       <SafeAreaView style={{backgroundColor: 'white'}}>
//         <Toolbar
//           iconLeft={images.iconBack}
//           leftPress={() => this.props.navigation.goBack()}
//           title="Danh sách câu hỏi"></Toolbar>

//         {/* {!this.props.loggedIn && (
//           <BtnLogin navigation={this.props.navigation} />
//         )} */}
//       </SafeAreaView>
//     );
//   }
// }

export default ListQuestion;
