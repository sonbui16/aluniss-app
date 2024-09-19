import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import {connect} from 'react-redux';
import {
  selectCalendar,
  eventsCalendar,
  deleteLeaveCalendar,
  leaveCalendar,
  acceptCalendar,
  calendarCheckin,
  listScheduleEvents,
} from 'store/actions/app';
import moment from 'moment';
import {scale} from 'react-native-size-scaling';
import {Card, Button, Icon, Dialog, Input} from '@rneui/themed';
import vari from 'variables/platform';
import colors from 'colors';
import {isRequestPending} from 'selectors/common';
import Toast from 'react-native-toast-message';
import HTMLView from 'react-native-render-html';
@connect(
  state => ({
    tokenCalendar: state.auth.user?.access_token,
    loading: isRequestPending(state, 'selectCalendar'),
  }),
  {
    selectCalendar,
    eventsCalendar,
    deleteLeaveCalendar,
    leaveCalendar,
    acceptCalendar,
    calendarCheckin,
    listScheduleEvents,
  },
)
export class DetailCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataEvents: {},
      page: 0,
      visible: false,
      itemRequest: '',
      reason: '',
      showMore: false,
      visibleShowMore: false,
    };
  }

  componentDidMount() {
    Promise.all([this.listlistSchedule(), this.selectCalendar()])
      .then(result => {})
      .catch(err => {});
  }
  listlistSchedule = () => {
    const {item} = this.props.route.params;
    const {tokenCalendar, listScheduleEvents, selectCalendar} = this.props;
    listScheduleEvents(
      item?.day,
      item?._id,
      item?.user_schedule_id,
      tokenCalendar,
      (err, data) => {
        if (err) {
          return;
        } else {
          this.setState({dataEvents: data});
        }
      },
    );
  };
  selectCalendar = () => {
    const {selectCalendar, tokenCalendar, eventsCalendar} = this.props;
    const {item} = this.props.route.params;
    selectCalendar(item._id, tokenCalendar, (err, data) => {
      if (err) return;
      if (data) {
        this.setState({
          data: data,
        });
      }
    });
  };
  showStatus = data => {
    const {item} = this.props.route.params;
    const today = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('HH:mm');

    if (moment(item?.day).isBefore(today)) {
      return data === 'color' ? 'red' : `Đã kết thúc`;
    } else if (moment(item?.day).isAfter(today)) {
      return data === 'color' ? 'goldenrod' : `Chưa bắt đầu`;
    } else {
      if (item?.repeat_frequency?.start === '') {
        return data === 'color' ? 'green' : `Đang diễn ra`;
      } else {
        // Thời gian bắt đầu
        const startTime = moment(item?.repeat_frequency?.start, 'HH:mm');
        // Thời gian kết thúc
        const endTime = moment(startTime).add(
          item?.repeat_frequency?.time,
          'minutes',
        );
        const currentMoment = moment(currentTime, 'HH:mm');
        if (currentMoment.isBefore(startTime)) {
          return data === 'color' ? 'goldenrod' : `Chưa diễn ra`;
        } else if (currentMoment.isAfter(endTime)) {
          return data === 'color' ? 'red' : `Đã kết thúc`;
        } else {
          return data === 'color' ? 'green' : `Đang diễn ra`;
        }
      }
    }
  };

  colorStatusTitle = item => {
    switch (item.status) {
      case 'agree':
        return 'green';
      case 'unconfirmed':
        return 'goldenrod';
      case 'disagree':
        return 'red';
      default:
        break;
    }
  };
  deleteLeave = item => {
    const {deleteLeaveCalendar, tokenCalendar} = this.props;
    const {data} = this.state;
    deleteLeaveCalendar(
      item?._id,
      tokenCalendar,
      (err, data) => {
        if (err) {
          return;
        } else {
          this.listlistSchedule();
        }
      },
    );
  };
  toggleDialog = () => {
    this.setState({visible: !this.state.visible});
  };
  btnShowMore = () => {
    this.setState({visibleShowMore: !this.state.visibleShowMore});
  };
  toggleCheckin = () => {
    const {calendarCheckin, tokenCalendar} = this.props;
    const {data} = this.state;
    const info = {
      user_schedule_id: data?._id,
    };
    calendarCheckin(info, tokenCalendar, (err, data) => {
      if (err) {
        return;
      } else {
        Alert.alert(
          'Thông báo',
          'Bạn đã điểm danh thành công !',
          [
            {
              text: 'Đồng ý',
              onPress: () => {
                this.selectCalendar();
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
  };
  isAccept = () => {
    const {acceptCalendar, tokenCalendar} = this.props;
    const {data} = this.state;
    const info = {
      user_schedule_id: data?.item?._id?.$id,
      type: 'accept',
    };
    acceptCalendar(info, tokenCalendar, (err, data) => {
      if (err) return;
      if (data) {
        this.selectCalendar();
      }
    });
  };
  isRefuse = () => {
    const {acceptCalendar, tokenCalendar} = this.props;
    const {data} = this.state;
    const info = {
      user_schedule_id: data?.item?._id?.$id,
      type: 'refuse',
    };
    acceptCalendar(info, tokenCalendar, (err, data) => {
      if (err) return;
      if (data) {
        this.props.navigation.goBack();
        Toast.show({
          type: 'success', // success, error, info
          position: 'top', // top, bottom, center
          text2: 'Bạn đã từ chối tham dự thành công ', // Nội dung toast
          visibilityTime: 2000, // Thời gian hiển thị toast (ms)
          autoHide: true, // Tự động ẩn toast sau thời gian hiển thị
          topOffset: scale(60), // Khoảng cách từ đỉnh màn hình đến toast (nếu position='top')
          bottomOffset: scale(60),
        });
      }
    });
  };
  toggleAccept = () => {
    Alert.alert(
      'Chấp thuận ',
      'Bạn chắc chắn muốn tham gia sự kiện này ?',
      [
        {
          text: 'Đồng ý',
          onPress: () => {
            this.isAccept();
          },
        },
        {
          text: 'Từ chối',
        },
      ],
      {cancelable: false},
    );
  };
  toggleRefuse = () => {
    Alert.alert(
      'Từ chối',
      'Bạn chắc chắn muốn từ chối tham gia sự kiện này ?',
      [
        {
          text: 'Đồng ý',
          onPress: () => {
            this.isRefuse();
          },
        },
        {
          text: 'Từ chối',
          // onPress: () => console.log('No Pressed'),
        },
      ],
      {cancelable: false},
    );
  };
  prepareListItem = item => {
    return {
      color:
        item.status === 'agree'
          ? 'green'
          : item.status === 'unconfirmed'
          ? 'goldenrod'
          : 'red',
      text:
        item.status === 'agree'
          ? 'Đồng ý'
          : item.status === 'unconfirmed'
          ? 'Chưa xác nhận'
          : 'Không đồng ý',
      isDelete: item.status === 'unconfirmed' && item.type === 'leave',
      isEdit: item.status === 'unconfirmed' && item.type === 'leave',
    };
  };
  checkTitle = type => {
    const title = {
      checkin: 'Điểm danh',
      leave: 'Xin nghỉ',
      default: '',
    };
    return title[type] || title['default'];
  };
  renderItem = ({item, index}) => {
    const startTime = moment(item?.time).format('DD/MM/YYYY');
    const createTime = moment(item?.created_at).format('HH:MM DD/MM/YYYY');
    const checkStatus = this.prepareListItem(item);
    return (
      <View key={index.toString()}>
        <Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View />

            <Card.Title>{this.checkTitle(item.type)}</Card.Title>
            {/* check lại sự kiện này đã kết thúc hay chưa   */}
            {checkStatus.isDelete ? (
              <Icon
                onPress={() => {
                  Alert.alert(
                    'Xác nhận',
                    'Bạn chắc chắn muốn xóa đơn xin nghỉ này ?',
                    [
                      {
                        text: 'Đồng ý',
                        onPress: () => {
                          this.toggleDialog;
                          this.deleteLeave(item);
                        },
                      },
                      {
                        text: 'Từ chối',
                      },
                    ],
                    {cancelable: false},
                  );
                }}
                color={'red'}
                name={'trash-can-outline'}
                size={scale(20)}
                type="material-community"
              />
            ) : (
              <View />
            )}
          </View>
          {/* <Text>Ngày sự kiện :{startTime.format('DD/MM/YYYY')} </Text> */}

          <Card.Divider />
          <Text style={{fontSize: scale(14), color: 'black' ,}}>
            Ngày sự kiện :
            <Text style={{fontSize: scale(12), color: 'black'}}>
              {' '}
              {startTime}
            </Text>
          </Text>
          <Text style={{fontSize: scale(14), color: 'black'}}>
            Ngày tạo :
            <Text style={{fontSize: scale(12), color: 'black'}}>
              {' '}
              {createTime}
            </Text>
          </Text>
          <Text style={{fontSize: scale(14), color: 'black'}}>
            Xác nhận giảng viên:
            <Text
              style={{
                fontSize: scale(14),
                color: checkStatus.color,
              }}>
              {checkStatus.text}
            </Text>
          </Text>
        </Card>
      </View>
    );
  };

  comfirm = () => {
    const {reason, itemRequest, data} = this.state;
    const {item} = this.props.route.params;
    const {leaveCalendar, tokenCalendar} = this.props;
    const info = {
      user_schedule_id: data?.user_schedule?._id,
      reason: reason,
      time: item?.day,
    };
    leaveCalendar(info, tokenCalendar, (err, data) => {
      if (err) {
        Alert.alert('Thông báo', err?.message?.message);
        return;
      } else {
        this.toggleDialog();
        this.selectCalendar();
        this.listlistSchedule();
      }
    });
  };
  timeDay = () => {
    const {data} = this.state;
    const schedule1 = {
      repeat_frequency: {
        repeat: [], // or ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        start: '' || '11:00', // or "17:00"
        time: '' || '10', // or "60"
      },
    };
    const {repeat, start, time} =
      data?.repeat_frequency || schedule1?.repeat_frequency;
    const endTime = this.calculateEndTime(start, time);
    return `${start} - ${endTime} hàng ngày`;
  };
  formatScheduleText = schedule => {
    const daysOfWeek = {
      monday: 'Thứ hai',
      tuesday: 'Thứ ba',
      wednesday: 'Thứ tư',
      thursday: 'Thứ năm',
      friday: 'Thứ sáu',
      saturday: 'Thứ bảy',
      sunday: 'Chủ nhật',
    };
    const schedule1 = {
      repeat_frequency: {
        repeat: [], // or ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        start: '' || '11:00', // or "17:00"
        time: '' || '10', // or "60"
      },
    };

    const {repeat, start, time} =
      schedule?.repeat_frequency || schedule1?.repeat_frequency;
    if (repeat.length === 0 && start === '' && time === '') {
      return 'Hằng ngày';
    } else if (repeat.length === 0 && start && time) {
      const endTime = this.calculateEndTime(start, time);
      return `${start} - ${endTime} hàng ngày`;
    } else if (repeat.length > 0 && start === '' && time === '') {
      const days = repeat.map(day => daysOfWeek[day]).join(', ');
      return `Cả ngày vào ${days}`;
    } else {
      // Handle other cases if needed
      return 'Không xác định';
    }
  };
  calculateEndTime = (start, duration) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const durationMinutes = Number(duration);
    const endDate = new Date();
    endDate.setHours(startHour);
    endDate.setMinutes(startMinute + durationMinutes);
    const endHour = String(endDate.getHours()).padStart(2, '0');
    const endMinute = String(endDate.getMinutes()).padStart(2, '0');
    return `${endHour}:${endMinute}`;
  };
  formatVietnameseDate = dateString => {
    const date = new Date(dateString);
    // Array to map day indexes to Vietnamese day names
    const daysOfWeek = [
      'Chủ nhật',
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
    ];
    // Array to map month indexes to Vietnamese month names
    const months = [
      'thg 01',
      'thg 02',
      'thg 03',
      'thg 04',
      'thg 05',
      'thg 06',
      'thg 07',
      'thg 08',
      'thg 09',
      'thg 10',
      'thg 11',
      'thg 12',
    ];

    const dayName = daysOfWeek[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${hours}:${minutes} ${day} ${month}, ${year}`;
  };
  checkinDay = () => {
    const {data, dataEvents} = this.state;
    const today = (dataEvents?.data || [])
      .filter(item => {
        const formattedToday = moment().format('YYYYMMDD');
        return item?.day === Number(formattedToday);
      })
      .shift();
    return today?.type === 'checkin';
  };
  checkDisabled = () => {
    const {reason} = this.state;
    return reason === '' ? true : false;
  };
  render() {
    const {data, dataEvents, visible, visibleShowMore} = this.state;
    const NUM_OF_LINES = 1;
    const source = {
      html: `${data?.content}`,
    };
    const {item} = this.props.route.params;
    const today = new Date().toISOString().split('T')[0];
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Toolbar
          title="Chi tiết sự kiện"
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
        />
        <ScrollView>
        {!this.props.loading ? (
          <View>
            <View style={{padding: scale(10)}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: scale(18),
                    fontWeight: 'bold',
                    color: 'black',
                    width : '80%'
                  }}>
                  {data?.title}
                </Text>
                {this.showStatus('title') === 'Đã kết thúc' ? null : ( // 'ended'
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {data?.schedule?.type === 'optional' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Button
                          onPress={() => this.toggleAccept()}
                          title="CHẤP NHẬN"
                          titleStyle={{fontSize: scale(14)}}
                        />
                        <Button
                          buttonStyle={{marginLeft: scale(5)}}
                          onPress={() => this.toggleRefuse()}
                          title="TỪ CHỐI THAM DỰ"
                          color="error"
                          titleStyle={{fontSize: scale(14)}}
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Button
                          onPress={() => this.toggleDialog()}
                          title="XIN NGHỈ"
                          color="error"
                          titleStyle={{fontSize: scale(14)}}
                        />

                        {this.showStatus('title') === 'Đang diễn ra' && (
                          <Button
                            buttonStyle={{marginLeft: scale(5)}}
                            disabled={this.checkinDay() && true}
                            onPress={() => this.toggleCheckin()}
                            title={
                              this.checkinDay() ? 'ĐÃ ĐIỂM DANH' : 'ĐIỂM DANH'
                            }
                            titleStyle={{fontSize: scale(14)}}
                          />
                        )}
                      </View>
                    )}
                  </View>
                )}
              </View>

              <Text
                style={{
                  fontSize: scale(14),
                  marginTop: scale(10),
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Ngày : <Text style={styles.text}>{item?.day}</Text>
              </Text>
              <Text
                style={{
                  fontSize: scale(14),
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: scale(10),
                }}>
                Trạng thái:{' '}
                <Text
                  style={{
                    color: this.showStatus('color'),
                    fontWeight: 'normal',
                  }}>
                  {this.showStatus('title')}
                </Text>
              </Text>
              {data?.repeat_frequency?.start && (
                <Text
                  style={{
                    fontSize: scale(14),
                    marginTop: scale(10),
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Thời gian : <Text style={styles.text}>{this.timeDay()}</Text>
                </Text>
              )}
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: scale(14),
                      marginVertical: scale(10),
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Nội dung: {''}
                  </Text>
                  <View>
                    <HTMLView
                      source={source}
                      // defaultTextProps={{
                      //   numberOfLines: this.state.showMore ? 1 : 0,
                      //   onTextLayout: e => {
                      //     if (e.nativeEvent.lines.length > NUM_OF_LINES) {
                      //       this.setState({showMore: true});
                      //     }
                      //   },
                      // }}
                      // baseStyle={{
                      //   width: Dimensions.get('window').width / 1.3,
                      //   color: 'red',
                      //   fontSize: scale(12),
                      // }}
                    />
                  </View>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  {this.state.showMore && (
                    <Button
                      onPress={() => this.btnShowMore()}
                      containerStyle={{
                        width: 100,
                      }}
                      size="sm"
                      title="Xem thêm"
                      type="clear"
                      titleStyle={{fontSize: scale(12)}}
                    />
                  )}
                </View>
              </View>

              <Text style={{fontSize: scale(16), fontWeight: 'bold'}}>
                Điểm danh - xin nghỉ{' '}
              </Text>
              <View style={{height: vari.height / 1.7}}>
                <FlatList
                  data={dataEvents?.data || []}
                  extraData={this.state}
                  renderItem={this.renderItem}
                  ListEmptyComponent={() => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={images.noresult}
                          style={{
                            width: vari.width / 3,
                            height: vari.width / 3,
                          }}
                        />
                        <Text style={{fontSize: scale(12)}}>
                          Bạn chưa có danh sách nào cả !
                        </Text>
                      </View>
                    );
                  }}></FlatList>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={colors.blue3} />
          </View>
        )}
        </ScrollView>
        <Dialog
          overlayStyle={{width: '90%', borderRadius: 10}}
          isVisible={visible}
          onBackdropPress={() => this.toggleDialog()}>
          <Dialog.Title title="Đơn xin nghỉ" />
          <Text
            style={{
              fontSize: scale(14),
              color: 'black',
              marginVertical: scale(5),
            }}>
            Lý do:
          </Text>
          <Input
            placeholder=""
            multiline={true}
            numberOfLines={3}
            inputStyle={{
              height: vari.width / 2,
              fontSize: scale(14),
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            containerStyle={{borderWidth: 0.3, borderRadius: 5}}
            onChangeText={value => this.setState({reason: value})}
          />
          <Dialog.Actions>
            <Button
              disabled={this.checkDisabled()}
              onPress={() => {
                this.comfirm();
              }}
              title="ĐỒNG Ý"
              titleStyle={{fontSize: scale(14)}}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          overlayStyle={{height: vari.width}}
          isVisible={visibleShowMore}
          onBackdropPress={() => this.btnShowMore()}>
          <Dialog.Title title="Nội dung" />
          <ScrollView style={{}}>
            <HTMLView
              source={source}
            />
          </ScrollView>
        </Dialog>
      </SafeAreaView>
    );
  }
}
export default DetailCalendar;
const styles = StyleSheet.create({
  text: {
    fontWeight: 'normal',
    color: 'grey',
    fontSize: scale(12),
  },
});
