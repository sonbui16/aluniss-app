import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import CancelLogin from 'container/CancelLogin/index';
import BtnLogin from 'components/BtnLogin/index';
import ListLearnScreen from 'container/LearnScreen/ListLearnScreen';
import {FlatList, TouchableOpacity, Text, View} from 'react-native';
import {scale} from 'react-native-size-scaling';
import {Button} from '@rneui/themed';
import vari from 'variables/platform';

const data = [
  {title: 'Ôn tập mô phỏng', id: 1},
  {title: 'Ôn tập 600 câu hỏi', id: 2},
];
@connect(
  state => ({
    loggedIn: state.auth.loggedIn,
  }),
  {},
)
export class DocumentScreen extends React.PureComponent {
  render() {
    const {loggedIn} = this.props;
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Toolbar title="Ôn tập"></Toolbar>
        {this.props.loggedIn ? (
          <View style={{marginTop: scale(50)}}>
            <Button
              onPress={() => this.props.navigation.navigate('SimulationScreen')}
              title={'Ôn tập mô phỏng'}
              titleStyle={{color: 'black'}}
              buttonStyle={{borderColor: 'grey'}}
              type="outline"
              containerStyle={{
                margin: 10,
              }}
            />
            <Button
              onPress={() => this.props.navigation.navigate('ListQuestion')}
              title={'Ôn tập 600 câu hỏi'}
              titleStyle={{color: 'black'}}
              buttonStyle={{borderColor: 'grey'}}
              type="outline"
              containerStyle={{
                margin: 10,
              }}
            />
          </View>
        ) : (
          <CancelLogin />
        )}
        {!this.props.loggedIn && (
          <BtnLogin navigation={this.props.navigation} />
        )}
      </SafeAreaView>
    );
  }
}

export default DocumentScreen;
