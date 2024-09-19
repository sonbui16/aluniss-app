
export const checkPhone = value => {
    const reg = /^[0-9]*$/;
    return reg.test(value) ? null : 'Định dạng số điện thoại không đúng'
}
export const checkValidPassword = value => {
  return (value.length >= 6)
    ? null
    : 'Mật khẩu phải có ít nhất 6 kí tự';
};

export const Price = value => {
  return (value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1."))
    // ? null
    // : 'Mật khẩu phải có ít nhât 8 kí tự';
};


export const checkValidMail = value => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? null :  'Định dạng email không đúng';
};
export const checkEMail = value => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? true : false;
};

export const validBlankField = (name, value) => {
  return value === '' ? `${name} không được để trống` : null;
};