import {StyleSheet, Dimensions} from 'react-native';

import vari from 'variables/platform';
import colors from 'colors';


import {scale} from 'src/components/ScaleSheet';

const width = Dimensions.get('window').width / 375;
const height = Dimensions.get('window').height / 812;

export default StyleSheet.create({
  img: {
    width: '100%',
    height: vari.width / 4,
  },
  touchable: {
    borderWidth: 1,
    borderColor: '#C2C6C9',
    overflow: 'hidden',
    width: vari.width / 2.2,
    height: vari.width / 1.9,
    backgroundColor: 'white',
    borderRadius: scale(5),
    marginBottom: height * 12,
    marginRight: width * 12,
    justifyContent: 'space-between',
    paddingBottom: scale(7),
    shadowColor: '#282828',
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 4,
    shadowOffset: {width: 0, height: 1},
  },
  modal: {
    overflow: 'hidden',
    height: vari.height / 1.1,
    borderRadius: scale(7),
    backgroundColor: '#F2F2F2',
  },
  titleModal: {
    justifyContent: 'space-between',
    backgroundColor: colors.blue3,
    padding: scale(10),
  },
  btnPay: {
    borderRadius: scale(5),
    margin: scale(10),
    padding: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  btnSelectPay: {
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: scale(60),
    margin: scale(5),
    borderRadius: scale(3),
    borderWidth: 1,
    borderColor: colors.grey1,
  },
});


