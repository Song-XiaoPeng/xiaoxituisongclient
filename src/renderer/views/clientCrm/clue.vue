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
                    <li v-bind:class="tabName == 'name1' ? 'active' : ''"  @click="selTabFun('name1')">线索</li>
                    <li v-bind:class="tabName == 'name2' ? 'active' : ''"  @click="selTabFun('name2')">线索池</li>
                    <!--<li v-bind:class="tabName == '2' ? 'active' : ''"  @click="hintFun()">跟踪提醒</li>-->
                </ul>
            </div>
            <div class="filtrate-box">
                <ul class="my-box cl">
                    <li v-if="tabName === 'name1'" v-bind:class="ascription == '3' ?  'active' : ''" @click="ascriptionFun('3')">全部</li>
                    <li v-if="tabName === 'name1'" v-bind:class="ascription == '1' ?  'active' : ''" @click="ascriptionFun('1')">我的客户</li>
                    <li v-if="tabName === 'name1'" v-bind:class="ascription == '2' ?  'active' : ''" @click="ascriptionFun('2')">下属客户</li>
                </ul>
                <ul class="my-box cl" style="margin: 0 20px">
                    <li @click="hintFun" style="cursor: auto">总线索(<span style="color: #efc27c">{{statistics.clue}}</span>)</li>
                    <li @click="hintFun" style="cursor: auto">今日(<span style="color: #efc27c">{{statistics.today}}</span>)</li>
                    <li @click="hintFun" style="cursor: auto">待跟进(<span style="color: #efc27c">{{statistics.follow_up}}</span>)</li>
                    <li @click="hintFun" style="cursor: auto">本月转为意向(<span style="color: #efc27c">{{statistics.intention}}</span>)</li>
                </ul>
                <ul class="my-box cl">
                    <!--<li @click="hintFun">今日需联系</li>-->
                    <!--<li @click="hintFun">明日需联系</li>-->
                    <!--<li @click="hintFun">本周需沟通</li>-->
                    <!--<li @click="hintFun">本月需沟通</li>-->
                    <!--<li @click="hintFun">7日未联系</li>-->
                    <!--<li @click="hintFun">15日未联系</li>-->
                    <!--<li @click="hintFun">30日未联系</li>-->
                </ul>
            </div>
            <div ref="chartEl" v-bind:class="is_show_chartEl ? 'chart1' : ''" class="chart f-l" style="">
                 <span  class="is_left_show" v-if="is_left_show && is_show_chartEl == false" @click="isLefttShowFun" style="z-index: 100">
                    <Icon type="android-funnel"></Icon>
                 </span>
                    <div>

                                <div v-if="tabName == 'name1'" class="">
                                    <div class="btn-box cl" style="text-align: right;padding:10px">
                                        <Input class="f-l" v-model="real_name"  placeholder="客户名称" style="width: 200px"></Input>
                                        <Button class="f-l" type="info" style="margin-left: 2px" @click="getCustomerList('seek')">搜索</Button>
                                        <!--<Button class="f-l"  style="margin-left: 10px" type="ghost" @click="hintFun">高级搜索<Icon type="arrow-up-b"></Icon></Button>-->
                                        <!--<Button class="f-r"  style="margin-left: 10px" type="info"  @click="hintFun">添加业务提醒</Button>-->
                                        <!--<Button class="f-r"  style="margin-left: 10px" type="warning"  @click="hintFun">群发激活</Button> -->
                                    </div>
                                    <div class="title-box cl">
                                        <div class="f-l txt-box">线索</div>
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

                                <div v-if="tabName == 'name2'">
                                    <div class="btn-box cl" style="text-align: right;padding:10px">
                                        <Input class="f-l" v-model="real_name"  placeholder="客户名称" style="width: 200px"></Input>
                                        <Button class="f-l" type="info" style="margin-left: 2px" @click="getCustomerList('seek')">搜索</Button>
                                        <!--<Button class="f-l"  style="margin-left: 10px" type="ghost" @click="hintFun">高级搜索<Icon type="arrow-up-b"></Icon></Button>-->
                                        <!--<Button class="f-r"  style="margin-left: 10px" type="info"  @click="hintFun">导出线索</Button>-->
                                        <!--<Button class="f-r"  style="margin-left: 10px" type="warning"  @click="hintFun">导入线索</Button>-->
                                    </div>
                                    <div class="title-box cl">
                                        <div class="f-l txt-box">线索池</div>
                                        <div class="f-r">
                                            <Button type="ghost" @click="hintFun" style="margin: 15px">批量操作</Button>
                                        </div>
                                    </div>
                                    <div class="table-box">
                                        <Table border ref="selection" highlight-row :loading="is_Loading" :columns="columns5" :data="data2"></Table>
                                    </div>
                                    <div style="text-align: center;padding: 5px">
                                        <Page :total="pageData.count" :page-size="pageData.rows_num" @on-change="pageFun"></Page>
                                    </div>
                                </div>

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




        <!-- 分配人员列表 1213-->
        <Modal v-model="popup6" title="添加用户" @on-ok="allocationUserFun" width="800">
            <div class="" style="max-height: 500px; overflow: auto">
                <Form :label-width="80">
                    <!--<FormItem label="所属部门">-->
                        <!--<Select  v-model="user_group_id">-->
                            <!--<Option  :value="k.uid" v-for="(k, i) in subordinateList" :key="i">{{k.user_name}}</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->
                    <FormItem label="人员">
                        <Table border ref="selection" highlight-row :columns="columns6" :data="subordinateList" :loading="is_Loading" @on-current-change="selAllocationUser"></Table>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <!-- end分配人员列表 -->





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
        cityList: [
          {
            value: '1',
            label: '今日会话'
          },
          {
            value: '2',
            label: '昨日会话'
          },
          {
            value: '3',
            label: '本周会话'
          },
          {
            value: '4',
            label: '本月会话'
          }
        ],
        cityList1: [
          {
            value: '1',
            label: '全部'
          },
          {
            value: '2',
            label: '我的客户'
          },
          {
            value: '3',
            label: '下属客户'
          }
        ],
        cityList2: [
          {
            value: '1',
            label: '7日未联系'
          },
          {
            value: '2',
            label: '15日未联系'
          },
          {
            value: '3',
            label: '30日未联系'
          }
        ],
        model1: '1',
        model2: '1',
        model3: '1',
        data6: [],
        columns6: [
          {
            title: '姓名',
            ellipsis: true,
            key: 'user_name'
          },
          {
            title: '手机号',
            ellipsis: true,
            key: 'phone_no'
          },
          {
            title: '性别',
            ellipsis: true,
            key: 'sex',
            render: (h, p) => {
              return h('span', p.row.sex === 1 ? '男' : '女');
            }
          }
        ],
        popup3: false,
        popup6: false,
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
            render: (h, p) => {
              let names = p.row.product_list.map((k) => {
                return k.product_name;
              });
              return h('span', names.join());
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
            title: '进入公共号次数',
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
              /* return h('Button', {
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
              }, '详情'); */
              return h(`div`, [
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
                      this.allocationIndex = p.row.index;
                      this.allocationSelData = p.row;
                      this.receiveIntention(p.row, p.index);
                    }
                  }
                }, '领取'),
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
                      this.popup6 = true;
                      this.allocationIndex = p.row.index;
                      this.allocationSelData = p.row;
                      // this.selTableFun(p.row);
                    }
                  }
                }, '分配')
              ]);
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
        statistics: {},
        intentionStatistics: {},
        subordinateList: [],
        user_group_id: '',
        user: null,
        allocationIndex: null,
        allocationSelData: null
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
      // 获取客户列表
      getCustomerList (is) {
        if (is === 'seek') {
          if (this.real_name === '') {
            this.$Message.warning('请输入搜索的客户名称');
            return;
          }
        }
        this.is_Loading = true;
        this.ajax.getClueCustomer({
          data: {
            page: this.pageData.page,
            real_name: this.real_name,
            type: this.tabName === 'name1' ? 2 : 1,
            ascription: this.ascription
          },
          success: (res) => {
            if (this.tabName === 'name1') {
              this.data1 = res.body.data_list;
            } else if (this.tabName === 'name2') {
              this.data2 = res.body.data_list;
            }
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
        if (v === 'name2') {
          this.ascription = '';
        } else if (v === 'name1') {
          this.ascription = '3';
        }
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
          remind: true,
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
      // 获取提醒跟踪列表
      getTailList (is) {
        if (is === 'seek') {
          if (this.real_name === '') {
            this.$Message.warning('请输入搜索的内容');
            return;
          }
        }
        this.is_Loading = true;
        this.ajax.getAllRemindList({
          data: {
            page: 1,
            search_text: this.real_name,
            customer_type: 0,
            time_type: this.time_type
          },
          success: (res) => {
            res.body.data_list.forEach((k) => {
              if (k.complete_content === null || k.complete_content === '' || k.complete_content === undefined) {
                k.complete_content = '暂无内容';
              }
            });
            this.data2 = res.body.data_list;
            this.pageData.count = parseInt(res.body.page_data.count);
            this.pageData.row_sum = parseInt(res.body.page_data.rows_num);
            this.real_name = '';
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 选择需要提醒的时间  获取相关的数据
      selContactFun (t) {
        this.time_type = t;
        this.getTailList();
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
      },
      // 获取线索统计数据
      getClueStatisticData () {
        this.ajax.getClueStatisticData({
          data: {},
          success: (res) => {
            this.statistics = res.body;
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取我的下属账号信息list
      getSubordinateList () {
        this.ajax.getSubordinateList({
          data: {
          },
          success: (res) => {
            this.user_group_id = res.body[0].uid || 0;
            this.subordinateList = res.body;
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 选择下属别个数据方法
      selAllocationUser (v) {
        this.user = v;
      },
      // 分配下属 djwandwanfkwa
      allocationUserFun () {
        if (this.user === null) {
          this.$Message.warning('请选择人员');
          return;
        }
        this.ajax.receiveCuedPool({
          data: {
            wx_user_id: this.allocationSelData.wx_user_id,
            uid: this.user.uid
          },
          success: (res) => {
            this.data2.splice(this.allocationIndex, 1);
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 领取意向客户池客户
      receiveIntention (k, i) {
        this.ajax.receiveCuedPool({
          data: {
            wx_user_id: k.wx_user_id
          },
          success: (res) => {
            this.data2.splice(i, 1);
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      }
    },
    watch: {
      user_group_id: function (v) {
        this.data6 = [];
        this.subordinateList.forEach((k) => {
          if (k.user_group_id === v) {
            this.data6 = k.uid_list;
          }
        });
      }
    },
    destroyed (s) {
      // Bus.$off();
    },
    created () {
      Bus.$off();
      this.getSubordinateList();
      this.getClueStatisticData();
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
