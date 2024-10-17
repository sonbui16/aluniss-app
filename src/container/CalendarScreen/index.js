import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import CancelLogin from 'container/CancelLogin/index';
import BtnLogin from 'components/BtnLogin/index';
import ListLearnScreen from 'container/LearnScreen/ListLearnScreen';
import images from 'imagesApp';
import isEmpty from 'lodash/isEmpty';
import vari from 'variables/platform';

import 'moment/locale/vi';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import {agendaItems} from './mock/agendaItems';
import AgendaItem from './mock/AgendaItem';
import {getTheme, themeColor, lightThemeColor} from './mock/theme';
import testIDs from './mock/testIDs';
import {
  Alert,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import {allCalendar} from 'store/actions/app';
import moment from 'moment';
import {scale} from 'react-native-size-scaling';

@connect(
  state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
  }),
  {
    allCalendar,
  },
)
export class CalendarScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.marked = this.getMarkedDates.bind(this);
    this.theme = getTheme();
    this.todayBtnTheme = {
      todayButtonTextColor: themeColor,
    };
    this.state = {
      dataItem: [
        {data: [], title: moment().startOf('month').format('YYYY-MM-DD')},
      ],
      isRefreshing: false,
      // dataItem: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    // this.focusListener = navigation.addListener('willFocus', () => {
    //   this.listCalendar();
    // });
    this.listCalendar(
      moment().startOf('month').format('YYYY-MM-DD'),
      moment().endOf('month').format('YYYY-MM-DD'),
    );
  }
  listCalendar = (startMonth, endMonth) => {
    LocaleConfig.locales['vi'] = {
      monthNames: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      monthNamesShort: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      dayNames: [
        'Chủ nhật',
        'Thứ 2',
        'Thứ 3',
        'Thứ 4',
        'Thứ 3',
        'Thứ 6',
        'Thứ 7',
      ],
      dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      today: 'Hôm nay',
    };
    LocaleConfig.defaultLocale = 'vi';

    const {allCalendar, tokenCalendar, user} = this.props;
    // const token = tokenCalendar;
    // const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    // const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

    // const info = {
    //   start_time: startOfMonth,
    //   end_time: endOfMonth,
    // };
    const startOfMonth = startMonth;
    const endOfMonth = endMonth;
    console.log('startOfMonth', startOfMonth);

    allCalendar(startOfMonth, endOfMonth, user.access_token, (err, data) => {
      if (err) {
      } else {
        const generateDailySchedules = item => {
          const {_id, schedule, schedule_id} = item;
          const {start_time, end_time} = schedule;
          const start = moment(start_time);
          const end = moment(end_time);
          const days = end.diff(start, 'days') + 1; // Số ngày bao gồm cả ngày bắt đầu và ngày kết thúc
          const dailySchedules = [];

          for (let i = 0; i < days; i++) {
            const currentStart = start
              .clone()
              .add(i, 'days')
              .startOf('day')
              .add(17, 'hours');
            const currentEnd = currentStart
              .clone()
              .endOf('day')
              .subtract(1, 'seconds');
            if (currentEnd.isAfter(end)) {
              currentEnd.set({
                hour: end.get('hour'),
                minute: end.get('minute'),
                second: end.get('second'),
                millisecond: end.get('millisecond'),
              });
            }

            dailySchedules.push({
              ...item,
              schedule: {
                ...schedule,
                _id: schedule_id,
                user_schedule_id: _id,
                start_time: currentStart.toISOString(),
                end_time: currentEnd.toISOString(),
              },
            });
          }

          return dailySchedules;
        };
        const result = data.flatMap(generateDailySchedules);
        const newArray1 = result.map(item => ({
          title: moment(item?.schedule?.start_time).format('YYYY-MM-DD'),
          data: [
            {
              ...item?.schedule,
              day: moment(item?.schedule?.start_time).format('YYYY-MM-DD'),
            },
          ],
        }));
        const combinedData = newArray1.reduce((acc, current) => {
          // Kiểm tra xem tiêu đề đã tồn tại trong đối tượng tạm thời chưa
          if (acc[current.title]) {
            // Nếu đã tồn tại, nối data hiện tại vào data của tiêu đề đó
            acc[current.title].data.push(...current.data);
          } else {
            // Nếu chưa tồn tại, tạo mới một mục với tiêu đề đó
            acc[current.title] = {...current};
          }
          return acc;
        }, {});

        // Chuyển đổi đối tượng tạm thời thành mảng
        const resultArray = Object.values(combinedData);

        const resultArray2 = resultArray
          .map(item => {
            // Lấy ngày trong tuần từ title
            const dayOfWeek = moment(item.title).format('dddd').toLowerCase();
            // Lọc data nếu ngày trong tuần không có trong repeat
            const filteredData = item.data.filter(dataItem => {
              const {repeat} = dataItem.repeat_frequency;
              return repeat.length === 0 || repeat.includes(dayOfWeek);
            });
            // Trả về phần tử với data đã được lọc
            return {
              ...item,
              data: filteredData,
            };
          })
          .filter(item => item.data.length > 0)
          .sort((a, b) => moment(a.title).unix() - moment(b.title).unix()); // Lọc các phần tử có data rỗng

        this.setState({
          dataItem: resultArray2,
          isRefreshing: false,
        });
      }
    });
  };
  getMarkedDates = () => {
    const marked = {};
    const {dataItem} = this.state;

    dataItem.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
        marked[item.title] = {
          marked: true,
          // dotColor: 'yellow'
        };
      } else {
        marked[item.title] = {disabled: true};
      }
    });
    return marked;
  };
  renderItem = ({item}) => {
    const {dataItem} = this.state;
    return (
      <AgendaItem
        listData={dataItem}
        item={item}
        navigation={this.props.navigation}
      />
    );
  };
  onRefresh = () => {
    this.setState({isRefreshing: true});
    this.listCalendar();
  };
  render() {
    const {loggedIn, weekView} = this.props;
    const {dataItem, isRefreshing} = this.state;
    console.log('dataItem', dataItem);
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
          title="Lịch học"></Toolbar>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isRefreshing}
          //     onRefresh={this.onRefresh}
          //   />
          // }
        >
          {loggedIn ? (
            // dataItem.length > 0 ? (
            <CalendarProvider
              onMonthChange={month => {
                console.log('month', month);
                const endOfMonth = moment(month.dateString)
                  .endOf('month')
                  .format('YYYY-MM-DD');
                this.listCalendar(month.dateString, endOfMonth);
              }}
              onDateChanged={day => {
                const isValueExist = dataItem.some(
                  item => item.title === `${day}`,
                );
                if (isValueExist) {
                } else {
                  // Alert.alert(
                  //   'Thông báo',
                  //   'Không có sự kiện nào được lập kế hoạch.',
                  // );
                }
              }}
              date={dataItem && dataItem[0] && dataItem[0].title}
              showTodayButton
              theme={this.todayBtnTheme}>
              {weekView ? (
                <WeekCalendar
                  testID={testIDs.weekCalendar.CONTAINER}
                  // firstDay={5}
                  markedDates={this.getMarkedDates()}
                />
              ) : (
                <ExpandableCalendar
                  hideKnob
                  closeOnDayPress={false}
                  initialPosition="open"
                  testID={testIDs.expandableCalendar.CONTAINER}
                  theme={this.theme}
                  // firstDay={2}
                  markedDates={this.getMarkedDates()}
                  // leftArrowImageSource={images.logout}
                  // rightArrowImageSource={images.logout}
                />
              )}
              {dataItem && dataItem.length > 0 ? (
                <AgendaList
                  // dayFormat={'yyyy-MM-d'}
                  dayFormatter={arg => {
                    moment.locale('vi');
                    return moment(arg).format('dddd, DD/MM/YYYY');
                  }}
                  // useMoment={true}
                  // markToday={true}
                  // inverted
                  // scrollToNextEvent
                  sections={dataItem}
                  renderItem={this.renderItem}
                  sectionStyle={{
                    backgroundColor: lightThemeColor,
                    color: 'grey',
                    textTransform: 'capitalize',
                  }}
                />
              ) : (
                <View
                  style={{
                    padding: scale(10),
                    borderRadius: scale(5),
                    backgroundColor: 'white',
                    marginTop: scale(10),
                    borderWidth: 1,
                    margin : scale(5),
                    borderColor: '#ddd',
                  }}>
                  <Text style={{fontSize: scale(16), color: 'black'}}>
                    Không có sự kiện
                  </Text>
                </View>
              )}
            </CalendarProvider>
          ) : (
            // ) : (
            //   <View
            //     style={{
            //       flex: 1,
            //       justifyContent: 'center',
            //       alignItems: 'center',
            //     }}>
            //     <Image
            //       resizeMode="contain"
            //       source={images.schedule}
            //       style={{
            //         height: vari.width / 4,
            //         width: vari.width / 4,
            //       }}></Image>
            //     <Text
            //       style={{
            //         fontSize: scale(16),
            //         color: 'black',
            //         marginTop: scale(10),
            //       }}>
            //       Bạn chưa có sự kiện nào cả
            //     </Text>
            //   </View>
            // )
            <CancelLogin />
          )}

          {!this.props.loggedIn && (
            <BtnLogin navigation={this.props.navigation} />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CalendarScreen;
