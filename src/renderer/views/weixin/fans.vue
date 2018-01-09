<style scoped lang="less">
    .top-box{
        height: 60px;
        background-color: #ffffff;
        border-bottom: 1px #f7f7f7 solid;
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
    .title-box{
        height: 60px;
        background-color: #ecf0f4;
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
    <div id="index">
        <div class="top-box">
            <ul>
                <li v-bind:class="tabVal == 'name1' ? 'active' : ''" @click="tabFun('name1')" >全部粉丝</li>
                <li v-bind:class="tabVal == 'name2' ? 'active' : ''" @click="tabFun('name2')">同步粉丝</li>
            </ul>

        </div>
        <div class="title-box">
            <Select class="" v-model="model1" v-show="tabVal == 'name1'" style="width:200px;margin: 14px">
                <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
            </Select>
            <!--<Button type="info" slot="extra" class="f-r" @click="modal4 = true" size="small" v-show="tabVal == 'name1'" style="margin: 15px">新建分组</Button>-->
            <Button type="info" class="f-r" @click="modal6 = true" v-show="tabVal == 'name2'" size="small" style="margin: 15px">创建同步任务</Button>
        </div>
        <div v-if="tabVal == 'name1'">
            <div class="tab cl">
                <div class="f-l l">
                    <Table border :columns="columns7" :data="data6" @on-selection-change="selWxUser" ></Table>
                    <div class="" style="text-align: center; padding: 10px">
                        <!--<Button type="info" class="f-l" @click="modal5 = true">批量移动分组</Button>-->
                        <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
                    </div>
                </div>


                <!-- dwad-->
                <div class="f-r r">
                    <div class="title">所有分组</div>
                    <div class="list" style="height: 600px; overflow: auto">
                        <ul>
                            <li v-for="(k, index) in data7" :key="index">
                                {{k.name}}({{k.count}})
                                <!--<span  color="group_del" style="float: right" title="删除当前组" @click="delGroupFun(k)">-->
                                    <!--<Icon type="trash-a"></Icon>-->
                                <!--</span>-->
                                <!--<span  color="" style="float: right;margin-right: 15px" title="修改当前组名" @click="modal4 = true,GroupId = k.id">-->
                                    <!--<Icon type="edit"></Icon>-->
                                <!--</span>-->
                            </li>
                        </ul>
                    </div>
                </div>




            </div>
        </div>
        <div v-if="tabVal == 'name2'">
            <div style="padding:10px;">
                <table class="table-copy">
                    <thead>
                    <tr>
                        <th>商户名称</th>
                        <th>任务类型</th>
                        <th>添加时间</th>
                        <th>结束时间</th>
                        <th>任务状态</th>
                        <th>任务进度</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(k, index) in data8" :key="index">
                        <td style="padding: 4px;">
                            {{k.app_name}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.task_type === 1 ? '同步粉丝列表' : k.task_type === 2 ? '同步粉丝基本信息' : '未知'}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.add_time}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.handle_end_time}}
                        </td>
                        <td>
                            {{k.state === -1 ? '执行失败' : k.state === 0 ? '等待执行' : k.state === 1 ? '执行中' : k.state === 2 ? '完成' : '未知'}}
                        </td>
                        <td>
                            <Progress :percent="parseInt(k.speed_progress)" status="active"></Progress>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="text-align: center;padding: 10px">
                <Page :total="pageData2.count" :page-size="pageData2.rows_num"  @on-change="pageFun2"></Page>
            </div>
        </div>
        <!-- 创建分组弹窗 -->
        <Modal v-model="modal4" title="组名称" @on-ok="addWxGroup">
            <Form label-position="left" :label-width="100">
                <FormItem label="名称">
                    <Input v-model="group_name"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- end创建分组弹窗 -->

        <!-- 选择分组弹窗 -->
        <Modal v-model="modal5" title="移至分组"  @on-ok="allMove">
            <Form label-position="left" :label-width="100">
                <FormItem label="请选择分组">
                    <Select v-model="group_id" style="width:200px">
                        <Option v-for="item in data7" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <!-- end选择分组弹窗 -->



        <!-- 选择分组弹窗 -->
        <Modal v-model="modal6" title="创建同步任务" @on-ok="synchronizationFun">
            <Form label-position="left" :label-width="100">
                <FormItem label="公共平台">
                    <Select class="" v-model="model2">
                        <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="任务类型">
                    <Select v-model="synchronization" style="width:200px">
                        <Option :value=1 >同步粉丝列表</Option>
                        <Option :value=2 >同步粉丝基本信息</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <!-- end选择分组弹窗 -->



        <!-- 请求状态 -->
        <!--<Spin fix v-if="is_Loading">-->
            <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
            <!--<div>请求中....</div>-->
        <!--</Spin>-->
        <!-- end请求状态 -->
    </div>
</template>
<script>
  export default {
    data () {
      return {
        tabVal: 'name1',
        cityList: [],
        model1: '',
        is_Loading: false,
        columns7: [
          // {
          //   type: 'selection',
          //   width: 60,
          //   align: 'center'
          // },
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
          },
          {
            title: '粉丝来源',
            key: 'source_qrcode_name'
          }
        ],
        data6: [],
        modal5: false,
        modal6: false,
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
        data7: [],
        data8: [],
        group_name: '',
        modal4: false,
        userArr: [],
        group_id: '',
        synchronization: 1,
        GroupId: '',
        model2: ''
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    watch: {
      model1: function (v) {
        if (v !== '') {
          this.getFansFun();
          this.pageData1.page = 1;
        }
      }
    },
    methods: {
      addMassFun () {
        this.$router.push({
          name: 'addMass'
        });
      },
      // tab切换方法
      tabFun (v) {
        this.tabVal = v;
        if (v === 'name1') {
          this.getFansFun();
        } else if (v === 'name2') {
          this.getTaskList();
        }
      },
      // 获取粉丝列表
      getFansFun () {
        this.is_Loading = true;
        this.ajax.getWxUserList({
          data: {
            page: this.pageData1.page,
            appid: this.model1
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
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 创建粉丝分组或修改组名称
      addWxGroup () {
        let data = null;
        if (this.GroupId !== '') {
          data = {
            appid: this.model1,
            name: this.group_name,
            group_id: this.GroupId
          };
        } else {
          data = {
            appid: this.model1,
            name: this.group_name
          };
        }
        this.is_Loading = true;
        this.ajax.addWxGroup({
          data: data,
          success: (res) => {
            this.GroupId = '';
            this.getWxGroup();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 选
      selWxUser (v) {
        this.userArr.length = 0;
        this.userArr.push(v);
      },
      // 批量移分组
      allMove () {
        this.is_Loading = true;
        let arr = [];
        this.userArr.forEach((k) => {
          k.forEach((s) => {
            arr.push(s.openid);
          });
        });
        this.ajax.moveUserWxGroup({
          data: {
            appid: this.model1,
            group_id: this.group_id,
            openid_list: arr
          },
          success: () => {
            this.$Message.success('操作成功');
            this.getWxGroup();
            this.getFansFun();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取任务进度
      getTaskList () {
        this.is_Loading = true;
        this.ajax.getTaskList({
          data: {
            page: this.pageData2.page
          },
          success: (res) => {
            this.is_Loading = false;
            this.data8 = res.body.data_list;
            this.pageData2.count = parseInt(res.body.page_data.count);
            this.pageData2.rows_num = res.body.page_data.rows_num;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 创建同步任务
      synchronizationFun () {
        this.ajax.syncWxUser({
          data: {
            appid: this.model2,
            type: this.synchronization
          },
          success: (res) => {
            this.getTaskList();
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 删除组
      delGroupFun (k) {
        let id = k.id;
        this.ajax.delWxGroup({
          data: {
            appid: this.model1,
            group_id: id
          },
          success: (res) => {
            this.getWxGroup();
            this.$Message.success('操作成功');
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
        this.getFansFun();
      },
      // 同步任务分页
      pageFun2 (v) {
        this.pageData2.page = v;
        this.getTaskList();
      }
    },
    created () {
      this.is_Loading = true;
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body.filter((k) => {
            if (k.type !== 2) {
              return k;
            }
          });
          this.model1 = this.cityList[0].appid;
          this.getWxGroup();
          this.getTaskList();
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
