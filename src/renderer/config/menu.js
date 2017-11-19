let menuData = [
  {
    menuTitle: '首页',
    iconName: 'ios-home',
    son: {
      sonTitle: '商品管理',
      sonList: [
        {
          menuTitle: '概况',
          route: 'survey',
          routeBreadcrumb: ['首页', '概况数据'],
          sonMenu: []
        }
      ]
    },
    route: 'survey',
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    menuTitle: '客服接待',
    iconName: 'chatbubbles',
    son: {
      sonTitle: '客服',
      sonList: [
        {
          menuTitle: '客服',
          route: 'ServeIndex',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          menuTitle: '添加客服人员',
          route: 'staff',
          routeBreadcrumb: [],
          sonMenu: []
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    menuTitle: '客户管理',
    iconName: 'android-contacts',
    son: {
      sonTitle: '',
      sonList: [
        {
          menuTitle: '管理',
          route: 'clientCrm',
          routeBreadcrumb: ['管理', '客户列表'],
          sonMenu: []
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    menuTitle: '跟踪提醒',
    iconName: 'android-alarm-clock',
    son: {
      sonTitle: '跟踪提醒',
      sonList: [
        {
          menuTitle: '提醒列表',
          route: 'remind',
          routeBreadcrumb: ['设置', '店铺信息'],
          sonMenu: []
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    menuTitle: '监控',
    iconName: 'ios-videocam',
    son: {
      sonTitle: '监控',
      sonList: [
        {
          menuTitle: '监控聊天',
          route: 'monitoring',
          routeBreadcrumb: [],
          sonMenu: []
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    menuTitle: '数据分析',
    iconName: 'stats-bars',
    son: {
      sonTitle: '访问分析',
      sonList: [
        {
          menuTitle: '访问分析',
          route: 'visit',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          menuTitle: '粉丝分析',
          route: 'fans',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          menuTitle: '工作量分析',
          route: 'workload',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          menuTitle: '质量分析',
          route: 'quality',
          routeBreadcrumb: [],
          sonMenu: []
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    menuTitle: '微信营销平台',
    iconName: 'chatbubbles',
    son: {
      sonTitle: '授权接入',
      sonList: [
        {
          menuTitle: '授权接入',
          route: 'Jurisdiction',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          menuTitle: '增强功能',
          route: 'enhance',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          menuTitle: '带参二维码',
          route: 'yard',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          menuTitle: '群发',
          route: 'Mass',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          menuTitle: '同步粉丝',
          route: 'wxfans',
          routeBreadcrumb: [],
          sonMenu: []
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  }
];

export default menuData;
