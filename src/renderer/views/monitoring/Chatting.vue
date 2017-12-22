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
        // height: 600px;
        background-color: #f2f2f2;
        .scroll-loading-box{
            position: absolute;
            left: 50%;
            height: 40px;
            width: 100px;
            margin-left: -50px;
            top: 0;
        }
        .content-box{
            text-align: left;margin: 10px 0;
            width: 97%;
            .graphic{
                display: inline-block
            }
            .crate{
                display: inline-block;
                position: relative;
                background-color: #6ca9f2;
                padding: 5px;
                border-radius: 4px;
                max-width: 70%;
                vertical-align: top;
                .lading-box{
                    position: absolute;
                    height: 20px;
                    width: 20px;
                    top: 4px;
                    left: -22px;
                }
                .is-err{
                    position: absolute;
                    height: 20px;
                    width: 20px;
                    top: 4px;
                    left: -22px;
                    font-size: 16px;
                    text-align: center;
                    line-height: 22px;
                    color: #ff3300;
                }
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
                    border-top-color: #6ca9f2;
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
                    border-top-color: #6ca9f2;
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
        background-color: #fafafa;
        span{
            font-size: 28px;
            padding:0 10px;
            cursor: pointer;
            border-radius: 2px;
            color: #9e9e9e;
        }
        span:hover{
            background-color: #f1f1f1;
        }

    }
    .chart-txt{
        position: absolute;
        // top:700px;
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
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
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
            height: 22px;
            width: 70px;
            display: inline-block;
            top: 50%;
            margin-top: -7px;
            left: -80px;
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
            height: 460px;
        }
        .chart-txt{
            top: 560px;
        }
        .form-box{
            height: 400px
        }
    }
    @media all and (min-height:400px) and (max-height:799px){
        .chart-win{
            height: 360px;
        }
        .chart-txt{
            top: 460px;
        }
        .form-box{
            height: 300px
        }
    }
    @media all and (min-height:1000px) and (max-height:1200px){
        .chart-win{
            height: 560px;
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
    .textrea{
        /* top: 0; */
        /* left: 0; */
        /* width: 100%; */
        /* height: 100%; */
        box-sizing: border-box;
        padding: 2px;
        line-height: normal;
        /* font-size: .27rem; */
        color: #464545;
        text-align: left;
        resize: none;
        overflow: hidden;
        &::-webkit-input-placeholder {
            text-align: left;
            color: #999;
        }
    }
</style>
<template>
    <div class="chart-box">
        <div class="user-top" v-if="isMass ? false : true" style="background-color: #e7f1fd;">
            <Avatar :src="clientData.customer_wx_portrait" style="margin-left: 5px"/>
            <span class="name">{{clientData.customer_wx_nickname}}</span>
            <span class="txt">来访：{{clientData.session_frequency}}次</span>
            <span class="txt">主动邀请：{{clientData.invitation_frequency}}次</span>
            <span class="txt">来自：{{clientData.app_name}}</span>
        </div>
        <div class="chart-win" ref="win" v-bind:class="{'is_mass_chart':isMass}" style="width: 100%;overflow-y: auto;position: relative;background: #fff;">
            <div class="scroll-loading-box" v-if="is_scroll_loading">
                <Spin fix>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
            </div>
            <div ref="win1">
                <div v-for="(k, i) in elmetArr" >
                    <!---------------------------------- 客户消息 ------------------------------------>
                    <div class="content-box"  v-if="k.opercode == 2">
                        <div class="graphic" ><Avatar :src="clientData.customer_wx_portrait" style="margin-left: 5px"/></div>
                        <div class="crate" style="left: 10px">
                            <div style="display: inline-block">


                                <!-- 普通文本 -->
                                <pre v-if="k.message_type == 1" v-text="k.text" style="text-align: left;margin: 0; color: #fff;white-space: pre-wrap;word-wrap: break-word;max-width: 400px;"></pre>
                                <!--<span v-if="k.message_type == 1" style="color: #fff">{{k.text}}</span>-->
                                <!-- end普通文本 -->


                                <!-- 图片 -->
                                <img  v-if="k.message_type == 2" :src="k.file_url" alt="" style="max-height: 400px;max-width: 360px;vertical-align: bottom"  v-on:load="loadFun">
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
                                        <!--<img v-if="k.is_icon == true ? false : true" src="../../assets/images/audio-start.png" alt="">-->
                                    </div>
                                    <audio :ref="'audio' + i" v-if="k.message_type == 3" v-on:loadedmetadata="audioTimeFun(k, 'audio' + i, i)">
                                        <source  :src="'http://kf.lyfz.net/api/v1/we_chat/Business/getMaterial?company_id=' + k.company_id + '&appid=' + k.appid + '&media_id=' + k.media_id + '&type=3'">
                                    </audio>
                                    <div class="time" style="right: -80px;left: inherit">
                                        <Icon v-if="k.is_state" type="android-arrow-dropright-circle" style="font-size: 20px;vertical-align: bottom;color: #5cadff"></Icon>
                                        <Icon v-else type="record" style="font-size: 20px;vertical-align: bottom;color: #ed3f14"></Icon>
                                        <span><span style="font-size: 14px" v-if="k.is_time">{{k.autio_time + 's'}}</span></span>
                                    </div>
                                </div>
                                <!-- end语音 -->

                                <!-- 图文 -->
                                <div class="" v-if="k.message_type == 6" v-html=""></div>
                                <!-- end 图文 -->

                                <!-- 位置 -->
                                <div v-if="k.message_type == 5 || k.message_type == -5" @click="locationFun(k)" style="cursor: pointer;">
                                    <div style="padding-bottom: 5px">{{k.map_label}}</div>
                                    <img :src="'http://apis.map.qq.com/ws/staticmap/v2/?center=' + k.lat + ',' + k.lng + '&zoom=18&size=350*200&maptype=roadmap&markers=color:red|' + k.lat + ',' + k.lng + '&key=TUTBZ-YEPWX-WEN4N-7OZUC-T4MT7-IXFN6'" v-on:load="loadFun"></img>
                                </div>
                                <!-- end位置 -->


                            </div>
                            <i class="arrow arrow_out" style="left: -9px;transform: rotate(90deg);"></i>
                            <i class="arrow arrow_in" style="left: -9px;transform: rotate(90deg);"></i>
                        </div>
                    </div>
                    <!---------------------------------- end客户消息 ------------------------------------>


                    <!---------------------------------- 客服消息 ------------------------------------>
                    <div class="content-box" style="text-align: right" v-if="k.opercode == 1 || k.opercode == 3">
                        <div class="crate" style="right: 10px;background-color: #e7e8ea;">
                            <div class="lading-box" v-if="k.is_loading">
                                <Spin fix>
                                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                </Spin>
                            </div>
                            <div class="is-err" v-if="k.is_err">
                                <Icon type="close-circled"></Icon>
                            </div>
                            <div class="crate-box" style="display: inline-block;">
                                <!-- 文字 -->
                                <pre v-if="k.message_type == 1" v-text="k.text" style="text-align: left; margin: 0; color: #3e3e3e;white-space: pre-wrap;word-wrap: break-word;max-width: 400px;"></pre>
                                <!-- end文字 -->


                                <!-- 图片 -->
                                <img  v-if="k.message_type == 2" :src="k.file_url" alt="" style="max-height: 400px;max-width: 360px;vertical-align: bottom">
                                <!-- end图片 -->


                                <!-- 视频 -->
                                <video v-if="k.message_type == 4"  width="320" height="240" controls style="background-color: #fff;">
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
                                        <span><span style="font-size: 14px" v-if="k.is_time">{{k.autio_time + 's'}}</span></span>
                                        <Icon v-if="k.is_state" type="android-arrow-dropright-circle" style="font-size: 20px;vertical-align: bottom;color: #5cadff"></Icon>
                                        <Icon v-else type="record" style="font-size: 20px;vertical-align: bottom;color: #ed3f14"></Icon>
                                    </div>
                                    <audio :ref="'audio' + i" v-if="k.message_type == 3" v-on:loadedmetadata="audioTimeFun(k, 'audio' + i, i)">
                                        <source  :src="k.file_url">
                                    </audio>
                                </div>
                                <!-- end语音 -->

                                <!-- 图文 -->
                                <div class="" v-if="k.message_type == 6" v-for="s in k.htmlContent" style="background-color: #fff;">
                                    <div v-html="s.content"></div>
                                </div>
                                <!-- end 图文 -->

                                <!-- 文件 -->
                                <div v-if="k.message_type == 8"  style="cursor: pointer;">
                                    <Icon type="folder">{{k.file_name}}</Icon>
                                </div>
                                <!-- end文件 -->
                            </div>
                            <i class="arrow arrow_out" style="right: -9px;transform: rotate(270deg);border-top-color: #e7e8ea"></i>
                            <i class="arrow arrow_in" style="right: -9px;transform: rotate(270deg);border-top-color: #e7e8ea"></i>
                        </div>
                        <div class="graphic" >
                            <Avatar v-if="k.opercode == 1" :src="clientData.customer_service_avatar" style="margin-right: 5px"/>
                            <Avatar v-if="k.opercode == 3" :src="userInfo.avatar_url" style="margin-right: 5px"/>

                        </div>
                    </div>
                    <!---------------------------------- end客服消息 ------------------------------------>
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
            <span title="语音" @click="popup3 = true,replyType = 3"><Icon type="ios-mic"></Icon></span>
            <!--<span style="color: #ff9933" title="表情"><Icon type="happy-outline"></Icon></span>-->
            <!--<span style="color: #333" title="截图"><Icon type="scissors"></Icon></span>-->
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
                <span  title="图片" @click="replyType = 2"><Icon type="image"></Icon></span>
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
                <span  title="视频" @click="replyType = 4"> <Icon type="ios-film-outline"></Icon></span>
            </Upload>
            <Upload style="display: inline-block;"  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                    name="file" :data="{resources_type: 1}"
                    :max-size='20480'
                    :format="['zip','doc','pdf','rar','ppt','excel','xls','xlsx','ZIP']"
                    :show-upload-list="false"
                    :before-upload="handleBeforeUpload"
                    :headers="{token: userInfo.token}"
                    :on-progress="upLodingFun"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :on-success="upfileFun">
                <span title="文件" @click="replyType = 8"> <Icon type="folder"></Icon></span>
            </Upload>
            <!--<span style="color: #99ccff" title="超链接"><Icon type="link"></Icon></Icon></span>-->
            <span  title="模板消息" @click="templateFun"><Icon type="ios-albums-outline"></Icon></span>
            <!--<span style="color: #9999cc" title="群聊"><Icon type="android-person-add"></Icon></span>-->
            <!--<span style="color: #cccc99" title="转发"><Icon type="android-share-alt"></Icon></span>-->
            <!--<span style="color: #ff99cc" title="发送满意度"><Icon type="thumbsup"></Icon></span>-->
            <!--<span style="color: #ccff66" title="下次联系提醒"><Icon type="ios-lightbulb"></Icon></span>-->
            <!--<span style="color: #333399" title="退出"><Icon type="log-out"></Icon></span>-->
            <!--<Button class="f-r" style="position: relative;font-size: 28px;top: 4px;color: #9e9e9e;" type="text" size="small" title="清空聊天记录"><Icon type="trash-a"></Icon></Button>-->

            <Button v-if="userInfo.user_type == 3"  type="ghost" class="f-r" style="margin-top: 15px; margin-right: 10px;" @click="popup9 = true">领导评价 </Button>
        </div>
        <div class="chart-txt" v-bind:class="{'is_mass_chart-txt':isMass}">
            <textarea v-model="txtra"  class="txt" @click="replyType = 1" v-on:paste="pasteFun" @keyup="keyFun"></textarea>
            <!--<input class="txt"  @keyup.enter="subFun" style="opacity: 0; position: absolute; z-index: 10;width: 98%;height: 95%;" @focus="ipt">-->
            <!--<textarea ref="txtra" class="txt" @blur="focusState = false" v-focus="focusState" style="position: absolute;z-index: 1;width: 98%;height: 95%;"></textarea>-->
            <div class="btm" style="z-index: 100">
                <Button  class="f-r"  type="ghost" @click="subFun">发送</Button>
            </div>
        </div>


        <!-- 视频弹窗弹窗 -->
        <Modal v-model="popup2" title="提示">
            <video v-if="popup2" width="420" height="320"  controls autoplay style="background-color: #fff;">
                <source :src="mp4Url" type="video/mp4" >
            </video>
        </Modal>
        <!-- end视频弹窗弹窗 -->


        <!-- 音频弹窗 -->
        <Modal v-model="popup3" title="提示">
            <div style="padding: 10px">
                <Button  type="primary"  @click="voiceFun"><Icon type="ios-mic-outline"></Icon>&nbsp;开始录音</Button>
                <Button  type="success"  @click="obtainRecord"><Icon type="ios-paperplane-outline"></Icon>&nbsp;发送录音</Button>
                <Button  type="ghost"  @click="stopRecord"><Icon type="ios-pause-outline"></Icon>&nbsp;停止录音</Button>
                <Button  type="info"  @click="playRecord"><Icon type="ios-play"></Icon>&nbsp;播放录音</Button>
            </div>
            <div style="padding: 10px">
                <audio controls autoplay ref="audio"></audio>
            </div>
        </Modal>
        <!-- end音频弹窗 -->


        <!-- 模板消息窗口 -->
        <Modal v-model="popup4" title="提示" width="1000" @on-ok="imgTxtOkFun">
            <ul class="img-txt">
                <li data-start="1" v-bind:class="is_img_txt === 'news' ? 'active' : ''" @click="imgTxtFun">图文</li>
                <!--<li data-start="2" v-bind:class="is_img_txt === 'image' ? 'active' : ''" @click="imgFun">图片</li>-->
                <!--<li data-start="3">语音</li>-->
                <!--<li data-start="4">视频</li>-->
            </ul>
            <div>
                <span style="color: #ff3300;padding-top: 10px">请点击其中一条选择</span>
            </div>
            <div class="tab-box" style="padding-top: 10px">
                <div v-if="modal2">
                    <div>
                        <Table highlight-row ref="currentRowTable" :columns="columns5" :data="data5" @on-current-change="selImgTxtFun"></Table>
                    </div>
                    <div style="text-align: center;padding-top: 10px">
                        <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
                    </div>
                </div>

                <div v-if="modal3">
                    <div>
                        <Table highlight-row ref="currentRowTable" :columns="columns6" :data="data6" @on-current-change="selTxtFun" ></Table>
                    </div>
                    <div style="text-align: center;padding-top: 10px">
                        <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
                    </div>
                </div>
            </div>
        </Modal>
        <!-- end模板消息窗口 -->

        <!-- 模板详情窗口 -->
        <Modal v-model="popup5" title="图片" width="750" ok-text="发送" @on-ok="imgTxtOkFun" @on-cancel="imgTxtCancelFun">
            <div class="details-popup" style="max-height: 700px; overflow: auto;">
                <div class="row" v-for="k in el">
                    <div class="title">{{k.title}}</div>
                    <div v-html="k.content"></div>
                </div>
            </div>
        </Modal>
        <!-- end模板消息窗口 -->


        <!-- 截图窗口看窗口 -->
        <Modal v-model="popup6" title="图片" width="750" ok-text="发送" @on-ok="pasteUpImgFun">
            <div class="details-popup" style="max-height: 700px; overflow: auto;">
                <img :src=pasteImgUrl alt="">
            </div>
        </Modal>
        <!-- end截图窗口看窗口 -->


        <!-- 强制会话弹窗 -->
        <Modal v-model="popup8" title="提示" width="750" ok-text="发送" @on-ok="strongMessFun">
            <p>该用户近期未于公众号交互，是否强制发起会话消息</p>
            <p style="color: #ff3300; font-size: 12px">注意：每个公众号每日最多发送100条强制会话消息,请谨慎使用</p>
        </Modal>
        <!-- end强制会话弹窗 -->

        <!-- 评价弹窗 -->
        <Modal v-model="popup9" title="评价" width="750" ok-text="确定" @on-ok="addEvaluateFun">
            <Form label-position="right" :label-width="100">
                <FormItem label="评价：">
                    <Select v-model="formLeft.selval">
                        <Option value="1">好评</Option>
                        <Option value="2">中评</Option>
                        <Option value="3">差评</Option>
                    </Select>
                </FormItem>
                <FormItem label="评价内容：">
                    <Input v-model="formLeft.txt" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- end评价弹窗 -->


        <!-- 加载状态 -->
        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>发送中....</div>
        </Spin>
        <!-- end加载状态 -->
    </div>
</template>
<script>
  import HZRecorder from '../commonComponent/luyin';
  import Bus from '../../assets/eventBus';
  import DB from '../../assets/webDB';
  const { shell } = require('electron');
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
        clientData: {
          selval: '',
          txt: ''
        },
        elmetArr: [],
        focusState: false,
        formLeft: {
          selval: '',
          txt: ''
        },
        txtra: '',
        replyType: 1,
        datalistArr: [],
        is_Loading: false,
        userInfo: null,
        popup2: false,
        popup3: false,
        popup4: false,
        popup5: false,
        animal: 1,
        upFileData: null,
        imgData: '',
        is_percent: false,
        up_state: 0,
        mp4Data: null,
        mp3Data: null,
        mp4Url: '',
        recorder: null,
        audioData: null,
        audioTimeData: null,
        popup9: false,
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        pageData2: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        is_img_txt: 'news',
        appid: '',
        modal2: false,
        modal3: false,
        columns5: [
          {
            title: '图文id',
            key: 'media_id'
          },
          {
            title: '素材标题',
            render: (h, params) => {
              let arr = params.row.content.news_item.map((k) => {
                return h('p', k.title);
              });
              return h('div', arr);
            }
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
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.popup4 = false;
                      this.popup5 = true;
                      this.el = params.row.content.news_item;
                    }
                  }
                }, '详情')
              ]);
            }
          }
        ],
        data5: [],
        columns6: [
          {
            type: '图片id',
            key: 'media_id'
          },
          {
            title: '图片名称',
            key: 'name'
          },
          {
            title: '素材标题',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.url
                },
                style: {
                  width: '100px'
                }
              });
            }
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
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.delImgFun(params.row.media_id, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data6: [],
        el: '',
        pasteImgUrl: '',
        popup6: false,
        fileData: null,
        is_key: true,
        messData: null,
        popup8: false,
        strongData: null,
        is_sub: true,
        timer_i: 0,
        childIsShowObj: null,
        userData: '',
        scroll_Top: 0,
        is_scroll_loading: false,
        is_scrollTime: 0,
        page: 1,
        is_scorllTopAjax: false,
        is_scorH: 0, // 获取滚动条高度控制只执行一次
        scorH: 0 // 获取滚动条高度控制只执行一次
      };
    },
    components: {
      HZRecorder
    },
    mounted () {
      // 聊天窗口滚动事件 dahd
      let div = this.$refs.win;
      div.addEventListener('scroll', this.scrollFun, false);
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
      // 评价
      addEvaluateFun () {
        this.ajax.sessionEvaluate({
          data: {
            session_id: this.clientData.session_id,
            content: this.formLeft.txt,
            screenshot: this.formLeft.selval
          },
          success: (res) => {
            this.$Message.success('评价成功');
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取会话客户相关数据
      getclientData () {
      },
      // 键盘事件
      keyFun (e) {
        this.is_key = false;
        if (e.keyCode === 13 && e.ctrlKey) {
          this.txtra += '\r\n';
        } else if (e.keyCode === 13) {
          if (this.is_sub) {
            this.subFun();
          }
        }
        e.preventDefault();
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
          // that.updbFun1(k);
        };
      },
      // 获取音频播放时长
      audioTimeFun (k, e, i) {
        let el = e;
        let au = this.$refs[el];
        let audio = au[0];
        this.$set(this.elmetArr[i], 'is_time', true);
        this.$set(this.elmetArr[i], 'autio_time', parseInt(audio.duration || 0));
        // k.autio_time = audio.duration;
      },
      // 素材详情窗口 确定回掉
      imgTxtOkFun () {
        if (this.el === '') {
          this.$Message.warning('请选择发送模板内容');
          return;
        }
        this.subFun();
      },
      // 素材详情窗口 取消回掉
      imgTxtCancelFun () {
        this.popup4 = true;
        this.popup5 = false;
      },
      // 点击模板方法
      templateFun () {
        this.el = '';
        this.getMaterial();
      },
      // 创建txt文本
      txt (t) {
        return {
          render: (h) => {
            return h('span', t);
          }
        };
      },
      // 获取素材/图文/图片
      getMaterial (t) {
        this.$Spin.show();
        this.ajax.getArticleList({
          data: {
            page: this.pageData1.page,
            appid: this.clientData.appid,
            type: this.is_img_txt
          },
          success: (res) => {
            this.el = '';
            this.replyType = 6;
            this.$Spin.hide();
            this.popup4 = true;
            if (this.is_img_txt === 'news') {
              // 如果是图文
              this.data5 = res.body.data_list;
              this.modal2 = true;
            } else if (this.is_img_txt === 'image') {
              // 如果是图片
              this.data6 = res.body.data_list;
              this.modal3 = true;
            }
            this.pageData1.count = parseInt(res.body.page_data.count);
            this.pageData1.rows_num = res.body.page_data.rows_num;
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      imgTxtFun () {
        this.modal3 = false;
        this.is_img_txt = 'news';
        this.pageData1.page = 1;
        this.getMaterial();
      },
      // 获取图片
      imgFun () {
        this.modal2 = false;
        this.is_img_txt = 'image';
        this.pageData1.page = 1;
        this.getMaterial();
      },
      // 素材分页
      pageFun1 (v) {
        this.pageData1.page = v;
        this.getMaterial();
      },
      // 选择素材的回掉方法
      selImgTxtFun (v) {
        this.el = v;
      },
      // 选择图片的回掉方法
      selTxtFun (v) {
        this.el = v;
      },
      // 根据不同类型 组合发送数据
      groupData () {
        let data;
        if (this.replyType === 1) {
          if (this.txtra === '') {
            this.$Message.warning('请输入内容');
            return;
          }
          data = {
            session_id: this.clientData.session_id,
            message: this.txtra,
            type: this.replyType,
            uid: this.datalistArr.uid || this.clientData.uid
          };
        } else if (this.replyType === 2) {
          // 组合图片相关数据
          data = {
            session_id: this.clientData.session_id,
            message: '',
            resources_id: this.imgData.resources_id,
            type: this.replyType,
            uid: this.datalistArr.uid || this.clientData.uid
          };
        } else if (this.replyType === 4) {
          // 发送视频
          data = {
            session_id: this.clientData.session_id,
            message: '',
            resources_id: this.mp4Data.resources_id,
            type: this.replyType,
            uid: this.datalistArr.uid || this.clientData.uid
          };
        } else if (this.replyType === 3) {
          // 发送音频
          data = {
            session_id: this.clientData.session_id,
            message: '',
            resources_id: this.mp3Data.resources_id,
            type: this.replyType,
            uid: this.datalistArr.uid || this.clientData.uid
          };
        } else if (this.replyType === 6) {
          data = {
            session_id: this.clientData.session_id,
            message: '',
            media_id: this.el.media_id,
            type: this.replyType,
            uid: this.datalistArr.uid || this.clientData.uid
          };
        } else if (this.replyType === 8) {
          data = {
            session_id: this.clientData.session_id,
            message: '',
            resources_id: this.fileData.resources_id,
            type: this.replyType,
            uid: this.datalistArr.uid || this.clientData.uid
          };
        }
        return data;
      },
      // 组合发送的数据
      subBeforeGroupFun () {
        let obj;
        // 组合发送成功的数据  保存到本地数据库
        if (this.replyType === 1) {
          obj = {
            add_time: this.getAtTimeFun(),
            appid: this.datalistArr.appid || this.clientData.appid,
            company_id: this.datalistArr.company_id || this.clientData.company_id,
            customer_service_id: 4,
            customer_wx_openid: this.datalistArr.customer_wx_openid || this.clientData.customer_wx_openid,
            message_id: '',
            message_type: 1,
            opercode: 3,
            is_loading: true,
            is_err: false,
            session_id: this.datalistArr.session_id || this.clientData.session_id,
            text: this.txtra,
            uid: this.datalistArr.uid || this.clientData.uid,
            avatar_url: this.userInfo.avatar_url
          };
        } else if (this.replyType === 2) {
          obj = {
            add_time: this.getAtTimeFun(),
            appid: this.datalistArr.appid || this.clientData.appid,
            company_id: this.datalistArr.company_id || this.clientData.company_id,
            customer_service_id: 4,
            customer_wx_openid: this.datalistArr.customer_wx_openid || this.clientData.customer_wx_openid,
            message_id: '',
            message_type: 2,
            opercode: 1,
            file_url: this.imgData.url || '',
            resources_id: this.imgData.resources_id || '',
            session_id: this.datalistArr.session_id || this.clientData.session_id,
            text: this.txtra,
            uid: this.datalistArr.uid || this.clientData.uid
          };
        } else if (this.replyType === 4) {
          obj = {
            add_time: this.getAtTimeFun(),
            appid: this.datalistArr.appid || this.clientData.appid,
            company_id: this.datalistArr.company_id || this.clientData.company_id,
            customer_service_id: 4,
            customer_wx_openid: this.datalistArr.customer_wx_openid || this.clientData.customer_wx_openid,
            message_id: '',
            message_type: 4,
            is_loading: true,
            opercode: 3,
            is_err: false,
            file_url: this.mp4Data.url || '',
            resources_id: this.mp4Data.resources_id || '',
            session_id: this.datalistArr.session_id || this.clientData.session_id,
            text: this.txtra,
            uid: this.datalistArr.uid || this.clientData.uid,
            avatar_url: this.userInfo.avatar_url
          };
        } else if (this.replyType === 3) {
          obj = {
            add_time: this.getAtTimeFun(),
            appid: this.datalistArr.appid || this.clientData.appid,
            company_id: this.datalistArr.company_id || this.clientData.company_id,
            customer_service_id: 4,
            customer_wx_openid: this.datalistArr.customer_wx_openid || this.clientData.customer_wx_openid,
            message_id: '',
            message_type: 3,
            is_loading: true,
            is_err: false,
            opercode: 3,
            file_url: this.mp3Data.url || '',
            resources_id: this.mp3Data.resources_id || '',
            session_id: this.datalistArr.session_id || this.clientData.session_id,
            text: this.txtra,
            uid: this.datalistArr.uid || this.clientData.uid,
            is_state: true,
            is_time: false,
            is_icon: false,
            avatar_url: this.userInfo.avatar_url
          };
        } else if (this.replyType === 6) {
          obj = {
            add_time: this.getAtTimeFun(),
            appid: this.datalistArr.appid || this.clientData.appid,
            company_id: this.datalistArr.company_id || this.clientData.company_id,
            customer_service_id: 4,
            customer_wx_openid: this.datalistArr.customer_wx_openid || this.clientData.customer_wx_openid,
            message_id: '',
            message_type: 6,
            is_err: false,
            opercode: 3,
            is_loading: true,
            file_url: '',
            resources_id: '',
            session_id: this.datalistArr.session_id || this.clientData.session_id,
            text: this.txtra,
            uid: this.datalistArr.uid || this.clientData.uid,
            htmlContent: this.el.content.news_item,
            avatar_url: this.userInfo.avatar_url
          };
        } else if (this.replyType === 8) {
          obj = {
            add_time: this.getAtTimeFun(),
            appid: this.datalistArr.appid || this.clientData.appid,
            company_id: this.datalistArr.company_id || this.clientData.company_id,
            customer_service_id: 4,
            customer_wx_openid: this.datalistArr.customer_wx_openid || this.clientData.customer_wx_openid,
            message_id: '',
            message_type: 8,
            is_err: false,
            is_loading: true,
            opercode: 3,
            file_url: this.fileData.url,
            file_name: this.upFileData.name,
            resources_id: '',
            session_id: this.datalistArr.session_id || this.clientData.session_id,
            text: this.txtra,
            uid: this.datalistArr.uid || this.clientData.uid,
            avatar_url: this.userInfo.avatar_url
          };
        }
        return obj;
      },
      // 发送信息 kjfajwfawfvhj
      subFun (e) {
        // 组合普通文字相关数据
        if (!this.clientData.session_id) {
          this.$Message.warning('请选择会话客户');
          return;
        }
        this.messData = this.groupData();
        let obj = this.subBeforeGroupFun();
        this.elmetArr.push(obj);
        // this.clientData.data.push(obj);
        this.clearTimer();
        this.is_sub = false;
        this.ajax.sendMessage({
          data: this.messData,
          success: (res) => {
            Object.assign(obj, {is_loading: false});
            this.is_sub = true;
            this.is_percent = false;
            this.el = '';
            this.loadFun();
            // this.updbFun(obj);
            this.txtra = '';
            this.getChatFun(this.clientData, this.childIsShowObj, this.userData);
            this.timerFun();
          },
          error: (res) => {
            if (res) {
              if (res.meta.code === 3020) {
                // 调用强制会话
                this.strongData = obj;
                this.popup8 = true;
              } else if (res.meta.code === 3001) {
                this.$Message.warning('会话不存在');
                this.txtra = '';
                Object.assign(obj, {is_err: true});
                Object.assign(obj, {is_loading: false});
                this.is_percent = false;
                this.is_Loading = false;
                // Bus.$emit('closeDialogue'); 45546
                this.is_sub = true;
              } else {
                this.is_sub = true;
                Object.assign(obj, {is_err: true});
                Object.assign(obj, {is_loading: false});
                // this.updbFun(obj);
                this.is_percent = false;
                this.is_Loading = false;
                this.$Message.warning(res.meta.message);
              }
            }
          }
        });
      },
      // 强制会话
      strongMessFun () {
        this.ajax.forcedSendMessage({
          data: this.messData,
          success: (res) => {
            this.is_Loading = false;
            // 组合发送成功的数据  保存到本地数据库
            this.is_percent = false;
            this.is_sub = true;
            this.el = '';
            this.getChatFun(this.clientData, this.childIsShowObj, this.userData);
            this.timerFun();
            this.loadFun();
            Object.assign(this.strongData, {is_loading: false});
            // this.updbFun(this.strongData); dwadwad
            this.txtra = '';
          },
          error: (res) => {
            this.is_sub = true;
            Object.assign(this.strongData, {is_err: true});
            Object.assign(this.strongData, {is_loading: false});
            // this.updbFun(this.strongData);
            this.is_percent = false;
            this.is_Loading = false;
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
        let that = this;
        // var record = this.recorder.getBlob();
        let url = 'http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources';
        that.recorder.upload(url, this.userInfo.token, function (r, e) {
          if (r === 'ok') {
            let res = JSON.parse(e.target.response);
            that.mp3Data = res.body;
            that.subFun();
          }
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
      // 音频数据跟新
      updbFun1 (obj) {
        console.log(obj);
        let db = new DB();
        db.type = 'update';
        db.tabName = 'message';
        db.data = [obj];
        db.fun = function (res) {
          console.log('DB--》音频数据更新成功');
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
      upfileFun (e) {
        this.fileData = e.body;
        this.subFun();
      },
      // 上传中的方法
      upLodingFun (e) {
        this.up_state = parseInt(e.percent);
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
      // 滚动条方法 123123
      loadFun (e) {
        let div = this.$refs.win;
        let h = div.offsetHeight;
        let sh = div.scrollHeight;
        if ((h + div.scrollTop) >= (sh - 100)) {
          this.scroFun();
        }
      },
      // 地图位置
      locationFun (k) {
        shell.openExternal('http://apis.map.qq.com/uri/v1/geocoder?coord=' + k.lat + ',' + k.lng + '&coord_type=1&referer=wyim');
      },
      // 粘贴事件
      pasteFun (e) {
        // 添加到事件对象中的访问系统剪贴板的接口
        let clipboardData = e.clipboardData;
        let i = 0;
        let items;
        let item;
        let types;
        if (clipboardData) {
          items = clipboardData.items;
          if (!items) {
            return;
          }
          item = items[0];
          // 保存在剪贴板中的数据类型
          types = clipboardData.types || [];
          for (; i < types.length; i++) {
            if (types[i] === 'Files') {
              item = items[i];
              break;
            }
          }
          // 判断是否为图片数据
          if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
            this.imgReader(item);
          }
        }
      },
      imgReader (item) {
        let blob = item.getAsFile();
        let reader = new FileReader();
        // 读取文件后将其显示在网页中
        reader.onload = (e) => {
          var img = new Image();
          img.src = e.target.result;
          this.pasteImgUrl = e.target.result;
          this.popup6 = true;
          // document.body.appendChild(img);
        };
        // 读取文件
        reader.readAsDataURL(blob);
        this.upFileData = blob;
      },
      // 上传截图片
      pasteUpImgFun () {
        let date = new Date().getTime();
        let suffix = this.upFileData.type.slice(this.upFileData.type.lastIndexOf('/') + 1);
        var fd = new FormData();
        fd.append('file', this.upFileData, date + '.' + suffix);
        var xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener('load', function (e) {
          that.replyType = 2;
          that.upImgFun(JSON.parse(e.target.responseText));
        }, false);
        xhr.open('POST', 'http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources');
        xhr.setRequestHeader('token', this.userInfo.token);
        xhr.send(fd);
      },
      // 获取当前选择的客户聊天信息
      getChatFun () {
        this.ajax.getMonitorMessage({
          data: {
            page: this.pageData2.page,
            session_id: this.clientData.session_id
          },
          success: (res) => {
            this.is_Loading = false;
            res.body.data_list.forEach((k) => {
              if (k.message_type === 3) {
                // 音频数据 添加 时间is_time显示状态/是否is_state播放状态 21123123
                k.autio_time = '';
                k.is_icon = false;
                if (!k.is_state) {
                  // 如果k 没有is_state 这个属性或属性为falss  就添加
                  Object.assign(k, {'is_state': false});
                }
                if (!k.is_time) {
                  // 如果k is_time 这个属性或属性为falss  就添加
                  Object.assign(k, {'is_time': false});
                }
              }
            });
            // 滚动到顶部加载数据 123
            if (this.is_scorllTopAjax) {
              this.is_scroll_loading = false;
              this.elmetArr = res.body.data_list.concat(this.elmetArr);
              // this.elmetArr.push(res.body.data_list);
              setTimeout(() => {
                this.is_scrollTime = 0;
              }, 1000);
            } else {
              // 正常获取数据
              this.is_scrollTime = 0;
              this.elmetArr.length = 0;
              this.elmetArr = res.body.data_list.reverse();
            }
            this.pageData2.count = res.body.page_data.count;
            this.pageData2.rows_num = res.body.page_data.rows_num;
            this.is_scorH++;
            // this.elmetArr.length = k.data.length + 1;
            // 取到数据最后一个数组， 便于添加数据 取最新相关数据
            // this.datalistArr = res.body.data_list[k.data.length - 1];
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 定时器 21dwa
      timerFun () {
        clearInterval(this.timer_i);
        this.timer_i = setInterval(() => {
          let div = this.$refs.win;
          let div1 = this.$refs.win1;
          let h = div1.offsetHeight; // 内容高度 dwakdbhafj
          let sh = div.offsetHeight; // 可见区域高度
          // 如果没有滚动条
          if (h < sh) {
            this.is_scorllTopAjax = false;
            this.pageData2.page = 1;
            this.getChatFun();
          } else {
            // 有滚动条
            if (this.scroll_Top <= 100 && this.pageData2.page > 1) {
              // 如果滚动条顶部 小于100
            } else {
              // 判断滚动条是否在底部100像素距离  或 当前一页 时候就加载第一页数据
              if (h - sh - div.scrollTop <= 200 || this.pageData2.page === 1) {
                this.is_scorllTopAjax = false;
                this.pageData2.page = 1;
                this.getChatFun();
              }
            }
          }
        }, 3000);
      },
      // 清除定时器
      clearTimer () {
        clearInterval(this.timer_i);
      },
      // 滚动条方法 kh
      scrollFun () {
        let div = this.$refs.win;
        this.scroll_Top = div.scrollTop;
        // console.log(div.scrollTop);
        if (div.scrollTop < 10) {
          // 控制函数只执行一次
          if (this.is_scrollTime === 0) {
            // 判断几页
            let p = parseInt(this.pageData2.count / this.pageData2.rows_num);
            if (p > 0 && this.pageData2.page <= p) {
              this.is_scorllTopAjax = true;
              this.is_scroll_loading = true;
              ++this.pageData2.page;
              this.getChatFun();
            }
          }
          this.is_scrollTime++;
        }
      }
    },
    updated () {
      // if (this.is_key) {
      // let win = this.$refs;
      // console.log(win.txtre);
      // }
    },
    watch: {
      elmetArr: function (v) {
        let arr = v[v.length - 1];
        if (arr) {
          if (arr.message_type === 2) {
          } else {
            this.loadFun();
          }
        }
      }
    },
    destroyed (s) {
      // Bus.$off();
      clearInterval(this.timer_i);
      // let div = this.$refs.win;
      // div.removeEventListener('scroll', this.scrollFun, false);
    },
    beforeRouteLeave (to, from, next) {
      window.removeEventListener('scroll', this.scrollFun, false);
      clearInterval(this.timer_i);
      next();
    },
    created () {
      // Bus.$off();
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      // 动态获取传递过来的 会话客户数据
      Bus.$on('change', (k, d, user) => {
        clearInterval(this.timer_i);
        this.childIsShowObj = d;
        this.userData = user;
        this.clientData = k;
        this.is_Loading = true;
        this.is_scorH = 0;
        this.getChatFun();
        this.timerFun();
      });
      // 动态获取快捷回复内容 事件
      Bus.$on('ShortcutTxtFun', (k) => {
        this.txtra = k.quick_reply_text;
      });
      // 快捷 发送 回复内容 事件
      Bus.$on('promptlyShortcutTxtFun', (k) => {
        this.txtra = k.quick_reply_text;
        this.replyType = 1;
        this.subFun();
      });
      // 如果客户
    }
  };
</script>
