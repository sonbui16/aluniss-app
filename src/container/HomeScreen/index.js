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
import CoursesPending from './CoursesPending';
// import CourseStudied from './CourseStudied';
import {connect} from 'react-redux';
import BtnLogin from 'components/BtnLogin';

import colors from 'variables/colors';
import images from 'src/assets/images';
import {scale} from 'react-native-size-scaling';
import vari from 'variables/platform';
import CourseStudied from './CourseStudied';
import MyCourse from './MyCourse';
import CoursesCategory from './CoursesCategory';
import {site_id} from 'store/api/common';
import axios from 'axios';
import {Button} from '@rneui/themed';
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
class HomeScreen extends React.Component {
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
  idCategory = categoryId => {
    var _id;
    categoryId.map(item => {
      _id = item?._id;
    });
    return _id;
  };
  componentDidMount() {
    const {courses, categories, searchcourse} = this.props;
    categories(site_id, async (err, data) => {
      if (err) {
      } else {
        this.setState({dataCategories: data?.data});
        // axios
        //   .get(
        //     `https://api.edubit.vn/v1/courses?page=1&limit=40&site_id=${site_id}&category_id=${categoryId._id}`,
        //     {
        //       headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Accept-Language': 'vi',
        //       },
        //     },
        //   )
        //   .then(response => {
        //     this.setState({dataCa: response?.data.data});
        //   })
        //   .catch(error => {
        //     console.error('Error calling the API:', error);
        //   });
      }
    });
    courses('courses', (err, data) => {
      if (err) {
        return;
      } else {
        const sliceArr = data?.data.slice(0, 5);
        this.setState({datalistCourse: sliceArr});
      }
    });
  }

  render() {
    const {datalistCourse, dataCategories} = this.state;
    return (
      <SafeAreaViews style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(20),
          }}>
          <Image
            resizeMode="contain"
            source={images.logo}
            style={{
              width: vari.width / 3.5,
              height: vari.width / 3.5,
            }}
          />
        </View>

        <ScrollView>
          {dataCategories.map((item, index) => {
            return (
              <CoursesCategory item={item} navigation={this.props.navigation} />
            );
          })}

          {/* <CoursesPending
            onPress={() => {
              this.props.navigation.navigate('NextScreen', {
                datalistCourse: datalistCourse,
              });
            }}
            data={datalistCourse}
            navigation={this.props.navigation}
          /> */}
        </ScrollView>
        {/* <FlatList
          showsHorizontalScrollIndicator={false}
          data={dataCategories}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Button
                onPress={() => {
                  this.props.navigation.navigate('NextScreen', {item: item});
                }}
                title={item?.name}
                titleStyle={{color: 'black'}}
                buttonStyle={{borderColor: 'grey'}}
                type="outline"
                containerStyle={{
                  margin: 10,
                }}
              />
            );
          }}
        /> */}

        {!this.props.loggedIn && (
          <BtnLogin navigation={this.props.navigation} />
        )}
      </SafeAreaViews>
    );
  }
}
export default HomeScreen;
