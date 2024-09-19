import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {isEmpty} from 'lodash';
import testIDs from './testIDs';
import {scale} from 'react-native-size-scaling';
import moment from 'moment';

class AgendaItem extends Component {
  itemPressed = () => {
    const {item, navigation, listData} = this.props;
    const dataCalenda = listData.flatMap(item => item?.data);
    const dataSchedule = dataCalenda
      .filter(itemSchedule => itemSchedule?.title === item?.title)
    this.props.navigation.navigate('DetailCalendar', {item , dataSchedule } );
  };

  render() {
    const {item} = this.props;
    // const startDate = moment.unix(item.start.sec).format('HH:mm');
    // const endDate = moment.unix(item.end.sec).format('HH:mm');

    if (isEmpty(item)) {
      return (
        <View style={styles.emptyItem}>
          <Text style={styles.emptyItemText}>
            Không có sự kiện nào được lên kế hoạch hôm nay
          </Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={this.itemPressed}
        style={styles.item}
        testID={testIDs.agenda.ITEM}>
        <View>
          {/* <Text style={styles.itemHourText}>{startDate}</Text>
          <Text style={styles.itemDurationText}>{endDate}</Text> */}
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        {/* <Text style={styles.itemTitleText}>12</Text> */}

        {/* <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={this.buttonPressed} />
        </View> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: scale(16),
    fontWeight: 'bold',
    fontSize: scale(16),
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});

export default React.memo(AgendaItem);
