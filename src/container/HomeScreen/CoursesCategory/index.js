import {
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  Platform,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
import {isRequestPending} from 'src/store/selectors';
import {
  courses,
  saveSourceList,
  categories,
  searchcourse,
} from 'store/actions/app';
import SafeAreaViews from 'components/SafeAreaView';
import CoursesPending from '../CoursesPending';
// import CourseStudied from './CourseStudied';
import {connect} from 'react-redux';
import BtnLogin from 'components/BtnLogin';
import colors from 'variables/colors';
import images from 'src/assets/images';
import {scale} from 'react-native-size-scaling';
import vari from 'variables/platform';
// import CourseStudied from './CourseStudied';
// import MyCourse from './MyCourse';
import {site_id} from 'store/api/common';
import axios from 'axios';
@connect(
  state => ({
    loggedIn: state.auth.loggedIn,
  }),
  {
    courses,
    categories,
    searchcourse,
  },
)
class CoursesCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datalistmyCourse: [],
      datalistCourse: [],
      dataVBPL: [],
      dataBlogs: [],
      dataCategories: [],
      dataCa: [],
    };
  }
  componentDidMount() {
    const {item} = this.props;
    axios
      .get(
        `https://api.edubit.vn/v1/courses?page=1&limit=40&site_id=${site_id}&category_id=${item._id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'vi',
          },
        },
      )
      .then(response => {
        this.setState({dataCa: response?.data.data});
      })
      .catch(error => {
        console.error('Error calling the API:', error);
      });
  }
  renderItem = ({item, index}) => {
    return (
      <CoursesPending
        item={item}
        // item={this.props.item?._id}
        // data={datalistCourse}
        navigation={this.props.navigation}
      />
    );
  };
  render() {
    const {datalistCourse, dataCategories, dataCa} = this.state;
    const {item} = this.props;
    return (
      <SafeAreaViews>
        <Text style={{fontSize: scale(14), padding: scale(10)}}>
          {item.name}
        </Text>
        <FlatList
          data={dataCa}
          renderItem={this.renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}></FlatList>
      </SafeAreaViews>
    );
  }
}
export default CoursesCategory;
