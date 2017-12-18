<style scoped lang="less">
  .btn{
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #1a1a1a;
      box-sizing: border-box;
      border-bottom: 1px #eaeaea solid;
      transition: all .3s;
      cursor: pointer;
      background-color: #ecf0f4;
  }
  .active{
      background-color: #3399ff;
      color: #fff;
  }
  .btn:hover{
      background-color: #2db7f5;
      color: #fff;
  }
    .person{
        box-sizing: border-box;
        border-bottom: 1px #eaeaea solid;
        .list-box{
            .tle{
                padding: 10px;
                cursor: pointer;
                transition: all .3s;
                background-color: #ebf7ff;
                .icon-rotate{
                    position: relative;
                    transform: rotate(0deg);
                    transition: all .6s;
                }
                .icon-active{
                    transform: rotate(90deg);
                }
            }
            .tle:hover{
                color: #3399ff;
            }
            .list{
                transition: all .6s;
                overflow: hidden;
                li{
                    position: relative;
                    padding: 5px;
                    cursor: pointer;
                    border-bottom: 1px #f7f7f7 dashed;
                    transition: all .3s;
                    .state-sum{
                        position: absolute;
                        left: 40px;
                        top: 4px;
                        color: #fff;
                        display: inline-block;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background-color: #ff3300;
                        text-align: center;
                        line-height: 20px;
                        overflow: hidden;
                    }
                    .picture{
                        width: 56px;
                        border-radius: 50%;
                        overflow: hidden;
                        height: 56px;
                        border: 1px #eaeaea solid;
                        padding: 2px;
                        img{
                            height: 100%;
                            width: 100%;
                            border-radius: 50%;
                        }
                    }
                    .txt{
                        position: absolute;
                        left: 65px;
                        top: 5px;
                        right: 5px;
                        bottom: 5px;
                        .name{
                            font-weight: bold;
                            font-size: 14px;
                            padding: 2px 0;
                            height: 25px;
                            line-height: 25px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            color: #1a1a1a;
                        }
                        .remark{
                            color: #999;
                            font-size: 12px;
                        }
                    }
                    .end{
                        position: absolute;
                        display: inline-block;
                        z-index: 1000;
                        background-color: #fff;
                        right: 2px;
                        top: 2px;
                        font-size: 20px;
                        display: none;
                        color: #3399ff;
                        height: 20px;
                        width: 20px;
                        border-radius: 5px;
                    }
                }
                li:hover{
                    background-color: #f7f7f7;
                    .end{
                        display: inline-block;
                    }
                }
                li:last-child{
                    border-bottom: 0;
                }
                li.active{
                    border-right:3px #3399ff solid;
                    background-color: #fafafa;
                }
            }
        }
    }
</style>
<template>
   <div style="height: 100%;overflow: auto;">
       <Row>
           <Col :xs="24"  :lg="24">
             <div class="btn active">
               访客
             </div>
           </Col>
           <!--<Col :xs="24"  :lg="12">-->
              <!--<div class="btn">-->
                 <!--团队-->
              <!--</div>-->
           <!--</Col>-->
       </Row>
       <div class="person">
           <div class="list-box">
               <div class="tle" @click="telFun('list1')" style="border-bottom: 1px #d7dde4 solid;background-color: #fff">
                   <Icon class="icon-rotate" v-bind:class="icon_rotate.icon1 == '1' ? 'icon-active' : ''" type="arrow-right-b"></Icon>
                   会话中
               </div>
               <ul ref="list1" class="list" :style="'height:' + data1.length * 67 + 'px'">
                   <li v-for="(k, i) in data1" v-bind:class="k.is_class ? 'active' : ''" @click.stop="underwayFun(k, i)">
                       <span class="state-sum" v-if="!k.sum == 0">{{k.sum}}</span>
                       <span class="end" title="结束会话" @click="popup2 = true, clientName = k, is_w_v = 1, clientDataIndex = i"><Icon  type="close-circled" style="vertical-align: top"></Icon></span>
                       <div class="picture">
                           <img :src="k.customer_wx_portrait" alt="">
                       </div>
                       <div class="txt">
                           <div class="name">{{k.customer_wx_nickname}}</div>
                           <div class="remark">{{k.app_name}}</div>
                       </div>
                   </li>
               </ul>
           </div>
           <div class="list-box" style="border-bottom: 1px #fff solid">
               <div class="tle" @click.stop="telFun('list2')" style="border-bottom: 1px #d7dde4 solid;background-color: #fff;">
                   <Icon class="icon-rotate" v-bind:class="icon_rotate.icon2 == '1' ? 'icon-active' : ''" type="arrow-right-b"></Icon>
                   等待中
               </div>
               <ul ref="list2" class="list" :style="'height:' + data2.length * 67 + 'px'">
                   <li v-for="(k, i) in data2" @click.stop="popup1 = true,clientName = k.customer_wx_nickname,clientData = k,clientDataIndex = i, is_w_v = 2">
                       <span class="end" title="结束会话" @click.stop="popup2 = true, clientName = k, is_w_v = 2, clientDataIndex = i"><Icon  type="close-circled" style="vertical-align: top"></Icon></span>
                       <div class="picture">
                           <img :src="k.customer_wx_portrait" alt="">
                       </div>
                       <div class="txt">
                           <div class="name">{{k.customer_wx_nickname}}</div>
                           <div class="remark">{{k.app_name}}</div>
                       </div>
                   </li>
               </ul>
           </div>
           <div class="list-box">
               <div class="tle" @click.stop="telFun('list3')" style="border-bottom: 1px #d7dde4 solid;background-color: #fff;">
                   <Icon class="icon-rotate" v-bind:class="icon_rotate.icon3 == '1' ? 'icon-active' : ''" type="arrow-right-b"></Icon>
                   排队中
               </div>
               <ul ref="list3" class="list" :style="'height:' + data3.length * 67 + 'px'">
                   <li v-for="(k, i) in data3" @click.stop="addDialogueFun(k, i)">
                       <div class="picture">
                           <img :src="k.customer_wx_portrait" alt="">
                       </div>
                       <div class="txt">
                           <div class="name">{{k.customer_wx_nickname}}</div>
                           <div class="remark">{{k.app_name}}</div>
                       </div>
                   </li>
               </ul>
           </div>
       </div>

       <!-- 接入会话弹窗 -->
       <Modal v-model="popup1" title="提示" @on-ok="underwayPopupFun">
           是否将该客户（<span style="color:#3399ff">{{clientName}}</span>）加入会话列表？
       </Modal>
       <!-- end接入会话弹窗 -->


       <!-- 接入会话弹窗 -->
       <Modal v-model="popup2" title="提示" @on-ok="endFun">
           确定结束与 <span style="color: #2b85e4">{{clientName.customer_wx_nickname}}</span>的会话？
       </Modal>
       <!-- end接入会话弹窗 -->

       <!-- 加载状态 -->
       <Spin fix v-if="is_Loading">
           <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
           <div>请求中....</div>
       </Spin>
       <!-- end加载状态 -->
   </div>
</template>
<script>
    import Bus from '../../assets/eventBus';
    import sort from '../../assets/sortObj';
    // import store from '../../store/index';
    // DB数据库 name: '' 表名称
    // tab_type: 'visitor (会话人员表)' / 'message (会话数据表)'
    import DB from '../../assets/webDB';
    export default {
      data () {
        return {
          data1: [],
          data2: [],
          data3: [],
          data4: [
            {
              title: '最近沟通',
              expand: true,
              children: [
                {
                  title: 'parent 1-1',
                  expand: true
                },
                {
                  title: 'parent 1-2',
                  expand: true
                }
              ]
            }
          ],
          timeInt: null,
          popup1: false,
          popup2: false,
          clientName: '',
          clientData: {},
          clientDataIndex: null,
          is_w_v: null,
          is_Loading: false,
          data1Index: null,
          messageData: null,
          arr: null,
          is_tongzhi: true,
          is_Message: false,
          is_dialogue_click: true,
          lineUpObj: {},
          mynotify: null,
          icon_rotate: {
            icon1: '1',
            icon2: '1',
            icon3: '1'
          },
          clueData: null
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {
        // 通知
        inform (name, url) {
          // this.$electron.ipcRenderer.send('asynchronous-message', 'ping');
          Notification.requestPermission();
          let notification = new Notification('提示', {
            body: '你有一位新客户' + name,
            icon: url
          });
          setTimeout(() => {
            notification.close();
          }, 10000);
        },
        // 请求会话列表数据
        getDialogueList (res) {
          if (res) {
            this.data3.length = 0;
            // 等待列表
            this.data3 = res.queue_up;
            res.waiting.forEach((k) => {
              this.data2.push(k);
            });
            // 去重
            let arr = [];
            let json = {};
            this.data2.forEach((k) => {
              json[k.customer_wx_openid] = k;
            });
            for (let k in json) {
              arr.push(json[k]);
            }
            this.data2 = arr;
            // 检测是否 线索页面接入客服
            let sess = this.clueData.data.body ? this.clueData.data.body.session_id : '';
            if (sess !== '') {
              this.data2.forEach((k) => {
                if (k.session_id === sess) {
                  // Object.assign(k, {'is_class': false});
                  this.clientData = k;
                  this.is_w_v = 2;
                  this.clientDataIndex = 0;
                  this.underwayPopupFun();
                  this.clueData.data.body = null;
                }
              });
            }
          };
        },
        // 等待中---》点击加入会话列表
        waitingFun (k) {
          this.clientName = k[0].obj.customer_wx_nickname;
          this.clientData = k[0].obj;
          this.popup1 = true;
        },
        // 会话中---》点击进入会话
        underwayFun (k, i) {
          let that = this;
          let arr = [];
          let db = new DB();
          that.is_dialogue_click = true;
          that.messageData = k;
          that.data1.forEach((k) => {
            k['is_class'] = false;
          });
          that.data1[i]['is_class'] = true;
          that.data1[i]['sum'] = 0;
          Object.assign(that.messageData, {'data': null});
          // 获取选择客户的相关数据
          db.type = 'get'; // 执行类型
          db.tabName = 'message'; // 数据表名称
          db.fun = function (res) { // 执行成功回掉函数
            res.forEach((k) => {
              if (k.customer_wx_openid === that.messageData.customer_wx_openid) {
                arr.push(k);
              }
            });
            that.arr = arr;
            that.messageData.data = arr;
            // that.messageData.data = arr;
            // 调用自定义事件传递数据到 聊天窗口
            let obj = {
              common: true,
              information: true,
              record: true,
              remind: false,
              type: 'mess'
            };
            if (arr.length === 0) {
              that.getWxUserInfo(that.messageData, obj);
            } else {
              Bus.$emit('change', that.messageData, obj);
            }
            db.close();
          };
        },
        // 获取微信用户基本信息
        getWxUserInfo (d, obj) {
          this.ajax.getWxUserInfo({
            data: {
              appid: d.appid,
              openid: d.customer_wx_openid
            },
            success: (res) => {
              this.userData = res.body;
              this.is_Loading = false;
              Bus.$emit('change', this.messageData, obj, res);
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.waiting(res.meta.message);
            }
          });
        },
        // 确定加入会话
        underwayPopupFun () {
          let that = this;
          let k = this.clientData;
          that.is_Loading = true;
          that.ajax.sessionAccess({
            data: {
              session_id: this.clientData.session_id
            },
            success: (res) => {
              // 更新相关数据
              let db2 = new DB();
              db2.type = 'update'; // 执行类型
              db2.tabName = 'visitor'; // 数据表名称
              Object.assign(k, {'is_class': false});
              db2.data = [k];
              db2.fun = function (res) { // 执行成功回掉函数
                db2.close();
                that.getWaitingTab();
              };
              if (that.is_w_v === 2) {
                // 删除等待数据表中的数据
                let db = new DB();
                db.type = 'remove'; // 执行类型
                db.tabName = 'waiting'; // 数据表名称
                db.key = k.customer_wx_openid;
                db.fun = function (res) { // 执行成功回掉函数 1531
                  db.close();
                };
                console.log(this.data2[this.clientDataIndex]);
                that.data1.unshift(this.data2[this.clientDataIndex]);
                that.data2.splice(this.clientDataIndex, 1);
              } else if (that.is_w_v === 3) {
                // 删除排队中的数据
                let db1 = new DB();
                db1.type = 'remove'; // 执行类型
                db1.tabName = 'queue_up'; // 数据表名称
                db1.key = k.customer_wx_openid;
                db1.fun = function (res) { // 执行成功回掉函数 5445546
                  db1.close();
                };
                that.data1.unshift(this.data3[this.clientDataIndex]);
                that.data3.splice(this.clientDataIndex, 1);
              }
              that.is_Loading = false;
              that.clientName = '';
            },
            error: (res) => {
              that.is_Loading = false;
              that.$Message.warning(res.meta.message);
            }
          });
        },
        // 结束会话
        endFun () {
          let k = this.clientName;
          this.is_Loading = true;
          this.ajax.closeSession({
            data: {
              session_list: [k.session_id]
            },
            success: (res) => {
              if (this.is_w_v === 1) {
                let db1 = new DB();
                db1.type = 'remove'; // 执行类型
                db1.tabName = 'visitor'; // 数据表名称
                db1.key = k.customer_wx_openid;
                db1.fun = function (res) { // 执行成功回掉函数
                  db1.close();
                };
                this.data1.splice(this.clientDataIndex, 1);
              } else if (this.is_w_v === 2) {
                let db = new DB();
                db.type = 'remove'; // 执行类型
                db.tabName = 'waiting'; // 数据表名称
                db.key = k.customer_wx_openid;
                db.fun = function (res) { // 执行成功回掉函数
                  db.close();
                };
                this.data2.splice(this.clientDataIndex, 1);
              }
              this.messageData = {
                add_time: '',
                app_name: '',
                appid: '',
                company_id: '',
                customer_service_id: '',
                customer_wx_nickname: '',
                customer_wx_openid: '',
                customer_wx_portrait: '',
                data: [],
                invitation_frequency: '',
                session_frequency: '',
                session_id: '',
                state: '',
                uid: ''
              };
              let obj = {
                common: false,
                information: false,
                record: false,
                remind: false,
                type: 'close'
              };
              Bus.$emit('change', this.messageData, obj, {});
              this.is_Loading = false;
              this.clientName = '';
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 获取正在会话列表中客户会话数据
        getMessage (res) {
          for (let k in res) {
            res[k].forEach((s) => {
              // 判断是否当前选择的客户 并添加数据
              if (s.customer_wx_openid === this.messageData.customer_wx_openid) {
                this.arr.push(s);
              } else {
                // 如果收到的不是当前选择的客户， 就把这个客户放在会话列表的第一位
                this.data1.forEach((s, i) => {
                  if (s.customer_wx_openid === k) {
                    s.sum += 1;
                    let arr = s;
                    this.data1.splice(i, 1);
                    this.data1.unshift(arr);
                  }
                });
              }
            });
            // Bus.$emit('change', that.messageData);
          }
        },
        // 点击列表头动态隐藏效果
        telFun (t) {
          if (t === 'list1') {
            let e = this.$refs.list1;
            let h = e.offsetHeight;
            e.style.height = h === 0 ? this.data1.length * 67 + 'px' : 0 + 'px';
            this.icon_rotate.icon1 = h === 0 ? '1' : '2';
          } else if (t === 'list2') {
            let e = this.$refs.list2;
            let h = e.offsetHeight;
            e.style.height = h === 0 ? this.data2.length * 67 + 'px' : 0 + 'px';
            this.icon_rotate.icon2 = h === 0 ? '1' : '2';
          } else if (t === 'list3') {
            let e = this.$refs.list3;
            let h = e.offsetHeight;
            e.style.height = h === 0 ? this.data3.length * 67 + 'px' : 0 + 'px';
            this.icon_rotate.icon3 = h === 0 ? '1' : '2';
          }
        },
        // 调用本地数据库 获取客户表的数据
        getWaitingTab () {
          let that = this;
          let db = new DB();
          // 读取等待数据表中的数据
          db.type = 'get'; // 执行类型
          db.tabName = 'waiting'; // 数据表名称
          db.fun = function (res) { // 执行成功回掉函数
            that.data2 = res;
            db.close();
          };
          // 读取会话数据表中的数据
          let db1 = new DB();
          db1.type = 'get'; // 执行类型
          db1.tabName = 'visitor'; // 数据表名称
          db1.fun = function (res) { // 执行成功回掉函数
            if (res.length === 0) {
              db1.close();
              // 如果数据库没有数据 就向服务器请求数据
              that.getVisitorTab();
              that.is_Message = true;
            } else {
              res.forEach((k) => {
                Object.assign(k, {'is_class': false});
                Object.assign(k, {'sum': 0});
              });
              that.is_Message = false;
              that.data1 = res;
              // 默认选择 会话客户
              let arr = sort.sortFun(res, 'add_time');
              arr.reverse();
              that.data1[0]['is_class'] = true;
              that.underwayFun(res[0], 0);
              db1.close();
            }
          };
          // 调用请求客户聊天信息AJAX
          // waiting
        },
        // 读取会话表中的人员
        getVisitorTab () {
          let that = this;
          that.ajax.getAlreadyAccess({
            data: {},
            success: (res) => {
              res.body.forEach((k) => {
                k['sum'] = 0;
              });
              let data = res.body;
              that.data1 = data;
              that.underwayFun(data[0], 0);
              let db2 = new DB();
              db2.type = 'set'; // 执行类型
              db2.tabName = 'visitor'; // 数据表名称
              db2.data = data;
              db2.fun = function (res) { // 执行成功回掉函数
                db2.close();
              };
            },
            error: (res) => {
              that.Message.warning(res.meta.message);
            }
          });
        },
        // 排队 接入会话
        addDialogueFun (k, i) {
          let that = this;
          that.clientName = k.customer_wx_nickname;
          that.clientData = k;
          that.clientDataIndex = i;
          that.is_w_v = 3;
          that.ajax.accessQueuingSession({
            data: {
              session_id: k.session_id
            },
            success: () => {
              delete this.lineUpObj[k.session_id];
              that.data3.splice(i, 1);
              let db2 = new DB();
              db2.type = 'update'; // 执行类型
              db2.tabName = 'visitor'; // 数据表名称
              db2.data = [k];
              db2.fun = function (res) { // 执行成功回掉函数
                db2.close();
                that.getWaitingTab();
              };
            },
            error: (res) => {
              that.$Message.warning(res.meta.message);
            }
          });
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
          let dialogueArr = this.data3;
          this.global.dialogueArr = dialogueArr;
          // this.$electron.ipcRenderer.send('setCookie', JSON.stringify(dialogueArr));
        }
      },
      destroyed (s) {
        let db2 = new DB();
        db2.type = 'update'; // 执行类型
        db2.tabName = 'visitor'; // 数据表名称
        db2.data = this.data1;
        db2.fun = function (res) { // 执行成功回掉函数
          db2.close();
        };
      },
      created () {
        this.clueData = this.$route.query;
        // 调用本地数据库 获取储存的数据
        // Notification.requestPermission();
        this.getWaitingTab();
        // this.getLossDialogueFun();
        Bus.$on('conversationList', (k) => {
          this.getDialogueList(k);
        });
        Bus.$on('MessageList', (k) => {
          this.getMessage(k);
        });
        // store.state['dialogueArr'] = '132123123';
        // this.$electron.ipcRenderer.send('getCookie');
        // this.$electron.ipcRenderer.on('getLossDialogueFun', (e, s) => {
        // this.getLossDialogueFun(s[0].value);
        // });
      }
    };
</script>
