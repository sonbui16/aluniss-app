import React, {Component} from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Text,
  View,
  SectionList,
  Button,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import colors from 'colors';
import images from 'imagesApp';
import {sourseDetail, saveSourceList} from 'store/actions/app';
import {scale} from 'react-native-size-scaling';
import {Icon, Chip} from '@rneui/themed';
import moment from 'moment';
import {site_id} from 'store/api/common';
@connect(
  state => ({
    auth: state.auth.user,
    dataUser: state.auth.saveInfoUser,
  }),
  {
    sourseDetail,
    saveSourceList,
  },
)
export class Leasson extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disabledTouch: false,
      refFlatList: '',
      dataOld: {},
      itemOld: {},
    };
  }
  sectionListRef = React.createRef();
  onPress = (item, index, itemChapter) => {
    const {onPress} = this.props;
    onPress && onPress(item, index);
  };

  checkSource = item => {
    if (item.lesson_info || item.video) {
      // Bài họoc video mơi
      return 'logo-youtube';
    } else if (item.quiz_test_id) {
      return 'list-outline';
      // bài học là BKT
    } else {
      // ko tồn tại
      // dang tài liệu
      return 'document-text-outline';
    }
  };
  renderItem1 = ({item, index}) => {
    const {data, check, onPressPauseVideo} = this.props;
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: check._id === item._id ? '#0cacea21' : 'white',
          }}>
          <Icon
            color={item?.complete ? colors.blue2 : 'black'}
            name={
              item.complete
                ? 'checkmark-circle-outline'
                : this.checkSource(item)
            }
            size={scale(15)}
            type="ionicon"
          />

          <View style={{marginHorizontal: scale(15)}}>
            <TouchableOpacity
              onPress={() => {
                this.onPress(item, index);
                // const {onPress} = this.props;
                // onPress && onPress(item, index);
              }}
              style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color:
                    this.props.check === item.name ? colors.blue2 : 'black',
                  fontSize: scale(12),
                  width: '100%',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>

            {item?.attach_file?.length > 0 && (
              <View style={{}}>
                <Text
                  style={{
                    color: colors.blue2,
                    fontSize: scale(14),
                    marginTop: scale(10),
                  }}>
                  Tài liệu
                </Text>
                {item.attach_file.map((item, index) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: scale(10),
                      }}>
                      <Icon
                        color={'black'}
                        name={'file-document-outline'}
                        size={scale(15)}
                        type="material-community"
                      />
                      <TouchableOpacity
                        style={{marginHorizontal: scale(10)}}
                        onPress={() => {
                          this.props.navigation.navigate('RenderDocument', {
                            link_document: item.url,
                          });
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: scale(12),
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}

            {/* lalala */}
            {item.complete_quiz_lesson && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: scale(10),
                }}>
                <Icon
                  color={'black'}
                  name={'help-circle-outline'}
                  size={scale(15)}
                  type="material-community"
                />

                <Text
                  style={{
                    fontSize: scale(14),
                    color: colors.blue2,
                    marginHorizontal: scale(10),
                  }}
                  onPress={() => {
                    const {datalUser} = this.props;
                    const data = {
                      quiz_test_id: [item.complete_quiz_lesson],
                      _id: item._id,
                      name: 'Bài kiểm tra',
                    };
                    onPressPauseVideo && onPressPauseVideo();

                    this.props.navigation.navigate('TestScreen', {
                      data,
                      datalUser,
                    });
                  }}>
                  Bài kiểm tra{' '}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* Hiển thị bài kiểm tra */}
      </View>
    );
  };
  // studyTime = (time, format = 'seconds') => {
  //   const timeStudy = format === 'seconds' ? time : time * 60;
  //   const hours = Math.floor(timeStudy / 3600);
  //   const minutes = Math.floor((timeStudy % 3600) / 60);
  //   const secs = timeStudy % 60;
  //   // Đảm bảo định dạng 2 chữ số cho phút và giây
  //   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
  //     2,
  //     '0',
  //   )}:${String(secs).padStart(2, '0')}`;
  // };
  // checkTextDone = item => {
  //   let html_time = '';
  //   let pass = !! item?.user_lesson_study_time?.pass_test;
  //   if (item?.time_chapter && item.time_chapter > 0) {
  //     const timeChapterInSeconds = item.time_chapter * 60; // Chuyển time_chapter từ phút sang giây
  //     const requiredTime = timeChapterInSeconds * 0.7; // Tính 70% của time_chapter

  //     pass = item?.user_chapter_study_time.time >= requiredTime;
  //     html_time =
  //       this.studyTime(item?.user_chapter_study_time.time) +
  //       ' / ' +
  //       this.studyTime(timeChapterInSeconds) +
  //       '  ';
  //   }
  //   return (
  //     <View style={{flexDirection: 'row'}}>
  //       {html_time ? (
  //         <Text style={{color: 'black', fontSize: scale(14)}}>{html_time}</Text>
  //       ) : (
  //         ''
  //       )}
  //       <Text style={{color: pass ? 'green' : 'red', fontSize: scale(14)}}>
  //         ({pass ? 'Hoàn thành' : 'Chưa Hoàn thành'})
  //       </Text>
  //     </View>
  //   );
  // };
  renderItem2 = ({item, index}) => {
    const {data, check, onPressPauseVideo} = this.props;
    const filteredArray =
      item &&
      item.child &&
      item?.child.filter(item => item.status_lesson !== 1);
    const itemChapter = item;
    return (
      <View key={index}>
        <View
          style={{
            justifyContent: 'space-between',
            padding: scale(10),
            backgroundColor: colors.blue3,
          }}>
          <Text
            style={{
              fontSize: scale(14),
              color: colors.blue2,
              fontWeight: '600',
              width: '85%',
            }}>
            {item.name}
          </Text>
          {/* {this.checkTextDone(item)} */}
        </View>
        {filteredArray &&
          filteredArray.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor:
                      check._id === item._id ? '#0cacea21' : 'white',
                  }}>
                  <Icon
                    color={item?.complete ? colors.blue2 : 'black'}
                    name={
                      item.complete
                        ? 'checkmark-circle-outline'
                        : this.checkSource(item)
                    }
                    size={scale(15)}
                    type="ionicon"
                  />

                  <View style={{marginHorizontal: scale(15)}}>
                    <TouchableOpacity
                      onPress={() => this.onPress(item, index, itemChapter)}
                      key={index}
                      style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color:
                            this.props.check === item.name
                              ? colors.blue2
                              : 'black',
                          fontSize: scale(12),
                          width: '100%',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>

                    {item?.attach_file?.length > 0 && (
                      <View style={{}}>
                        <Text
                          style={{
                            color: colors.blue2,
                            fontSize: scale(14),
                            marginTop: scale(10),
                          }}>
                          Tài liệu
                        </Text>
                        {item.attach_file.map((item, index) => {
                          return (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: scale(10),
                              }}>
                              <Icon
                                color={'black'}
                                name={'file-document-outline'}
                                size={scale(15)}
                                type="material-community"
                              />
                              <TouchableOpacity
                                style={{marginHorizontal: scale(10)}}
                                onPress={() => {
                                  if (item?.ext === 'rar') {
                                    Linking.openURL(item.url);
                                  } else {
                                    this.props.navigation.navigate(
                                      'RenderDocument',
                                      {
                                        link_document: item.url,
                                      },
                                    );
                                  }
                                }}>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontSize: scale(12),
                                  }}>
                                  {item.name}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    )}

                    {/* lalala */}
                    {item.complete_quiz_lesson && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: scale(10),
                        }}>
                        <Icon
                          color={'black'}
                          name={'help-circle-outline'}
                          size={scale(15)}
                          type="material-community"
                        />

                        <Text
                          style={{
                            fontSize: scale(14),
                            color: colors.blue2,
                            marginHorizontal: scale(10),
                          }}
                          onPress={() => {
                            const {datalUser} = this.props;
                            const data = {
                              quiz_test_id: [item.complete_quiz_lesson],
                              _id: item._id,
                              name: 'Bài kiểm tra',
                            };
                            onPressPauseVideo && onPressPauseVideo();

                            this.props.navigation.navigate('TestScreen', {
                              data,
                              datalUser,
                            });
                          }}>
                          Bài kiểm tra{' '}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                {/* Hiển thị bài kiểm tra */}
              </View>
            );
          })}
      </View>
    );
  };

  scrollToLocation = () => {
    this.sectionListRef.current.scrollToLocation({
      sectionIndex: 2, // Thay đổi thành chỉ mục của phần tử bạn muốn cuộn đến
      itemIndex: 0, // Thay đổi thành chỉ mục của mục bạn muốn cuộn đến
      animated: true, // Có cuộn mượt hay không
      viewPosition: 0, // Vị trí của mục trong viewport, 0 là phía trên, 1 là phía dưới, 0.5 là trung tâm
    });
  };
  componentDidMount() {
    const {auth, dataUser, itemCourse} = this.props;
  }
  render() {
    const {loadingCourse, data} = this.props;
    // const newData = data.map(({child, ...rest}) => ({...rest, data: child}));
    const result = data && data?.filter(item => item.status_lesson !== 1);
    return (
      <View style={{flex: 1}}>
        {/* <Button title="Scroll to Section 3" onPress={this.scrollToLocation} /> */}

        {loadingCourse ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={colors.blue2} size="small" />
          </View>
        ) : (
          <FlatList
            scrollEventThrottle={16}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            data={result}
            renderItem={this.renderItem2}
          />
          // <SectionList
          //   extraData={this.state}
          //   ref={this.sectionListRef}
          //   sections={data}
          //   keyExtractor={(item, index) => index.toString()}
          //   renderItem={this.renderItem1}
          //   renderSectionHeader={({section: {name}}) => (
          //     <View
          //       style={{
          //         justifyContent: 'space-between',
          //         padding: scale(10),
          //         backgroundColor: colors.blue3,
          //       }}>
          //       <Text
          //         style={{
          //           fontSize: scale(14),
          //           color: 'white',
          //           fontWeight: '600',
          //           width: '85%',
          //         }}>
          //         {name}
          //       </Text>
          //     </View>
          //   )}
          // />
        )}
      </View>
    );
  }
}
export default Leasson;
