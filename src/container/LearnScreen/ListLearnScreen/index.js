import React, {Component} from 'react';
import {FlatList, View, Text, RefreshControl , ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import {courseMe} from 'actions/app';
import {isRequestPending} from 'selectors/common';
import DiscussItem from '../DiscussItem';
import {scale} from 'components/ScaleSheet';
import vari from 'variables/platform';
import colors from '../../../../theme/variables/colors';

@connect(
  state => ({
    auth: state.auth.user,
    loading: isRequestPending(state, 'courseMe'),
  }),
  {
    courseMe,
  },
)
export class ListLearnScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
    };
  }
  componentDidMount() {
    const {navigation, listLesson, auth, usersMe, dataUser} = this.props;
    // this.unsubscribe = navigation.addListener('focus', () => {
    //   this.showList();
    // });

    this.showList();

  }

  renderEmptyContainer = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          height: vari.height / 1.5,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: scale(14),
            textAlign: 'center',
            color: colors.blue2,
          }}>
          Bạn chưa có khoá học nào
        </Text>
      </View>
    );
  };
  showList = () => {
    const {auth, courseMe} = this.props;

    courseMe(1, auth.access_token, (error, res) => {
      if (error) {
        return;
      } else {
        this.setState({data: res?.data});
      }
    });
  };
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  renderItem = ({item, index}) => {
    return (
      <View>
        <DiscussItem
          key={index}
          data={item}
          listData={this.state.data}
          navigation={this.props.navigation}
        />
      </View>
    );
  };
  onRefresh = () => {
    this.showList();
  };
  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1}}>

{this.props.loading ? 
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={colors.blue2} size="small" />
          </View>:
        <FlatList
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.props.loading}
          //     onRefresh={() => this.onRefresh()}
          //   />
          // }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmptyContainer()}></FlatList>
}
      </View>
    );
  }
}
export default ListLearnScreen;
