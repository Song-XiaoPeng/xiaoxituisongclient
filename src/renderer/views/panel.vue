<style scoped lang="less">
  @import "../less/panel";
  .tab-left-box{
    background-color: #072250;
    height: 50px;
    width: 13.89%;
  }
  .menu-box{
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/meun-bg.png');
    background-color: #072250;
    overflow: hidden;
    ul{
      li{
        box-sizing: border-box;
        font-size: 15px;
        color: #b9bcc5;
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
              padding: 5px 5px 5px 35px;
              font-size: 13px;
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
        <Col span="3" class="tab-left-box">

        </Col>
      </Row>
    </div>
    <div class="window-control">
      <Dropdown @on-click="signOut">
        <a href="javascript:void(0)" style="color:#fff">
          <Icon type="arrow-down-b" style="color: #818181"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem divided style="color: #ff3300;text-align: center;font-size: 22px;"><Icon type="disc" style="margin-right: 10px;"></Icon>注销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
        <!--<span class="window-icon">-->
          <!--<Icon type="arrow-down-b"></Icon>-->
        <!--</span>-->
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
    <Row type="flex">
      <Col span="3" class="layout-menu-left" style="position: absolute;top: 50px;left: 0;bottom: 0;">
         <div class="menu-box" style="position: relative">


           <div class="window-title">
             <div class="user-portrait">
                <div class="img-box">
                  <img :src="userInfo.avatar_url" alt="">
                </div>
             </div>
             <!--<div class="user-text"><Icon type="briefcase"></Icon> 账号：{{userInfo.phone_no}}</div>-->
             <div class="user-text">{{userInfo.username}}</div>
           </div>

           <div class="menu-wire"></div>
           <!-- 左侧导航 -->
           <div style="overflow: auto;position: absolute;right: -18px;left: 0;bottom: 0;top: 130px;padding-bottom: 50px;">
             <ul>
               <li :ref="'parent-menu' + i" v-for="(k, i) in menuList" @click.stop="parentMenuFun(i, k)">
                 <div v-bind:class="parent_i == i && child_i === '' ? 'active' : ''" style="padding: 10px">
                   <span style="margin-left: 10px"><Icon :type="k.iconName"></Icon></span>
                   <span style="margin-left: 10px">{{k.menuTitle}}</span>
                   <span class="f-r" style="margin-right: 12%" v-if="k.son.sonList.length != 0"><Icon type="ios-arrow-right"></Icon></span>
                 </div>
                 <!-- 左侧子导航 -->
                 <div class="child-menu" :ref="'child-div' + i" v-if="k.son.sonList.length != 0">
                   <ul  :ref="'child-menu' + i">
                     <li v-for="(s, si) in k.son.sonList" v-bind:class="child_i === si && parent_i === i ? 'active' : ''" @click.stop="childMenuFun(s, si, i)">{{s.menuTitle}}</li>
                   </ul>
                 </div>
                 <!-- end左侧子导航 -->
               </li>
             </ul>
           </div>
         </div>
         <!-- end左侧导航 -->


        <!--<Menu :active-name="activeName" theme="dark" width="auto" :open-names=openNames @on-select="selectMenu" accordion>-->
          <!--<Submenu :name="key"  v-for="(item, key) in menuList" :key="key">-->
            <!--<template slot="title">-->
              <!--<Icon :type="item.iconName"></Icon>-->
              <!--{{item.menuTitle}}-->
            <!--</template>-->
            <!--<MenuItem v-for="(c, k) of item.son.sonList" :name="key + '-' + k" :key="k">-->
              <!--{{c.menuTitle}}-->
            <!--</MenuItem>-->
          <!--</Submenu>-->
        <!--</Menu>-->
      </Col>
      <Col span="21" id="container" style="right: 0;position: absolute;top: 50px;bottom: 0;">
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
        is_tongzhi: true, // 是否离开页面提示通知,
        parent_i: '0',
        child_i: ''
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
      if (this.userInfo.user_type === '3' || this.userInfo.user_type === 3) {
      } else {
        this.getDialogueList();
        this.getMessage();
      }
    },
    methods: {
      // 注销事件
      signOut () {
        localStorage.removeItem('userInfo');
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
      }
    },
    created () {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.routeSwitchMenu(this.$route.name);
    }
  };
</script>
