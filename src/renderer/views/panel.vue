<style scoped lang="less">
  @import "../less/panel";
  .tab-left-box{
    background-color: #072250;
    height: 50px;
    width: 200px;
    max-width: 200px;
  }
  .menu-box{
    width: 200px;
    height: 100%;
    position: relative;
    background: url('~@/assets/images/meun-bg.png');
    background-color: #072250;
    overflow: hidden;
    ul{
      li{
        box-sizing: border-box;
        font-size: 15px;
        color: #b9bcc5;
        font-weight: bold;
        cursor: pointer;
        .child-menu{
          height: 0px;
          overflow: hidden;
          transition: all .3s;
          ul{
            li{
              color: #b9bcc5;
              cursor: pointer;
              box-sizing: border-box;
              padding: 5px 5px 5px 22%;
              font-size: 13px;
              font-weight: 500;
            }
          }
        }
        .active{
          background-color: #0b2e6a !important;
          color: #fff !important;
        }
      }
    }
    .menu-wire{
      width: 80%;
      margin: 0 auto;
      height: 1px;
      margin: 10px auto 10px auto;
      background-color: #000000;
      border-bottom: 1px #273f67 solid;
    }
  }
</style>

<template>
  <div class="layout">
    <div class="window-border">
      <Row>
        <Col span="3" class="tab-left-box"></Col>
      </Row>
    </div>
    <div class="window-control">
      <span class="window-icon">
        <Dropdown trigger="click" @on-click="signOut">
          <a href="javascript:void(0)" style="color:#fff">
            <Icon type="wrench" style="color: #818181"></Icon>
          </a>
          <DropdownMenu slot="list" name="name1" style="text-align:center; font-size:22px;">
            <!--<DropdownItem>快捷操作</DropdownItem>-->
            <DropdownItem name="name2">
              <Icon type="disc" style="margin-right: 10px;"></Icon>注销退出
            </DropdownItem>
            <DropdownItem name="name3">
             <Icon type="locked" style="margin-right: 10px;"></Icon> 修改密码
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </span>
      
      <span class="window-icon" @click="hideWindow()">
        <Icon type="minus"></Icon>
      </span>
      <span class="window-icon" @click="showWindow()">
        <Icon type="android-checkbox-outline-blank"></Icon>
      </span>
      <span class="window-icon" @click="closeWindow()">
        <Icon type="close"></Icon>
      </span>
    </div>
    <div style="position: absolute;left: 0;top: 50px;right: 0;bottom: 0;">

        <!--<Col span="3" class="layout-menu-left" style="z-index:999; position:relative; float:left; width:200px; margin-right:-200px;">-->
        <div class="menu-box" style="position:relative;">
          <div class="window-title">
            <div class="user-portrait">
              <div class="img-box">
                <img :src="userInfo.avatar_url" alt="">
              </div>
            </div>
            <div class="user-text">{{userInfo.username}}</div>
          </div>

          <div class="menu-wire"></div>
          <!-- 左侧导航 -->
          <div style="overflow:auto; position:absolute; right:-18px; left:0; bottom:0; top:130px; padding-bottom:50px;">
            <ul>
              <li :ref="'parent-menu' + i" v-for="(k, i) in menuList" @click.stop="parentMenuFun(i, k)" :key="i">
                <div v-bind:class="parent_i == i && child_i === '' ? 'active' : ''" style="padding: 10px">
                  <span style="margin-left: 10px"><Icon :type="k.iconName"></Icon></span>
                  <span style="margin-left: 10px">{{k.menuTitle}}</span>
                  <span class="f-r" style="margin-right: 12%" v-if="k.son.sonList.length != 0"><Icon type="ios-arrow-right"></Icon></span>
                </div>
                <!-- 左侧子导航 -->
                <div class="child-menu" :ref="'child-div' + i" v-if="k.son.sonList.length != 0">
                  <ul  :ref="'child-menu' + i">
                    <li v-for="(s, si) in k.son.sonList" v-bind:class="child_i === si && parent_i === i ? 'active' : ''" @click.stop="childMenuFun(s, si, i)" :key="si">{{s.menuTitle}}</li>
                  </ul>
                </div>
                <!-- end左侧子导航 -->
              </li>
            </ul>
          </div>
        </div>
        <!-- end左侧导航 -->
        <!--</Col>-->
        <!--<Col span="21" id="container" style="float:right; width:100%; right:-15px;">-->
        <div class="content-page" style="margin-left:200px;">
          <router-view></router-view>
        </div>
        <!--</Col>-->



      <Modal v-model="popup1" title="修改密码"  @on-ok="modificationPassFun">
        <Form label-position="right" :label-width="100">
          <FormItem label="旧密码">
            <Input type="password" v-model="passObj.password"></Input>
          </FormItem>
          <FormItem label="新密码">
            <Input type="password" v-model="passObj.password1"></Input>
          </FormItem>
          <FormItem label="确认密码">
            <Input type="password" v-model="passObj.password2"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import menu from '../config/menu';
  import Bus from '../assets/eventBus';
  import DB from '../assets/webDB';
  import axios from 'axios';
  import os from 'os';
  import fs from 'fs';
  import path from 'path';
  import md5 from 'js-md5';
  import { desktopCapturer, screen } from 'electron';
  export default {
    data () {
      return {
        customerServiceState: '1',
        menuList: [],
        userInfo: '',
        activeName: '0-0',
        openNames: [0],
        isMenuDisplay: false,
        isOpen: false,
        is_Message: true,
        is_tongzhi: true, // 是否离开页面提示通知,
        parent_i: '0',
        child_i: '',
        ws: null,
        ws_intval: '',
        ws_send_intval: '',
        timeout: 10000, // 60ms
        timeoutObj: null,
        is_ws_off: false,
        is_ws_initiative_off: false,
        is_win: true,
        data3: [],
        lineUpObj: {},
        lineTime: null,
        popup1: false,
        passObj: {
          password: '',
          password1: '',
          password2: ''
        },
        is_loading_pass: true
      };
    },
    components: {
    },
    watch: {
    },
    computed: {
    },
    mounted () {
      if (this.userInfo.user_type === '3' || this.userInfo.user_type === 3) {
      } else {
        // this.getDialogueList();
        // this.getMessage();
      }
    },
    methods: {
      determineScreenShotSize () {
        const screenSize = screen.getPrimaryDisplay().workAreaSize;
        const maxDimension = Math.max(screenSize.width, screenSize.height);
        return {
          width: maxDimension * window.devicePixelRatio,
          height: maxDimension * window.devicePixelRatio
        };
      },
      // 注销事件dwad
      signOut (v) {
        if (v === 'name2') {
          var CancelToken = axios.CancelToken;
          var source = CancelToken.source();
          source.cancel();
          this.$router.push({name: '/'});
          this.is_ws_initiative_off = true;
          this.socketCloseFun();
        } else if (v === 'name3') {
          this.popup1 = true;
        }
      },
      // 修改密码
      modificationPassFun (e) {
        // this.is_loading_pass = true;
        if (this.passObj.password === '') {
          this.$Message.warning(`密码不能为空`);
          return;
        }
        if (this.passObj.password1 === '') {
          this.$Message.warning(`新密码不能为空`);
          return;
        }
        if (this.passObj.password2 === '') {
          this.$Message.warning(`确认密码不能为空`);
          return;
        }
        if (this.passObj.password1 !== this.passObj.password2) {
          this.$Message.warning(`两次密码不一致`);
          return;
        }
        this.ajax.updatePassword({
          data: {
            password: md5(this.passObj.password),
            new_password: md5(this.passObj.password1)
          },
          success: (res) => {
            this.passObj.password = '';
            this.passObj.password1 = '';
            this.passObj.password2 = '';
            this.$Message.success(`修改成功`);
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
        // this.popup1 = false;
      },
      routeSwitchMenu (name) {
        this.menuList = [];
        for (let i = 0; i < menu.length; i++) {
          this.isMenuDisplay = false;

          if (menu[i].model_id === 1 && this.userInfo.user_type === '3') {
            continue;
          }

          if (this.userInfo.user_type !== '3' && menu[i].model_id !== -1) {
            for (let item of this.userInfo.model_list) {
              if (item === menu[i].model_id) {
                this.isMenuDisplay = true;
              }
            }

            if (this.isMenuDisplay !== true) {
              continue;
            }
          }

          for (let c = 0; c < menu[i].son.sonList.length; c++) {
            this.isMenuDisplay = false;

            if (this.userInfo.user_type !== '3') {
              for (let item of this.userInfo.model_list) {
                if (item === menu[i].son.sonList.model_id) {
                  this.isMenuDisplay = true;
                }
              }

              if (this.isMenuDisplay !== true) {
                continue;
              }
            }

            if (menu[i].son.sonList[c].route === name) {
              this.activeName = i + '-' + c;
              this.openNames = [i];
              break;
            }
          }
          this.menuList.push(menu[i]);
        }
      },
      selectMenu (name) {
        let obj = name.split('-');
        let select1 = parseInt(obj[0]);
        let select2 = parseInt(obj[1]);

        for (let i = 0; i < menu.length; i++) {
          if (i === select1) {
            for (let c = 0; c < menu[i].son.sonList.length; c++) {
              if (c === select2) {
                this.$router.push({name: menu[i].son.sonList[c].route});
                return;
              }
            }
          }
        }
      },
      // 请求会话列表数据
      getDialogueList (res) {
        Bus.$emit('conversationList', res);
        // 更新/添加 等待数据表
        let db = new DB();
        db.type = 'update'; // 执行类型
        db.tabName = 'waiting'; // 数据表名称
        db.data = res.waiting;
        db.fun = function (res) { // 执行成功回掉函数
        };
        // 更新/添加 排队数据表
        // let db1 = new DB();
        // db1.type = 'update'; // 执行类型
        // db1.tabName = 'queue_up'; // 数据表名称
        // db1.data = res.body.queue_up;
        // db1.fun = function (res) { // 执行成功回掉函数
        // };
        // 会话中的客户数据
        // res.body.contacting_session['data'] = [];
        // res.body.pending_access_session['data'] = [];
        // 等待中的客户数据
      },
      // 获取正在会话列表中客户会话数据 dwadw
      getMessage (d) {
        let that = this;
        // 读取会话数据表中的数据
        let db1 = new DB();
        db1.type = 'get'; // 执行类型
        db1.tabName = 'visitor'; // 数据表名称
        db1.fun = function (res) { // 执行成功回掉函数
          db1.close();
          let user = res;
          that.is_Message = false;
          for (let k in d) {
            // that.messageData.data = that.arr;
            // 调用自定义事件 发送信息到组件 聊天窗口
            // 添加数据到本地数据库
            user.forEach((s) => {
              if (s.customer_wx_openid === k) {
                if (that.is_tongzhi) {
                  if (that.$route.path !== '/panel/CustomerService' || !that.is_win) {
                    Notification.requestPermission();
                    let notification = new Notification('提示', {
                      body: '收到' + s.customer_wx_nickname + '的信息',
                      icon: s.customer_wx_portrait
                    });
                    setTimeout(() => {
                      notification.close();
                    }, 10000);
                  }
                  // that.$Notice.warning({
                  // title: '收到一条（' + s.customer_wx_nickname + '）的消息',
                  // duration: 2
                  // });
                }
              }
            });
            let db = new DB();
            db.type = 'set';
            db.tabName = 'message';
            db.data = d[k];
            db.fun = function (res) {
              db.close();
            };
          }
          // Bus.$emit('change', that.messageData);
          Bus.$emit('MessageList', d);
        };
      },
      hideWindow () {
        this.$electron.ipcRenderer.send('hide-window');
      },
      showWindow () {
        if (!this.isOpen) {
          this.isOpen = true;
          this.$electron.ipcRenderer.send('show-window');
        } else {
          this.isOpen = false;
          this.$electron.ipcRenderer.send('orignal-window');
        }
      },
      closeWindow () {
        this.$Modal.confirm({
          title: '系统提醒',
          content: '确定关闭应用？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.ajax.accountCancellation({
              success: () => {
                this.$electron.ipcRenderer.send('window-all-closed');
              },
              error: (res) => {
                this.$Message.warning(res.meta.message);
              }
            });
          }
        });
      },
      // 父菜单方法
      parentMenuFun (i, k) {
        // let li = this.$refs['parent-menu' + i];
        if (k.son.sonList.length <= 0) {
          this.$router.push({
            name: k.route
          });
          this.child_i = '';
          this.parent_i = i;
        } else {
          let childUl = this.$refs['child-menu' + i];
          let div = this.$refs['child-div' + i];
          div[0].style.height = div[0].offsetHeight === 0 ? childUl[0].offsetHeight + 'px' : 0 + 'px';
        }
      },
      // 子菜单方法
      childMenuFun (k, si, i) {
        this.$router.push({
          name: k.route
        });
        this.child_i = si;
        this.parent_i = i;
      },
      // socket 报错方法
      socketErrFun (e) {
        throw new Error(e);
      },
      // socketClose 关闭
      socketCloseFun () {
        if (this.is_ws_off) {
          this.ws.close();
        }
      },
      // 通知
      inform (name, url, k) {
        // this.$electron.ipcRenderer.send('asynchronous-message', 'ping');
        Notification.requestPermission();
        let notification = new Notification('提示', {
          body: `你有一位新客户${name}`,
          icon: url
        });
        notification.onclick = () => {
          this.$router.push({
            name: 'ServeIndex',
            query: {
              lineData: k
            }
          });
        };
        setTimeout(() => {
          notification.close();
        }, 10000);
      },
      // WebSocket链接
      WebSocketFun () {
        this.ws = new WebSocket('ws://kf.lyfz.net:8282');
        let obj = {
          token: this.userInfo.token,
          uid: this.userInfo.uid,
          company_id: this.userInfo.company_id,
          type: 'auth',
          client: 'pc'
        };
        this.ws.onopen = () => {
          this.is_ws_off = true;
          this.start();
          this.lineUp();
          this.ws.send(JSON.stringify(obj));
        };
        this.ws.onmessage = (e) => {
          // this.reset();
          this.getLossDialogueFun();
          let data = JSON.parse(e.data);
          if (data.body.type === 'session') {
            // 如果是排队数据
            this.getDialogueList(data.body.sk_data);
            data.body.sk_data.queue_up.forEach((k) => {
              if (this.lineUpObj[k.session_id]) {
                Object.assign(this.lineUpObj[k.session_id], k);
              } else {
                this.lineUpObj[k.session_id] = k;
                this.inform(k.customer_wx_nickname, k.customer_wx_portrait, k);
              }
            });
            this.data3 = data.body.sk_data.queue_up;
            this.setLossDialogueFun();
          } else if (data.body.type === 'message') {
            // 如果是会话信息数据
            this.getMessage(data.body.sk_data);
          }
        };
        this.ws.onerror = (e) => {
          // this.heartCheck.reset();
          // this.$Message.warning('网络不稳定或服务器断开，60秒后为您重连。。。');
          clearTimeout(this.ws_intval);
          clearInterval(this.lineTime);
          this.socketErrFun(e);
        };
        this.ws.onclose = () => {
          // heartCheck.start();
          this.is_ws_off = false;
          clearTimeout(this.ws_intval);
          clearInterval(this.lineTime);
          if (!this.is_ws_initiative_off) {
            this.ws_intval = setInterval(() => {
              this.WebSocketFun();
            }, 10000);
            // this.$Message.warning('网络不稳定或服务器断开，30秒后为您重连。。。');
          }
        };
      },
      reset () {
        clearTimeout(this.timeoutObj);
        this.start();
      },
      start () {
        clearTimeout(this.timeoutObj);
        let obj = {
          type: 'ping',
          client: 'pc'
        };
        this.timeoutObj = setInterval(() => {
          if (this.is_ws_off) {
            this.ws.send(JSON.stringify(obj));
          }
        }, this.timeout);
      },
      // 通知后台 获取排队数据
      lineUp () {
        clearInterval(this.lineTime);
        let obj = {
          type: 'get_lineup_session',
          client: 'pc',
          uid: this.userInfo.uid
        };
        this.lineTime = setInterval(() => {
          this.ws.send(JSON.stringify(obj));
        }, 2000);
      },
      // 获取缓存 等待排队客户数据
      getLossDialogueFun (s) {
        let arr = this.global.dialogueArr;
        // let arr = store.state.arr;
        // let arr = str;
        // let arr = JSON.parse(sessionStorage.getItem('dialogueArr')) || [];
        arr.forEach((k) => {
          this.lineUpObj[k.session_id] = k;
        });
      },
      setLossDialogueFun () {
        let dialogueArr = Array.from(new Set(this.data3));
        this.global.dialogueArr = dialogueArr;
        // this.$electron.ipcRenderer.send('setCookie', JSON.stringify(dialogueArr));
      }
    },
    destroyed (s) {
      Bus.$off();
    },
    beforeRouteUpdate (to, from, next) {
      clearTimeout(window.timer_i);
      window.timer_i = '';
      // 根据当前路由选择确定菜单位置
      this.routeSwitchMenu(to.name);

      next();
    },
    created () {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.routeSwitchMenu(this.$route.name);
      // this.getLossDialogueFun();
      if (this.userInfo.user_type !== '3' && this.userInfo.user_type !== 3) {
        this.WebSocketFun();
      }
      this.$electron.ipcRenderer.on('mini', () => {
        this.is_win = false;
      });
      this.$electron.ipcRenderer.on('restore', () => {
        this.is_win = true;
      });
      this.$electron.ipcRenderer.on('max', () => {
        this.is_win = true;
      });
      this.$electron.ipcRenderer.on('shortcut-capture', (e, m) => {
        const thumbSize = this.determineScreenShotSize();
        let options = { types: ['screen'], thumbnailSize: thumbSize };
        desktopCapturer.getSources(options, function (error, sources) {
          if (error) return;
          sources.forEach(function (source) {
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
              const screenshotPath = path.join(os.tmpdir(), 'screenshot.png');
              fs.writeFile(screenshotPath, source.thumbnail.toPng(), function (error) {
                if (error) return;
                const message = `${screenshotPath}`;
                e.sender.send('shortcut-capture', message);
              });
            }
          });
        });
      });
    }
  };
</script>
