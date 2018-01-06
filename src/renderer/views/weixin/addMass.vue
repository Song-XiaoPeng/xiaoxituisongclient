<style scoped lang="less">
    .top-tab{
        padding:10px;
        ul{
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
    }
    .sendMess-box{
        min-height: 297px;
        width: 60%;
        border: 1px #eaeaea solid;
        position: relative;
        .sendMess-top{
            width: 100%;
            background-color: #f7f8f8;
            box-sizing: border-box;
            padding: 10px;
            height: 55px;
        }
        .sendMess-txt{
            position: absolute;
            top:55px;
            left: 0;
            bottom: 0;
            right: 0;
        }
    }
</style>
<template>
   <div id="index">
       <div>
           <Form  label-position="right" :label-width="100">
               <FormItem label="群发类别">
                   <!--<Button :type="tabs == 'name0' ? 'info' : 'text'" @click="tabFun('name0')">全部</Button>-->
                   <Button :type="tabs == 'name1' ? 'info' : 'text'" @click="tabFun('name1')">按分组发送</Button>
                   <Button :type="tabs == 'name2' ? 'info' : 'text'" @click="tabFun('name2')">指定用户</Button>
               </FormItem>
           </Form>
       </div>
       <!-- adwadawd -->
       <div v-if="tabs == 'name1'">
           <Form  label-position="right" :label-width="100">
               <FormItem label="分组">
                   <Select v-model="group_id" style="width:200px">
                       <Option v-for="item in cityList" :value="parseInt(item.id)" :key="item.id">{{ item.name }}</Option>
                   </Select>
               </FormItem>
           </Form>
       </div>
       <div v-if="tabs == 'name2'">
           <Form  label-position="right" :label-width="100">
               <FormItem label="用户">
                   <Button type="info"  @click="getFansFun" >选择用户</Button>
               </FormItem>
           </Form>
       </div>
       <div style="padding: 10px;">
           <Form  label-position="right" :label-width="100">
               <!--<FormItem label="发送内容类型">-->
                   <!--<RadioGroup v-model="content_type" @on-change="content_type_sel">-->
                       <!--<Radio label=2>图文</Radio>-->
                       <!--<Radio label=3>图片</Radio>-->
                       <!--<Radio label=1>文字</Radio>-->
                   <!--</RadioGroup>-->
               <!--</FormItem>-->
               <FormItem label="发送时间">
                   <RadioGroup v-model="anima2">
                       <Radio label="1">立即发送</Radio>
                       <Radio label="2">定时发送</Radio>
                   </RadioGroup>
               </FormItem>
               <FormItem v-if="anima2 == '2'" label="选择时间">
                   <DatePicker type="datetime" placeholder="选择时间" style="width: 200px" @on-change="timingFun"></DatePicker>
               </FormItem>

               <FormItem  label="群发内容">
                   <div class="sendMess-box">
                       <div class="sendMess-top">
                           <Button :type="content_type == 2 ? 'info' : 'ghost'" @click="content_type_sel('2')"><Icon type="android-list" style="margin-right: 10px"></Icon>图文消息</Button>
                           <Button :type="content_type == 3 ? 'info' : 'ghost'" @click="content_type_sel('3')"><Icon type="android-image" style="margin-right: 10px"></Icon>图片</Button>
                           <Button :type="content_type == 1 ? 'info' : 'ghost'" @click="content_type_sel('1')"><Icon type="android-create" style="margin-right: 10px"></Icon>文字</Button>
                       </div>
                       <div class="sendMess-txt">
                           <Input v-model="txt" type="textarea" :autosize="{minRows: 11,maxRows: 11}" :disabled="content_type == 2 || content_type == 3 ? true : false"  placeholder="请输入"></Input>
                       </div>
                   </div>
               </FormItem>
               <FormItem label="">
                   <Button type="primary" @click="addMassNews">保存</Button>
               </FormItem>



               <!--<FormItem v-if="content_type == 1" label="文字内容">-->
                   <!--<Input v-model="txt" type="textarea" style="width: 500px" :autosize="{minRows: 5,maxRows: 8}" placeholder="请输入"></Input>-->
               <!--</FormItem> -->
           </Form>
       </div>




       <!-- 用户弹窗 -->
       <Modal v-model="model9"  title="素材" width="800">
           <div class="" style="max-height: 400px;overflow: auto">
               <div v-if="modal2">
                   <div>
                       <Table highlight-row ref="currentRowTable" :columns="columns5" :data="data5" @on-current-change="selImgTxtFun"></Table>
                   </div>
                   <div style="text-align: center;padding: 10px">
                       <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
                   </div>
               </div>

               <div v-if="modal3">
                   <div>
                       <Table highlight-row ref="currentRowTable" :columns="columns6" :data="data6" @on-current-change="selTxtFun" ></Table>
                   </div>
                   <div style="text-align: center;padding: 10px">
                       <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
                   </div>
               </div>

           </div>
       </Modal>
       <!-- end用户弹窗 -->



       <!-- 用户弹窗 -->
       <Modal v-model="model7"  title="粉丝用户" width="800">
          <div style="max-height: 600px; overflow: auto">
              <Table border :columns="columns8" :data="data8" @on-selection-change="selWxUser" ></Table>
              <div class="" style="text-align: center; padding: 10px">
                  <Page :total="pageData2.count" :page-size="pageData2.rows_num"  @on-change="pageFun2"></Page>
              </div>
          </div>
       </Modal>
       <!-- end用户弹窗 -->

       <!-- 素材详情弹窗 -->
       <Modal v-model="modal4" title="图片" width="750">
           <div class="details-popup" style="max-height: 700px; overflow: auto;">
               <div class="row" v-for="k in el">
                   <div class="title">{{k.title}}</div>
                   <div v-html="k.content">达瓦达瓦</div>
               </div>
           </div>
       </Modal>
       <!-- end素材详情弹窗 -->



       <!-- 请求状态 -->
       <Spin fix v-if="is_Loading">
           <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
           <div>请求中....</div>
       </Spin>
       <!-- end请求状态 -->
   </div>
</template>
<script>
  export default {
    data () {
      return {
        cityList: [],
        is_Loading: false,
        animal: '',
        anima3: '男',
        anima2: '1',
        tabs: 'name1',
        data7: [],
        group_id: '',
        is_img_txt: 'news',
        modal2: true,
        modal3: false,
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
                      this.modal4 = true;
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
          }
        ],
        data6: [],
        content_type: 2,
        txt: '',
        columns8: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '图像',
            render: (h, p) => {
              return h('img', {
                style: {
                  width: '50px',
                  height: '50px'
                },
                attrs: {
                  src: p.row.portrait
                }
              });
            }
          },
          {
            title: '微信昵称',
            render: (h, p) => {
              return h('span', p.row.nickname === null ? '未同步基本信息' : p.row.nickname);
            }
          },
          {
            title: '微信用户性别',
            render: (h, p) => {
              return h('span', p.row.gender === 1 ? '男' : p.row.gender === 2 ? '女' : p.row.gender === null ? '未同步基本信息' : '未知');
            }
          },
          {
            title: '所属公共号名称',
            render: (h, p) => {
              return h('span', p.row.app_name === null ? '未同步基本信息' : p.row.app_name);
            }
          },
          {
            title: '所在地',
            render: (h, p) => {
              return h('span', p.row.province === null ? '未同步基本信息' : p.row.province + '-' + p.row.city);
            }
          },
          {
            title: '添加时间',
            render: (h, p) => {
              return h('span', p.row.add_time === null ? '未同步基本信息' : p.row.add_time);
            }
          }
        ],
        data8: [],
        model8: false,
        userArr: [],
        model7: false,
        model9: false,
        modal4: false,
        el: '',
        media_id: '',
        timing: '',
        userId: ''
      };
    },
    mounted () {
    },
    watch: {
      anima2: (v) => {
      }
    },
    props: {
      appid: {
        type: String,
        default: ''
      }
    },
    beforeDestroy () {
    },
    methods: {
      tabFun (v) {
        this.tabs = v;
      },
      // 获取粉丝分组
      getWxGroup () {
        this.is_Loading = true;
        this.ajax.getWxGroup({
          data: {
            appid: this.appid
          },
          success: (res) => {
            this.is_Loading = false;
            this.cityList = res.body;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取素材列表
      getMaterial (t) {
        this.is_Loading = true;
        this.ajax.getArticleList({
          data: {
            page: this.pageData1.page,
            appid: this.appid,
            type: this.is_img_txt
          },
          success: (res) => {
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
            this.is_Loading = false;
            this.model9 = true;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取图文素材
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
      // 获取粉丝列表
      getFansFun () {
        this.is_Loading = true;
        this.ajax.getWxUserList({
          data: {
            page: this.pageData2.page
          },
          success: (res) => {
            this.is_Loading = false;
            this.data8 = res.body.data_list;
            this.pageData2.count = parseInt(res.body.page_data.count);
            this.pageData2.rows_num = res.body.page_data.rows_num;
            this.model7 = true;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 选择发送内容类型
      content_type_sel (v) {
        this.content_type = v;
        if (v === '2') {
          this.txt = '';
          this.imgTxtFun();
        } else if (v === '3') {
          this.txt = '';
          this.imgFun();
        } else if (v === '1') {
          this.txt = '';
          this.modal3 = false;
          this.modal2 = false;
        }
      },
      // 选择图片
      selTxtFun (v) {
        this.txt = v.media_id;
        this.media_id = v.media_id;
      },
      // 选择素材
      selImgTxtFun (v) {
        this.txt = v.media_id;
        this.media_id = v.media_id;
      },
      // 素材/ 图片分页
      pageFun1 (v) {
        this.pageData1.page = v;
        this.getMaterial();
      },
      // 同步任务分页
      pageFun2 (v) {
        this.pageData2.page = v;
        this.getFansFun();
      },
      // 选择用户粉丝方法
      selWxUser (v) {
        this.userArr.length = 0;
        this.userArr.push(v);
      },
      // 定时发送时间
      timingFun (v) {
        this.timing = v;
      },
      // 提交数据
      addMassNews () {
        let data = {
          appid: this.appid,
          type: this.tabs === 'name1' ? 2 : this.tabs === 'name2' ? 3 : 1,
          send_type: this.anima2,
          send_message_type: this.content_type
        };
        if (this.anima2 === '2') {
          if (this.timing === '') {
            this.$Message.warning('请选择发送时间');
            return;
          } else {
            data['send_time'] = this.timing || '';
          }
        }
        if (parseInt(this.content_type) === 2 || parseInt(this.content_type) === 3) {
          if (this.media_id === '') {
            this.$Message.warning('请选择素材/图片！');
            return;
          } else {
            data['media_id'] = this.media_id;
          }
        }
        if (parseInt(this.content_type) === 1) {
          if (this.txt === '') {
            this.$Message.warning('请输入文字内容');
            return;
          } else {
            data['text'] = this.txt;
          }
        }
        if (this.tabs === 'name1') {
          if (this.group_id === '') {
            this.$Message.warning('请选择组！');
            return;
          } else {
            data['group_id'] = this.group_id;
          }
        } else if (this.tabs === 'name2') {
          if (this.userArr.length === 0) {
            this.$Message.warning('请选择用户！');
            return;
          } else {
            let arr = [];
            this.userArr.forEach((k) => {
              k.forEach((s) => {
                arr.push(s.openid);
              });
            });
            data['openid_list'] = arr;
          }
        }
        this.is_Loading = true;
        this.ajax.addMassNews({
          data: data,
          success: (res) => {
            this.is_Loading = false;
            this.$Message.success('操作成功');
            this.$router.push({
              name: 'Mass'
            });
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      }
    },
    created () {
      this.getWxGroup();
      this.content_type_sel('1');
    }
  };
</script>
