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
            }
            .tle:hover{
                color: #3399ff;
            }
            .list{
                transition: all .3s;
                overflow: hidden;
                li{
                    position: relative;
                    padding: 5px;
                    cursor: pointer;
                    border-bottom: 1px #f7f7f7 dashed;
                    transition: all .3s;
                    .picture{
                        width: 50px;
                        width: 50px;
                        img{
                            height: 100%;
                            width: 100%;
                        }
                    }
                    .txt{
                        position: absolute;
                        left: 60px;
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
                    background-color: #fff;
                }
            }
        }
    }
</style>
<template>
   <div>
       <Row>
           <Col :xs="24"  :lg="12">
             <div class="btn active">
               访客
             </div>
           </Col>
           <Col :xs="24"  :lg="12">
              <div class="btn">
                 团队
              </div>
           </Col>
       </Row>
       <div class="person">
           <div class="list-box">
               <div class="tle" @click="telFun('list1')" style="border-bottom: 1px #fff solid">
                   <Icon type="arrow-right-b"></Icon>
                   会话中
               </div>
               <ul ref="list1" class="list" :style="'height:' + data1.length * 66 + 'px'">
                   <li v-for="(k, i) in data1" v-bind:class="data1Index == i ? 'active' : ''" @click.stop="underwayFun(k), data1Index = i">
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
               <div class="tle" @click.stop="telFun('list2')">
                   <Icon type="arrow-right-b"></Icon>
                   等待中
               </div>
               <ul ref="list2" class="list" :style="'height:' + data2.length * 66 + 'px'">
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
               <div class="tle" @click.stop="telFun('list3')">
                   <Icon type="arrow-right-b"></Icon>
                   排队中
               </div>
               <ul ref="list3" class="list" :style="'height:' + data3.length * 66 + 'px'">
                   <li v-for="(k, i) in data3" @click.stop="popup1 = true,clientName = k.customer_wx_nickname,clientData = k,clientDataIndex = i, is_w_v = 3">
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
           <!--<Tree :data="data1" @on-select-change="underwayFun"></Tree>-->
           <!--<Tree :data="data2" @on-select-change="waitingFun"></Tree>-->
           <!--<Tree :data="data3"></Tree>-->
           <!--<Tree :data="data4"></Tree>-->
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
          clientData: null,
          clientDataIndex: null,
          is_w_v: null,
          is_Loading: false,
          data1Index: null,
          messageData: null,
          arr: null,
          is_tongzhi: true,
          is_Message: false,
          is_dialogue_click: true
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {
        // 请求会话列表数据
        getDialogueList (res) {
          res.body.queue_up.forEach((k) => {
            // 排队列表
            if (this.data3.length === 0) {
              this.data3.push(k);
            } else {
              this.data3.forEach((s) => {
                if (k.customer_wx_openid !== s.customer_wx_openid) {
                  this.data3.push(k);
                }
              });
            }
          });
          // 等待列表
          res.body.waiting.forEach((k) => {
            if (this.data2.length === 0) {
              this.data2.push(k);
            } else {
              this.data2.forEach((s) => {
                if (k.customer_wx_openid !== s.customer_wx_openid) {
                  this.data2.push(k);
                }
              });
            }
          });
        },
        // 等待中---》点击加入会话列表
        waitingFun (k) {
          this.clientName = k[0].obj.customer_wx_nickname;
          this.clientData = k[0].obj;
          this.popup1 = true;
        },
        // 会话中---》点击进入会话
        underwayFun (k) {
          let that = this;
          let arr = [];
          let db = new DB();
          that.is_dialogue_click = true;
          that.messageData = k;
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
            Bus.$emit('change', that.messageData);
            db.close();
          };
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
                db.fun = function (res) { // 执行成功回掉函数
                  db.close();
                };
                that.data1.unshift(this.data2[this.clientDataIndex]);
                that.data2.splice(this.clientDataIndex, 1);
              } else if (that.is_w_v === 3) {
                // 删除排队中的数据
                let db1 = new DB();
                db1.type = 'remove'; // 执行类型
                db1.tabName = 'queue_up'; // 数据表名称
                db1.key = k.customer_wx_openid;
                db1.fun = function (res) { // 执行成功回掉函数
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
              Bus.$emit('change', this.messageData);
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
          for (let k in res.body) {
            res.body[k].forEach((s) => {
              // 判断是否当前选择的客户 并添加数据
              if (s.customer_wx_openid === this.messageData.customer_wx_openid) {
                this.arr.push(s);
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
            e.style.height = h === 0 ? this.data1.length * 66 + 'px' : 0 + 'px';
          } else if (t === 'list2') {
            let e = this.$refs.list2;
            let h = e.offsetHeight;
            e.style.height = h === 0 ? this.data2.length * 66 + 'px' : 0 + 'px';
          } else if (t === 'list3') {
            let e = this.$refs.list3;
            let h = e.offsetHeight;
            e.style.height = h === 0 ? this.data3.length * 66 + 'px' : 0 + 'px';
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
              that.ajax.getAlreadyAccess({
                data: {},
                success: (res) => {
                  let data = res.body;
                  that.data1 = data;
                  that.underwayFun(data[0]);
                  that.data1Index = 0;
                  db.type = 'set'; // 执行类型
                  db.tabName = 'waiting'; // 数据表名称
                  db.key = data;
                  db.fun = function (res) { // 执行成功回掉函数
                    db.close();
                  };
                },
                error: (res) => {
                  that.Message.warning(res);
                }
              });
              that.is_Message = true;
            } else {
              that.is_Message = false;
              that.data1 = res;
              // 默认选择 会话客户
              that.underwayFun(res[0]);
              that.data1Index = 0;
              db1.close();
            }
          };
          // 调用请求客户聊天信息AJAX
          // waiting
        },
        // 读取会话表中的人员
        getVisitorTab () {
          let db = new DB(); // 实例化本地数据库
          db.addData(
            // {name: 'visitor', data: res.body}
          );
          // waiting
        }
      },
      created () {
        // 调用本地数据库 获取储存的数据
        this.getWaitingTab();
        Bus.$on('conversationList', (k) => {
          this.getDialogueList(k);
        });
        Bus.$on('MessageList', (k) => {
          this.getMessage(k);
        });
      }
    };
</script>
