import {FlatList, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {Component} from 'react';
import Toolbar from 'src/components/Toolbar';
import images from 'src/assets/images';
import {SearchBar, Icon} from '@rneui/themed';
import {scale} from 'src/utils/scale';
import {connect} from 'react-redux';
import colors from 'variables/colors';
import {searchcourse} from 'src/store/actions';
import {ActivityIndicator} from 'react-native';
import {isRequestPending} from 'src/store/selectors/common';
import vari from 'variables/platform';
import HTML from 'react-native-render-html';
// import Apptext from 'src/components/Apptext';
import SafeAreaViews from '../../components/SafeAreaView';

const numColumns = 2;
@connect(
  state => ({
    language: state.app.language,
    idSite: state.app.listItem,
    loading: isRequestPending(state, 'searchcourse'),
  }),
  {
    searchcourse,
  },
)
export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dataList: [],
    };
  }
  
  handleClickSearch = () => {
    const {searchcourse, idSite} = this.props;
    const {value, dataList} = this.state;
    searchcourse('searchTitle', value, idSite, (err, data) => {
      if (err) {
      } else {
        // const courseMore = data?.data.filter(item => {
        //   return item.status === 1;
        // });
        const sliceArry = data?.data.slice(0,5)
        const courseMore = sliceArry.filter(item => {
          return item.price_sell === 129000;
        });
        this.setState({dataList: courseMore});
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
                  color: colors.blue3,
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
                  color: 'black',
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
        style={{
          borderWidth: 1,
          borderColor: '#C2C6C9',
          height: vari.width / 2.0,
          backgroundColor: 'white',
          borderRadius: scale(5),
          justifyContent: 'space-between',
          paddingBottom: scale(7),
          flex: 1,
          margin: scale(10),
        }}
        onPress={() =>
          this.props.navigation.navigate('CourseDetail', {item: item})
        }>
        <Image
          resizeMode="contain"
          source={
            item.thumbnail_url
              ? {
                  uri: item.thumbnail_url,
                }
              : images.noThumb
          }
          defaultSource={images.noThumb}
          style={{
            width: '100%',
            height: vari.width / 3.5,
          }}
        />
        <HTML
          source={{html: `<p>${item.name}</p>`}}
          containerStyle={{paddingHorizontal: scale(5)}}
          allowedStyles={[]}
          baseStyle={{
            fontSize: scale(14),
            color: 'black',
            width: '100%',
          }}
          defaultTextProps={{
            numberOfLines: 2,
          }}
         
        />
       
        {this.showButton(item)}
      </TouchableOpacity>
    );
  };
  formatData = (data, numColumns) => {
    //Math.floor chia làm tròn
    const numberOfFullRows = Math.floor(data?.length / numColumns);
    let numberOfElement = data.length - numberOfFullRows * numColumns;
    while (numberOfElement !== numColumns && numberOfElement !== 0) {
      data.push({Price: '', Price_app: '', empty: true});
      numberOfElement = numberOfElement + 1;
    }
    return data;
  };
  renderEmptyContainer = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{fontSize: scale(14), textAlign: 'center', color: 'black'}}>
          Không có khoá học nào phù hợp
        </Text>
      </View>
    );
  };
  render() {
    const {value, dataList} = this.state;
    const {loading, language} = this.props;
    return (
      <SafeAreaViews style={{backgroundColor: 'white'}}>
        <Toolbar title="Tìm kiếm" />
        <SearchBar
          placeholder={
            language === 'en' ? 'Type to search...' : 'Nhập để tìm kiếm...'
          }
          platform="ios"
          containerStyle={{
            backgroundColor: 'white',
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 0.5,
            borderBottomWidth: 0.5,
            borderRadius: scale(5),
            height: scale(30),
          }}
          returnKeyType="done"
          clearIcon={
            <Icon
              color={'black'}
              name={'close'}
              size={scale(20)}
              type="material-community"
              onPress={() => {
                this.setState({
                  value: '',
                });
              }}
            />
          }
          searchIcon={
            <Icon
              color={'gray'}
              name={'magnify'}
              size={scale(25)}
              type="material-community"
              onPress={() => {
                this.handleClickSearch();
              }}
            />
          }
          showCancel={true}
          onClearText={() => alert('Clear successfully')}
          placeholderTextColor="#888"
          cancelButtonTitle={language === 'en' ? 'Cancel' : 'Hủy'}
          onCancel={() => {
            this.setState({
              value: '',
            }),
              this.handleClickSearch();
          }}
          cancelButtonProps={{
            color: colors.blue3,
            buttonTextStyle: {
              fontSize: scale(14),
            },
          }}
          inputStyle={{color: 'black', fontSize: scale(14)}}
          loadingProps={{}}
          value={value}
          onChangeText={e => {
            this.setState({value: e});
          }}
          onSubmitEditing={() => {
            this.handleClickSearch();
          }}
        />

        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          // extraData={this.state}
          data={dataList ? this.formatData(dataList, numColumns) : []}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          numColumns={numColumns}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmptyContainer()}
          keyExtractor={(item, index) => index.toString()}></FlatList>

     
      </SafeAreaViews>
    );
  }
}
export default Search;