/**
 * Created by 144434 on 2017/6/15.
 */
import axios from 'axios'
import {confirm ,closeWindow} from '../js/util'

var axiosInstance = axios.create();

//静态请求数据
axiosInstance.defaults.baseURL = configM.comUrl;
axiosInstance.defaults.timeout = 30000;
axiosInstance.defaults.headers.post['content-type'] = 'application/json;charset=utf-8';
axiosInstance.defaults.headers.get['content-type'] = 'application/json;charset=utf-8';

axiosInstance.requestData=function (config) {return config;};//请求拦截数据处理
axiosInstance.responseData=function (response) {return response;};//请求返回拦截数据处理
axiosInstance.error=function (error) { return error;};//错误处理

/**
 * 请求拦截器
 */
  axiosInstance.interceptors.request.use(function (config) {
    //静态请求数据统一处理（ 如存放sessionId ）
    if(!config.noSessionId){
      config.headers.sessionId = sessionStorage.getItem("sessionId");
    }
    config = axiosInstance.requestData(config);
    return config;
  });

/**
 * 请求返回拦截器
 */
  axiosInstance.interceptors.response.use(function (response) {
    // 用户登录失效，返回登陆页
     if (response.data.code === 999) {
      let  markUrl = window.location.href
      document.getElementById('ipts-login').setAttribute('value',markUrl)
      document.getElementById('loginForm').submit()
      return ;
    }

    response = axiosInstance.responseData(response);

    //会话过期  当前会话已过期，请重新访问。
    if(response.data && response.data.meta && response.data.meta.code == '200002'){
      confirm({
        title: '会话已过期',
        titleStatus: 1,
        message: '当前会话已过期，请重新访问。',
        btnOk: '确定',
        btnEsc:'',
        btnOkFun: function () {
          closeWindow();
        }
      });
      return ;
    }
    return response.data;
  }, function (error) {
    //error.message  报错：Request failed with status code 404      请求超时：timeout of 1ms exceeded
    error = axiosInstance.error(error);
    return Promise.reject(error.message);
  });
export default axiosInstance;

