import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

class AnimationText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translateX: new Animated.Value(0),
      direction: 1,
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    Animated.timing(this.state.translateX, {
      toValue: this.state.direction * 200,
      duration: 9000,
      useNativeDriver: false,
    }).start(() => {
      this.setState({direction: -1 * this.state.direction}, () => {
        this.startAnimation();
      });
    });
  }

  render() {
    const {translateX} = this.state;

    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.text ,{transform: [{translateX}]}]}>
          Đây là video có tính bảo mật cao!
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: 'maroon',
    fontWeight: '700',
    fontStyle :'italic'
  },
});

export default AnimationText;
