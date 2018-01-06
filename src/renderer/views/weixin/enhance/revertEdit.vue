<style scoped lang="less">
    .container{
        background-color: #fff;
        padding: 10px;
        .nav-box{
            display: -webkit-box;
            li{
                -webkit-box-flex: 1;
                height: 40px;
                text-align: -webkit-center;
                -webkit-box-align: center;
                line-height: 40px;
                font-size: 12px;
                font-weight: bold;
                color: #333;
                background-color: #f7f7f7;
                border-right: 1px #fff solid;
                cursor: pointer;
                transition: all .3s;
            }
            li.active{
                background-color: #3399ff;
                color: #fff;
            }
            li:hover{
                background-color: #2db7f5;
                color: #fff;
            }
            li:last-child{
                border-right: 0;
            }
        }
        .content{
            padding:10px 0px;
        }
    }
</style>
<template>
   <div class="container">
       <ul class="nav-box" @click="tabFun">
           <li  data-start="1">图文</li>
           <li data-start="2" class="active">文字</li>
           <li data-start="3">微信图片</li>
           <li data-start="4">音乐</li>
           <li data-start="5">语音</li>
           <li data-start="6">视频</li>
       </ul>
       <div class="content">
          <!--<div v-if="tabStart == 1">-->

          <!--</div>-->
           <!--    v-if="tabStart == 2"   -->
           <div  style="padding: 10px 0;">
               <Form label-position="right" :label-width="100">
                   <FormItem label="关键字：">
                       <Input v-model="key_word" placeholder="请输入" style="width: 300px"></Input>
                   </FormItem>
                   <FormItem label="匹配度：">
                       <RadioGroup v-model="pattern">
                           <Radio label="1">模糊匹配</Radio>
                           <Radio label="2">精确匹配</Radio>
                       </RadioGroup>
                   </FormItem>
                   <FormItem label="回复类型：">
                       <RadioGroup v-model="radioVal">
                           <Radio label="1">文本回复</Radio>
                           <Radio label="2">接入到指定客服</Radio>
                           <Radio label="3">接入到指定客服组</Radio>
                           <Radio label="4">关注自动回复</Radio>
                       </RadioGroup>
                   </FormItem>
                   <FormItem label="客服：" v-if="radioVal == '2' || radioVal == '3' ? true : false">
                       <Table v-if="radioVal == '2' ? true : false" highlight-row ref="currentRowTable" :columns="columns3" :data="data1" @on-current-change="selTabFun"></Table>
                       <Table v-if="radioVal == '3' ? true : false" highlight-row ref="currentRowTable" :columns="columns4" :data="data2" @on-current-change="selTabFun1"></Table>
                       <div v-if="radioVal == '2' ? true : false" style="text-align: center;padding: 5px 10px">
                           <Page :total="pageData.count" :page-size="pageData.rows_num"  @on-change="pageFun"></Page>
                       </div>
                   </FormItem>
                   <FormItem label="内容：">
                       <Input v-model="reply_text"  type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入内容"></Input>
                   </FormItem>
                   <FormItem label="">
                       <Button type="info" class="" @click="addMenuFun">保存</Button>
                   </FormItem>
               </Form>
           </div>
           <!--<div v-if="tabStart == 3">-->

           <!--</div>-->
           <!--<div v-if="tabStart == 4">-->

           <!--</div>-->
           <!--<div v-if="tabStart == 5">-->

           <!--</div>-->
           <!--<div v-if="tabStart == 6">-->

           <!--</div>-->
       </div>

       <Spin fix v-if="is_Loading">
           <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
           <div>请求中....</div>
       </Spin>
   </div>
</template>
<script>
  export default {
    data () {
      return {
        tabStart: 2,
        radioVal: '1',
        is_Loading: false,
        appid: '',
        pattern: '1',
        reply_text: '',
        key_word: '',
        columns3: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '客服名',
            key: 'user_name'
          },
          {
            title: '所属组',
            key: 'user_group_name'
          },
          {
            title: '状态',
            key: 'user_state_name'
          }
        ],
        data1: [],
        columns4: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '分组名',
            key: 'user_group_name'
          }
        ],
        data2: [],
        pageData: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        selData: null,
        selData1: null
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      tabFun (e) {
        let i = parseInt(e.target.dataset.start);
        this.tabStart = i;
        if (i === 2) {
        } else {
          this.$Modal.warning({
            title: '警告',
            content: '拼命开发中'
          });
        }
      },
      addMenuFun () {
        if (this.key_word === '') {
          this.$Message.warning('请输入关键字');
          return;
        }
        if (this.radioVal === '2' || this.radioVal === 2) {
          if (this.selData === null) {
            this.$Message.warning('请选择客服');
            return;
          }
        }
        if (this.radioVal === '3' || this.radioVal === 3) {
          if (this.selData1 === null) {
            this.$Message.warning('请选择客服分组');
            return;
          }
        }
        if (this.reply_text === '') {
          this.$Message.warning('请输入回复内容');
          return;
        }
        this.is_Loading = true;
        this.ajax.setMessageRuld({
          data: {
            appid: this.appid,
            key_word: this.key_word,
            reply_text: this.reply_text,
            rule_type: this.radioVal,
            pattern: this.pattern,
            uid: this.selData === null ? '' : this.selData.uid,
            user_group_id: this.selData1 === null ? '' : this.selData1.user_group_id
          },
          success: (res) => {
            this.is_Loading = false;
            sessionStorage.removeItem('dataobj');
            this.$router.push({
              name: 'enhance',
              query: {
                tab: 'name3'
              }
            });
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取部门列表
      getSection () {
        this.is_Loading = true;
        this.ajax.getSection({
          data: {},
          success: (res) => {
            this.is_Loading = false;
            this.data2 = res.body;
            // this.getUserList();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      /* tab的切换方法 */
      selTabFun (k) {
        this.selData = k;
      },
      selTabFun1 (k) {
        this.selData1 = k;
      },
      /* 获取客服列表 */
      getUserList () {
        this.is_Loading = true;
        this.ajax.getUserList({
          data: {
            user_group_id: this.sectionId,
            page: this.pageData.page
          },
          success: (res) => {
            this.is_Loading = false;
            this.pageData.count = parseInt(res.body.page_data.count);
            this.pageData.rows_num = res.body.page_data.rows_num;
            this.data1 = res.body.user_list;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 分页
      pageFun (v) {
        this.pageData.page = v;
        this.getUserList();
      }
    },
    created () {
      let data = JSON.parse(sessionStorage.getItem('dataobj'));
      if (data instanceof Object) {
        this.key_word = data.key_word;
        this.pattern = data.pattern;
        this.radioVal = data.rule_type;
        this.reply_text = data.reply_text;
        this.appid = data.appid;
      } else {
        this.appid = this.$route.query.appid;
      }
      this.getUserList();
      this.getSection();
    }
  };
</script>
