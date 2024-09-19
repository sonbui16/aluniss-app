<SearchBar
  // showLoading={this.props.loadingSearch}
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
  clearIcon={
    <Icon
      color={'black'}
      name={'close'}
      size={scale(20)}
      type="material-community"
      onPress={() => {
        this.setState({
          value: '',
          searchDataContent: null,
          searchDatatitle: null,
          searchDescription: null,
        });
      }}
    />
  }
  searchIcon={
    <Icon
      color={'black'}
      name={'magnify'}
      size={scale(25)}
      type="material-community"
      onPress={() => {
        this.handleClickSearch();
      }}
    />
  }
  inputStyle={{color: 'black', fontSize: scale(14)}}
  leftIconContainerStyle={{}}
  rightIconContainerStyle={{}}
  loadingProps={{}}
  onChangeText={newVal => {
    this.setState({value: newVal});
  }}
  showCancel={true}
  onClearText={() => alert('Clear successfully')}
  placeholder="Tìm kiếm"
  placeholderTextColor="#888"
  cancelButtonTitle="Huỷ"
  cancelButtonProps={{
    color: colors.blue3,
    buttonTextStyle: {
      fontSize: scale(14),
    },
  }}
  onCancel={() => {
    this.setState({
      searchDatatitle: null,
      searchDataContent: null,
      searchDescription: null,
      value: '',
    });
  }}
  value={value}
  onSubmitEditing={() => {
    this.handleClickSearch();
  }}
/>;
