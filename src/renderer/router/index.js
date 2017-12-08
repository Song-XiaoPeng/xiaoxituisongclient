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
        },
        {
          path: 'CustomerService',
          name: 'ServeIndex',
          meta: {
            title: '概况'
          },
          component: (resolve) => require(['@/views/CustomerService/index'], resolve)
        },
        {
          path: 'clientCrm',
          name: 'clue',
          meta: {
            title: '线索'
          },
          component: (resolve) => require(['@/views/clientCrm/clue'], resolve)
        },
        {
          path: 'intention',
          name: 'intention',
          meta: {
            title: '意向客户'
          },
          component: (resolve) => require(['@/views/clientCrm/intention'], resolve)
        },
        {
          path: 'indent',
          name: 'indent',
          meta: {
            title: '订单客户'
          },
          component: (resolve) => require(['@/views/clientCrm/indent'], resolve)
        },
        {
          path: 'chase',
          name: 'chase',
          meta: {
            title: '追销客户'
          },
          component: (resolve) => require(['@/views/clientCrm/chase'], resolve)
        },
        {
          path: 'remind',
          name: 'remind',
          meta: {
            title: '客户管理'
          },
          component: (resolve) => require(['@/views/remind/index'], resolve)
        },
        {
          path: 'monitoring',
          name: 'monitoring',
          meta: {
            title: ''
          },
          component: (resolve) => require(['@/views/monitoring/index'], resolve)
        },
        {
          path: 'analyze',
          name: 'visit',
          meta: {
            title: ''
          },
          component: (resolve) => require(['@/views/analyze/visit'], resolve)
        },
        {
          path: 'fans',
          name: 'fans',
          meta: {
            title: ''
          },
          component: (resolve) => require(['@/views/analyze/fans'], resolve)
        },
        {
          path: 'workload',
          name: 'workload',
          meta: {
            title: '工作量'
          },
          component: (resolve) => require(['@/views/analyze/workload'], resolve)
        },
        {
          path: 'quality',
          name: 'quality',
          meta: {
            title: '质量分析'
          },
          component: (resolve) => require(['@/views/analyze/quality'], resolve)
        },
        {
          path: 'Jurisdiction',
          name: 'Jurisdiction',
          meta: {
            title: '授权接入'
          },
          component: (resolve) => require(['@/views/weixin/Jurisdiction'], resolve)
        },
        {
          path: 'enhance',
          name: 'enhance',
          meta: {
            title: '增强功能'
          },
          component: (resolve) => require(['@/views/weixin/enhance'], resolve)
        },
        {
          path: 'addMenu',
          name: 'addMenu',
          meta: {
            title: '添加默认菜单'
          },
          component: (resolve) => require(['@/views/weixin/addMenu'], resolve)
        },
        {
          path: 'revertEdit',
          name: 'revertEdit',
          meta: {
            title: '添加回复'
          },
          component: (resolve) => require(['@/views/weixin/enhance/revertEdit'], resolve)
        },
        {
          path: 'addMaterial',
          name: 'addMaterial',
          meta: {
            title: '添加素材'
          },
          component: (resolve) => require(['@/views/weixin/enhance/revertEdit'], resolve)
        },
        {
          path: 'yard',
          name: 'yard',
          meta: {
            title: '带参二维码'
          },
          component: (resolve) => require(['@/views/weixin/yard'], resolve)
        },
        {
          path: 'Mass',
          name: 'Mass',
          meta: {
            title: '群发'
          },
          component: (resolve) => require(['@/views/weixin/Mass'], resolve)
        },
        {
          path: 'addMass',
          name: 'addMass',
          meta: {
            title: '添加发送条目'
          },
          component: (resolve) => require(['@/views/weixin/addMass'], resolve)
        },
        {
          path: 'staff',
          name: 'staff',
          meta: {
            title: '添加客服'
          },
          component: (resolve) => require(['@/views/CustomerService/staff'], resolve)
        },
        {
          path: 'winEdit',
          name: 'winEdit',
          meta: {
            title: '编辑器'
          },
          component: (resolve) => require(['@/views/weixin/enhance/winEdit'], resolve)
        },
        {
          path: 'wxfans',
          name: 'wxfans',
          meta: {
            title: '同步粉丝'
          },
          component: (resolve) => require(['@/views/weixin/fans'], resolve)
        },
        {
          path: 'serviceList',
          name: 'serviceList',
          meta: {
            title: '同步粉丝'
          },
          component: (resolve) => require(['@/views/CustomerService/serviceList'], resolve)
        }
      ]
    }
  ]
});
