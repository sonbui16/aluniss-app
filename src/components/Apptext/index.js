// import React, {useEffect, useState} from 'react';
// import {View} from 'react-native';
// // import {useTranslation} from 'react-i18next';
// import {connect} from 'react-redux';
// import {useSelector} from 'react-redux';
// import '../../utils/i18n';
// import {scale} from 'react-native-size-scaling';
// import {Text} from '@rneui/themed';
// const Apptext = props => {
//   const {t, i18n} = useTranslation();
//   const {style, i18nKey} = props;

//   const language = useSelector(state => state.app);

//   const [appLanguage, setAppLanguage] = useState('vi');

//   useEffect(() => {
//     changeLanguage(language.language);
//   }, [language.language]);

//   const changeLanguage = value => {
//     i18n
//       .changeLanguage(value)
//       .then(() => setAppLanguage(value))
//       .catch(err => console.log(err));
//   };
//   return (
//     <Text
//       style={[
//         {
//           color: 'black',
//           // fontFamily: 'Times New Roman',
//           fontFamily: 'Helvetica',
//           fontSize: scale(14),
//         },
//         style,
//       ]}>
//       {t(i18nKey)}
//     </Text>
//   );
// };
// export default React.memo(Apptext);
import {View, Text} from 'react-native';
import React from 'react';

const index = props => {
  const {style, i18nKey} = props;
  return (
    <View>
      <Text style={style}>{i18nKey}</Text>
    </View>
  );
};

export default index;
