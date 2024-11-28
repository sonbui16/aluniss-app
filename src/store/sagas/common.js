import {call, put, take, race} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {API_TIMEOUT} from '../../constants/api';
import {
  markRequestPending,
  markRequestSuccess,
  markRequestCancelled,
  markRequestFailed,
  invokeCallback,
  forwardTo,
} from '../actions/common';
import {Alert} from 'react-native';
export const rejectErrors = res => {
  const {status, data, ok} = res;
  if (ok) {
    return res;
  } else {
    return Promise.reject({
      message: res.data,
    });
  }
  if (!data) {
    return Promise.reject({
      message: res.problem,
    });
  }
  if (data && data.code >= 200 && data.code < 300) {
    return res;
  }
  if (data) {
    return res;
  }
  return Promise.reject({
    code: data.code,
    message: data.message,
    error: data.error,
    //subData.message !== 'There is missing customer email.' ? data.errors[0] : subData.message,
    status,
  });
};

export const respondJson = res => res.data;

export const createRequestSaga = ({
  request,
  key,
  start,
  stop,
  success,
  failure,
  cancelled,
  functionSuccess,
  functionFailure,
  timeout = API_TIMEOUT,
  cancel,
  /*uploadProgress, downloadProgress, intervalProgress=50, */ blob,
}) =>
  function* (action) {

    let args = action.args || [];

    const callback =
      typeof args[args.length - 1] === 'function'
        ? args[args.length - 1]
        : null;
    if (callback) {
      args = args.slice(0, -1);
    }
    // error first callback
    let ret = null;
    let err = null;

    const requestKey = typeof key === 'function' ? key(...args) : key;

    if (start) {
      for (const actionCreator of start) {
        yield put(actionCreator());
      }
    }
    // mark pending
    console.log('requestKey', requestKey);
    yield put(markRequestPending(requestKey));

    try {
      // this is surely Error exception, assume as a request failed
      if (!request) {
        throw new Error('Api method not found!!!');
      }
      // start invoke
      const invokeRequest = async () => {
        const chainRequest = request.apply(request, args);
        // blob support progress
        // if (blob) {
        // if(uploadProgress){
        //   chainRequest = chainRequest.uploadProgress({ interval : intervalProgress }, function* (uploaded, total){
        //       for(let actionCreator of uploadProgress){
        //         yield put(actionCreator({uploaded, total}, action))
        //       }
        //   })
        // }

        // if(downloadProgress) {
        //   chainRequest = chainRequest.progress({ interval : intervalProgress }, function* (downloaded, total){
        //       for(let actionCreator of downloadProgress){
        //         yield put(actionCreator({downloaded, total}, action))
        //       }
        //   })
        // }
        //   chainRequest = chainRequest.then(res => res.json());
        // } else {
        // chain the request
        // chainRequest = chainRequest
        //.then(rejectErrors)
        // default return empty json when no content
        // .then(respondJson);
        // }

        const response = await chainRequest;
        console.log('response_________', response);

        if (response.ok) {
          console.log('DATA', response.data);

          return response.data;
        }
        return rejectErrors(response);
      };

      // we do not wait forever for whatever request !!!
      // timeout is 0 mean default timeout, so default is 0 in case user input 0
      const raceOptions = {
        data: call(invokeRequest),
        // isTimeout: call( delay(timeout))
      };
      // đợi action cancel
      if (cancel) {
        raceOptions.cancelRet = take(cancel);
      }
      //chay race để thực hiện việc gọi request, timeout và cancel cái nào xong trước thì dừng lại
      const {data, isTimeout, cancelRet} = yield race(raceOptions);

      if (isTimeout) {
        throw new Error(`Api method is timeout after ${timeout} ms!!!`);
      } else if (cancelRet) {
        // callback on success
        if (cancelled) {
          for (const actionCreator of cancelled) {
            yield put(actionCreator(cancelRet, action));
          }
        }
        // mark cancelled request
        yield put(markRequestCancelled(cancelRet, requestKey));
      } else {
        // callback on success
        if (success) {
          for (const actionCreator of success) {
            yield put(actionCreator(data, action));
          }
        }
        if (functionSuccess) {
          for (const actionCreator of functionSuccess) {
            actionCreator(data);
          }
        }

        yield put(markRequestSuccess(requestKey));

        ret = data;
      }
    } catch (reason) {
      if (failure) {
        for (const actionCreator of failure) {
          yield put(actionCreator(reason, action));
        }
      }
      if (functionFailure) {
        for (const actionCreator of functionFailure) {
          actionCreator(reason);
        }
      }
      yield put(markRequestFailed(reason, requestKey));

      // mark error
      err = reason;
    } finally {
      if (stop) {
        for (const actionCreator of stop) {
          yield put(actionCreator(ret, action));
        }
      }
      // check if the last param0 is action, should call it as actionCreator
      // from where it is called, we can access action[type and args],
      // so we will use it with first error callback style
      if (callback) {
        yield put(invokeCallback(callback, err, ret));
      }
    }
  };
