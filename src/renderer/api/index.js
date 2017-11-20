import util from '../libs/util';

let ajax = {};

/**
 * 前台用户登录
 * @param phone_no 用户手机号码(账号)
 * @param password 用户登录密码md5值
 * @return code->200成功 3001->账号或密码错误
 */
ajax.login = (obj) => {
  util.ajax.post('/api/v1/user/Auth/Login', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 添加部门
ajax.section = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/addUserGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取部门列表
ajax.getSection = (obj) => {
  util.ajax.get('/api/v1/user/UserOperation/getUserGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 添加客服
ajax.addAccountNumber = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/addAccountNumber', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取部门客服人员列表
ajax.getUserList = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/getUserList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 授权公共平台
ajax.setUserState = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/setUserState', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 删除部门
ajax.delUserGroup = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/delUserGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取公共平台及小程序
ajax.getWxAuthList = (obj) => {
  util.ajax.get('/api/v1/user/UserOperation/getWxAuthList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 设置菜单
ajax.setMenuList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/setMenuList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取菜单
ajax.getMenuList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getMenuList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 添加回复
ajax.setMessageRuld = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/setMessageRuld', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取自动回复列表
ajax.getMessageRuleList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getMessageRuleList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 删除自动回复
ajax.delMessageRule = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/delMessageRule', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取素材/图文/图片
ajax.getArticleList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getArticleList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 设置菜单
ajax.setMenu = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/setMenu', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 设置个性化菜单
ajax.setWxIndividualizationMenu = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/setWxIndividualizationMenu', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取个性化菜单
ajax.getWxIndividualizationMenu = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getWxIndividualizationMenu', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 删除个性化菜单
ajax.delWxIndividualizationMenu = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/delWxIndividualizationMenu', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 删除图片/图文
ajax.delSourceMaterial = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/delSourceMaterial', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取粉丝列表
ajax.getWxUserList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getWxUserList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取粉丝分组
ajax.getWxGroup = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getWxGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 创建粉丝分组
ajax.addWxGroup = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/addWxGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 移动分组
ajax.moveUserWxGroup = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/moveUserWxGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取同步任务列表
ajax.getTaskList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getTaskList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 创建同步任务
ajax.syncWxUser = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/syncWxUser', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 删除粉丝分组
ajax.delWxGroup = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/delWxGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 添加群发
ajax.addMassNews = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/addMassNews', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 获取群发列表
ajax.getMassNewsList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getMassNewsList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};
// 删除群发条目
ajax.delMassNews = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/delMassNews', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
};

// 获取增长粉丝 / 增长 / 取消关注
ajax.getUserSummary = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getUserSummary', obj.data).then(function (response) {
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
