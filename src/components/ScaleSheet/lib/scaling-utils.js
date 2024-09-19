import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => shortDimension / guidelineBaseWidth * size;
const vScale = size => longDimension / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, vScale, moderateScale };