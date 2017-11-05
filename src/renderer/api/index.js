import util from '../libs/util';

let ajax = {};

/**
 * 前台用户登录
 * @param phone_no 用户手机号码(账号)
 * @param password 用户登录密码md5值
 * @return code->200成功 3001->账号或密码错误
 */
ajax.login = (obj) => {
  util.ajax.post('/Auth/companyLogin', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};

export default ajax;
