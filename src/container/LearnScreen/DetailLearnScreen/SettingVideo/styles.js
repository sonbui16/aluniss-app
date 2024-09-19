import {StyleSheet, Dimensions} from 'react-native';

import vari from 'variables/platform';

import {scale} from 'src/components/ScaleSheet';

export default StyleSheet.create({
  img: {
    width: scale(15),
    height: scale(15),
    tintColor : 'black'
    
  },
  view: {
    marginTop: scale(20),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
