import React, {Component} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {scale} from 'react-native-size-scaling';
import colors from 'colors';
// import * as Progress from 'react-native-progress';
import {Surface} from 'react-native-paper';
import vari from 'variables/platform';
import images from 'imagesApp';

// import Apptext from 'src/components/Apptext';
import {listmycourse} from 'store/actions/app';
const width = Dimensions.get('window').width / 375;
const height = Dimensions.get('window').height / 812;
import {connect} from 'react-redux';

// @connect(
//   state => ({
//     auth: state.auth.user,
//     loading: isRequestPending(state, 'listmycourse'),
//     listSite: state.auth.listSite,
//     language: state.app.language,
//     loggedIn: state.auth.loggedIn,
//   }),
//   {
//     listmycourse,
//     listSourceCategory,
//     courseMe,
//   },
// )
class MyCourse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          paddingLeft: scale(10),
          marginTop: height * 5,
          overflow: 'hidden',
          paddingBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              color: '#38393D',
              fontWeight: '700',
              fontSize: scale(16),
            }}>
            Khoá đang học
          </Text>
        </View>
        <Text
          style={{
            fontSize: scale(14),
            margin: scale(10),
            fontWeight: 'bold',
            color: colors.blue2,
          }}>
          Bạn chưa có khóa học nào
        </Text>
      </View>
    );
  }
}

export default MyCourse;
