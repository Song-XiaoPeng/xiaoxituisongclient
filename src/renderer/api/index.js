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
    obj.error(error);
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
    obj.error(error);
    console.log(error);
  });
};

// 账号注销
ajax.accountCancellation = (obj) => {
  util.ajax.get('/api/v1/user/UserOperation/accountCancellation').then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
    console.log(error);
  });
};

// 添加编辑红包活动
ajax.addRedEnvelopes = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/addRedEnvelopes', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除红包活动
ajax.delRedEnvelopes = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/delRedEnvelopes', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 查看红包二维码列表
ajax.getRedEnvelopeList = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/getRedEnvelopeList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取红包list
ajax.getRedEnvelopesList = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/getRedEnvelopesList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
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
    obj.error(error);
    console.log(error);
  });
};

// 获取粉丝总数
ajax.getUserCumulate = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getUserCumulate', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 设置客服
ajax.setUserCustomerService = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/setUserCustomerService', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 修改客服名称
ajax.updateCustomerServiceName = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/updateCustomerServiceName', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取微信客服列表
ajax.getCustomerServiceList = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/getCustomerServiceList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 添加/修改 池组名
ajax.addCustomerGroup = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/addCustomerGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取池组列表
ajax.getCustomerGroupList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getCustomerGroupList', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除池组
ajax.delCustomerGroup = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/delCustomerGroup', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取会话列表
ajax.getSessionList = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getSessionList', obj.data, {timeout: 180000}).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 会话接入
ajax.sessionAccess = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/sessionAccess', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    obj.error(error);
    console.log(error);
  });
};

// 结束会话
ajax.closeSession = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/closeSession', obj.data).then(function (response) {
    if (response.data.meta.code === 200) {
      obj.success(response.data);
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取正在会话列表中客户会话数据
ajax.getMessage = (obj) => {
  util.ajax.get('/api/v1/we_chat/WxOperation/getMessage', obj.data, {timeout: 180000}).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 将会话设为已读
ajax.setSessionReceive = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/setSessionReceive', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 改部门
ajax.setUserGroup = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/setUserGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取分享数据
ajax.getUserShareSummary = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/getUserShareSummary', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 发送信息
ajax.sendMessage = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/sendMessage', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 设置客服头像
ajax.setUserPortrait = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/setUserPortrait', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取会话中列表
ajax.getAlreadyAccess = (obj) => {
  util.ajax.get('/api/v1/message/Interaction/getAlreadyAccess', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取客户信息
ajax.getWxCustomerInfo = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/getWxCustomerInfo', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 保存客户信息
ajax.setCustomerInfo = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/setCustomerInfo', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 添加快捷回复 内容
ajax.setQuickReplyText = (obj) => {
  util.ajax.post('/api/v1/message/Common/setQuickReplyText', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取快捷回复列表
ajax.getQuickReplyList = (obj) => {
  util.ajax.post('/api/v1/message/Common/getQuickReplyList?reply_group_id=' + obj.data.reply_group_id).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除快捷回复 语句
ajax.delUserQuickReply = (obj) => {
  util.ajax.post('/api/v1/message/Common/delQuickReply', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取历史聊天信息
ajax.getHistoryMessage = (obj) => {
  util.ajax.post('/api/v1/message/Interaction/getHistoryMessage', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取客户列表
ajax.getCustomerList = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/getCustomerList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 创建渠道分组
ajax.addQrcodeGroup = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/addQrcodeGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取创建渠道分组列表
ajax.getQrcodeGroupList = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/getQrcodeGroupList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除渠道分组
ajax.delQrcodeGroup = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/delQrcodeGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 修改创建渠道分组名
ajax.editQrcodeGroupName = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/editQrcodeGroupName', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 添加推广二维码
ajax.createQrcode = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/createQrcode', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取二维码列表
ajax.getQrcodList = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/getQrcodList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除二维码
ajax.delQrcod = (obj) => {
  util.ajax.post('/api/v1/extension/Handle/delQrcod', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 模糊搜索客户名称
ajax.searchCustomerInfo = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/searchCustomerInfo', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 添加业务提醒
ajax.addRemind = (obj) => {
  util.ajax.post('/api/v1/message/Remind/addRemind', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取授权列表
ajax.getModelAuthList = (obj) => {
  util.ajax.get('/api/v1/user/ModelAuth/getModelAuthList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取授权列表
ajax.getHomeSurvey = (obj) => {
  util.ajax.get('/api/v1/statistics/Survey/getHomeSurvey', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 设置权限
ajax.setUserModelAuth = (obj) => {
  util.ajax.post('/api/v1/user/ModelAuth/setUserModelAuth', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取业务提醒数据列表
ajax.getRemindList = (obj) => {
  util.ajax.post('/api/v1/message/Remind/getRemindList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取客户排行榜
ajax.getCustomerServiceRanking = (obj) => {
  util.ajax.post('/api/v1/statistics/Survey/getCustomerServiceRanking', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 添加意向产品
ajax.addProduct = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/addProduct', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取意向产品
ajax.getProductList = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/getProductList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除意向产品
ajax.delProduct = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/delProduct', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 客户管理修改添加客户信息
ajax.crmUpdate = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/crmUpdate', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 设置提醒已完成
ajax.setComplete = (obj) => {
  util.ajax.post('/api/v1/message/Remind/setComplete', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除提醒
ajax.delRemind = (obj) => {
  util.ajax.post('/api/v1/message/Remind/delRemind', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取提醒跟踪列表
ajax.getAllRemindList = (obj) => {
  util.ajax.post('/api/v1/message/Remind/getAllRemindList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 修改提醒
ajax.updateRemindTime = (obj) => {
  util.ajax.post('/api/v1/message/Remind/updateRemindTime', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 解除硬件绑定
ajax.relieveUserBind = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/relieveUserBind', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取线索客户列表
ajax.getClueCustomer = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/getClueCustomer', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 排队中接入会话
ajax.accessQueuingSession = (obj) => {
  util.ajax.post('/api/v1/message/Common/accessQueuingSession', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取标签列表
ajax.getLabelList = (obj) => {
  util.ajax.get('/api/v1/setting/Rule/getLabelList?label_group_id=' + obj.data.label_group_id + '&label_name=' + obj.data.label_name, obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 设置微信用户标签
ajax.setWxUserLabel = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/setWxUserLabel', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取会话微信用户基本信息
ajax.getWxUserInfo = (obj) => {
  util.ajax.post('/api/v1/message/Common/getWxUserInfo', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 添加标签分组
ajax.updateLabelGroup = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/updateLabelGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 添加标签/内容
ajax.setLabel = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/setLabel', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 获取所有标签分组
ajax.getLabelGroup = (obj) => {
  util.ajax.get('/api/v1/setting/Rule/getLabelGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除标签分组
ajax.delLabelGroup = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/delLabelGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 删除标签
ajax.delLabel = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/delLabel', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 修改标签
ajax.updateLabel = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/updateLabel', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};

// 客户管理---线索 ---接入会话
ajax.createWxUserSession = (obj) => {
  util.ajax.post('/api/v1/message/Common/createWxUserSession', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      // obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 强制会话
ajax.forcedSendMessage = (obj) => {
  util.ajax.post('/api/v1/message/Common/forcedSendMessage', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error); ddwadwaddawdwaf
    console.log(error);
  });
};

// 会话规则
ajax.setSessionRule = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/setSessionRule', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    obj.error(error);
    console.log(error);
  });
};

// 监控 --- 》 获取会话人员列表
ajax.getMonitorSessionList = (obj) => {
  util.ajax.post('/api/v1/message/Interaction/getMonitorSessionList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};

// 监控 --- 》 获取聊天信息
ajax.getMonitorMessage = (obj) => {
  util.ajax.post('/api/v1/message/Interaction/getMonitorMessage', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};

// 监控 --- 》 关闭会话
ajax.monitoringCloseSession = (obj) => {
  util.ajax.post('/api/v1/message/Interaction/closeSession', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};

// 监控 --- 》 添加评价
ajax.sessionEvaluate = (obj) => {
  util.ajax.post('/api/v1/message/Interaction/sessionEvaluate', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 设置客资领取规则
ajax.setCustomerResourcesRule = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/setCustomerResourcesRule', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 设置支付证书
ajax.setCertificate = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/setCertificate', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 添加部门
ajax.addDepartment = (obj) => {
  util.ajax.post('/api/v1/user/Framework/addDepartment', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取部门列表
ajax.getDepartmentList = (obj) => {
  util.ajax.get('/api/v1/user/Framework/getDepartmentList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 删除部门
ajax.delDepartment = (obj) => {
  util.ajax.post('/api/v1/user/Framework/delDepartment', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 添加岗位
ajax.addPosition = (obj) => {
  util.ajax.post('/api/v1/user/Framework/addPosition', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取岗位列表
ajax.getPositionList = (obj) => {
  util.ajax.post('/api/v1/user/Framework/getPositionList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 删除岗位
ajax.delPosition = (obj) => {
  util.ajax.post('/api/v1/user/Framework/delPosition', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 添加人员
ajax.addUser = (obj) => {
  util.ajax.post('/api/v1/user/Framework/addUser', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取人员列表
ajax.getTissueUserList = (obj) => {
  util.ajax.post('/api/v1/user/Framework/getUserList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取组织结构图
ajax.getFrameworkData = (obj) => {
  util.ajax.get('/api/v1/user/Framework/getFrameworkData', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};

// 获取线索数据统计
ajax.getClueStatisticData = (obj) => {
  util.ajax.get('/api/v1/customer/CustomerOperation/getClueStatisticData', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取会话规则
ajax.getSessionRule = (obj) => {
  util.ajax.get('/api/v1/setting/Rule/getSessionRule', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取客资领取规则
ajax.getCustomerResourcesRule = (obj) => {
  util.ajax.get('/api/v1/setting/Rule/getCustomerResourcesRule', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取我的下属账号信息list
ajax.getSubordinateList = (obj) => {
  util.ajax.get('/api/v1/user/Framework/getSubordinateList', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 添加企业话术
ajax.setCommonQuickReplyText = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/setCommonQuickReplyText', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取企业常用话术
ajax.getEnterpriseSentence = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/getEnterpriseSentence', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 删除企业话术
ajax.delQuickReply = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/delQuickReply', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 同步所有标签
ajax.syncWxLabel = (obj) => {
  util.ajax.get('/api/v1/setting/Rule/syncWxLabel', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取意向客户列表
ajax.getIntentionalCustomers = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/getIntentionalCustomers', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取意向数据统计
ajax.getIntentionData = (obj) => {
  util.ajax.get('/api/v1/customer/CustomerOperation/getIntentionData', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取订单客户数据统计
ajax.getOrderCustomerData = (obj) => {
  util.ajax.get('/api/v1/customer/CustomerOperation/getOrderCustomerData', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取订单客户list
ajax.getOrderCustomer = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/getOrderCustomer', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取追销客户list
ajax.getTrackCustomer = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/getTrackCustomer', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取追销客户数据统计
ajax.getTrackCustomerData = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/getTrackCustomerData', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 领取意向客户池客户
ajax.receiveIntention = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/receiveIntention', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 领取线索客户池客户
ajax.receiveCuedPool = (obj) => {
  util.ajax.post('/api/v1/customer/CustomerOperation/receiveCuedPool', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 修改密码
ajax.updatePassword = (obj) => {
  util.ajax.post('/api/v1/user/UserOperation/updatePassword', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 腾讯地图逆地址解析
ajax.geocoder = (obj) => {
  util.ajax.post('/api/v1/map/Address/geocoder', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 创建企业快捷回复分组
ajax.addCommonQuickReplyGroup = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/addCommonQuickReplyGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 添加个人快捷回复分组
ajax.addUserQuickReplyGroup = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/addUserQuickReplyGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取个人快捷回复分组
ajax.getUserQuickReplyGroup = (obj) => {
  util.ajax.get('/api/v1/setting/Rule/getUserQuickReplyGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 删除个人快捷回复分组
ajax.delUserQuickReplyGroup = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/delUserQuickReplyGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取企业快捷回复分组
ajax.getCommonQuickReplyGroup = (obj) => {
  util.ajax.get('/api/v1/setting/Rule/getCommonQuickReplyGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 获取企业快捷回复分组
ajax.delCommonQuickReplyGroup = (obj) => {
  util.ajax.post('/api/v1/setting/Rule/delCommonQuickReplyGroup', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
// 取消微信用户标签
ajax.canelWxUserLabel = (obj) => {
  util.ajax.post('/api/v1/we_chat/WxOperation/canelWxUserLabel', obj.data).then(function (response) {
    if (response.data) {
      if (response.data.meta.code === 200) {
        obj.success(response.data);
      } else {
        obj.error(response.data);
      }
    } else {
      obj.error(response.data);
    }
  }).catch(function (error) {
    // obj.error(error);
    console.log(error);
  });
};
export default ajax;
