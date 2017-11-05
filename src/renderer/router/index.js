import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      meta: {
        title: '登录'
      },
      component: require('@/views/login').default
    },
    {
      path: '/panel',
      name: 'panel',
      meta: {
        title: '面板'
      },
      component: (resolve) => require(['@/views/panel'], resolve),
      children: [
        {
          path: 'survey',
          name: 'survey',
          meta: {
            title: '概况'
          },
          component: (resolve) => require(['@/views/survey/index'], resolve)
        }
      ]
    }
  ]
});
