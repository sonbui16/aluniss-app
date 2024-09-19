import { StyleSheet } from 'react-native';

import { scale } from 'src/components/ScaleSheet';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  img: {

    width: DeviceInfo.isTablet() ? scale(7) : scale(13),
    height: DeviceInfo.isTablet() ? scale(7) : scale(13)
  },
  touchable: {
    paddingHorizontal: 10,
    height: scale(35),
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: scale(1),
  },
});
