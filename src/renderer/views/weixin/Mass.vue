<style scoped lang="less">
    .top-box{
        height: 60px;
        border-bottom: 1px #eaeaea solid;
        ul{
            li{
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 16px;
                color: #333333;
                float: left;
                padding: 0 10px;
                cursor: pointer;
            }
            li.active{
                background-color: #2db7f5;
                color: #fff;
            }
        }
    }
    .tab{
        padding: 10px;
    }
</style>
<template>
    <div id="index">
        <div class="top-box">
            <ul>
                <li v-bind:class="is_tab == 'name1' ? 'active' : ''" @click="tabFun('name1')" >新建发送条目</li>
                <li v-bind:class="is_tab == 'name2' ? 'active' : ''" @click="tabFun('name2')">发送记录</li>
            </ul>
        </div>
        <div style="background-color: #ecf0f4">
            <span v-if="is_tab == 'name1'" style="color: #2db7f5;margin: 18px;display: inline-block">新建群发</span>
            <span v-if="is_tab == 'name2'" style="color: #2db7f5;margin: 18px;display: inline-block">发送记录</span>
            <Select v-model="appid" style="width:200px" @on-change="selAppidFun">
                <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
            </Select>
        </div>
        <div class="" v-if="is_tab == 'name2'">
            <div>
                <div class="tab">
                    <Table border :columns="columns7" :data="data6"></Table>
                </div>
                <div style="text-align: center;padding: 10px">
                    <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
                </div>
            </div>
        </div>
        <div v-if="is_tab == 'name1'">
            <addMess :appid="appid"></addMess>
        </div>
        <!-- 请求状态 -->
        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>请求中....</div>
        </Spin>
        <!-- end请求状态 -->
    </div>
</template>
<script>
  import addMess from './addMass';
  export default {
    data () {
      return {
        cityList: [],
        model1: '',
        columns7: [
          {
            title: '消息类型',
            render: (h, p) => {
              return h('span', p.row.send_message_type === 1 ? '文字' : p.row.send_message_type === 2 ? '图文' : '图片');
            }
          },
          {
            title: '发送公共号名',
            key: 'app_name'
          },
          {
            title: '发送类型',
            render: (h, p) => {
              return h('span', p.row.send_type === 1 ? '立即发送' : '定时发送 ：' + p.row.send_time);
            }
          },
          {
            title: '接受类型',
            render: (h, p) => {
              return h('span', p.row.type === 1 ? '全部' : p.row.type === 2 ? '按分组' : '指定用户');
            }
          },
          {
            title: '创建时间',
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delMassNews(params.row.news_id, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data6: [],
        appid: '',
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        is_Loading: false,
        is_tab: 'name2'
      };
    },
    components: {
      addMess
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      // tab切换方法
      tabFun (v) {
        this.is_tab = v;
      },
      // 获取发送数据列表
      getMassListFun () {
        this.ajax.getMassNewsList({
          data: {
            appid: this.appid,
            page: this.pageData1.page
          },
          success: (res) => {
            this.is_Loading = false;
            this.data6 = res.body.data_list;
            this.pageData1.count = parseInt(res.body.page_data.count);
            this.pageData1.rows_num = res.body.page_data.rows_num;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 删除群发条目
      delMassNews (id, i) {
        this.is_Loading = true;
        this.ajax.delMassNews({
          data: {
            appid: this.appid,
            news_id: id
          },
          success: (res) => {
            this.is_Loading = false;
            this.$Message.success('操作成功');
            this.data6.splice(i, 1);
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 分页
      pageFun1 (v) {
        this.pageData1.page = v;
        this.getMassListFun();
      },
      // 公共号appid 改变方法
      selAppidFun () {
        this.getMassListFun();
      }
    },
    created () {
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body.filter((k) => {
            if (k.type !== 2) {
              return k;
            }
          });
          this.appid = this.cityList[0].appid;
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
