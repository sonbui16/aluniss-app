import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import CancelLogin from 'container/CancelLogin/index';
import BtnLogin from 'components/BtnLogin/index';
import ListLearnScreen from 'container/LearnScreen/ListLearnScreen';
import images from 'imagesApp';
import isEmpty from 'lodash/isEmpty';
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
import {Alert, Text, View, ScrollView, RefreshControl} from 'react-native';
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
      dataItem: [],
      isRefreshing: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    // this.focusListener = navigation.addListener('willFocus', () => {
    //   this.listCalendar();
    // });
    this.listCalendar();
  }
  listCalendar = () => {
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
        'Thứ 5',
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
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    console.log('startOfMonth', startOfMonth , endOfMonth );
    allCalendar(startOfMonth, endOfMonth, user.access_token, (err, data) => {
      if (err) {
      } else {
        console.log('dataa12311111', data);

        const generateDailySchedules = item => {
          const {_id, schedule, schedule_id} = item;
          const {start_time, end_time} = schedule;
          const start = moment(start_time);
          const end = moment(end_time);
          const days = end.diff(start, 'days') + 1; // Số ngày bao gồm cả ngày bắt đầu và ngày kết thúc
          // console.log('days12', days);
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

        console.log('result123', result);

        const newArray1 = result.map(item => ({
          title: moment(item?.schedule?.start_time).format('YYYY-MM-DD'),
          data: [
            {
              ...item?.schedule,
              day: moment(item?.schedule?.start_time).format('YYYY-MM-DD'),
            },
          ],
        }));
        console.log('newArray1', newArray1);
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

        console.log('resultArray2', resultArray2);

        this.setState({
          // resultArray2
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
    console.log('item111', item);
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
        <Toolbar title="Lịch học"></Toolbar>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
            />
          }>
          {loggedIn ? (
            dataItem.length > 0 ? (
              <CalendarProvider
                onDateChanged={day => {
                  const isValueExist = dataItem.some(
                    item => item.title === `${day}`,
                  );
                  if (isValueExist) {
                  } else {
                    Alert.alert(
                      'Thông báo',
                      'Không có sự kiện nào được lập kế hoạch.',
                    );
                  }
                }}
                date={dataItem && dataItem[0] && dataItem[0].title}
                showTodayButton
                theme={this.todayBtnTheme}>
                {weekView ? (
                  <WeekCalendar
                    testID={testIDs.weekCalendar.CONTAINER}
                    firstDay={1}
                    markedDates={this.getMarkedDates()}
                  />
                ) : (
                  <ExpandableCalendar
                    testID={testIDs.expandableCalendar.CONTAINER}
                    theme={this.theme}
                    firstDay={1}
                    markedDates={this.getMarkedDates()}
                    leftArrowImageSource={images.logout}
                    rightArrowImageSource={images.logout}
                  />
                )}
                <AgendaList
                  // style={{backgroundColor: 'red'}}
                  // contentContainerStyle={{backgroundColor: 'red'}}
                  // useMoment={true}
                  markToday={true}
                  sections={dataItem}
                  renderItem={this.renderItem}
                  sectionStyle={{
                    backgroundColor: lightThemeColor,
                    color: 'grey',
                    textTransform: 'capitalize',
                  }}
                />
              </CalendarProvider>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: scale(14) , color :'black'}}>
                  Bạn chưa có sự kiện nào cả
                </Text>
              </View>
            )
          ) : (
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
