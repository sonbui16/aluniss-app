import {Text, View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {scale} from 'react-native-size-scaling';
import Modal from 'react-native-modal';
import vari from 'variables/platform';
import HTMLView from 'react-native-render-html';
import {Icon} from '@rneui/themed';
export class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }
  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity key={index} style={{}} onPress={() => this.onVisible()}>
        <View
          style={{
            padding: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            color={'black'}
            name={'information-outline'}
            type="material-community"
          />
          <Text
            style={{
              fontSize: scale(14),
              fontWeight: '600',
              marginLeft: scale(10),
              color: 'black',
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  onVisible = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  render() {
    const data = [{name: 'Giới thiệu khoá học'}];
    const {item} = this.props;
    return (
      <View style={{flex: 1 , backgroundColor :'white'}}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={this.renderItem}
        />

        <Modal
          testID={'modal'}
          isVisible={this.state.isVisible}
          // onSwipeComplete={this.close}
          // swipeDirection={['up', 'left', 'right', 'down']}
          onBackdropPress={() => this.onVisible()}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}>
          <View style={{height: vari.height / 1.1, backgroundColor: 'white'}}>
            <View
              style={{
                padding: scale(10),
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                flexDirection: 'row',
              }}>
              <View />
              <Text
                style={{
                  fontSize: scale(16),
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Giới thiệu khoá học
              </Text>

              <Icon
                color={'black'}
                name={'close'}
                size={scale(20)}
                type="material-community"
                onPress={() => this.onVisible()}
              />
            </View>
            <ScrollView>
              <HTMLView
                // html={`<p>${item.about_instructor}</p>`}
                source={{html: `<p>${item.about_instructor}</p>`}}
                defaultTextProps={{}}
                baseStyle={{
                  width: '100%',
                  color: 'grey',
                  fontSize: scale(14),
                }}
              />
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Document;
