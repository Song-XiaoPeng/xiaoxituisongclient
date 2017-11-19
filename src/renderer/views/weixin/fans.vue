<style scoped lang="less">
    .top-box{
        padding: 10px;
    }
    .tab{
        padding: 10px;
        >div{
            display: inline-block;
        }
        .l{
            width: 80%;
        }
        .r{
            width: 20%;
            box-sizing: border-box;
            padding: 0 10px;
            .title{
                padding: 10px 0;
                background-color: #2db7f5;
                color: #fff;
                text-align: center;
                font-size: 16px;
            }
            .list{
                border-bottom: 1px #eaeaea solid;
                border-left: 1px #eaeaea solid;
                border-right: 1px #eaeaea solid;
                ul{
                    padding: 5px 10px;
                    box-sizing: border-box;
                    li{
                        padding: 5px 0;
                        border-bottom: 1px #EAEAEA solid;
                        font-size: 14px;
                        cursor: pointer;
                        transition: all .3s;
                    }
                    li:hover{
                        color: #2db7f5;
                    }
                    li:last-child{
                        border-bottom: 0;
                    }
                }
            }
        }
    }
    .synchronization-switch{
        float: right;
        width: 122px;
    }
</style>
<template>
    <div id="index">
        <div class="top-box">
            <span>当前公共号：</span>
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
            </Select>
        </div>
        <Tabs value="name1">
            <TabPane label="全部粉丝" name="name1">
                <div class="cl" style="padding: 10px">
                    <Button type="info" class="f-r" @click="modal4 = true" >新建分组</Button>
                </div>
                <div class="tab cl">
                    <div class="f-l l">
                        <Table border :columns="columns7" :data="data6" @on-select="selWxUser" @on-select-all="allWxUser"></Table>
                        <div class="" style="text-align: center; padding: 10px">
                            <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
                        </div>
                    </div>
                    <div class="f-r r">
                        <div class="title">所有分组</div>
                        <div class="list">
                            <ul>
                                <li v-for="k in data7">{{k.name}}({{k.count}})</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </TabPane>
            <TabPane label="同步粉丝" name="name2">
                <div class="synchronization-switch">
                    <span>同步粉丝：</span>
                    <i-switch>
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
            </TabPane>
        </Tabs>

        <!-- 创建分组弹窗 -->
        <Modal v-model="modal4" title="图片" width="750" @on-ok="addWxGroup">
            <Form label-position="left" :label-width="100">
                <FormItem label="名称">
                    <Input v-model="group_name"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- end创建分组弹窗 -->


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
        model1: '',
        is_Loading: false,
        columns7: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '微信昵称',
            key: 'nickname'
          },
          {
            title: '微信用户性别',
            render: (h, p) => {
              return h('span', p.row.gender === 1 ? '男' : p.row.gender === 2 ? '女' : '未知');
            }
          },
          {
            title: '所属公共号名称',
            key: 'app_name'
          },
          {
            title: '所在地',
            render: (h, p) => {
              return h('span', p.row.province + '-' + p.row.city);
            }
          },
          {
            title: '添加时间',
            key: 'add_time'
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
                }, '移至分组'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '详情')
              ]);
            }
          }
        ],
        data6: [],
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        data7: [],
        group_name: '',
        modal4: false
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      addMassFun () {
        this.$router.push({
          name: 'addMass'
        });
      },
      // 获取粉丝列表
      getFansFun () {
        this.is_Loading = true;
        this.ajax.getWxUserList({
          data: {
            page: this.pageData1.page
          },
          success: (res) => {
            this.is_Loading = false;
            this.data6 = res.body.data_list;
            this.pageData1.count = parseInt(res.body.page_data.count);
            this.pageData1.rows_num = res.body.page_data.rows_num;
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取粉丝分组
      getWxGroup () {
        this.is_Loading = true;
        this.ajax.getWxGroup({
          data: {
            appid: this.model1
          },
          success: (res) => {
            this.is_Loading = false;
            this.data7 = res.body;
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 创建粉丝分组
      addWxGroup () {
        this.is_Loading = true;
        this.ajax.addWxGroup({
          data: {
            appid: this.model1,
            name: this.group_name
          },
          success: (res) => {
            this.getWxGroup();
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 单选
      selWxUser (v) {
        console.log(v, 333);
      },
      // 全选
      allWxUser (v) {
        console.log(v);
      },
      // 分页
      pageFun1 (v) {
        this.pageData1.page = v;
        this.getFansFun();
      }
    },
    created () {
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body;
          this.model1 = res.body[0].appid;
          this.getFansFun();
          this.getWxGroup();
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
