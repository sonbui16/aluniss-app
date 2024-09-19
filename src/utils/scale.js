import { Dimensions } from 'react-native';

const { width ,height } = Dimensions.get('window');
const [ shortDimensions , longDimensions] = [width , height] ;

const guidelineBaseWidth = 414 ;
const guidelineBaseHeight = 896;
const scale = size => shortDimensions /guidelineBaseWidth * size ;
const verticalScale = size => longDimensions /guidelineBaseHeight * size ;

export { scale , verticalScale }