import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {Button, Dialog, CheckBox, ListItem, Avatar} from '@rneui/themed';
import Apptext from 'src/components/Apptext';
import colors from 'colors/';

export class ShowAlert extends Component {
  onBackdropPress = () => {
    const {onBackdropPress} = this.props;
    onBackdropPress && onBackdropPress();
  };
  render() {
    const {isVisible, title, landscapeStylesa} = this.props;
    return (
      <Dialog
        overlayStyle={[{}, landscapeStylesa]}
        isVisible={isVisible}
        onBackdropPress={() => this.onBackdropPress()}>
        <Apptext i18nKey={title} />
        <Dialog.Actions>
          <Dialog.Button onPress={() => this.onBackdropPress()}>
            <Apptext style={{color: colors.blue3}} i18nKey={'ok'} />
          </Dialog.Button>
        </Dialog.Actions>
      </Dialog>
    );
  }
}

export default ShowAlert;
