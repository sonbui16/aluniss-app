export const getRequest = (state, key) => state.requests[key] || {};
export const getRequests = state => state.requests;
export const isRequestPending = (state, key) => {
  if (state.requests[key]) {
    return state.requests[key].status === 'pending' ? true : false;
  }
  return false;
}
export const areRequestsPending = ({ requests }) =>
  Object.keys(requests).some(key => {
    const blackList = [
      // 'requestLikes',
      // 'requestUnlike',
    ];
    if (blackList.indexOf(key) !== -1) {
      return false;
    }
    if (requests[key].status === 'pending') {
      return true;
    }
    return false;
  });
