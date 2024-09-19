import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  DevSettings,
} from 'react-native';
import SafeAreaViews from 'components/SafeAreaView';
import Toolbar from 'components/Toolbar';
import images from 'imagesApp';
import {connect} from 'react-redux';
import colors from 'colors';
import {saveLanguage} from 'store/actions/app';
import Apptext from 'src/components/Apptext';
import RNRestart from 'react-native-restart';
import {
  Button,
  ButtonGroup,
  withTheme,
  Icon,
  ListItem,
  Dialog,
  CheckBox,
} from '@rneui/themed';
import {scale} from 'react-native-size-scaling';

@connect(
  state => ({
    language: state.app.language,
  }),
  {
    saveLanguage,
  },
)
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checked: 1,
      setIndex: props.language,
    };
  }
  onChangeLanguage = () => {
    const {checked} = this.state;
    RNRestart.restart();
  };
  onPressCheckbox = i => {
    this.setState({checked: i + 1});
  };
  toggleDialog = () => {
    this.setState({visible: !this.state.visible});
  };
  render() {
    const {language, saveLanguage} = this.props;
    const {visible, checked, setIndex} = this.state;
    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
          title="Cài đặt và mật khẩu"
        />
        <ScrollView>
          {/* Xoá tài khoản */}
          <ListItem
            onPress={() => this.props.navigation.navigate('DeleteAcount')}>
            <ListItem.Content>
              <Apptext i18nKey={'Xóa tài khoản'} />
            </ListItem.Content>

            <ListItem.Chevron />
          </ListItem>


          
        </ScrollView>

        <Dialog isVisible={visible}>
          <Dialog.Title
            titleStyle={{fontSize: scale(14)}}
            title={language === 'en' ? 'Choose language ' : 'Chọn ngôn ngữ'}
          />

          <CheckBox
            checked={this.state.setIndex === 'vi'}
            textStyle={{fontSize: scale(14)}}
            title={language === 'en' ? 'VietNamese' : 'Tiếng Việt'}
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={() => {
              this.setState({setIndex: 'vi'});
              saveLanguage('vi');
            }}
            size={scale(14)}
          />
          <CheckBox
            checked={'en' === this.state.setIndex}
            textStyle={{fontSize: scale(14)}}
            title={language === 'en' ? 'English' : 'Tiếng Anh'}
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={() => {
              this.setState({setIndex: 'en'});
              saveLanguage('en');
            }}
            size={scale(14)}
          />

          <Dialog.Actions>
            <Dialog.Button
              title="OK"
              titleStyle={{fontSize: scale(14)}}
              onPress={() => {
                this.onChangeLanguage();
              }}
            />
          </Dialog.Actions>
        </Dialog>
      </SafeAreaViews>
    );
  }
}

export default Settings;
