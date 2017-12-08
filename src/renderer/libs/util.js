import axios from 'axios';
// import env from '../config/env';

let util = {};

// util.ajaxUrl = env === 'development' ? 'http://192.168.1.69:91' : env === 'production' ? 'http://wxyx.lyfz.net/api.php' : 'http://wxyx.lyfz.net/api.php';
// util.ajaxUrl = 'http://192.168.1.69:91';
util.ajaxUrl = 'http://kf.lyfz.net';

util.ajax = axios.create({
  baseURL: util.ajaxUrl,
  timeout: 30000
});

// axios请求拦截器
util.ajax.interceptors.request.use(function (config) {
  config.headers.token = JSON.parse(localStorage.getItem('userInfo')) === null ? null : JSON.parse(localStorage.getItem('userInfo')).token;
  return config;
}, function (error) {
  return error;
});

// axios响应拦截器
util.ajax.interceptors.response.use(function (response) {
  if (response.data.meta.code === 6001) {
    window.localStorage.removeItem('userInfo');
    window.location.href = 'http://' + window.location.host;
  }
  return response;
}, function (error) {
  return error;
});

export default util;

let ajax = util.ajax;
export {
  ajax
};
