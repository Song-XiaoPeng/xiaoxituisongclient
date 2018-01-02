<style scoped lang="less">
    #index{
        height: 100%;
    }

    .box{
        background-color: #fff;
    }
    .personnel,.chart,.information{
        border: 1px #eaeaea solid;
    }
    .information{
        width: 0%;
        border-right: 1px #eaeaea solid;
        position: relative;
        transition:all .5s;
        border: 0;
        overflow: hidden;
        .is_right_show{
            position: absolute;
            height: 30px;
            width: 30px;
            display: inline-block;
            top: 50%;
            left: -8px;
            margin-top: -15px;
            font-size: 20px;
            transform: rotateZ(270deg) rotateX(0deg);
            color: #999;
            cursor: pointer;
        }
    }
    .sel{
        padding: 10px 10px 0 10px;
    }
    .table-box{
        padding: 10px;
    }
    .chart{
        width: 100%;
        transition:all .5s;
        position: relative;
        .is_left_show{
            right: 0px;
            transform: rotateZ(270deg) rotateX(170deg);
            position: absolute;
            height: 30px;
            width: 30px;
            display: inline-block;
            top: 50%;
            margin-top: -15px;
            font-size: 20px;
            color: #999;
            cursor: pointer;
        }
    }
    .chart1{
        width: 66.66666667%;
    }
    .informationEl1{
        width: 33.33333333%;
        border: 1px solid rgb(234, 234, 234);
    }
    .time-box{
        padding: 0px 10px;
        ul{
            text-align: right;
            li{
                display: inline-block;
                border-right: 1px #eaeaea solid;
                padding: 1px 5px;
                cursor: pointer;
            }
            li:last-child{
                border-right: 0;
            }
            li.active{
                color: #3399ff;
            }
        }
    }
    .top-box{
        height: 60px;
        border-bottom: 1px #d1d6dc solid;
        ul{
            li{
                float: left;
                height: 100%;
                padding: 0 15px;
                color: #3e3e3e;
                font-size: 16px;
                line-height: 60px;
                cursor: pointer;
            }
            li.active{
                background-color: #7cb6fd;
                color: #fff;
            }
        }
    }
    .filtrate-box{
        height: 60px;
        background-color: #fefefe;
        .my-box{
            float: left;
            li{
                float: left;
                padding: 0 5px;
                height: 60px;
                line-height: 60px;
                color: #848484;
                font-size: 14px;
                cursor: pointer;
            }
            li.active{
                color: #3399ff;
            }
        }
    }
    .title-box{
        height: 60px;
        background-color: #ecf0f4;
        .txt-box{
            height: 60px;
            line-height: 60px;
            color: #7cb6fd;
            font-size: 14px;
            margin-left: 15px;
        }
    }
</style>
<template>
    <div id="index">
        <Row class="box">
            <div class="top-box">
                <ul class="cl">
                    <li v-bind:class="tabName == 'name1' ? 'active' : ''"  @click="selTabFun('name1')">线索跟踪提醒</li>
                    <li v-bind:class="tabName == 'name2' ? 'active' : ''"  @click="selTabFun('name2')">意向跟踪提醒</li>
                    <li v-bind:class="tabName == 'name3' ? 'active' : ''"  @click="selTabFun('name3')">回访提醒</li>
                </ul>
            </div>
            <div class="filtrate-box">
                <!--<ul class="my-box cl">-->
                    <!--<li v-if="tabName === 'name1'" v-bind:class="ascription == '3' ?  'active' : ''" @click="ascriptionFun('3')"></li>-->
                    <!--<li v-if="tabName === 'name1'" v-bind:class="ascription == '1' ?  'active' : ''" @click="ascriptionFun('1')"></li>-->
                    <!--<li v-if="tabName === 'name1'" v-bind:class="ascription == '2' ?  'active' : ''" @click="ascriptionFun('2')"></li>-->
                <!--</ul>-->
                <!--<ul class="my-box cl" style="margin: 0 20px">-->
                    <!--&lt;!&ndash;<li @click="hintFun" style="cursor: auto">总线索(<span style="color: #efc27c">{{statistics.clue}}</span>)</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li @click="hintFun" style="cursor: auto">今日(<span style="color: #efc27c">{{statistics.today}}</span>)</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li @click="hintFun" style="cursor: auto">待跟进(<span style="color: #efc27c">{{statistics.follow_up}}</span>)</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li @click="hintFun" style="cursor: auto">本月转为意向(<span style="color: #efc27c">{{statistics.intention}}</span>)</li>&ndash;&gt;-->
                <!--</ul>-->
                <ul class="my-box cl" style="float: right;">
                    <li v-bind:class="time_type == 1 ? 'active' : ''" @click="selContactFun(1)">今日需联系</li>
                    <li v-bind:class="time_type == 2 ? 'active' : ''" @click="selContactFun(2)">昨日需联系</li>
                    <li v-bind:class="time_type == 3 ? 'active' : ''" @click="selContactFun(3)">本周需沟通</li>
                    <li v-bind:class="time_type == 4 ? 'active' : ''" @click="selContactFun(4)">本月需沟通</li>
                    <li v-bind:class="time_type == 5 ? 'active' : ''" @click="selContactFun(5)">本月需联系</li>
                    <li v-bind:class="time_type == 6 ? 'active' : ''" @click="selContactFun(6)">超时需联系</li>
                    <li v-bind:class="time_type == 7 ? 'active' : ''" @click="selContactFun(7)">已完成</li>
                </ul>
            </div>
            <div ref="chartEl" v-bind:class="is_show_chartEl ? 'chart1' : ''" class="chart f-l" style="">
                 <span  class="is_left_show" v-if="is_left_show && is_show_chartEl == false" @click="isLefttShowFun" style="z-index: 100">
                    <Icon type="android-funnel"></Icon>
                 </span>
                    <div>

                                <div class="">
                                    <div class="btn-box cl" style="text-align: right;padding:10px">
                                        <Input class="f-l" v-model="real_name"  placeholder="客户名称" style="width: 200px"></Input>
                                        <Button class="f-l" type="info" style="margin-left: 2px" @click="getCustomerList('seek')">搜索</Button>
                                        <!--<Button class="f-l"  style="margin-left: 10px" type="ghost" @click="hintFun">高级搜索<Icon type="arrow-up-b"></Icon></Button>-->
                                        <!--<Button class="f-r"  style="margin-left: 10px" type="info"  @click="hintFun">添加业务提醒</Button>-->
                                        <!--<Button class="f-r"  style="margin-left: 10px" type="warning"  @click="hintFun">群发激活</Button> -->
                                    </div>
                                    <div class="title-box cl">
                                        <div class="f-l txt-box">提醒</div>
                                        <div class="f-r">
                                            <!--<Button type="ghost" @click="hintFun" style="margin: 15px">设置标题</Button>-->
                                        </div>
                                    </div>
                                    <div class="table-box">
                                        <Table border ref="selection" highlight-row :loading="is_Loading" :columns="columns4" :data="data1" ></Table>
                                    </div>
                                    <div style="text-align: center;padding: 5px">
                                        <Page :total="pageData.count" :page-size="pageData.rows_num" @on-change="pageFun"></Page>
                                    </div>
                                </div>





                                <!--<div v-if="tabName == 'name2'">-->
                                    <!--<div class="btn-box cl" style="text-align: right;padding:10px">-->
                                        <!--<Input class="f-l" v-model="real_name"  placeholder="客户名称" style="width: 200px"></Input>-->
                                        <!--<Button class="f-l" type="info" style="margin-left: 2px" @click="getCustomerList('seek')">搜索</Button>-->
                                        <!--&lt;!&ndash;<Button class="f-l"  style="margin-left: 10px" type="ghost" @click="hintFun">高级搜索<Icon type="arrow-up-b"></Icon></Button>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<Button class="f-r"  style="margin-left: 10px" type="info"  @click="hintFun">导出线索</Button>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<Button class="f-r"  style="margin-left: 10px" type="warning"  @click="hintFun">导入线索</Button>&ndash;&gt;-->
                                    <!--</div>-->
                                    <!--<div class="title-box cl">-->
                                        <!--<div class="f-l txt-box">线索池</div>-->
                                        <!--<div class="f-r">-->
                                            <!--<Button type="ghost" @click="hintFun" style="margin: 15px">批量操作</Button>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="table-box">-->
                                        <!--<Table border ref="selection" highlight-row :loading="is_Loading" :columns="columns5" :data="data2"></Table>-->
                                    <!--</div>-->
                                    <!--<div style="text-align: center;padding: 5px">-->
                                        <!--<Page :total="pageData.count" :page-size="pageData.rows_num" @on-change="pageFun"></Page>-->
                                    <!--</div>-->
                                <!--</div>-->

                    </div>

                </div>


                <div ref="informationEl" v-bind:class="is_show_informationEl ? 'informationEl1' : ''" class="information f-l" style="height: 87%;overflow: auto;box-sizing: border-box;">
                    <span ref="isRightShow" v-if="is_left_show && is_show_chartEl" class="is_right_show" @click="isRightShowFun">
                        <Icon type="android-funnel"></Icon>
                    </span>
                    <formation></formation>
                </div>
        </Row>




        <!-- 群发弹窗 -->
        <!--<Modal v-model="modal3" title="群发"  :width="800">-->
            <!--<chart  :isMass="isMass"></chart>-->
            <!--<div slot="footer">-->
                <!--<span class="" style="color: #ff3300">最多同时发送30人，只可用模版消息/或文字消息</span>-->
            <!--</div>-->
        <!--</Modal>-->
        <!-- end群发弹窗 -->


        <!-- 客户详情弹窗 -->
        <Modal v-model="popup3" title="详情" @on-ok="">
            <Form  label-position="right" :label-width="100">
                <FormItem label="客户姓名:">
                    <span>{{clientData.real_name}}</span>
                </FormItem>
                <FormItem label="客户手机:">
                    <span>{{clientData.real_phone}}</span>
                </FormItem>
                <FormItem label="客户微信:">
                    <span>{{clientData.wx_number}}</span>
                </FormItem>
                <FormItem label="客户性别:">
                    <span>{{clientData.real_sex == 1 ? '男' : clientData.real_sex == 2 ? '女' : '未知'}}</span>
                </FormItem>
                <FormItem label="客户联系地址:">
                    <span>{{clientData.contact_address}}</span>
                </FormItem>
                <FormItem label="所属公司名:">
                    <span>{{clientData.wx_company_name}}</span>
                </FormItem>
                <FormItem label="所属分组名:">
                    <span>{{clientData.wx_user_group_name ? clientData.wx_user_group_name.group_name : ''}}</span>
                </FormItem>
                <FormItem label="客户生日:">
                    <span>{{clientData.birthday}}</span>
                </FormItem>
                <FormItem label="客户邮箱:">
                    <span>{{clientData.email}}</span>
                </FormItem>
                <FormItem label="客户电话:">
                    <span>{{clientData.tel}}</span>
                </FormItem>
            </Form>
        </Modal>
        <!-- end客户详情弹窗 -->


        <!--<Modal v-model="is_screen" title="高级搜索" :width="600">-->
            <!--<screen></screen>-->
        <!--</Modal>-->

        <!-- 加载状态 -->
        <!--<Spin fix v-if="is_Loading">-->
            <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
            <!--<div>请求中....</div>-->
        <!--</Spin>-->
        <!-- end加载状态 -->
    </div>
</template>
<script>
  import Bus from '../../assets/eventBus';
  // import personnel from '../commonComponent/ChatPopulation';
  import formation from './commonComponent/commoninformation';
  // import chart from '../commonComponent/Chatting';
  // import screen from '../commonComponent/screen';
  export default {
    data () {
      return {
        model1: '1',
        model2: '1',
        model3: '1',
        popup3: false,
        is_Loading: false,
        clientData: {},
        columns4: [
          {
            title: '微信用户昵称',
            render: (h, p) => {
              return h('div', [
                h('a', {
                  style: {
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  },
                  on: {
                    click: () => {
                      if (this.userInfo.user_type !== 3) {
                        this.jionUpFun(p.row);
                      }
                    }
                  }
                }, p.row.nickname === '' || p.row.nickname === null ? '无法显示名称' : p.row.nickname)
              ]);
            }
          },
          {
            title: '真实姓名',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.real_name === null || p.row.real_name === '' ? '暂无' : p.row.real_name);
            }
          },
          {
            title: '公司名称',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.wx_comapny_name === null || p.row.wx_comapny_name === '' ? '暂无' : p.row.wx_comapny_name);
            }
          },
          {
            title: '产品',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.product_name === null || p.row.product_name === '' ? '暂无' : p.row.product_name);
            }
          },
          {
            title: '所在城市',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.province + ',' + p.row.city);
            }
          },
          {
            title: '负责人',
            ellipsis: true,
            key: 'customer_service_name'
          },
          {
            title: '手机号码',
            render: (h, p) => {
              return h('span', p.row.real_phone === null || p.row.real_phone === '' ? '暂无' : p.row.real_phone);
            }
          },
          {
            title: '来访次数',
            ellipsis: true,
            key: 'get_into_count'
          },
          {
            title: '操作',
            render: (h, p) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.selTableFun(p.row);
                  }
                }
              }, '详情');
            }
          }
        ],
        data1: [],
        columns5: [
          {
            title: '微信用户昵称',
            render: (h, p) => {
              return h('div', [
                h('a', {
                  style: {
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  },
                  on: {
                    click: () => {
                      if (this.userInfo.user_type !== 3) {
                        this.jionUpFun(p.row);
                      }
                    }
                  }
                }, p.row.nickname === '' || p.row.nickname === null ? '无法显示名称' : p.row.nickname)
              ]);
            }
          },
          {
            title: '真实姓名',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.real_name === null || p.row.real_name === '' ? '暂无' : p.row.real_name);
            }
          },
          {
            title: '产品',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.product_name === null || p.row.product_name === '' ? '暂无' : p.row.product_name);
            }
          },
          {
            title: '公司名称',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.wx_comapny_name === null || p.row.wx_comapny_name === '' ? '暂无' : p.row.wx_comapny_name);
            }
          },
          {
            title: '手机号码',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.real_phone === null || p.row.real_phone === '' ? '暂无' : p.row.real_phone);
            }
          },
          {
            title: '所在城市',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.province + ',' + p.row.city);
            }
          },
          {
            title: '进入公共号次数',
            ellipsis: true,
            render: (h, p) => {
              return h('span', p.row.get_into_count);
            }
          },
          {
            title: '最近沟通时间',
            key: 'last_time'
          },
          {
            title: '操作',
            render: (h, p) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.selTableFun(p.row);
                  }
                }
              }, '详情');
            }
          }
        ],
        data2: [],
        modal2: false,
        desc: '',
        modal3: false,
        isMass: false,
        modal_loading: false,
        is_screen: false,
        page: 1,
        real_name: '',
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        tabName: 'name1',
        is_seek: false,
        selUserData: null,
        txta: '',
        RemindDate: '',
        is_show_chartEl: false,
        is_show_informationEl: false,
        is_left_show: false,
        userInfo: null,
        time_type: 1,
        pageData: {
          count: 0,
          page: 1,
          rows_num: 0
        },
        ascription: '3',
        statistics: {}
      };
    },
    components: {
      // personnel,
      formation
      // chart,
      // screen
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      // 接入
      jionUpFun (k) {
        this.is_Loading = true;
        this.ajax.createWxUserSession({
          data: {
            openid: k.openid,
            appid: k.appid
          },
          success: (res) => {
            this.is_Loading = false;
            this.$Spin.show({
              render: (h) => {
                return h('div', [
                  h('div', '正在创建链接。。。')
                ]);
              }
            });
            setTimeout(() => {
              this.$Spin.hide();
              this.$router.push({
                name: 'ServeIndex',
                query: {
                  type: 'clue',
                  data: res
                }
              });
            }, 3000);
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 待开发提示
      hintFun () {
        // this.$Message.warning('玩命开发中。。。。');
      },
      // 全部/我的客户/下属客户
      ascriptionFun (t) {
        this.ascription = t;
        this.is_left_show = false;
        this.is_show_chartEl = false;
        this.is_show_informationEl = false;
        this.getCustomerList();
      },
      // 添加业务提醒
      massFun () {
        this.modal3 = true;
        this.isMass = true;
      },
      // 获取客户提醒列表
      getCustomerList (is) {
        if (is === 'seek') {
          if (this.real_name === '') {
            this.$Message.warning('请输入搜索的客户名称');
            return;
          }
        }
        this.is_Loading = true;
        this.ajax.getAllRemindList({
          data: {
            page: this.pageData.page,
            search_text: this.real_name,
            remind_type: this.tabName === 'name1' ? 1 : this.tabName === 'name2' ? 2 : this.tabName === 'name3' ? 3 : '',
            time_type: this.time_type
          },
          success: (res) => {
            this.data1 = res.body.data_list;
            this.pageData.count = parseInt(res.body.page_data.count);
            this.pageData.rows_num = parseInt(res.body.page_data.rows_num);
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // tab切换客户
      selTabFun (v) {
        this.pageData.page = 1;
        this.pageData.rows_num = 1;
        this.pageData.count = 1;
        this.tabName = v;
        this.is_left_show = false;
        this.is_show_chartEl = false;
        this.is_show_informationEl = false;
        this.getCustomerList();
        // this.isRightShowFun();
      },
      // 时间选择
      dateFun (v) {
        this.RemindDate = v;
      },
      // 数据表格选择方法
      selTableFun (v) {
        // obj  用于标识客户管理页面 jkwadbjwabd
        let obj = {
          common: true,
          information: false,
          record: false,
          remind: false,
          type: this.tabName === 'name1' ? '' : '',
          ajax_type: 'clue'
        };
        Bus.$emit('change', v, obj);
        this.is_show_chartEl = true;
        this.is_show_informationEl = true;
        this.is_left_show = true;
      },
      // 右边内容显示隐藏动态效果
      isRightShowFun () {
        this.is_show_chartEl = false;
        this.is_show_informationEl = false;
        this.is_left_show = true;
      },
      // 左边内容显示隐藏动态效果
      isLefttShowFun () {
        this.is_show_chartEl = true;
        this.is_show_informationEl = true;
        this.is_left_show = true;
      },
      // 选择需要提醒的时间  获取相关的数据
      selContactFun (t) {
        this.time_type = t;
        this.getCustomerList();
      },
      // 删除提醒列表的 数据
      delContactFun (k, i) {
        this.is_Loading = true;
        this.ajax.delRemind({
          data: {
            remind_id: k.remind_id
          },
          success: (res) => {
            this.is_Loading = false;
            this.data2.splice(i, 1);
            this.$Message.success('操作成功');
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
        this.getCustomerList();
      }
    },
    destroyed (s) {
      Bus.$off();
    },
    created () {
      Bus.$off();
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          Bus.$emit('WxAuthList', res);
          // sessionStorage.setItem('WxAuthList', JSON.stringify(res.body));
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
      this.getCustomerList();
    }
  };
</script>
