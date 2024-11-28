import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import CancelLogin from 'container/CancelLogin/index';
import BtnLogin from 'components/BtnLogin/index';
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
  Image,
  ActivityIndicator,
} from 'react-native';
import {allCalendar} from 'store/actions/app';
import moment from 'moment';
import {scale} from 'react-native-size-scaling';
import images from 'imagesApp';
import isEmpty from 'lodash/isEmpty';
import 'moment/locale/vi';

const CalendarScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const [dataItem, setDataItem] = useState([
    {data: [], title: moment().startOf('month').format('YYYY-MM-DD')},
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const theme = getTheme();
  const todayBtnTheme = {todayButtonTextColor: themeColor};

  useEffect(() => {
    listCalendar(
      moment().startOf('month').format('YYYY-MM-DD'),
      moment().endOf('month').format('YYYY-MM-DD'),
    );
  }, []);

  const listCalendar = (startMonth, endMonth) => {
    setLoading(true);
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

    dispatch(
      allCalendar(startMonth, endMonth, user.access_token, (err, data) => {
        if (err) {
          alert('No data available or an error occurred');
        }
        if (data) {
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
            if (acc[current.title]) {
              acc[current.title].data.push(...current.data);
            } else {
              acc[current.title] = {...current};
            }
            return acc;
          }, {});
          const resultArray = Object.values(combinedData);
          const resultArray2 = resultArray
            .map(item => {
              const dayOfWeek = moment(item.title).format('dddd').toLowerCase();
              const filteredData = item.data.filter(dataItem => {
                const {repeat} = dataItem.repeat_frequency;
                return repeat.length === 0 || repeat.includes(dayOfWeek);
              });
              return {...item, data: filteredData};
            })
            .filter(item => item.data.length > 0)
            .sort((a, b) => moment(a.title).unix() - moment(b.title).unix());

          setDataItem(resultArray2);
          setIsRefreshing(false);
          setLoading(false);
        }
      }),
    );
  };

  const generateDailySchedules = item => {
    const {_id, schedule, schedule_id} = item;
    const {start_time, end_time} = schedule;
    const start = moment(start_time);
    const end = moment(end_time);
    const days = end.diff(start, 'days') + 1;
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

  const getMarkedDates = () => {
    const marked = {};
    dataItem.forEach(item => {
      if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      } else {
        marked[item.title] = {disabled: true};
      }
    });
    return marked;
  };

  const renderItem = ({item}) => {
    return (
      <AgendaItem listData={dataItem} item={item} navigation={navigation} />
    );
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    listCalendar();
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Toolbar
        iconLeft={images.iconBack}
        leftPress={() => navigation.goBack()}
        title="Lịch học"
      />
      <ScrollView contentContainerStyle={{flex: 1}}>
        {loggedIn ? (
          <CalendarProvider
            onMonthChange={month => {
              const endOfMonth = moment(month.dateString)
                .endOf('month')
                .format('YYYY-MM-DD');
              listCalendar(month.dateString, endOfMonth);
            }}
            // onDateChanged={day => {
            //   const isValueExist = dataItem.some(item => item.title === day);
            //   if (!isValueExist) {
            //     // Alert.alert('Thông báo', 'Không có sự kiện nào được lập kế hoạch.');
            //   }
            // }}
            date={dataItem && dataItem[0]?.title}
            // showTodayButton
            theme={todayBtnTheme}>
            <ExpandableCalendar
              hideKnob
              closeOnDayPress={false}
              initialPosition="open"
              testID={testIDs.expandableCalendar.CONTAINER}
              theme={this.theme}
              leftArrowImageSource={null}
              rightArrowImageSource={null}
              markedDates={getMarkedDates()}
              disableArrowLeft
              disableArrowRight
            />
            {!loading ? (
              <AgendaList
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        padding: scale(10),
                        borderRadius: scale(5),
                        backgroundColor: 'white',
                        marginTop: scale(10),
                        borderWidth: 1,
                        margin: scale(5),
                        borderColor: '#ddd',
                      }}>
                      <Text style={{fontSize: scale(16), color: 'black'}}>
                        Không có sự kiện
                      </Text>
                    </View>
                  );
                }}
                dayFormatter={arg => {
                  moment.locale('vi');
                  return moment(arg).format('dddd, DD/MM/YYYY');
                }}
                sections={dataItem}
                renderItem={renderItem}
                sectionStyle={{
                  backgroundColor: lightThemeColor,
                  color: 'grey',
                  textTransform: 'capitalize',
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="blue" />
              </View>
            )}
          </CalendarProvider>
        ) : (
          <CancelLogin />
        )}
        {!loggedIn && <BtnLogin navigation={navigation} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
