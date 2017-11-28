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
                   <li v-for="(k, i) in data1" v-bind:class="data1Index == i ? 'active' : ''" @click.stop="underwayFun(k, i), data1Index = i">
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
          data1Index: null
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {
        // 请求会话列表数据
        getDialogueList () {
          this.ajax.getSessionList({
            data: {},
            success: (res) => {
              res.body.queue_up.forEach((k) => {
                this.data3.push(k);
              });
              res.body.waiting.forEach((k) => {
                this.data2.push(k);
              });
              let db = new DB();
              db.type = 'update'; // 执行类型
              db.tabName = 'waiting'; // 数据表名称
              db.data = res.body.waiting;
              db.fun = function (res) { // 执行成功回掉函数
                console.log(res, 'DB --- 等待会话数据添加成功');
              };
              let db1 = new DB();
              db1.type = 'update'; // 执行类型
              db1.tabName = 'queue_up'; // 数据表名称
              db1.data = res.body.queue_up;
              db1.fun = function (res) { // 执行成功回掉函数
                console.log(res, 'DB --- 排队数据添加成功');
              };
              // 会话中的客户数据
              // res.body.contacting_session['data'] = [];
              // res.body.pending_access_session['data'] = [];
              // 等待中的客户数据
              // this.getMessage();
              this.getDialogueList();
            },
            error: (res) => {
              if (res === undefined) {
                this.getDialogueList();
              }
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 等待中---》点击加入会话列表
        waitingFun (k) {
          this.clientName = k[0].obj.customer_wx_nickname;
          this.clientData = k[0].obj;
          this.popup1 = true;
          console.log(k, 156789798795);
        },
        // 会话中---》点击进入会话
        underwayFun (k) {
          Bus.$emit('change', k);
        },
        // 确定加入会话
        underwayPopupFun () {
          let k = this.clientData;
          console.log(k);
          this.is_Loading = true;
          this.ajax.sessionAccess({
            data: {
              session_id: this.clientData.session_id
            },
            success: (res) => {
              let db2 = new DB();
              db2.type = 'update'; // 执行类型
              db2.tabName = 'visitor'; // 数据表名称
              db2.data = [k];
              db2.fun = function (res) { // 执行成功回掉函数
              };
              if (this.is_w_v === 2) {
                let db = new DB();
                db.type = 'remove'; // 执行类型
                db.tabName = 'waiting'; // 数据表名称
                db.key = k.customer_wx_openid;
                db.fun = function (res) { // 执行成功回掉函数
                };
                this.data1.push(this.data2[this.clientDataIndex]);
                this.data2.splice(this.clientDataIndex, 1);
              } else if (this.is_w_v === 3) {
                let db1 = new DB();
                db1.type = 'remove'; // 执行类型
                db1.tabName = 'queue_up'; // 数据表名称
                db1.key = k.customer_wx_openid;
                db1.fun = function (res) { // 执行成功回掉函数
                };
                this.data1.push(this.data3[this.clientDataIndex]);
                this.data3.splice(this.clientDataIndex, 1);
              }
              this.getDialogueList();
              this.is_Loading = false;
              this.clientName = '';
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
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
                  console.log(res);
                };
                this.data1.splice(this.clientDataIndex, 1);
              } else if (this.is_w_v === 2) {
                let db = new DB();
                db.type = 'remove'; // 执行类型
                db.tabName = 'waiting'; // 数据表名称
                db.key = k.customer_wx_openid;
                db.fun = function (res) { // 执行成功回掉函数
                  console.log(res);
                };
                this.data2.splice(this.clientDataIndex, 1);
              }
              this.getDialogueList();
              Bus.$emit('change', {});
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
        getMessage () {
          let arr = this.data1.map((k) => {
            return k.session_id;
          });
          this.ajax.getMessage({
            data: {
              session_list: arr
            },
            success: (res) => {
              this.data1.forEach((k) => {
                let id = k.session_id;
                if (res.body[id]) {
                  k['data'] = res.body[id];
                }
              });
              if (this.data1Index !== null) {
                this.underwayFun(this.data1[this.data1Index]);
              }
              this.getMessage();
            },
            error: (res) => {
              if (res === undefined) {
                this.getMessage();
              }
              this.$Message.warning(res.meta.message);
            }
          });
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
        // 读取等待会话表中的数据
        getWaitingTab () {
          let that = this;
          let db = new DB();
          db.type = 'get'; // 执行类型
          db.tabName = 'waiting'; // 数据表名称
          db.fun = function (res) { // 执行成功回掉函数
            that.data2 = res;
          };
          let db1 = new DB();
          db1.type = 'get'; // 执行类型
          db1.tabName = 'visitor'; // 数据表名称
          db1.fun = function (res) { // 执行成功回掉函数
            that.data1 = res;
          };
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
        // this.longTime();
        // this.longTimeData();
        this.getDialogueList();
        this.getWaitingTab();
      }
    };
</script>
