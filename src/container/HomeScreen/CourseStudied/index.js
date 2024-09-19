import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import moment from 'moment';
import {decode} from 'html-entities';

import {scale} from 'react-native-size-scaling';
import colors from 'colors';
// import * as Progress from 'react-native-progress';
import {Surface} from 'react-native-paper';
import vari from 'variables/platform';
import images from 'imagesApp';
import {connect} from 'react-redux';
import HTML from 'react-native-render-html';
import {courseMe, courses, coursesDetail} from 'store/actions/app';
import RouterService from 'src/container/Router/RouterService';
const width = Dimensions.get('window').width / 375;
const height = Dimensions.get('window').height / 812;
@connect(
  state => ({
    auth: state.auth.user,
    loggedIn: state.auth.loggedIn,
  }),
  {
    courseMe,
    courses,
    coursesDetail,
  },
)
class CourseStudied extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.showList();
  }
  onPress = item => {
    const {user, courses, listData, coursesDetail, sourseList} = this.props;

    if (item.end) {
      const endTime = moment(item.end);
      const currentTime = moment();

      if (endTime.isBefore(currentTime)) {
        Alert.alert('Thông báo', 'Đã hết thời gian học !');
      } else {
        this.learCourseItem(item);
      }
    } else {
      this.learCourseItem(item);
    }
  };
  learCourseItem = item => {
    //Điều kiện hoàn thành khoá học trước
    const {courses, auth, coursesDetail} = this.props;

    coursesDetail(item._id, auth?.access_token, (err, data) => {
      if (err) {
        return;
      } else {
        if (data?.can_learn) {
          const dataCourse = {
            type_open_lesson: data.type_open_lesson,
          };
          RouterService.navigate('DetailLearnScreen', {
            item,
            dataCourse,
            dataType: data,
          });
          // RouterService.navigate('ForgetPass');
        } else {
          var filteredObjects = sourseList.filter(obj =>
            data?.complete_course.includes(obj._id),
          );
          // Check : nếu điều kiện hoàn thành > 1 khoá học
          if (filteredObjects.length >= 2) {
            var name = '';
            filteredObjects.forEach(obj => {
              name += obj.name + ' - ';
            });
            name = name.slice(0, -3);
            Alert.alert(
              'Thông báo',
              `Bạn phải hoàn thành khoá học: ${decode(name)} trước`,
            );
          } else {
            Alert.alert(
              'Thông báo',
              `Bạn phải hoàn thành khoá học ${decode(
                filteredObjects[0].name,
              )} trước`,
            );
          }
        }
      }
    });
  };

  showList = () => {
    const {auth, courseMe} = this.props;
    courseMe(1, auth.access_token, (error, data) => {
      if (error) {
        return;
      } else {
        this.setState({data: data?.data});
      }
    });
  };

  renderItem = ({item, index}) => {
    var numberComplete =
      (item?.total_complete_lesson / item?.total_lesson) * 100 || 0;
    return (
      <Surface
        key={index.toString()}
        style={{
          marginTop: height * 12,
          marginBottom: height * 12,
          marginRight: width * 12,
          borderRadius: 7,
          borderColor: colors.grey1,
        }}
        elevation={2}>
        <TouchableOpacity
          onPress={() =>
            this.props.loggedIn
              ? this.onPress(item)
              : RouterService.navigate('AppModal')
          }
          activeOpacity={0.8}
          style={{
            borderRadius: 7,
            width: vari.width / 2.5,
            height: vari.width / 1.9,
            backgroundColor: 'white',
            justifyContent: 'space-between',
            paddingBottom: scale(7),
          }}>
          <ImageBackground
            defaultSource={images.noThumb}
            resizeMode="contain"
            source={{uri: item.thumbnail_url}}
            style={{
              width: '100%',
              alignItems: 'flex-end',
              height: vari.width / 4,
            }}
          />
          <View
            style={{
              marginHorizontal: scale(5),
            }}>
            <HTML
              source={{html: `<p>${item.name}</p>`}}
              containerStyle={{paddingHorizontal: scale(5)}}
              allowedStyles={[]}
              baseStyle={{
                fontSize: scale(14),
                color: colors.blue3,
                fontWeight: 'bold',
              }}
              defaultTextProps={{numberOfLines: 2}}
            />

            <View
              style={{
                overflow: 'hidden',
              }}>
              <View
                style={{
                  width: '100%',
                  height: scale(4),
                  backgroundColor: '#ddd',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: `${
                      (item?.total_complete_lesson / item?.total_lesson) *
                        100 || 0
                    }%`,

                    height: scale(4),
                    backgroundColor: colors.blue3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: scale(12),
                paddingVertical: scale(5),
              }}>
              {numberComplete % 1 !== 0
                ? numberComplete.toFixed(2)
                : numberComplete}
              % hoàn thành
            </Text>
          </View>
        </TouchableOpacity>
      </Surface>
    );
  };

  render() {
    const {data} = this.state;
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
            // alignItems: 'center',
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.length === 0 ? (
            <Text
              style={{
                fontSize: scale(14),
                margin: scale(10),
                fontWeight: 'bold',
                color: colors.blue2,
              }}>
              Bạn chưa có khóa học nào
            </Text>
          ) : (
            data && data.map((item, index) => this.renderItem({item, index}))
          )}
        </ScrollView>
      </View>
    );
  }
}

export default CourseStudied;
