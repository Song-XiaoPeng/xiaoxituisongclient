<style scoped lang="less">
    .top-tab{
        padding: 0 10px;
        ul{
            text-align: right;
            li{
                border-right: 1px #eaeaea solid;
                display: inline-block;
                padding: 0px 5px;
                cursor: pointer;
                transition: all .3s
            }
            li:hover{
                color: #2db7f5;
            }
            li:last-child{
                border-right: 0;
            }
        }
    }
    .content-box{
        padding: 10px;
    }
    .top-box{
        text-align: right;
        padding:10px;
        border-bottom: 1px #eaeaea solid;
        background-color: #fff;
    }
    .tab{
        padding: 10px;
        background-color: #fff;
    }
    .table-copy {
        border-collapse: collapse;
        width: 100%;
    }

    .table-copy, td, th{
        border:1px solid #e9eaec;
        text-align: center;
        height: 40px;
    }

    .table-copy th{
        background-color: #f8f8f9;
    }

    .table-copy tr:nth-child(even){
        background: #f8f8f9;
    }

    .table-copy tr:hover{
        background: #ebf7ff;
    }
</style>
<template>
   <div class="">
       <div class="top-tab cl">

           <!--<ul class="f-r" style="margin-top: 5px">-->
               <!--<li>关键词回复</li>-->
               <!--<li>收到消息回复</li>-->
               <!--<li>被关注回复</li>-->
           <!--</ul>-->
           <Select class="f-r" v-model="model2" style="width:200px;margin-right: 10px" @on-change="selMarkFun">
               <Option v-for="item in cityList" :value="item.appid" :key="item.value">{{ item.nick_name }}</Option>
           </Select>
       </div>
       <div class="content-box">
          <div class="cl" style="padding: 10px">
              <!--<Input  placeholder="关键字" icon="search" style="width: 300px"></Input>-->
              <Button class="f-r" type="info" @click="addRevertFun">添加自动回复</Button>
          </div>
          <div>
              <table class="table-copy">
                  <thead>
                  <tr>
                      <th>关键字</th>
                      <th>内容</th>
                      <th>创建时间</th>
                      <th>操作</th>
                      <!-- <th>能否接单</th> -->
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(k, index) in data6" :key="index">
                      <td style="padding: 4px;">
                          {{k.key_word}}
                      </td>
                      <td style="padding: 4px;">
                          {{k.reply_text}}
                      </td>
                      <td style="padding: 4px;">
                          {{k.add_time}}
                      </td>
                      <td>
                          <Button  type="info" @click="edit(k)">修改</Button>
                          <Button  type="warning" @click="delMessageRule(k, index)">删除</Button>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
          <div class="" style="text-align: center; padding: 10px">
              <Page :total="pageData.count" :page-size="pageData.rows_num" @on-change="pageFun"></Page>
          </div>
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
        data6: [],
        cityList: [],
        model1: '',
        model2: '',
        is_Loading: false,
        appid: '',
        pageData: {
          count: 0,
          rows_num: 0,
          page: 1
        }
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      addRevertFun () {
        sessionStorage.removeItem('dataobj');
        this.$router.push({
          name: 'revertEdit',
          query: {
            appid: this.model2
          }
        });
      },
      /* 选择相关的小程序或公共号 */
      selMarkFun () {
      },
      /* 获取公共号及小程序 */
      getWxAuthList () {
        this.is_Loading = true;
        this.ajax.getWxAuthList({
          data: {},
          success: (res) => {
            this.is_Loading = false;
            this.cityList = res.body;
            this.model2 = res.body[0].appid;
            this.getMessageRuleList();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取列表
      getMessageRuleList () {
        this.is_Loading = true;
        this.ajax.getMessageRuleList({
          data: {
            appid: this.model2,
            page: '1'
          },
          success: (res) => {
            this.is_Loading = false;
            this.data6 = res.body.data_list;
            this.pageData.count = res.body.page_data.count;
            this.pageData.rows_num = res.body.page_data.rows_num;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      /* 分页 */
      pageFun (v) {
        this.pageData.page = v;
        this.getMessageRuleList();
      },
      /* 修改 */
      edit (k) {
        sessionStorage.setItem('dataobj', JSON.stringify(k));
        this.$router.push({
          name: 'revertEdit'
        });
      },
      // 删除自动回复条目
      delMessageRule (k, i) {
        this.is_Loading = true;
        this.ajax.delMessageRule({
          data: {
            message_rule_id: k.message_rule_id
          },
          success: () => {
            this.is_Loading = false;
            this.$Message.success('操作成功');
            console.log(this.data6);
            this.data6.splice(i, 1);
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      }
    },
    created () {
      this.getWxAuthList();
    }
  };
</script>
