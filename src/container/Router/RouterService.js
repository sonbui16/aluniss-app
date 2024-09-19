import * as React from 'react';
import { CommonActions, StackActions } from '@react-navigation/native';

const refRouter = React.createRef()

const navigate = (routeName, params) => {
  // refRouter.current?.navigate(routeName,params);
  refRouter.current?.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params
    })
  )
};
const reset = (routeName, params) => {
  refRouter.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params: params }],
    }),
  );
};
const goBack = () => {
  refRouter.current?.dispatch(CommonActions.goBack());
}
const push = (name, params) => {
  refRouter.current?.dispatch(
    StackActions.push(name, params)
  )
}
export default {
  refRouter,
  navigate,
  reset,
  goBack,
  push,
}