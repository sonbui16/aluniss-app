import {
  View,
  ScrollView,
  Dimensions,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import SafeAreaViews from 'components/SafeAreaView';
import {scale} from 'react-native-size-scaling';
import colors from 'variables/colors';
import {Card, Text, ListItem, Avatar, Icon, Button} from '@rneui/themed';
import {connect} from 'react-redux';
import {
  inforTeacher,
  trialLessons,
  searchCourseMe,
  saveReceipt,
  courseMe,
} from 'actions/app';
import HTML from 'react-native-render-html';
import {isRequestPending} from 'selectors/common';
import RNIap, {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  getProducts,
  requestPurchase,
  finishTransaction,
} from 'react-native-iap';
import YoutubePlayer from 'react-native-youtube-iframe';
import vari from 'variables/platform';
import {getIdYoutube} from 'utils/index';
import images from 'src/assets/images';
import Toolbar from 'components/Toolbar';
import _ from 'lodash';
import moment from 'moment';

@connect(
  state => ({
    auth: state.auth.user,
    loading: isRequestPending(state, 'searchCourseMe'),
    loadingCheckPurchase: false,
    loggedIn: state.auth.loggedIn,
  }),
  {
    inforTeacher,
    trialLessons,
    searchCourseMe,
    saveReceipt,
    courseMe,
  },
)
export class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataTeacher: {},
      expanded: {},
      loadingIAP: false,
      dataLesson: [],
      checkAssign: [],

      checkPurchase: false,
    };
  }
  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;
  inforTeacher = () => {
    const {inforTeacher} = this.props;
    const {item} = this.props.route.params;

    inforTeacher(item?.teacher_id, (err, data) => {
      if (err) {
      } else {
        this.setState({dataTeacher: data});
      }
    });
  };
  trialLessons = () => {
    const {trialLessons} = this.props;
    const {item} = this.props.route.params;
    trialLessons(item?._id, (err, data) => {
      if (err) {
      } else {
        this.setState({dataLesson: data});
      }
    });
  };
  checkCourseMeID = item => {
    const {searchCourseMe, auth} = this.props;
    searchCourseMe('noSearch', item?._id, auth.access_token, (err, data) => {
      if (err) {
        return;
      } else {
        this.setState({checkAssign: data?.data});
      }
    });
  };
  listCourseMe = () => {
    const {auth, courseMe} = this.props;
    const {item} = this.props.route.params;

    courseMe(1, auth.access_token, (error, res) => {
      if (error) {
        return;
      } else {
        this.setState({
          checkPurchase: res?.data.some(
            itemCourse => itemCourse._id === item._id,
          ),
        });
      }
    });
  };
  async componentDidMount() {
    const {loggedIn} = this.props;
    const {item} = this.props.route.params;
    this.inforTeacher();
    this.trialLessons();
    if (loggedIn) {
      this.checkCourseMeID(item);
      this.listCourseMe();
    }

    if (Platform.OS === 'ios') {
      initConnection().then(() => {
        const sku = item?.price_sell.toString();
        const newSku = 'aluniss' + sku.replace(/000$/, '');
        getProducts({skus: [newSku]}).then(res => {});

        this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            const {saveReceipt, auth} = this.props;

            const paramsReceipt = {
              purchase: {
                productId: purchase.productId,
                purchaseToken: '',
                transactionReceipt: receipt,
              },
              appType: 'ios',
              sandbox: true,
              ec_id: item._id,
            };
            saveReceipt(paramsReceipt, auth.access_token, (err, data) => {
              this.setState({checkPurchase: true});
              this.props.navigation.navigate('DetailLearnScreen', {
                item: item,
              });
            });

            finishTransaction({purchase});
            this.setState({loadingIAP: false});
            // .deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
            // .then(async deliveryResult => {
            //   if (isSuccess(deliveryResult)) {
            //     await finishTransaction({purchase,});
            //     await finishTransaction({purchase, );
            //   } else {
            //   }
            // });
          }
        });
        this.purchaseErrorSubscription = purchaseErrorListener(error => {
          this.setState({loadingIAP: false});
        });
      });
    }
  }
  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }
  callAttachment = item => {
    const {searchCourseMe, auth} = this.props;
    searchCourseMe('attachment', item?._id, auth.access_token, (err, data) => {
      if (err) {
        return;
      } else {
        this.props.navigation.navigate('LearnScreen');
      }
    });
  };
  purchase = async () => {
    const {item} = this.props.route.params;
    const priceSell = parseFloat(item.price_sell);
    this.setState({loadingIAP: true});
    const sku = priceSell.toString();
    const newSku = 'aluniss' + sku.replace(/000$/, '');

    try {
      await requestPurchase({
        sku: newSku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      this.setState({loadingIAP: false});
    }
  };
  showButton = item => {
    const {checkAssign, loadingIAP} = this.state;
    const checkAssign2 = checkAssign.length === 0;
    if (
      (item?.no_retail === false || item?.no_retail === undefined) &&
      item?.price_sell === 0
    ) {
      return (
        <View>
          <Button
            color="success"
            // title={checkAssign2 ? 'Call API' : 'VÀO HỌC NGAY'}
            title={'VÀO HỌC NGAY'}
            buttonStyle={{
              borderRadius: 3,
              marginTop: scale(15),
            }}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
            }}
            onPress={
              checkAssign2
                ? () => this.callAttachment(item)
                : () => {
                    this.detailLearnScreen(item);
                  }
            }
          />
        </View>
      );
    } else if (item?.no_retail === true && item?.price_sell === 0) {
      return <View>{/* <Text>Không hiển thị gì cả</Text> */}</View>;
    } else if (
      (item?.no_retail === false || item?.no_retail === undefined) &&
      item?.price_sell !== 0
    ) {
      return (
        <View>
          {Platform.OS === 'ios' && (
            <Button
              disabled={loadingIAP}
              loading={loadingIAP}
              color="error"
              title="ĐĂNG KÝ HỌC"
              buttonStyle={{
                borderRadius: 3,
              }}
              containerStyle={{
                width: '90%',
                alignSelf: 'center',
              }}
              onPress={() =>
                this.props.loggedIn
                  ? this.purchase()
                  : this.props.navigation.navigate('LoginScreen')
              }
            />
          )}
        </View>
      );
    } else {
      return (
        <View>
          <Text>Đăng ký học</Text>
        </View>
      );
    }
  };
  detailLearnScreen = item => {
    const dataCourse = {
      type_open_lesson: item.type_open_lesson,
    };
    const course = this.state.checkAssign[0];
    if (course.end) {
      const endTime = moment(course.end);
      const currentTime = moment();
      if (endTime.isBefore(currentTime)) {
        Alert.alert('Thông báo', 'Đã hết thời gian học !');
      } else {
        this.props.navigation.navigate('DetailLearnScreen', {
          dataCourse,
          item: item,
        });
      }
    } else {
      this.props.navigation.navigate('DetailLearnScreen', {
        dataCourse,
        item: item,
      });
    }
  };
  render() {
    const {expanded, dataTeacher, dataLesson, checkPurchase} = this.state;
    const {item} = this.props.route.params;
    const priceSell = parseFloat(item?.price_sell);
    const PriceNotSell = parseFloat(item?.price);
    const price_sell = new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(priceSell);

    const price = new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(PriceNotSell);

    return (
      <SafeAreaViews style={{flex: 1}}>
        <Toolbar
          title="Chi tiết khoá học"
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
        />
        <View style={{flex: 1}}>
          <ScrollView>
            {item?.video_intro ? (
              <YoutubePlayer
                height={vari.width / 1.8}
                width={vari.width}
                play={true}
                videoId={getIdYoutube(`${item?.video_intro}`)}
              />
            ) : (
              <Image
                defaultSource={images.noThumb}
                source={{uri: item?.thumbnail_url}}
                style={{height: vari.width / 1.8, width: vari.width}}
                resizeMode="contain"
              />
            )}
            {item?.price !== 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: scale(10),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: scale(18),
                      fontWeight: 'bold',
                    }}>
                    {price_sell}
                  </Text>
                </View>
              </View>
            ) : (
              <View></View>
            )}
            {this.props.loggedIn && Platform.OS === 'ios' && checkPurchase ? (
              <Button
                color="success"
                title={'VÀO HỌC NGAY'}
                buttonStyle={{
                  borderRadius: 3,
                  marginTop: scale(15),
                }}
                containerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                }}
                onPress={() => {
                  this.detailLearnScreen(item);
                }}
              />
            ) : (
              this.showButton(item)
            )}
            <Card>
              <Text
                style={{
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  color: colors.blue2,
                }}>
                Bạn sẽ học được gì
              </Text>
              <HTML
                source={{html: item?.about_instructor}}
                imagesMaxWidth={Dimensions.get('window').width}
                baseStyle={{
                  fontSize: scale(14),
                  color: 'black',
                }}
              />
            </Card>

            <Card>
              <Text
                style={{
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  color: colors.blue2,
                }}>
                Giới thiệu khoá học
              </Text>

              <HTML
                source={{html: item?.about_courses || '<p></p>'}}
                imagesMaxWidth={Dimensions.get('window').width}
                baseStyle={{
                  fontSize: scale(14),
                  color: 'black',
                }}
              />
            </Card>

            <Card>
              <Text
                style={{
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  color: colors.blue2,
                }}>
                Nội dung khoá học
              </Text>

              {dataLesson.map((item, index) => {
                return (
                  <ListItem.Accordion
                    key={index.toString()}
                    style={{backgroundColor: 'red'}}
                    content={
                      <ListItem.Content>
                        <ListItem.Title
                          style={{
                            fontSize: scale(16),
                            color: colors.blue2,
                            fontWeight: 'bold',
                          }}>
                          {item?.name}
                        </ListItem.Title>
                      </ListItem.Content>
                    }
                    isExpanded={item === expanded}
                    onPress={() => {
                      if (expanded === item) {
                        this.setState({expanded: {}});
                      } else {
                        this.setState({expanded: item});
                      }
                    }}>
                    {item &&
                      item?.child &&
                      item?.child.map((l, i) => {
                        return (
                          <ListItem key={i.toString()}>
                            <ListItem.Content>
                              <ListItem.Title
                                style={{
                                  fontSize: scale(14),
                                  color: colors.blue2,
                                }}>
                                {l.name}
                              </ListItem.Title>
                            </ListItem.Content>
                            {l.status === 1 && (
                              <Button
                                onPress={() =>
                                  Object.keys(l).includes('lesson_info') ||
                                  Object.keys(l).includes('text_content') ||
                                  Object.keys(l).includes('document_info')
                                    ? this.props.navigation.navigate(
                                        'VideoTrial',
                                        {
                                          item: l,
                                        },
                                      )
                                    : Alert.alert(
                                        'Thông báo',
                                        'Bài học chưa được cài đặt',
                                      )
                                }
                                title="Học thử"
                                titleStyle={{fontSize: scale(14)}}
                              />
                            )}
                          </ListItem>
                        );
                      })}
                  </ListItem.Accordion>
                );
              })}
            </Card>

            <Card>
              <Text
                style={{
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  color: colors.blue2,
                }}>
                Thông tin giảng viên
              </Text>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Avatar
                  size={'large'}
                  rounded
                  source={{
                    uri: dataTeacher?.photo,
                  }}
                />
                <Text
                  style={{
                    fontSize: scale(12),
                    marginVertical: scale(5),
                    color: 'black',
                  }}>
                  {item?.count_student} Học viên
                </Text>
                <Text
                  style={{
                    fontSize: scale(12),
                    color: colors.blue3,
                    color: 'black',
                  }}>
                  {dataTeacher?.general_names}
                </Text>
                <Text
                  style={{
                    fontSize: scale(16),
                    fontWeight: 'bold',
                    color: 'black',
                    marginVertical: scale(5),
                  }}>
                  {dataTeacher?.fullname}
                </Text>
              </View>

              <HTML
                source={{html: dataTeacher?.info || '<p></p>'}}
                imagesMaxWidth={Dimensions.get('window').width}
              />
            </Card>
          </ScrollView>
        </View>
      </SafeAreaViews>
    );
  }
}
export default CourseDetail;
