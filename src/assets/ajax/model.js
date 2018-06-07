import {toastTip, changeUrlPath} from '../js/util'
// import Loading from '../../components/loading/loading.js'

export function axiosPost(url, params, callback, config) {
  config = config || {};

  url = changeUrlPath(url)
  indexVue.$http.post(url, params, config).then(function (rep) {
    rep = rep || {};
    if (rep.meta && rep.meta.code === '0') {
      // Loading.close();
      //回调
      callback(rep.data)
    } else if (rep.meta && rep.meta.message) {
      // Loading.close();
      toastTip('error', rep.meta.message)
    }
  }).catch(function (err) {
    // Loading.close();
    // toastTip('error', JSON.stringify(err))
  })
}
