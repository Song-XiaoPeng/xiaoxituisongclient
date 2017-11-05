import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './less/index.less';
import Util from './libs/util';
import api from './api';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(iView);

Vue.prototype.ajax = api;

Vue.prototype.ajaxUrl = Util.ajaxUrl;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
