import React, {Component} from 'react';

import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  courses,
  saveSourceList,
  categories,
  searchcourse,
} from 'store/actions/app';
import {scale} from 'react-native-size-scaling';
import {Surface} from 'react-native-paper';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import colors from 'variables/colors';
import vari from 'variables/platform';
import images from 'imagesApp';
const width = Dimensions.get('window').width / 375;
const height = Dimensions.get('window').height / 812;
@connect(state => ({}), {
  searchcourse,
})
class CoursesPending extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  showButton = item => {
    if (
      (item.no_retail === false || item.no_retail === undefined) &&
      item.price_sell === 0
    ) {
      return (
        <View>
          <Text
            style={{
              marginHorizontal: scale(5),
              fontSize: scale(14),
              color: 'green',
            }}>
            Miễn phí
          </Text>
        </View>
      );
    } else if (item.no_retail === true && item.price_sell === 0) {
      return <View></View>;
    } else if (
      (item.no_retail === false || item.no_retail === undefined) &&
      item.price_sell !== 0
    ) {
      const priceSell = parseFloat(item.price_sell);
      const PriceNotSell = parseFloat(item.price);

      const price_sell = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
      }).format(priceSell);
      const price = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(PriceNotSell);

      return (
        <View>
          {priceSell ? (
            <View
              style={{
                marginHorizontal: scale(5),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  lineHeight: scale(30),
                  fontWeight: 'bold',
                  fontSize: scale(12),
                  color: colors.blue2,
                }}>
                {price_sell}
              </Text>

              {/* {priceSell !== PriceNotSell && (
                <Text
                  style={{
                    color: '#C2C6C9',
                    textDecorationLine: 'line-through',
                    fontSize: scale(12),
                    marginLeft: 5,
                  }}>
                  {price}
                </Text>
              )} */}
            </View>
          ) : (
            <View
              style={{
                margin: scale(5),
              }}>
              <Text
                style={{
                  color: 'green',
                  fontSize: scale(14),
                }}>
                Miễn phí
              </Text>
            </View>
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
  renderItem = ({item, index}) => {
    // const {item} = this.props;
    console.log("item1233" , item  );
    
    return (
      <Surface
        // key={index.toString()}
        style={{
          marginBottom: height * 12,
          marginRight: width * 12,
          borderRadius: 7,
          borderColor: colors.grey1,
        }}
        elevation={2}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('CourseDetail', {item: item})
          }
          activeOpacity={0.8}
          style={{
            borderRadius: 7,
            width: vari.width / 2.5,
            height: vari.width / 1.9,
            backgroundColor: 'white',
            justifyContent: 'space-between',
            paddingBottom: scale(7),
          }}>
          <ImageBackground
            resizeMode="stretch"
            defaultSource={images.noThumb}
            source={
              item?.thumbnail_url ? {uri: item?.thumbnail_url} : images.noThumb
            }
            style={{
              width: '100%',
              alignItems: 'flex-end',
              height: vari.width / 3.6,
            }}></ImageBackground>

          <View
            style={{
              marginHorizontal: scale(5),
            }}>
            <HTML
              source={{html: item.name}}
              containerStyle={{paddingHorizontal: scale(5)}}
              allowedStyles={[]}
              baseStyle={{
                fontSize: scale(14),
                color: colors.blue2,
                fontWeight: 'bold',
              }}
              defaultTextProps={{numberOfLines: 2}}
            />
            <Text />

            {this.showButton(item)}
          </View>
        </TouchableOpacity>
      </Surface>
    );
  };
  componentDidMount() {}
  render() {
    const {onPress, item} = this.props;
    const {data} = this.props;

    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scale(15),
            paddingVertical: scale(5),
          }}>
          <Text
            style={{
              color: '#38393D',
              fontWeight: '700',
              fontSize: scale(16),
            }}>
            Danh sách khoá học
          </Text>
        </View>
        <FlatList
          style={{marginHorizontal: scale(5)}}
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default CoursesPending;
