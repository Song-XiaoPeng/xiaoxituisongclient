<style scoped lang="less">
  @import "../less/panel";
</style>

<template>
  <div class="layout">
    <div class="window-border">
      <div class="window-title">
        <div class="user-portrait" :style="{backgroundImage: 'url(' + userInfo.avatar_url + ')'}"></div>
        <div class="user-text"><Icon type="briefcase"></Icon> 账号：18316314484</div>
        <div class="user-text"><Icon type="person"></Icon> 姓名：王涛</div>
      </div>
      <div class="window-control">
        <span class="window-icon">
          <Icon type="arrow-down-b"></Icon>
        </span>
        <span class="window-icon" @click="hideWindow()">
          <Icon type="minus"></Icon>
        </span>
        <span class="window-icon" @click="showWindow()">
          <Icon type="arrow-expand"></Icon>
        </span>
        <span class="window-icon" @click="closeWindow()">
          <Icon type="close"></Icon>
        </span>
      </div>
    </div>

    <Row type="flex">
      <Col span="4" class="layout-menu-left">
        <Menu :active-name="activeName" theme="dark" width="auto" :open-names=openNames @on-select="selectMenu" accordion>
          <Submenu :name="key"  v-for="(item, key) in menuList" :key="key">
            <template slot="title">
              <Icon :type="item.iconName"></Icon>
              {{item.menuTitle}}
            </template>
            <MenuItem v-for="(c, k) of item.son.sonList" :name="key + '-' + k" :key="k">
              {{c.menuTitle}}
            </MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col span="20" id="container">
        <div class="content-page">
          <router-view></router-view>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import menu from '../config/menu';
  import Bus from '../assets/eventBus';
  import DB from '../assets/webDB';
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
        is_tongzhi: true // 是否离开页面提示通知
      };
    },
    components: {
    },
    watch: {
    },
    computed: {
    },
    beforeRouteUpdate (to, from, next) {
      // 根据当前路由选择确定菜单位置
      this.routeSwitchMenu(to.name);

      next();
    },
    mounted () {
    },
    methods: {
      // 注销事件
      signOut () {
        sessionStorage.clear('userInfo');
        this.$router.push({name: '/'});
      },
      routeSwitchMenu (name) {
        this.menuList = [];
        for (let i = 0; i < menu.length; i++) {
          this.isMenuDisplay = false;

          if (menu[i].model_id === 1 && this.userInfo.user_type === '3') {
            continue;
          }

          if (menu[i].model_id === 19 && this.userInfo.user_type !== '3') {
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
      getDialogueList () {
        this.ajax.getSessionList({
          data: {},
          success: (res) => {
            Bus.$emit('conversationList', res);
            // 更新/添加 等待数据表
            let db = new DB();
            db.type = 'update'; // 执行类型
            db.tabName = 'waiting'; // 数据表名称
            db.data = res.body.waiting;
            db.fun = function (res) { // 执行成功回掉函数
            };
            // 更新/添加 排队数据表
            let db1 = new DB();
            db1.type = 'update'; // 执行类型
            db1.tabName = 'queue_up'; // 数据表名称
            db1.data = res.body.queue_up;
            db1.fun = function (res) { // 执行成功回掉函数
            };
            // 会话中的客户数据
            // res.body.contacting_session['data'] = [];
            // res.body.pending_access_session['data'] = [];
            // 等待中的客户数据
            this.getDialogueList();
          },
          error: (res) => {
            this.getDialogueList();
          }
        });
      },
      // 获取正在会话列表中客户会话数据
      getMessage () {
        let that = this;
        // 读取会话数据表中的数据
        let db1 = new DB();
        db1.type = 'get'; // 执行类型
        db1.tabName = 'visitor'; // 数据表名称
        db1.fun = function (res) { // 执行成功回掉函数
          db1.close();
          let user = res;
          that.is_Message = false;
          that.ajax.getMessage({
            data: {
              // openid_list: arr
            },
            success: (res) => {
              for (let k in res.body) {
                // that.messageData.data = that.arr;
                // 调用自定义事件 发送信息到组件 聊天窗口
                // 添加数据到本地数据库
                user.forEach((s) => {
                  if (s.customer_wx_openid === k) {
                    if (that.is_tongzhi) {
                      that.$Notice.warning({
                        title: '收到一条（' + s.customer_wx_nickname + '）的消息',
                        duration: 2
                      });
                    }
                  }
                });
                let db = new DB();
                db.type = 'set';
                db.tabName = 'message';
                db.data = res.body[k];
                db.fun = function (res) {
                  console.log('DB---》添加数据成功');
                  db.close();
                };
              }
              // Bus.$emit('change', that.messageData);
              that.getMessage();
              Bus.$emit('MessageList', res);
            },
            error: (res) => {
              that.getMessage();
              // that.$Message.warning(res.meta.message);
            }
          });
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
        this.$electron.ipcRenderer.send('window-all-closed');
      }
    },
    created () {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
      console.log(this.userInfo);

      this.routeSwitchMenu(this.$route.name);
      this.getDialogueList();
      this.getMessage();
    }
  };
</script>
