import {StyleSheet, Dimensions} from 'react-native';

import vari from 'variables/platform';
import colors from 'colors';

import {scale} from 'src/components/ScaleSheet';

export default StyleSheet.create({
  courseContainer: {
    padding: scale(10),
    marginTop: 10,
    shadowColor: '#282828',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    elevation: 1,
    shadowOffset: {width: 0, height: 1},
  },
  itemContainer: {
    marginVertical: scale(10),
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    height: 'auto',
    // padding: 5
  },
  imageContainer: {
    flex: 0.4,
    height: '100%',
    width: vari.width / 4,
    overflow: 'hidden',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
  },
  courseTitle: {
    width: '90%',
    fontWeight: Platform.OS === 'ios' ? '600' : '900',
    marginBottom: scale(5),
    paddingRight: scale(20),
  },
});
