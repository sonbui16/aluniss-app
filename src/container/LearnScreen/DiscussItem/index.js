import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Alert, Image} from 'react-native';
import {connect} from 'react-redux';
import colors from 'colors';
import vari from 'variables/platform';
import {courses, coursesDetail} from 'store/actions/app';

import moment from 'moment';
import {scale} from 'react-native-size-scaling';
import HTMLView from 'react-native-render-html';
import {decode} from 'html-entities';
import images from 'src/assets/images';
@connect(state => ({user: state.auth.user, sourseList: state.app.sourseList}), {
  courses,
  coursesDetail,
})
export class DiscussItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
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
    const {user, courses, listData, coursesDetail, sourseList} = this.props;
    coursesDetail(item._id, user.access_token, (err, data) => {
      if (err) {
        return;
      } else {
        if (data?.can_learn) {
          const dataCourse = {
            type_open_lesson: data.type_open_lesson,
          };
          this.props.navigation.navigate('DetailLearnScreen', {
            item,
            dataCourse,
            dataType: data,
          });
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
            // Alert.alert(
            //   'Thông báo',
            //   `Bạn phải hoàn thành khoá học:
            //   ${decode(name)}
            //   trước`,
            // );
          } else {
            // Alert.alert(
            //   'Thông báo',
            //   `Bạn phải hoàn thành khoá học ${decode(
            //     filteredObjects[0].name,
            //   )} trước`,
            // );
          }
        }
      }
    });
  };

  checkTime = data => {
    if (data.end) {
      const endTime = moment(data.end);
      const currentTime = moment();

      if (endTime.isBefore(currentTime)) {
        return `${images.expired}`;
      } else {
        if (data.thumbnail_url) {
          return {uri: `${data.thumbnail_url}`};
        } else {
          return `${images.noThumb}`;
        }
      }
    } else {
      if (data.thumbnail_url) {
        return {uri: `${data.thumbnail_url}`};
      } else {
        return `${images.noThumb}`;
      }
    }
  };

  studyTime = (time, titleTime) => {
    // if (titleTime === 'minutes') {
    //   const seconds = time * 60;
    //   return time;
    // } else {
    //   let duration = moment.duration(time, 'seconds');
    //   return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
    // }

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    // Đảm bảo định dạng 2 chữ số cho phút và giây
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  };

  render() {
    const {data} = this.props;

    var numberComplete =
      (data?.total_complete_lesson / data?.total_lesson) * 100 || 0;
    return (
      <View style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          onPress={() => this.onPress(data)}
          style={{
            marginTop: scale(10),
            flexDirection: 'row',
            overflow: 'hidden',
          }}>
          <Image
            defaultSource={images.noThumb}
            source={this.checkTime(data)}
            resizeMode="contain"
            style={{
              height: vari.width / 2 / 2,
              width: vari.width / 2 / 2,
            }}
          />
          <View
            style={{
              justifyContent: 'space-evenly',
              width: vari.width - vari.width / 2 / 1.5,
              paddingLeft: 10,
            }}>
            <HTMLView
              source={{html: `<div>${data.name}</div>`}}
              containerStyle={{}}
              allowedStyles={[]}
              baseStyle={{
                fontSize: scale(14),
                color: 'black',
                fontWeight: 'bold',
              }}
              defaultTextProps={{numberOfLines: 2 , color: 'black'}}
            />
            {/* <View
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
                      (data?.total_complete_lesson / data?.total_lesson) *
                        100 || 0
                    }%`,

                    height: scale(4),
                    backgroundColor: colors.blue2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View> */}
            {/* <Text style={{color: 'black', fontSize: scale(12)}}>
              {numberComplete % 1 !== 0
                ? numberComplete.toFixed(2)
                : numberComplete}
              % hoàn thành
            </Text> */}
            {data?.start && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: scale(12), fontWeight: 'bold', color :'black' }}>
                  Thời gian:{' '}
                </Text>
                <Text style={{fontSize: scale(9), color :'black' }}>
                  {moment(data?.start).format('DD/MM/YYYY HH:mm')} -{' '}
                  {moment(data?.end).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
            )}
            {data?.user_chapter_study_time && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: scale(12), fontWeight: 'bold', color :'black'}}>
                  Thời gian đã học:{' '}
                </Text>
                <Text style={{fontSize: scale(9) , color :'black' }}>
                  {this.studyTime(
                    data?.user_chapter_study_time?.time,
                    'seconds',
                  )}{' '}
                  /{' '}
                  {this.studyTime(
                    data?.user_chapter_study_time?.time_chapter,
                    'minutes',
                  )}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default DiscussItem;
