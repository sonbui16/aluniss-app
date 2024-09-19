import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toolbar from 'components/Toolbar';
import SafeAreaView from 'components/SafeAreaView';
import CancelLogin from 'container/CancelLogin/index';
import BtnLogin from 'components/BtnLogin/index';
import ListLearnScreen from 'container/LearnScreen/ListLearnScreen';
@connect(
  state => ({
    loggedIn: state.auth.loggedIn,
  }),
  {},
)
export class LearnScreen extends React.PureComponent {
  render() {
    const {loggedIn} = this.props;
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <Toolbar title="Khoá học của tôi"></Toolbar>
        {loggedIn ? (
          <ListLearnScreen navigation={this.props.navigation} />
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

export default LearnScreen;
