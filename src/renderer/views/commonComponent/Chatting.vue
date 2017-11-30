<style scoped lang="less">
.chart{
  position: relative;
}
.user-top{
    height: 40px;
    box-sizing: border-box;
    border-bottom: 1px #eaeaea solid;
    display: flex;
    align-items: center;
    .name{
        font-weight: bold;
        font-size: 14px;
        color: #1a1a1a;
        margin-left: 10px;
    }
    .txt{
        color: #999;
        margin-left: 10px;
    }
}
    .chart-win{
        height: 600px;
        border-bottom: 1px #eaeaea solid;
        background-color: #f2f2f2;
        .content-box{
            text-align: left;margin: 10px 0;
            width: 97%;
            .graphic{
                display: inline-block
            }
            .crate{
                display: inline-block;
                position: relative;
                background-color: #fff;
                padding: 10px;
                border-radius: 8px;
                max-width: 70%;
                vertical-align: top;
                .arrow_out {
                    position: absolute;
                    display: inline-block;
                    top: 15px;
                    width: 0;
                    height: 0;
                    border-width: 6px;
                    border-style: dashed;
                    border-color: transparent;
                    border-bottom-width: 0;
                    border-top-color: #fff;
                    border-top-style: solid;
                }
                .arrow_in {
                    position: absolute;
                    display: inline-block;
                    top: 15px;
                    width: 0;
                    height: 0;
                    border-width: 6px;
                    border-style: dashed;
                    border-color: transparent;
                    border-bottom-width: 0;
                    border-top-color: #fff;
                    border-top-style: solid;
                }
            }
        }
    }
    .is_mass_chart{
        height: 400px;
    }
    .chart-icon{
        height: 60px;
        overflow: hidden;
        line-height: 60px;
        border-bottom: 1px #eaeaea solid;
        span{
          font-size: 30px;
          padding:0 8px;
          cursor: pointer;
          border-radius: 2px;
          color: #999;
        }
        span:hover{
          background-color: #f7f7f7;
        }

    }
    .chart-txt{
       position: absolute;
        top:700px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 5px;
        box-sizing: border-box;
        .txt{
            height: 100%;
            width: 100%;
            border: 0;
            outline: 0;
            resize : none;
        }
        .btm{
            position: absolute;
            bottom: 0;
            left: 0;
            right:0;
            box-sizing: border-box;
            padding: 10px;
        }
    }
    .is_mass_chart-txt{
        position: relative;
        height: 200px;
        top:0;
    }
    .percent{
        position: relative;
        top: -18px;
    }
</style>
<template>
  <div class="chart-box">
     <div class="user-top" v-if="isMass ? false : true">
         <Avatar :src="clientData.customer_wx_portrait" style="margin-left: 5px"/>
         <span class="name">{{clientData.customer_wx_nickname}}</span>
         <span class="txt">来访：{{clientData.session_frequency}}次</span>
         <span class="txt">主动邀请：{{clientData.invitation_frequency}}次</span>
         <span class="txt">来自：{{clientData.app_name}}</span>
         <span v-if="isAdministrator" style="position: absolute;right: 15px;">
             <Button  type="ghost" class="btn-r">领导评价</Button>
         </span>

     </div>
     <div class="chart-win" ref="win" v-bind:class="{'is_mass_chart':isMass}" style="width: 100%;overflow-y: auto;position: relative;">
         <div ref="win1">
             <div v-for="k in elmetArr" >
                 <div class="content-box"  v-if="k.opercode == 2">
                     <div class="graphic" ><Avatar :src="clientData.customer_wx_portrait" style="margin-left: 5px"/></div>
                     <div class="crate" style="left: 10px">
                         <div style="display: inline-block">
                             <span v-if="k.message_type == 1">{{k.text}}</span>
                             <img  v-if="k.message_type == 2" :src="k.file_url" alt="" style="max-height: 400px;max-width: 360px"  v-on:load="loadFun">
                             <Button v-if="k.message_type == 4" type="dashed" @click="mp4Url = 'http://kf.lyfz.net/api/v1/we_chat/Business/getMaterial?company_id=' + k.company_id + '&appid=' + k.appid + '&media_id=' + k.media_id + '&type=2',popup2 = true"><Icon type="play"></Icon>视频文件</Button>
                         </div>
                         <i class="arrow arrow_out" style="left: -10px;transform: rotate(90deg);"></i>
                         <i class="arrow arrow_in" style="left: -9px;transform: rotate(90deg);"></i>
                     </div>
                 </div>
                 <div class="content-box" style="text-align: right" v-if="k.opercode == 1">
                     <div class="crate" style="right: 10px;background-color: #66cc00;">
                         <div style="display: inline-block;">
                             <span v-if="k.message_type == 1" style="color: #1a1a1a">{{k.text}}</span>
                             <img  v-if="k.message_type == 2" :src="k.file_url" alt="" style="max-height: 400px;max-width: 360px">
                             <video v-if="k.message_type == 4"  width="320" height="240" controls style="background-color: #fff;">
                                 <source :src="k.file_url" type="video/mp4">
                                 您的浏览器不支持Video标签。
                             </video>
                         </div>
                         <i class="arrow arrow_out" style="right: -10px;transform: rotate(270deg);border-top-color: #66cc00"></i>
                         <i class="arrow arrow_in" style="right: -9px;transform: rotate(270deg);border-top-color: #66cc00"></i>
                     </div>
                     <div class="graphic" ><Avatar :src="userInfo.avatar_url" style="margin-right: 5px"/></div>
                 </div>
             </div>
         </div>
         <div class="percent" v-if="is_percent">
             <Progress :percent="up_state"></Progress>
         </div>
         <div v-if="isMass">
             <Tabs value="name1">
                 <TabPane label="48小时内" name="name1"></TabPane>
                 <TabPane label="48小时外" name="name2"></TabPane>
             </Tabs>
             <div>
                 <Table border ref="selection" :columns="columns4" :data="data1"></Table>
             </div>
         </div>
     </div>
     <div class="chart-icon">
        <span style="color: #333" title="语音" @click="popup3 = true,replyType = 5"><Icon type="ios-mic"></Icon></span>
        <span style="color: #ff9933" title="表情"><Icon type="happy-outline"></Icon></span>
        <span style="color: #333" title="截图"><Icon type="scissors"></Icon></span>
         <Upload style="display: inline-block;"  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                  name="file" :data="{resources_type: 1}"
                  :max-size='1024'
                  :format="['jpg','jpeg','png','gif']"
                  :show-upload-list="false"
                  :before-upload="handleBeforeUpload"
                  :headers="{token: userInfo.token}"
                  :on-progress="upLodingFun"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :on-success="upImgFun">
             <span style="color: #ffcc33" title="图片" @click="replyType = 2"><Icon type="image"></Icon></span>
         </Upload>
         <Upload style="display: inline-block;"  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                 name="file" :data="{resources_type: 1}"
                 :max-size='10240'
                 :format="['mp4']"
                 :show-upload-list="false"
                 :before-upload="handleBeforeUpload"
                 :headers="{token: userInfo.token}"
                 :on-progress="upLodingFun"
                 :on-format-error="handleFormatError"
                 :on-exceeded-size="handleMaxSize"
                 :on-success="upMp4Fun">
             <span style="color: #ffcc33" title="视频" @click="replyType = 4"> <Icon type="ios-film-outline"></Icon></span>
         </Upload>
        <span style="color: #99ccff" title="超链接"><Icon type="link"></Icon></Icon></span>
        <span style="color: #996600" title="模板消息"><Icon type="ios-albums-outline"></Icon></span>
        <!--<span style="color: #9999cc" title="群聊"><Icon type="android-person-add"></Icon></span>-->
        <!--<span style="color: #cccc99" title="转发"><Icon type="android-share-alt"></Icon></span>-->
        <!--<span style="color: #ff99cc" title="发送满意度"><Icon type="thumbsup"></Icon></span>-->
        <!--<span style="color: #ccff66" title="下次联系提醒"><Icon type="ios-lightbulb"></Icon></span>-->
        <!--<span style="color: #333399" title="退出"><Icon type="log-out"></Icon></span>-->
     </div>
     <div class="chart-txt" v-bind:class="{'is_mass_chart-txt':isMass}">
         <textarea v-model="txtra"  class="txt" @click="replyType = 1"></textarea>
         <!--<input class="txt"  @keyup.enter="subFun" style="opacity: 0; position: absolute; z-index: 10;width: 98%;height: 95%;" @focus="ipt">-->
         <!--<textarea ref="txtra" class="txt" @blur="focusState = false" v-focus="focusState" style="position: absolute;z-index: 1;width: 98%;height: 95%;"></textarea>-->
         <div class="btm" style="z-index: 100">
             <Button class="f-r" type="primary" size="small" @click="subFun">发送</Button>
         </div>
     </div>


      <!-- 视频弹窗弹窗 -->
      <Modal v-model="popup2" title="提示">
          <video v-if="popup2" width="420" height="320"  controls autoplay style="background-color: #fff;">
              <source :src="mp4Url" type="video/mp4" >
              您的浏览器不支持Video标签1231。
          </video>
      </Modal>
      <!-- end视频弹窗弹窗 -->


      <!-- 音频弹窗 -->
      <Modal v-model="popup3" title="提示">
          <div style="padding: 10px">
              <Button  type="primary" size="small" @click="voiceFun">开始录音</Button>
              <Button  type="primary" size="small" @click="obtainRecord">发送录音</Button>
              <Button  type="primary" size="small" @click="stopRecord">停止录音</Button>
              <Button  type="primary" size="small" @click="playRecord">播放录音</Button>
          </div>
          <div style="padding: 10px">
              <audio controls autoplay ref="audio"></audio>
          </div>
      </Modal>
      <!-- end音频弹窗 -->


      <!-- 加载状态 -->
      <Spin fix v-if="is_Loading">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>发送中....</div>
      </Spin>
      <!-- end加载状态 -->
  </div>
</template>
<script>
    import HZRecorder from './luyin';
    import Bus from '../../assets/eventBus';
    import DB from '../../assets/webDB';
    export default {
      data () {
        return {
          columns4: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '客户姓名',
              key: 'name'
            },
            {
              title: '产品',
              key: 'age'
            },
            {
              title: '微信名称',
              key: 'address'
            },
            {
              title: '公司名称',
              key: 'address'
            },
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '详情'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          data1: [
            {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
            },
            {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
            },
            {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
            },
            {
              name: 'Jon Snow',
              age: 26,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
            }
          ],
          clientData: {},
          elmetArr: [],
          focusState: false,
          txtra: '',
          replyType: 1,
          datalistArr: [],
          is_Loading: false,
          userInfo: null,
          popup2: false,
          popup3: false,
          animal: 1,
          upFileData: null,
          imgData: '',
          is_percent: false,
          up_state: 0,
          mp4Data: null,
          mp4Url: '',
          recorder: null,
          audioData: null
        };
      },
      components: {
        HZRecorder
      },
      mounted () {
      },
      props: {
        isMass: {
          type: Boolean,
          default: false
        },
        isAdministrator: {
          type: Boolean,
          default: false
        }
      },
      beforeDestroy () {
      },
      // directives: {
      // focus: {
      // update: function (el, {value}) {
      // if (value) {
      // el.focus();
      // }
      // }
      // }
      // },
      methods: {
        // 获取会话客户相关数据
        getclientData () {
        },
        // 创建txt文本
        txt (t) {
          return {
            render: (h) => {
              return h('span', t);
            }
          };
        },
        // 发送信息
        subFun (e) {
          let data;
          if (this.replyType === 1) {
            // 组合普通文字相关数据
            if (!this.clientData.session_id) {
              this.$Message.warning('请选择会话客户');
              return;
            }
            if (this.txtra === '') {
              this.$Message.warning('请输入内容');
              return;
            }
            data = {
              session_id: this.clientData.session_id,
              message: this.txtra,
              type: this.replyType
            };
          } else if (this.replyType === 2) {
            // 组合图片相关数据
            if (!this.clientData.session_id) {
              this.$Message.warning('请选择会话客户');
              return;
            }
            data = {
              session_id: this.clientData.session_id,
              message: '',
              resources_id: this.imgData.resources_id,
              type: this.replyType
            };
          } else if (this.replyType === 4) {
            data = {
              session_id: this.clientData.session_id,
              message: '',
              resources_id: this.mp4Data.resources_id,
              type: this.replyType
            };
          }
          this.is_Loading = true;
          this.ajax.sendMessage({
            data: data,
            success: (res) => {
              this.is_Loading = false;
              let obj;
              if (this.replyType === 1) {
                obj = {
                  add_time: this.getAtTimeFun(),
                  appid: '',
                  company_id: '',
                  customer_service_id: 4,
                  customer_wx_openid: this.datalistArr.customer_wx_openid,
                  message_id: '',
                  message_type: 1,
                  opercode: 1,
                  session_id: this.clientData.session_id,
                  text: this.txtra,
                  uid: this.datalistArr.uid
                };
              } else if (this.replyType === 2) {
                obj = {
                  add_time: this.getAtTimeFun(),
                  appid: '',
                  company_id: '',
                  customer_service_id: 4,
                  customer_wx_openid: this.datalistArr.customer_wx_openid,
                  message_id: '',
                  message_type: 2,
                  opercode: 1,
                  file_url: this.imgData.url,
                  resources_id: this.imgData.resources_id,
                  session_id: this.clientData.session_id,
                  text: this.txtra,
                  uid: this.datalistArr.uid
                };
              } else if (this.replyType === 4) {
                obj = {
                  add_time: this.getAtTimeFun(),
                  appid: '',
                  company_id: '',
                  customer_service_id: 4,
                  customer_wx_openid: this.datalistArr.customer_wx_openid,
                  message_id: '',
                  message_type: 4,
                  opercode: 1,
                  file_url: this.mp4Data.url,
                  resources_id: this.mp4Data.resources_id,
                  session_id: this.clientData.session_id,
                  text: this.txtra,
                  uid: this.datalistArr.uid
                };
              }
              this.is_percent = false;
              this.clientData.data.push(obj);
              this.scroFun();
              this.updbFun(obj);
              this.txtra = '';
            },
            error: (res) => {
              this.is_percent = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 语音
        voiceFun () {
          let that = this;
          HZRecorder.get(function (res) {
            that.recorder = res;
            that.recorder.start();
          });
        },
        obtainRecord () {
          // var record = this.recorder.getBlob();
          console.log(this.recorder);
          let url = 'http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources';
          this.recorder.upload(url, function (res) {
            console.log(res);
          });
        },
        stopRecord () {
          this.recorder.stop();
        },
        playRecord () {
          this.recorder.play(this.$refs.audio);
        },
        // updbFun 添加发送的数据到本地数据库
        updbFun (obj) {
          let db = new DB();
          db.type = 'set';
          db.tabName = 'message';
          db.data = [obj];
          db.fun = function (res) {
            console.log('DB---》添加数据成功');
            db.close();
          };
        },
        // 自动设置滚动条最底部
        scroFun () {
          setTimeout(() => {
            let div1 = this.$refs.win1;
            let div = this.$refs.win;
            div.scrollTop = div1.offsetHeight;
          }, 100);
        },
        // 实时获取当前时间并返回字符串 */
        getAtTimeFun () {
          let date = new Date();
          let yaer = date.getFullYear(); // 年
          let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1); // 月
          let dey = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); // 天
          let houres = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); // 时
          let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); // 分
          let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); // 秒
          return '' + yaer + '-' + month + '-' + dey + ' ' + houres + ':' + minutes + ':' + seconds;
        },
        // 上传图片成功方法
        upImgFun (e) {
          this.imgData = e.body;
          this.subFun();
        },
        // 上传MP4成功方法
        upMp4Fun (e) {
          this.mp4Data = e.body;
          this.subFun();
        },
        // 上传中的方法
        upLodingFun (e) {
          this.up_state = parseInt(e.percent);
          console.log(e, 123789789213);
        },
        // 上传之前
        handleBeforeUpload (e) {
          this.is_percent = true;
          this.upFileData = e;
        },
        handleFormatError (file) {
          this.is_percent = false;
          if (this.replyType === 2) {
            this.$Message.warning('文件格式不正确');
          } else if (this.replyType === 4) {
            this.$Message.warning('文件格式不正确，请选择mp4文件');
          }
        },
        handleMaxSize (file) {
          this.is_percent = false;
          if (this.replyType === 2) {
            this.$Message.warning('文件过大，请选择小于1MB的图片');
          } else if (this.replyType === 4) {
            this.$Message.warning('文件过大，请选择小于10MB的mp4文件');
          }
        },
        loadFun (e) {
          this.scroFun();
        }
      },
      watch: {
        elmetArr: function (v) {
          let arr = v[v.length - 1];
          if (arr.message_type === 2) {
          } else {
            this.scroFun();
          }
        }
      },
      created () {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        Bus.$on('change', (k) => {
          this.elmetArr.length = 0;
          this.elmetArr = k.data;
          this.clientData = k;
          // this.elmetArr.length = k.data.length + 1;
          // 取到数据最后一个数组， 便于添加数据 取最新相关数据
          this.datalistArr = k.data[k.data.length - 1];
          // 滚动条自动设置底部
        });
      }
    };
</script>
