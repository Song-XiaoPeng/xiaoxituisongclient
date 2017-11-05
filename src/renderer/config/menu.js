let menuData = [
  {
    menuTitle: '首页',
    iconName: 'ios-speedometer',
    son: {
      sonTitle: '商品管理',
      sonList: [
        {
          menuTitle: '概况数据',
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
    menuTitle: '商品',
    iconName: 'bag',
    son: {
      sonTitle: '商品管理',
      sonList: [
        {
          menuTitle: '服务管理',
          route: 'goodsServeManage',
          routeBreadcrumb: ['服务管理', '服务管理首页'],
          sonMenu: []
        },
        {
          menuTitle: '拼团管理',
          route: 'groupBooking',
          routeBreadcrumb: ['拼团管理', '拼团列表'],
          sonMenu: [
            {
              menuTitle: '发布拼团活动',
              route: 'issueGroupBooking',
              routeBreadcrumb: ['卡项管理', '卡项管理首页', '发布拼团活动'],
              sonMenu: []
            }
          ]
        },
        {
          menuTitle: '抢购管理',
          route: 'seckill',
          routeBreadcrumb: ['抢购管理', '抢购列表'],
          sonMenu: [
            {
              menuTitle: '发布秒杀活动',
              route: 'createSeckill',
              routeBreadcrumb: ['卡项管理', '卡项管理首页', '发布秒杀活动'],
              sonMenu: []
            }
          ]
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    menuTitle: '订单',
    iconName: 'ios-cart',
    son: {
      sonTitle: '订单管理',
      sonList: [
        {
          menuTitle: '普通订单',
          route: 'orderServer',
          routeBreadcrumb: ['订单', '普通订单'],
          sonMenu: []
        },
        {
          menuTitle: '拼团订单',
          route: 'orderCard',
          routeBreadcrumb: ['订单', '拼团订单'],
          sonMenu: []
        },
        {
          menuTitle: '秒杀订单',
          route: 'seckillOrder',
          routeBreadcrumb: ['订单', '秒杀订单'],
          sonMenu: []
        }
      ]
    },
    route: [],
    routeBreadcrumb: [],
    sonMenu: []
  },
  {
    menuTitle: '设置',
    iconName: 'gear-b',
    son: {
      sonTitle: '系统设置',
      sonList: [
        {
          menuTitle: '店铺信息',
          route: 'settingStore',
          routeBreadcrumb: ['设置', '店铺信息'],
          sonMenu: []
        },
        {
          menuTitle: '员工管理',
          route: 'settingStaff',
          routeBreadcrumb: ['设置', '员工管理'],
          sonMenu: []
        },
        {
          menuTitle: '密码修改',
          route: 'settingPassword',
          routeBreadcrumb: ['设置', '密码修改'],
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
