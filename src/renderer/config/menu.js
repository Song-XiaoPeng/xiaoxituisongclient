let menuData = [
  {
    model_id: -1,
    menuTitle: '系统首页',
    iconName: 'ios-home',
    son: {
      sonTitle: '概况数据',
      sonList: [
        // {
        // model_id: -1,
        // menuTitle: '概况数据',
        // route: 'survey',
        // routeBreadcrumb: ['系统首页', '概况数据'],
        // sonMenu: []
        // }
      ]
    },
    route: 'survey',
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    model_id: 1,
    menuTitle: '客服接待',
    iconName: 'chatbubbles',
    son: {
      sonTitle: '客服接待',
      sonList: [
        {
          model_id: 1,
          menuTitle: '接待沟通',
          route: 'ServeIndex',
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
    model_id: 2,
    menuTitle: '客户管理',
    iconName: 'android-contacts',
    son: {
      sonTitle: '客户管理',
      sonList: [
        {
          model_id: 15,
          menuTitle: '线索',
          route: 'clue',
          routeBreadcrumb: ['客户管理', '线索'],
          sonMenu: []
        },
        {
          model_id: 16,
          menuTitle: '意向客户',
          route: 'intention',
          routeBreadcrumb: ['管理', '意向客户'],
          sonMenu: []
        },
        {
          model_id: 17,
          menuTitle: '订单客户',
          route: 'indent',
          routeBreadcrumb: ['管理', '订单客户'],
          sonMenu: []
        },
        {
          model_id: 19,
          menuTitle: '追销客户',
          route: 'chase',
          routeBreadcrumb: ['管理', '追销客户'],
          sonMenu: []
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  },
  // {
  //   model_id: 3,
  //   menuTitle: '跟踪提醒',
  //   iconName: 'android-alarm-clock',
  //   son: {
  //     sonTitle: '跟踪提醒',
  //     sonList: [
  //       {
  //         model_id: 22,
  //         menuTitle: '提醒列表',
  //         route: 'remind',
  //         routeBreadcrumb: ['设置', '店铺信息'],
  //         sonMenu: []
  //       }
  //     ]
  //   },
  //   route: [],
  //   routeBreadcrumb: [],
  //   sonMenu: []
  // },
  // {
  //   model_id: 4,
  //   menuTitle: '沟通监控',
  //   iconName: 'ios-videocam',
  //   son: {
  //     sonTitle: '沟通监控',
  //     sonList: [
  //       {
  //         model_id: 21,
  //         menuTitle: '客服交流监控',
  //         route: 'monitoring',
  //         routeBreadcrumb: [],
  //         sonMenu: []
  //       }
  //     ]
  //   },
  //   route: [],
  //   routeBreadcrumb: [],
  //   sonMenu: []
  // },
  {
    model_id: 5,
    menuTitle: '数据分析',
    iconName: 'stats-bars',
    son: {
      sonTitle: '访问分析',
      sonList: [
        {
          model_id: 6,
          menuTitle: '访问情况分析',
          route: 'visit',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          model_id: 7,
          menuTitle: '粉丝数量分析',
          route: 'fans',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          model_id: 8,
          menuTitle: '工作量分析',
          route: 'workload',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          model_id: 9,
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
    model_id: 10,
    menuTitle: '微信营销',
    iconName: 'chatbubbles',
    son: {
      sonTitle: '授权接入',
      sonList: [
        {
          model_id: 11,
          menuTitle: '授权接入',
          route: 'Jurisdiction',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          model_id: 12,
          menuTitle: '增强功能',
          route: 'enhance',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          model_id: 13,
          menuTitle: '带参二维码',
          route: 'yard',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          model_id: 14,
          menuTitle: '图文群发',
          route: 'Mass',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          model_id: 23,
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
  },
  {
    model_id: 19,
    menuTitle: '系统设置',
    iconName: 'gear-b',
    son: {
      sonTitle: '系统设置',
      sonList: [
        {
          model_id: 25,
          menuTitle: '规则设置',
          route: 'ruleSetup',
          routeBreadcrumb: [],
          sonMenu: []
        },
        {
          model_id: 20,
          menuTitle: '权限管理',
          route: 'staff',
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
