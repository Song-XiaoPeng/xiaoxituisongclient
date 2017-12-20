<style scoped lang="less">
    .record-box{
        padding: 10px;
        height: 100%;
        position: relative;
        .top{
            border-bottom: 1px #eaeaea solid;
        }
        .top>div{
            padding: 5px 0;

        }
        .middle{
            padding: 5px 0;
            border-bottom: 1px #eaeaea solid;
        }
        .list{

        }
    }
    .chart-win{
        border-bottom: 1px #eaeaea solid;
        background-color: #f2f2f2;
        transition: all .3s;
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
                padding: 5px;
                border-radius: 8px;
                max-width: 70%;
                vertical-align: top;
                .arrow_out {
                    position: absolute;
                    display: inline-block;
                    top: 12px;
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
                    top: 12px;
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
    .audio-box{
        display: inline-block;
        width: 50px;
        height: 50px;
        position: relative;
        vertical-align: bottom;
        cursor: pointer;
        .time{
            position: absolute;
            height: 14px;
            width: 34px;
            display: inline-block;
            top: 50%;
            margin-top: -7px;
            left: -48px;
        }
        .audio-loding{
            position: relative;
            height: 130%;
            width: 130%;
            top: -6px;
            left: -8px;
            img{
                height: 100%;
                width: 100%;
            }
        }
    }
    ul.img-txt{
        text-align: right;
        li{
            border-right: 1px #eaeaea solid;
            display: inline-block;
            padding: 0px 5px;
            cursor: pointer;
            transition: all .3s
        }
        li.active{
            color: #2db7f5;
        }
        li:hover{
            color: #2db7f5;
        }
        li:last-child{
            border-right: 0;
        }
    }
    @media all and (min-height:800px) and (max-height:1000px){
        .chart-win{
            height: 600px;
        }
        .chart-txt{
            top: 560px;
        }
        .form-box{
            height: 400px
        }
    }
    @media all and (min-height:1000px) and (max-height:1200px){
        .chart-win{
            height: 780px;
        }
        .chart-txt{
            top: 660px;
        }
        .form-box{
            height: 500px
        }
    }
    @media all and (min-height:1201px){
        .chart-win{
            height: 600px;
        }
        .chart-txt{
            top: 700px;
        }
        .form-box{
            height: 600px
        }
    }
</style>
<template>
   <div class="record-box">
       <!--<div class="top">-->
           <!--<div><span class="">来源：</span><span style="color: #999">网</span></div>-->
           <!--<div><span class="">会话次数：</span><span style="color: #999">5此</span></div>-->
           <!--<div><span class="">首次沟通：</span><span style="color: #999">2017-09-09 上海</span></div>-->
           <!--<div><span class="">最近沟通：</span><span style="color: #999">217-05-05 baij</span></div>-->
       <!--</div>-->
       <!--<div class="middle">-->
           <!--<Select v-model="model1" style="width:200px">-->
               <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
           <!--</Select>-->
           <!--<Select v-model="model1" style="width:200px">-->
               <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
           <!--</Select>-->
       <!--</div>-->
       <div class="list">
           <div class="chart-win" ref="win" style="width: 100%;overflow-y: auto;position: relative;">
               <div ref="win1">
                   <div v-for="(k, i) in elmetArr" >
                       <!---------------------------------- 客户消息 ------------------------------------>
                       <div class="content-box"  v-if="k.opercode == 2">
                           <div class="graphic" ><Avatar :src="clientData.customer_wx_portrait" style="margin-left: 5px"/></div>
                           <div class="crate" style="left: 10px">
                               <div style="display: inline-block">


                                   <!-- 普通文本 -->
                                   <pre v-if="k.message_type == 1" v-text="k.text" style="text-align: left; margin: 0; color: #3e3e3e;"></pre>
                                   <!-- end普通文本 -->


                                   <!-- 图片 -->
                                   <img  v-if="k.message_type == 2" :src="k.file_url" alt="" style="max-height: 300px;max-width: 240px;vertical-align: bottom"  v-on:load="loadFun">
                                   <!-- end图片 -->

                                   <!-- 视频 -->
                                   <Button v-if="k.message_type == 4" type="dashed" @click="mp4Url = 'http://kf.lyfz.net/api/v1/we_chat/Business/getMaterial?company_id=' + k.company_id + '&appid=' + k.appid + '&media_id=' + k.media_id + '&type=2',popup2 = true"><Icon type="play"></Icon>视频文件</Button>
                                   <audio  style="width: 200px;height: 100px" ></audio>
                                   <!-- end视频 -->

                                   <!-- 语音 -->
                                   <div v-if="k.message_type == 3" class="audio-box" @click="audioFun('audio' + i, k, i)">
                                       <!--<div class="audio-state" v-if="k.is_icon">12313212</div>-->
                                       <div class="audio-loding">
                                           <img v-if="k.is_icon" src="../../assets/images/3333.gif" alt="">
                                           <img v-if="k.is_icon == true ? false : true" src="../../assets/images/audio-start.png" alt="">
                                       </div>
                                       <audio :ref="'audio' + i" v-if="k.message_type == 3" v-on:loadedmetadata="audioTimeFun(k, 'audio' + i, i)">
                                           <source  :src="'http://kf.lyfz.net/api/v1/we_chat/Business/getMaterial?company_id=' + k.company_id + '&appid=' + k.appid + '&media_id=' + k.media_id + '&type=3'">
                                       </audio>
                                       <div class="time" style="right: -48px;left: inherit">
                                           <Icon v-if="k.is_state" type="android-arrow-dropright-circle" style="font-size: 20px;vertical-align: bottom;color: #5cadff"></Icon>
                                           <Icon v-else type="record" style="font-size: 20px;vertical-align: bottom;color: #ed3f14"></Icon>
                                           <span><span style="font-size: 14px" v-if="k.is_time">{{k.autio_time}}</span>s</span>
                                       </div>
                                   </div>
                                   <!-- end语音 -->

                                   <!-- 图文 -->
                                   <div class="" v-if="k.message_type == 6" v-html=""></div>
                                   <!-- end 图文 -->

                                   <!-- 位置 -->
                                   <div v-if="k.message_type == 5" @click="locationFun(k)" style="cursor: pointer;">
                                       <div style="padding-bottom: 5px">{{k.map_label}}</div>
                                       <img :src="'http://apis.map.qq.com/ws/staticmap/v2/?center=' + k.lat + ',' + k.lng + '&zoom=18&size=300*150&maptype=roadmap&markers=color:red|' + k.lat + ',' + k.lng + '&key=TUTBZ-YEPWX-WEN4N-7OZUC-T4MT7-IXFN6'" v-on:load="loadFun"></img>
                                   </div>
                                   <!-- end位置 -->
                               </div>
                               <i class="arrow arrow_out" style="left: -10px;transform: rotate(90deg);"></i>
                               <i class="arrow arrow_in" style="left: -9px;transform: rotate(90deg);"></i>
                           </div>
                       </div>
                       <!---------------------------------- end客户消息 ------------------------------------>


                       <!---------------------------------- 客服消息 ------------------------------------>
                       <div class="content-box" style="text-align: right" v-if="k.opercode == 1">
                           <div class="crate" style="right: 10px;background-color: #66cc00;">
                               <div style="display: inline-block;">
                                   <!-- 文字 -->
                                   <pre v-if="k.message_type == 1" style="text-align: left; margin: 0; color: #3e3e3e;">{{k.text}}</pre>
                                   <!-- end文字 -->


                                   <!-- 图片 -->
                                   <img  v-if="k.message_type == 2" :src="k.file_url" alt="" style="max-height: 300px;max-width: 240px;vertical-align: bottom">
                                   <!-- end图片 -->


                                   <!-- 视频 -->
                                   <video v-if="k.message_type == 4"  width="220" height="140" controls style="background-color: #fff;">
                                       <source :src="k.file_url" type="video/mp4">
                                   </video>
                                   <!-- end视频 -->

                                   <!-- 语音 -->
                                   <div v-if="k.message_type == 3" class="audio-box" @click="audioFun('audio' + i, k, i)">
                                       <!--<div class="audio-state" v-if="k.is_icon">12313212</div>-->
                                       <div class="audio-loding">
                                           <img v-if="k.is_icon" src="../../assets/images/3333.gif" alt="">
                                           <img v-if="k.is_icon == true ? false : true" src="../../assets/images/audio-start.png" alt="">
                                       </div>
                                       <div class="time">
                                           <span><span style="font-size: 14px" v-if="k.is_time">{{k.autio_time}}</span>s</span>
                                           <Icon v-if="k.is_state" type="android-arrow-dropright-circle" style="font-size: 20px;vertical-align: bottom;color: #5cadff"></Icon>
                                           <Icon v-else type="record" style="font-size: 20px;vertical-align: bottom;color: #ed3f14"></Icon>
                                       </div>
                                       <audio :ref="'audio' + i" v-if="k.message_type == 3" v-on:loadedmetadata="audioTimeFun(k, 'audio' + i, i)">
                                           <source  :src="k.file_url">
                                       </audio>
                                   </div>
                                   <!-- end语音 -->

                                   <!-- 图文 -->
                                   <!--          v-for="s in k.htmlContent"         -->
                                   <div class="" v-if="k.message_type == 6"  style="background-color: #fff;">
                                       <span>模板消息</span>
                                       <!--<div v-html="s.content"></div>-->
                                   </div>
                                   <!-- end 图文 -->
                               </div>
                               <i class="arrow arrow_out" style="right: -10px;transform: rotate(270deg);border-top-color: #66cc00"></i>
                               <i class="arrow arrow_in" style="right: -9px;transform: rotate(270deg);border-top-color: #66cc00"></i>
                           </div>
                           <div class="graphic" ><Avatar :src="userInfo.avatar_url" style="margin-right: 5px"/></div>
                       </div>
                       <!---------------------------------- end客服消息 ------------------------------------>
                   </div>
               </div>
           </div>
           <div style="text-align: center;padding: 10px 0">
               <Page :total="pageData.count" :page-size="pageData.rows_num" size="small" @on-change="pageFun"></Page>
           </div>
       </div>


       <!-- 视频弹窗弹窗 -->
       <Modal v-model="popup2" title="提示">
           <video v-if="popup2" width="420" height="320"  controls autoplay style="background-color: #fff;">
               <source :src="mp4Url" type="video/mp4" >
           </video>
       </Modal>
       <!-- end视频弹窗弹窗 -->



       <!-- 请求状态 -->
       <Spin fix v-if="is_Loading">
           <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
           <div>请求中....</div>
       </Spin>
       <!-- end请求状态 -->
   </div>
</template>
<script>
    import Bus from '../../assets/eventBus';
    export default {
      data () {
        return {
          cityList: [],
          model1: '',
          clientData: null,
          elmetArr: [],
          userInfo: null,
          popup2: false,
          mp4Data: null,
          mp3Data: null,
          mp4Url: '',
          pageData: {
            page: 1,
            count: 0,
            rows_num: 0
          },
          is_Loading: false
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {
        // 获取数据列表
        getHistoryMessage () {
          this.elmetArr.length = 0;
          this.is_Loading = true;
          this.ajax.getHistoryMessage({
            data: {
              page: this.pageData.page,
              customer_wx_openid: this.clientData.customer_wx_openid
            },
            success: (res) => {
              this.elmetArr = res.body.data_list.reverse();
              this.pageData.rows_num = res.body.page_data.rows_num;
              this.pageData.count = res.body.page_data.count;
              this.scroFun();
              this.is_Loading = false;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        scroFun () {
          setTimeout(() => {
            let div1 = this.$refs.win1;
            let div = this.$refs.win;
            div.scrollTop = div1.offsetHeight;
          }, 100);
        },
        // 图片加载完成后改变 滚动条位置
        loadFun (e) {
          this.scroFun();
        },
        // 获取音频播放时长
        audioTimeFun (k, e, i) {
          let el = e;
          let au = this.$refs[el];
          let audio = au[0];
          this.$set(this.elmetArr[i], 'is_time', true);
          this.$set(this.elmetArr[i], 'autio_time', parseInt(audio.duration));
          // k.autio_time = audio.duration;
        },
        // 播放音频
        audioFun (c, k, i) {
          let that = this;
          let el = c;
          let au = that.$refs[el];
          let audio = au[0];
          // k.is_icon = true;
          that.$set(k, 'is_icon', true);
          audio.onloadedmetadata = function (res) {
            // console.log(res, 99999);
            // console.log(audio.duration, 3333333);
          };
          audio.currentTime = 0;
          audio.play();
          audio.onended = function () {
            // k.is_icon = false;
            that.$set(k, 'is_icon', false);
            that.$set(k, 'is_state', true);
          };
        },
        // 分页
        pageFun (v) {
          this.pageData.page = v;
          this.getHistoryMessage();
        }
      },
      destroyed (s) {
        // Bus.$off();
      },
      created () {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        Bus.$on('change', (k) => {
          this.clientData = k;
          this.pageData.page = 1;
        });
        Bus.$on('scro', (k) => {
          this.getHistoryMessage();
          // this.scroFun();
        });
      }
    };
</script>
