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
                    <!--<li v-bind:class="tabName == 'name2' ? 'active' : ''"  @click="selTabFun('name2')">线索池</li>-->
                    <!--<li v-bind:class="tabName == '2' ? 'active' : ''"  @click="hintFun()">跟踪提醒</li>-->
                </ul>
            </div>
            <div class="filtrate-box">
                <ul class="my-box cl">
                    <li v-bind:class="ascription == '' ?  'active' : ''" @click="ascriptionFun('')">全部</li>
                    <li v-bind:class="ascription == '1' ?  'active' : ''" @click="ascriptionFun('1')">我的客户</li>
                    <!--<li v-bind:class="ascription == '2' ?  'active' : ''" @click="ascriptionFun('2')">跟踪提醒</li>-->
                </ul>
                <ul class="my-box cl" style="margin: 0 20px">
                    <li @click="hintFun">总追销(<span style="color: #efc27c">47985</span>)</li>
                    <li @click="hintFun">今日(<span style="color: #efc27c">45</span>)</li>
                    <li @click="hintFun">待跟进(<span style="color: #efc27c">13</span>)</li>
                    <li @click="hintFun">本月追销(<span style="color: #efc27c">55</span>)</li>
                </ul>
                <ul class="my-box cl">
                    <li @click="hintFun">今日需联系</li>
                    <li @click="hintFun">明日需联系</li>
                    <li @click="hintFun">本周需沟通</li>
                    <li @click="hintFun">本月需沟通</li>
                </ul>
            </div>
            <div ref="chartEl" v-bind:class="is_show_chartEl ? 'chart1' : ''" class="chart f-l" >
                 <span  class="is_left_show" v-if="is_left_show && !is_show_chartEl" @click="isLefttShowFun">
                    <Icon type="android-funnel"></Icon>
                 </span>
                <div>

                        <!-- 我的客户 -->
                        <div v-if="tabName == 'name1'">
                            <div class="btn-box cl" style="text-align: right;padding:10px">
                                <!--<Button type="ghost" style="margin-left: 10px" @click="modal2 = true">添加业务提醒</Button>-->
                                <!--<Button type="ghost" style="margin-left: 10px" @click="massFun">群发激活</Button>-->
                                <!--<Button class="f-l" type="ghost" style="" @click="is_screen = true">高级搜索</Button>-->
                                <Input class="f-l" v-model="real_name"  placeholder="客户名称" style="width: 100px"></Input>
                                <Button class="f-l" type="info" style="margin-left: 2px" @click="getCustomerList('seek')">搜索</Button>
                            </div>
                            <div class="table-box">
                                <Table border ref="selection" highlight-row :columns="columns4" :data="data1" @on-current-change="selTableFun"></Table>
                            </div>
                            <div style="text-align: center;padding: 5px">
                                <Page :total="pageData.count" :page-size="pageData.rows_num" @click="pageFun"></Page>
                            </div>
                        </div>
                        <!-- end我的客户 -->


                        <!-- 其他人 -->
                        <div v-if="tabName == 'name2'">
                            <div class="btn-box cl" style="text-align: right;padding:10px">
                                <!--<Button type="ghost" style="margin-left: 10px" @click="modal2 = true">添加业务提醒</Button>-->
                                <!--<Button type="ghost" style="margin-left: 10px" @click="massFun">群发激活</Button>-->
                                <!--<Button class="f-l" type="ghost" style="" @click="is_screen = true">高级搜索</Button>-->
                                <Input class="f-l" v-model="real_name"  placeholder="客户名称" style="width: 100px"></Input>
                                <Button class="f-l" type="info" style="margin-left: 2px" @click="getCustomerList('seek')">搜索</Button>
                            </div>
                            <div class="table-box">
                                <Table border ref="selection" highlight-row :columns="columns4" :data="data1" @on-current-change="selTableFun"></Table>
                            </div>
                            <div style="text-align: center;padding: 5px">
                                <Page :total="pageData.count" :page-size="pageData.rows_num" @click="pageFun"></Page>
                            </div>
                        </div>
                        <!-- end其他人 -->




                        <!-- end跟踪提醒 -->
                        <div v-if="tabName == 'name3'">
                            <div class="time-box">
                                <ul class="cl">
                                    <li class="" v-bind:class="time_type == 1 ? 'active' : ''" @click="selContactFun(1)">今日需联系</li>
                                    <li class="" v-bind:class="time_type == 2 ? 'active' : ''" @click="selContactFun(2)">昨日需联系</li>
                                    <li class="" v-bind:class="time_type == 3 ? 'active' : ''" @click="selContactFun(3)">本周需联系</li>
                                    <li class="" v-bind:class="time_type == 4 ? 'active' : ''" @click="selContactFun(4)">本月需联系</li>
                                    <li class="" v-bind:class="time_type == 5 ? 'active' : ''" @click="selContactFun(5)">超时需联系</li>
                                    <li class="" v-bind:class="time_type == 6 ? 'active' : ''" @click="selContactFun(6)">已完成</li>
                                </ul>
                            </div>
                            <div class="btn-box cl" style="text-align: right;padding:10px">
                                <!--<Button type="ghost" style="margin-left: 10px" @click="modal2 = true">添加业务提醒</Button>-->
                                <!--<Button type="ghost" style="margin-left: 10px" @click="massFun">群发激活</Button>-->
                                <!--<Button class="f-l" type="ghost" style="" @click="is_screen = true">高级搜索</Button>-->
                                <Input class="f-l" v-model="real_name"  placeholder="客户名称" style="width: 100px"></Input>
                                <Button class="f-l" type="info" style="margin-left: 2px" @click="getTailList('seek')">搜索</Button>
                            </div>
                            <div class="table-box">
                                <Table border ref="selection" highlight-row :columns="columns5" :data="data2"></Table>
                            </div>
                            <div style="text-align: center;padding: 5px">
                                <Page :total="pageData.count" :page-size="pageData.rows_num" @click="pageFun"></Page>
                            </div>
                        </div>
                        <!-- 跟踪提醒 -->


                </div>

            </div>
            <div ref="informationEl" v-bind:class="is_show_informationEl ? 'informationEl1' : ''" class="information f-l" style="height: 87%;overflow: auto">
                    <span ref="isRightShow" v-if="is_left_show && is_show_chartEl" class="is_right_show" @click="isRightShowFun">
                        <Icon type="android-funnel"></Icon>
                    </span>
                <formation></formation>
            </div>
        </Row>

        <!-- 添加提醒弹窗 -->
        <Modal v-model="modal2" title="添加提醒" @on-ok="addRemind">
            <Form :label-width="100">
                <FormItem label="提醒日期：">
                    <DatePicker type="date" placeholder="选择日期" style="width: 100%" @on-change="dateFun"></DatePicker>
                </FormItem>
                <!--<FormItem label="提醒条目：">-->
                <!--<Select v-model="model1">-->
                <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed">设置</Button>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <FormItem label="具体内容：">
                    <Input v-model="txta" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
                </FormItem>
                <!--<FormItem label="工作人员：">-->
                <!--<Select v-model="model1">-->
                <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed" >设置</Button>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem label="最后完成日期：">-->
                <!--<DatePicker type="date" placeholder="Select date" style="width: 100%"></DatePicker>-->
                <!--</FormItem>-->
            </Form>
        </Modal>
        <!-- end添加提醒 -->


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
        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>请求中....</div>
        </Spin>
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
        popup3: false,
        is_Loading: false,
        clientData: {},
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '客户姓名',
            key: 'real_name'
          },
          {
            title: '手机',
            key: 'real_phone'
          },
          {
            title: '微信号',
            key: 'wx_number'
          },
          {
            title: '添加业务提醒',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.selUserData = params.row;
                      this.modal2 = true;
                    }
                  }
                }, '添加业务提醒')
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              let arr = [];
              let del = h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Message.warning('删除功能玩命开发中。。。。');
                  }
                }
              }, '删除');
              let dateils = h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // Object.assign(this.clientData, params.row);
                    // this.clientData = params.row;
                    // this.popup3 = true;
                  }
                }
              }, '详情');
              if (this.userInfo.user_type === '3') {
                arr.push(dateils);
                arr.push(del);
              } else {
                arr.push(dateils);
              }
              return h('div', arr);
            }
          }
        ],
        data1: [],
        columns5: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '客户姓名',
            key: 'real_name'
          },
          {
            title: '手机',
            key: 'real_phone'
          },
          {
            title: '产品',
            key: 'product_name'
          },
          {
            title: '提醒内容',
            key: 'remind_content'
          },
          {
            title: '完成内容',
            key: 'complete_content'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              let arr = [];
              let del = h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delContactFun(params.row, params.index);
                  }
                }
              }, '删除');
              let dateils = h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    Object.assign(this.clientData, params.row);
                    // this.clientData = params.row;
                    this.popup3 = true;
                  }
                }
              }, '详情');
              if (this.userInfo.user_type === '3') {
                arr.push(dateils);
                arr.push(del);
              } else {
                arr.push(dateils);
              }
              return h('div', arr);
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
          count: 1,
          page: 1,
          rows_num: 1
        },
        ascription: ''
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
      addRemind () {
        this.is_Loading = true;
        this.ajax.addRemind({
          data: {
            remind_content: this.txta,
            customer_info_id: this.selUserData.customer_info_id,
            remind_time: this.RemindDate,
            remind_uid: this.userInfo.uid
          },
          success: (res) => {
            // 如果添加成功 通知业务提醒组件更新数据
            if (this.selUserData.customer_info_id && this.selUserData.customer_info_id !== '') {
              Bus.$emit('remind', this.selUserData);
            }
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
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
        this.ajax.getCustomerList({
          data: {
            page: this.pageData1.page,
            real_name: this.real_name,
            type: 3,
            ascription: this.ascription
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
        if (v === 'name3') {
          this.tabName = v;
          this.isRightShowFun();
          this.is_left_show = false;
          this.getTailList();
        } else {
          this.tabName = v;
          this.isRightShowFun();
          this.is_left_show = false;
          this.getCustomerList();
        }
      },
      // 时间选择
      dateFun (v) {
        this.RemindDate = v;
      },
      // 数据表格选择方法
      selTableFun (v) {
        // obj  用于标识客户管理页面 hjbdwadj
        let obj = {
          common: true,
          information: false,
          record: false,
          remind: true
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
            customer_type: 3,
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
            this.pageData.rows_num = parseInt(res.body.page_data.rows_num);
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
        if (this.tabName === 'name3') {
          this.getTailList();
        } else {
          this.getCustomerList();
        }
      }
    },
    destroyed (s) {
      // Bus.$off();
    },
    created () {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          Bus.$emit('WxAuthList', res);
          // sessionStorage.setItem('WxAuthList', JSON.stringify(res.body)); dawdwa
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
