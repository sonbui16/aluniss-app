import {
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS,
  MARK_REQUEST_CANCELLED,
  MARK_REQUEST_FAILED,
  INVOKE_CALLBACK,

} from './types';

/**
 * REQUEST
 */
export const markRequestPending = key => ({
  type: MARK_REQUEST_PENDING,
  meta: { key }
});

export const markRequestSuccess = key => ({
  type: MARK_REQUEST_SUCCESS,
  meta: { key }
});

export const markRequestCancelled = ({ type, reason }, key) => ({
  type: MARK_REQUEST_CANCELLED,
  payload: `${type}: ${reason || 'called'}`,
  meta: { key }
});

export const markRequestFailed = (reason, key) => ({
  type: MARK_REQUEST_FAILED,
  payload: reason,
  meta: { key }
});
export const invokeCallback = (callback, ...args) => ({
  type: INVOKE_CALLBACK,
  payload: callback && callback.call(null, ...args)
});