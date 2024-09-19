import {
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS,
  MARK_REQUEST_FAILED,
  MARK_REQUEST_CANCELLED,
} from '../actions/types';

/**
 * REQUEST
 */
export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case MARK_REQUEST_PENDING:
      return { ...state, [meta.key]: { status: 'pending', error: null } };
    case MARK_REQUEST_SUCCESS:
      return { ...state, [meta.key]: { status: 'success', error: null } };
    case MARK_REQUEST_FAILED:
      return { ...state, [meta.key]: { status: 'failure', error: payload } };
    case MARK_REQUEST_CANCELLED:
      return { ...state, [meta.key]: { status: 'success', error: null } };
    default:
      return state;
  }
};
