import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  Easing,
  Animated,
} from 'react-native';
import {scale} from 'react-native-size-scaling';
import colors from 'variables/colors';
// const {width, height} = Dimensions.get('window');
export const Watermark = ({
  text = '12313',
  width = Dimensions.get('window').width,
  height = Dimensions.get('window').height,
  duration = 7500,
  fontSize,
}) => {
  const getX = React.useRef(new Animated.Value(width / 2)).current;
  const runX = () => {
    getX.setValue(1);
    Animated.timing(getX, {
      toValue: 0,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => runX());

    return () => {
      new AbortController().abort;
    };
  };
  React.useEffect(() => {
    runX();
  }, []);

  const moveXloop = getX.interpolate({
    inputRange: [0, 1],
    //Speed : [-60,360]
    outputRange: [-width * 0.4, width],
  });
  return (
    <View style={{position: 'absolute', bottom: scale(10)}}>
      <Animated.Text
        style={[{left: moveXloop, fontSize: fontSize, color: colors.grey}]}>
        {text}
      </Animated.Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  body: {
    flex: 1,
    backgroundColor: '#3ad6f1',
  },
  text: {},
  wrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000040',
  },
});