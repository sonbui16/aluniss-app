//  function chỉ để lấy token trong reducer ra thôi =)))

export const getToken = state => {
  if (!state.auth) return null;
  return state.auth.token || null;
};
