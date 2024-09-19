import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {Component} from 'react';
import Toolbar from 'src/components/Toolbar';
import images from 'src/assets/images';
import SafeAreaViews from 'src/components/SafeAreaView';
import colors from 'variables/colors';
import {scale} from 'react-native-size-scaling';
import vari from 'variables/platform';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {courses, searchcourse} from 'store/actions/app';
import HTML from 'react-native-render-html';
const numColumns = 2;

@connect(state => ({}), {
  courses,
  searchcourse,
})
export class NextScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCourse: [],
      visible: false,
    };
  }
  componentDidMount() {
    this.getListCourses();
  }

  getListCourses = () => {
 
    const {item} = this.props.route.params;
    const {searchcourse} = this.props;
    searchcourse('searchCategory', item?._id, (err, data) => {
      if (err) {
        return;
      } else {
        this.setState({dataCourse: data?.data});
      }
    });
  };

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

              {priceSell !== PriceNotSell && (
                <Text
                  style={{
                    color: '#C2C6C9',
                    textDecorationLine: 'line-through',
                    fontSize: scale(12),
                    marginLeft: 5,
                  }}>
                  {price}
                </Text>
              )}
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

  formatData = (data, numColumns) => {
    // truyền vào mảng data và số cột
    //Math.floor chia làm tròn
    const numberOfFullRows = Math.floor(data?.length / numColumns);
    let numberOfElement = data?.length - numberOfFullRows * numColumns;
    while (numberOfElement !== numColumns && numberOfElement !== 0) {
      data.push({Price: '', Price_app: '', empty: true});
      numberOfElement = numberOfElement + 1;
    }
    return data;
  };
  renderItem = ({item, index}) => {
    // const salePrice = 100 - (item.Price_app / item.Price) * 100;

    if (item.empty === true) {
      return (
        <View
          style={{
            height: vari.width / 1.7,
            flex: 1,
            margin: scale(10),
          }}
        />
      );
    }

    return (
      <TouchableOpacity
        key={index.toString()}
        onPress={() =>
          this.props.navigation.navigate('CourseDetail', {item: item})
        }
        style={{
          borderWidth: 1,
          borderColor: '#C2C6C9',
          overflow: 'hidden',
          height: vari.width / 2.0,
          backgroundColor: 'white',
          borderRadius: scale(5),
          justifyContent: 'space-between',
          paddingBottom: scale(7),
          shadowColor: '#282828',
          shadowRadius: 10,
          shadowOpacity: 0.8,
          elevation: 4,
          shadowOffset: {width: 0, height: 1},
          flex: 1,
          margin: scale(10),
        }}>
        <ImageBackground
          resizeMode="stretch"
          defaultSource={images.noThumb}
          source={{
            uri: item.thumbnail_url,
          }}
          style={{
            alignItems: 'flex-end',
            width: '100%',
            height: vari.width / 3.5,
          }}></ImageBackground>
        <HTML
          // html={`<p>${item.name}</p>`}
          source={{html: item?.name || '<p></p>'}}
          containerStyle={{paddingHorizontal: scale(5)}}
          allowedStyles={[]}
          baseStyle={{
            fontSize: scale(14),
            color: colors.blue2,
            fontWeight: 'bold',
            marginTop: scale(8),
            marginHorizontal: scale(5),
          }}
          defaultTextProps={{numberOfLines: 2}}
        />
        {this.showButton(item)}
      </TouchableOpacity>
    );
  };

  render() {
    const {dataCourse, visible} = this.state;
    const {item} = this.props.route.params;
    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar
          title={item?.name}
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
        />
        {dataCourse?.length > 0 ? (
          <FlatList
            refreshing={visible}
            onRefresh={() => {
              this.getListCourses();
            }}
            contentContainerStyle={{flexGrow: 1}}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
            data={dataCourse ? this.formatData(dataCourse, numColumns) : []}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={colors.blue3} />
          </View>
        )}
      </SafeAreaViews>
    );
  }
}

export default NextScreen;
