import {
  Text,
  View,
  StatusBar,
  Alert,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  AppState,
} from 'react-native';
import React, {Component} from 'react';
import images from 'imagesApp';
import SafeAreaView from 'components/SafeAreaView';
import {scale} from 'react-native-size-scaling';
import Lesson from './Lesson';
import DeviceInfo from 'react-native-device-info';
import vari from 'variables/platform';
import Document from './Document';
import {lessonsID, listLesson, usersMe} from 'store/actions/app';
import {connect} from 'react-redux';
import colors from 'variables/colors';
import VideoDetail from './VideoDetail';
import YoutubeDetail from './YoutubeDetail';
import VimeoDetail from './VimeoDetail';
import ModalRate from 'components/ModalRate';
import {isRequestPending} from 'selectors/common';
import moment from 'moment';
import {Button, Icon, Tab, TabView} from '@rneui/themed';
import axios from 'axios';

const dataRate = [
  {
    name: '0.5x',
    rate: 0.5,
  },
  {
    name: '0.75x',
    rate: 0.75,
  },
  {
    name: 'Bình thường',
    rate: 1.0,
  },
  {
    name: '1.25x',
    rate: 1.25,
  },

  {
    name: '1.75x',
    rate: 1.75,
  },
  {
    name: '2.0x',
    rate: 2.0,
  },
];

@connect(
  state => ({
    auth: state.auth.user,
    dataUser: state.auth.saveInfoUser,
    loading: isRequestPending(state, 'listLesson'),
  }),
  {
    lessonsID,
    listLesson,
    usersMe,
  },
)
export class DetailLearnScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      videoWidth: Dimensions.get('window').width,
      videoHeight: Dimensions.get('window').height,
      type: '',
      isFullScreen: false,
      dataChoose: {},
      visibleQualyti: false,
      visibleQualyti2: false,
      visible: false,
      rate: 1.0,
      sourceVideos: {},
      data: [],
      lessonInfo: {},
      arrLessons: [],
      datalUser: {},
      severVideo: 'sv1',
      pause: false,
      arrLevels: [],
      nameQuality: 'Auto',
      appState: AppState.currentState,
    };
  }
  componentDidMount() {
    const {navigation, listLesson, auth, usersMe, dataUser} = this.props;
    const {item} = this.props.route.params;

    usersMe(auth.access_token, (err, data) => {
      if (err) {
      } else {
        this.setState({datalUser: data});
      }
    });
    this.unsubscribe = navigation.addListener('focus', () => {
      listLesson(item._id, auth?.access_token, (err, data) => {
        if (err) {
          Alert.alert(
            'Thông báo',
            `${err?.message?.message}`,
            [{text: 'Đồng ý'}],
            {
              cancelable: false,
            },
          );
        } else {
          const arrLessons = data?.reduce(
            (total, currentValue) => total.concat(currentValue.child),
            [],
          );
          const filteredArrLessons = arrLessons.filter(
            item => item !== undefined,
          );

          this.setState({data, arrLessons: filteredArrLessons});
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  getListLesson = lessonInfo => {
    const {listLesson, auth} = this.props;
    const {item} = this.props.route.params;

    listLesson(item._id, auth?.access_token, (err, data) => {
      if (err) {
        Alert.alert(
          'Thông báo',
          `${err?.message?.message}`,
          [{text: 'Đồng ý'}],
          {
            cancelable: false,
          },
        );
      } else {
        const arrLessons = data?.reduce(
          (total, currentValue) => total.concat(currentValue.child),
          [],
        );
        const filteredArrLessons = arrLessons.filter(
          item => item !== undefined,
        );
        this.setState({data, arrLessons: filteredArrLessons}, () => {
          const {arrLessons} = this.state;
          const indexLession = arrLessons.findIndex(
            item => item._id === lessonInfo._id,
          );
          if (arrLessons[indexLession + 1].document_info) {
            if (this.state.isFullScreen) {
              this.setState({
                isFullScreen: false,
              });
            }
            // this.onFullScreen()
          } else {
          }
          this.onPressLearn(arrLessons[indexLession + 1], indexLession + 1);
        });
      }
    });
  };

  onFullScreen = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen,
    });
    if (this.state.isFullScreen) {
      this.setState({
        videoWidth: Dimensions.get('window').width,
        videoHeight: Dimensions.get('window').height,
      });
    } else {
      this.setState({
        videoWidth: Dimensions.get('window').height,
        videoHeight: Dimensions.get('window').width,
      });
    }
  };

  renderRateControl = rate => {
    this.setState({rate: rate, visible: !this.state.visible});
  };
  onPressPauseVideo = () => {
    this.setState({pause: true, playerState: 1});
  };
  onVisibleQualyti = async checkFull => {
    const {sourceVideos} = this.state;

    if (typeof sourceVideos === 'string' && /.m3u8$/.test(sourceVideos)) {
      if (this.state.arrLevels.length <= 0) {
        const a = await axios.get(sourceVideos);

        const qualityLevels = [];
        const lines = a.data.split('\n');
        lines.forEach(line => {
          if (line.startsWith('#EXT-X-STREAM-INF')) {
            const match = line.match(/RESOLUTION=(\d+x\d+)/);
            if (match) {
              qualityLevels.push(match[1]);
            }
          }
        });
        this.setState({
          visibleQualyti2: true,
          checkFull: checkFull,
          arrLevels: qualityLevels,
        });
      } else {
        this.setState({
          visibleQualyti2: true,
          checkFull: checkFull,
        });
      }
    } else {
      this.setState({visibleQualyti: true});
    }
  };
  videoDetail = () => {
    const {videoWidth, videoHeight, rate, sourceVideos, lessonInfo, pause} =
      this.state;

    return (
      <View style={{}}>
        <VideoDetail
          rate={rate}
          pauseVD={pause}
          onPressPauseVD={() => {
            this.setState({pause: false, playerState: 0});
          }}
          nameQuality={this.state.nameQuality}
          onFullScreen={this.onFullScreen}
          playerState1={this.state.playerState}
          checkFull={this.state.isFullScreen}
          quality={sourceVideos}
          itemLearn={lessonInfo}
          onPressComplete={() => this.onPressComplete()}
          onPress={() => {
            this.props.navigation.goBack();
          }}
          onVisible={checkFull =>
            this.setState({visible: true, checkFull: checkFull})
          }
          onVisibleQualyti={checkFull => this.onVisibleQualyti(checkFull)}
          videoWidth={videoWidth}
          videoHeight={videoHeight}
        />
      </View>
    );
  };
  onPressServer1 = () => {
    const {sourceVideos} = this.state;

    if (typeof sourceVideos === 'string' && /.m3u8$/.test(sourceVideos)) {
      let sourceVideos1 = sourceVideos.replace('stream4', 'stream3');
      this.setState({sourceVideos: sourceVideos1, severVideo: 'sv1'});
    } else {
      this.setState({sourceVideos, severVideo: 'sv1'});
      sourceVideos.src = sourceVideos.src.replace('stream2', 'stream');
    }
  };
  onPressServer2 = () => {
    const {sourceVideos} = this.state;

    if (typeof sourceVideos === 'string' && /.m3u8$/.test(sourceVideos)) {
      let sourceVideos1 = sourceVideos.replace('stream3', 'stream4');
      this.setState({sourceVideos: sourceVideos1, severVideo: 'sv2'});
    } else {
      this.setState({sourceVideos, severVideo: 'sv2'});
      sourceVideos.src = sourceVideos.src.replace('stream', 'stream2');
    }
  };
  colorSever1 = sv => {
    const {severVideo} = this.state;

    if (severVideo === sv) {
      return 'red';
    } else {
      return 'grey';
    }
  };
  colorSever2 = () => {
    const {severVideo} = this.state;

    if (severVideo === 'sv2') {
      return 'red';
    } else {
      return 'grey';
    }
  };
  onFullScreenYoutube = () => {
    this.setState({
      isFullScreen: !this.state.isFullScreen,
    });
    if (this.state.isFullScreen) {
      this.setState({
        videoWidth: Dimensions.get('window').width,
        videoHeight: Dimensions.get('window').height,
      });
    } else {
      this.setState({
        videoWidth: Dimensions.get('window').height,
        videoHeight: Dimensions.get('window').width,
      });
    }
  };

  onPressComplete = () => {
    const {lessonsID, auth} = this.props;
    const {lessonInfo} = this.state;

    const info = {
      complete_status: 1,
    };
    lessonsID('patch', auth.access_token, lessonInfo._id, info, (err, data) => {
      if (err) {
        Alert.alert('Thông báo', err?.message?.message);
        return;
      } else {
        this.setState({pause: true, playerState: 1});
        this.getListLesson(lessonInfo);
        // const {arrLessons} = this.state;
        // const indexLession = arrLessons.findIndex(
        //   item => item._id === lessonInfo._id,
        // );
        // this.onPressLearn(arrLessons[indexLession + 1], indexLession + 1);
      }
    });
  };
  youtubeDetail = () => {
    const {lessonInfo, videoWidth, videoHeight} = this.state;
    return (
      <YoutubeDetail
        onFullScreenYoutube={this.onFullScreenYoutube}
        checkFullYoutube={this.state.isFullScreen}
        item={lessonInfo}
        onPress={() => {
          this.props.navigation.goBack();
        }}
        videoWidth={videoWidth}
        videoHeight={videoHeight}
        onPressComplete={() => this.onPressComplete()}
      />
    );
  };
  vimeoDetail = () => {
    const {lessonInfo} = this.state;
    return (
      <VimeoDetail
        item={lessonInfo}
        // onPress={() => this.props.navigation.goBack()}
      />
    );
  };
  onPressLearn = (item, index) => {
    const {lessonsID, auth} = this.props;
    const {arrLessons, datalUser} = this.state;
    const {dataCourse, dataType} = this.props.route.params;
    const filteredLessons = arrLessons.findIndex(
      itemFilter => itemFilter._id === item._id,
    );
    const lessionA = filteredLessons
      ? arrLessons[filteredLessons - 1]
      : arrLessons[filteredLessons];

    if (index) {
      if (dataCourse?.type_open_lesson === 3) {
        if (lessionA.complete) {
          const currentTime = moment();
          // complete_at + số ngày
          const openAt = moment(lessionA.complete_at)
            .add(dataType.open_time_next_lesson, 'days')
            .startOf('day')
            .add(1, 'hours');

          if (currentTime.isAfter(openAt)) {
            lessonsID('get', auth.access_token, item._id, (err, data) => {
              if (err) {
                return;
              } else {
                this.setState({dataChoose: data});

                if (data.lesson_info) {
                  // Bài học video mơi
                  // this.videoDetail();
                  if (data.lesson_info.type === 'youtube') {
                    this.setState({
                      type: data.lesson_info.type,
                      lessonInfo: data,
                    });
                  } else if (data.lesson_info.type === 'vimeo') {
                    this.setState({
                      type: data.lesson_info.type,
                      lessonInfo: data?.lesson_info,
                    });
                  } else {
                    const lengthSourceVideo = data?.lesson_info?.source.length;
                    const sourceVideo =
                      data?.lesson_info?.source[lengthSourceVideo - 1];

                    this.setState({
                      type: data.lesson_info.type,
                      sourceVideos: sourceVideo,
                      lessonInfo: data,
                    });
                  }
                } else if (data.video) {
                  // Bài học video cũ
                } else if (data.document_info) {
                  // Bài giảng mới
                  this.setState({type: ''});
                  this.props.navigation.navigate('DocumentInfo', {data});
                } else if (data.document) {
                  alert('document');

                  // Bài giảng cũ
                } else if (data.quiz_test_id && data.quiz_test_id.length) {
                  this.setState({type: ''});
                  this.props.navigation.navigate('TestScreen', {
                    data,
                    datalUser,
                  });

                  // bài học là BKT
                } else if (data.text_content) {
                  this.props.navigation.navigate('TextContent', {data});

                  // Bài học dạng html
                } else {
                  // ko tồn tại
                  Alert.alert('Thông báo', 'Bài học chưa có nội dung');
                }
              }
            });
          } else {
            const formatOpenAt = openAt.format('DD/MM/YYYY HH:mm');
            Alert.alert('Thông báo', `Bài học sẽ mở vào lúc ${formatOpenAt}`);
          }
        } else {
          Alert.alert('Thông báo', 'Bạn phải hoàn thành bài trước');
        }
      }
      if (dataCourse?.type_open_lesson === 2) {
        // start_time + số ngày

        const openAt = moment(dataType?.start_time).add(
          dataType.open_time_lesson,
          'days',
        );
        const formattedTime = moment(openAt).format('DD/MM/YYYY HH:mm');
        Alert.alert('Thông báo', `Bài học sẽ mở vào lúc ${formattedTime}`);
      }
      if (dataCourse?.type_open_lesson === 1) {
        lessonsID('get', auth.access_token, item._id, (err, data) => {
          if (err) {
            return;
          } else {
            this.setState({dataChoose: data});
            if (data.lesson_info) {
              // Bài học video mơi
              // this.videoDetail();
              if (data.lesson_info.type === 'youtube') {
                this.setState({
                  type: data.lesson_info.type,
                  lessonInfo: data,
                });
              } else if (data.lesson_info.type === 'vimeo') {
                this.setState({
                  type: data.lesson_info.type,
                  lessonInfo: data?.lesson_info,
                });
              } else {
                const lengthSourceVideo = data?.lesson_info?.source.length;
                const sourceVideo =
                  data?.lesson_info?.source[lengthSourceVideo - 1];

                this.setState({
                  type: data.lesson_info.type,
                  sourceVideos: sourceVideo,
                  lessonInfo: data,
                });
              }
            } else if (data.video) {
              // Bài học video cũ
            } else if (data.document_info) {
              // Bài giảng mới
              this.setState({type: ''});
              this.props.navigation.navigate('DocumentInfo', {
                data: {...data, document_info: data.document_info},
              });
            } else if (data.document) {
              this.setState({type: ''});
              this.props.navigation.navigate('DocumentInfo', {
                data: {...data, document_info: data.document},
              });

              // Bài giảng cũ
            } else if (data.quiz_test_id && data.quiz_test_id.length) {
              this.setState({type: ''});

              this.props.navigation.navigate('TestScreen', {data, datalUser});

              // bài học là BKT
            } else if (data.text_content) {
              this.props.navigation.navigate('TextContent', {data});

              // Bài học dạng html
            } else {
              // ko tồn tại
              Alert.alert('Thông báo', 'Bài học chưa có nội dung');
            }
          }
        });
      }
    } else {
      //Nếu là bài đầu tiên thì auto học
      lessonsID('get', auth.access_token, item._id, (err, data) => {
        if (err) {
          return;
        } else {
          this.setState({dataChoose: data});

          if (data.lesson_info) {
            // Bài học video mơi
            // this.videoDetail();
            if (data.lesson_info.type === 'youtube') {
              this.setState({
                type: data.lesson_info.type,
                lessonInfo: data,
              });
            } else if (data.lesson_info.type === 'vimeo') {
              this.setState({
                type: data.lesson_info.type,
                lessonInfo: data?.lesson_info,
              });
            } else {
              const lengthSourceVideo = data?.lesson_info?.source.length;
              const sourceVideo =
                data?.lesson_info?.source[lengthSourceVideo - 1];
              this.setState({
                type: data.lesson_info.type,
                sourceVideos: sourceVideo,
                lessonInfo: data,
              });
            }
          } else if (data.video) {
            // Bài học video cũ chỉ xảy khi database bị mất file
            // alert('videoSonBui');
          } else if (data.document_info) {
            // Bài giảng mới
            this.setState({type: ''});
            // this.props.navigation.navigate('DocumentInfo', {data});
            this.props.navigation.navigate('DocumentInfo', {
              data: {...data, document_info: data.document_info},
            });
          } else if (data.document) {
            // alert('document');
            // Bài giảng cũ
            this.setState({type: ''});

            this.props.navigation.navigate('DocumentInfo', {
              data: {...data, document_info: data.document},
            });
          } else if (data.quiz_test_id && data.quiz_test_id.length) {
            this.setState({type: ''});

            this.props.navigation.navigate('TestScreen', {data, datalUser});

            // bài học là BKT
          } else if (data.text_content) {
            this.props.navigation.navigate('TextContent', {data});

            // Bài học dạng html
          } else {
            // ko tồn tại
            Alert.alert('Thông báo', 'Bài học chưa có nội dung');
          }
        }
      });
    }
  };
  switchStyle = () => {
    const {type, data} = this.state;
    switch (type) {
      case 'youtube':
        return this.youtubeDetail();
      case 'video':
        return this.videoDetail();
      case 'video/stream':
        return this.videoDetail();
      case 'vimeo':
        return this.vimeoDetail();
      default:
        break;
    }
  };

  renderQualytiControl = item => {
    const {sourceVideos} = this.state;

    const isSelected = sourceVideos.res == item.res;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            sourceVideos: item,
            visibleQualyti: !this.state.visibleQualyti,
          });
        }}
        style={{flexDirection: 'row', padding: scale(10)}}>
        {isSelected && (
          <Icon
            color={'black'}
            name={'check'}
            size={scale(20)}
            type="material-community"
          />
        )}

        <Text
          style={{
            color: 'black',
            fontSize: scale(12),
            marginLeft: scale(10),
            fontWeight: isSelected ? 'bold' : 'normal',
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  renderQualytiControl2 = item => {
    const {sourceVideos} = this.state;
    let regex = /x(\d+)/; // Biểu thức chính quy để tìm số sau dấu "x"
    let match = item.match(regex);
    let secondNumber = match[1]; // Lấy số từ nhóm thứ nhất của kết quả phù hợp
    let result = secondNumber + 'p'; // Thêm ký tự "P" vào số
    return (
      <TouchableOpacity
        onPress={() => {
          let replacedUrl = sourceVideos.replace(/\/[^/]+$/, `/${result}.m3u8`);
          this.setState({
            sourceVideos: replacedUrl,
            nameQuality: result,
            visibleQualyti2: !this.state.visibleQualyti2,
          });
        }}
        style={{flexDirection: 'row', padding: scale(10)}}>
        {result === this.state.nameQuality && (
          <Icon
            color={'black'}
            name={'check'}
            size={scale(20)}
            type="material-community"
          />
        )}
        <Text
          style={{
            color: 'black',
            fontSize: scale(12),
            marginLeft: scale(10),
          }}>
          {result}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      tabIndex,
      isFullScreen,
      dataChoose,
      visibleQualyti,
      sourceVideos,
      data,
    } = this.state;
    const {item} = this.props.route.params;
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar hidden />
        <View
          style={{
            backgroundColor: 'black',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.state.type ? (
            this.switchStyle()
          ) : (
            <ImageBackground
              source={{
                uri: item?.thumbnail_url,
              }}
              style={{
                height: vari.width / 1.75,
                width: vari.width,
                flexDirection: 'row',
              }}
              resizeMode="contain"
              defaultSource={images.noThumb}>
              <Icon
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                color={colors.blue3}
                name={'keyboard-backspace'}
                size={scale(25)}
                type="material-community"
              />
            </ImageBackground>
          )}
        </View>
        {/* Chọn Sever */}
        {this.state.type === 'video' && !this.state.isFullScreen && (
          <View style={{flexDirection: 'row', padding: scale(5)}}>
            <Button
              title="Server 1"
              onPress={() => this.onPressServer1()}
              titleStyle={{color: 'white', fontSize: scale(14)}}
              buttonStyle={{
                backgroundColor: this.colorSever1('sv1'),
              }}
            />
            <Button
              title="Server 2"
              onPress={() => this.onPressServer2()}
              titleStyle={{color: 'white', fontSize: scale(14)}}
              buttonStyle={{
                backgroundColor: this.colorSever1('sv2'),

                marginLeft: scale(5),
              }}
            />
          </View>
        )}

        {isFullScreen ? null : (
          <View
            style={{
              flex: DeviceInfo.isTablet()
                ? 1.4
                : this.state.type === 'youtube'
                ? 1.5
                : 2,
            }}>
            <>
              <Tab
                variant="default"
                value={tabIndex}
                onChange={e => {
                  this.setState({tabIndex: e});
                }}
                indicatorStyle={{
                  backgroundColor: colors.blue3,
                  height: 3,
                }}>
                <Tab.Item
                  title={'BÀI HỌC & TÀI LIỆU'}
                  titleStyle={{
                    color: 'black',
                    fontSize: scale(14),
                  }}></Tab.Item>
                <Tab.Item
                  title={'TỔNG QUAN'}
                  titleStyle={{
                    color: 'black',
                    fontSize: scale(14),
                  }}></Tab.Item>
              </Tab>
              <TabView
                disableSwipe
                value={tabIndex}
                animationType="spring"
                minSwipeRatio={0}
                minSwipeSpeed={0}
                onChange={e => {
                  this.setState({tabIndex: e});
                }}>
                <TabView.Item style={{width: '100%'}}>
                  <Lesson
                    check={dataChoose}
                    onPress={(itemLearn, index) => {
                      this.onPressLearn(itemLearn, index);
                    }}
                    onPressPauseVideo={() => this.onPressPauseVideo()}
                    data={data}
                    loadingCourse={this.props.loading}
                    navigation={this.props.navigation}
                    datalUser={this.state.datalUser}
                    itemCourse={item}
                  />
                </TabView.Item>
                <TabView.Item style={{width: '100%'}}>
                  <Document navigation={this.props.navigation} item={item} />
                </TabView.Item>
              </TabView>
              {/* <Lesson
                check={dataChoose}
                onPress={(itemLearn, index) => {
                  this.onPressLearn(itemLearn, index);
                }}
                onPressPauseVideo={() => this.onPressPauseVideo()}
                data={data}
                loadingCourse={this.props.loading}
                navigation={this.props.navigation}
                datalUser={this.state.datalUser}
                itemCourse={item}
              /> */}
            </>
          </View>
        )}
        {/* Chất lượng video */}
        <ModalRate
          checkFull={this.state.checkFull}
          visible={visibleQualyti}
          backdropOpacity={0.7}>
          <View style={[{backgroundColor: 'white'}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: scale(14), color: 'black'}}>
                Chất lượng video
              </Text>
              <Icon
                onPress={() => {
                  this.setState({visibleQualyti: false});
                }}
                color={'black'}
                name={'close'}
                size={scale(20)}
                type="material-community"
              />
            </View>
            {dataChoose &&
              dataChoose?.lesson_info &&
              dataChoose?.lesson_info?.source &&
              dataChoose?.lesson_info?.source.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      paddingVertical: scale(10),
                    }}>
                    {this.renderQualytiControl(item)}
                  </View>
                );
              })}
          </View>
        </ModalRate>
        {/* Tốc độ video */}

        <ModalRate
          checkFull={this.state.checkFull}
          visible={this.state.visible}
          backdropOpacity={0.7}>
          <View style={[{backgroundColor: 'white'}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: scale(14), color: 'black'}}>
                Tốc độ video
              </Text>

              <Icon
                onPress={() => {
                  this.setState({visible: false});
                }}
                color={'black'}
                name={'close'}
                size={scale(20)}
                type="material-community"
              />
            </View>

            {dataRate.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => this.renderRateControl(item.rate)}
                  style={{flexDirection: 'row', padding: scale(10)}}>
                  {this.state.rate === item.rate && (
                    <Icon
                      color={'black'}
                      name={'check'}
                      size={scale(20)}
                      type="material-community"
                    />
                  )}
                  <Text
                    style={{
                      color: 'black',
                      fontSize: scale(12),
                      marginLeft: scale(10),
                      fontWeight:
                        this.state.rate === item.rate ? 'bold' : 'normal',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ModalRate>

        <ModalRate
          checkFull={this.state.checkFull}
          visible={this.state.visibleQualyti2}
          backdropOpacity={0.7}>
          <View style={[{backgroundColor: 'white'}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: scale(14), color: 'black'}}>
                Chất lượng video
              </Text>
              <Icon
                onPress={() => {
                  this.setState({visibleQualyti2: false});
                }}
                color={'black'}
                name={'close'}
                size={scale(20)}
                type="material-community"
              />
            </View>
            {this.state.arrLevels?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    paddingVertical: scale(10),
                  }}>
                  {this.renderQualytiControl2(item)}
                </View>
              );
            })}
          </View>
        </ModalRate>
      </SafeAreaView>
    );
  }
}
export default DetailLearnScreen;
