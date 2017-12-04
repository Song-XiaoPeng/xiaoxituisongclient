<style scoped lang="less">
    #index{
        height: 90%;
    }
    .box,.personnel,.chart,.information{
        height: 100%;
    }
    .box{
        background-color: #fff;
    }
    .personnel,.chart,.information{
        border-top: 1px #eaeaea solid;
        border-left: 1px #eaeaea solid;
        border-bottom: 1px #eaeaea solid;
    }
    .information{
        border-right: 1px #eaeaea solid;
    }
    .sel{
        padding: 10px 10px 0 10px;
    }
    .table-box{
        padding: 10px;
    }
</style>
<template>
    <div id="index">
        <Row class="box">
            <Col span="16" class="box">
                <div class="chart">
                    <div class="sel cl">
                        <Col  :md="12" :lg="8">
                            <Form :label-width="80">
                                <FormItem label="客户：" style="height: 20px">
                                    <Select v-model="model1" >
                                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col  :md="12" :lg="8">
                            <Form :label-width="80">
                                <FormItem label="会话：" style="height: 20px">
                                    <Select v-model="model2" >
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col  :md="24" :lg="8">
                            <Form :label-width="80">
                                <FormItem label="未联系：" style="height: 20px" >
                                    <Select v-model="model3">
                                        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Col>
                    </div>
                    <div class="btn-box" style="text-align: right;padding: 0 10px">
                        <Button type="ghost" style="margin-left: 10px" @click="modal2 = true">添加业务提醒</Button>
                        <Button type="ghost" style="margin-left: 10px" @click="massFun">群发激活</Button>
                        <!--<Button class="f-l" type="ghost" style="" @click="is_screen = true">高级搜索</Button>-->
                        <Input class="f-l" v-model="real_name"  placeholder="客户名称" style="width: 100px"></Input>
                        <Button class="f-l" type="info" style="margin-left: 2px" @click="getCustomerList">搜索</Button>
                    </div>
                    <div class="table-box">
                        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
                    </div>
                </div>
            </Col>
            <Col span="8" class="box">
            <div class="information">
                <formation></formation>
            </div>
            </Col>
        </Row>

        <!-- 添加提醒弹窗 -->
        <Modal v-model="modal2" title="添加提醒" @on-ok="addRemind">
            <Form :label-width="100">
                <FormItem label="提醒日期：">
                    <DatePicker type="date" placeholder="Select date" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="提醒条目：">
                    <Select v-model="model1">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed">设置</Button>
                    </Select>
                </FormItem>
                <FormItem label="具体内容：">
                    <Input v-model="desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="工作人员：">
                    <Select v-model="model1">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed" >设置</Button>
                    </Select>
                </FormItem>
                <FormItem label="最后完成日期：">
                    <DatePicker type="date" placeholder="Select date" style="width: 100%"></DatePicker>
                </FormItem>
            </Form>
        </Modal>
        <!-- end添加提醒 -->


        <!-- 群发弹窗 -->
        <Modal v-model="modal3" title="群发" @on-ok="addRemind" :width="800">
            <chart  :isMass="isMass"></chart>
            <div slot="footer">
                <span class="" style="color: #ff3300">最多同时发送30人，只可用模版消息/或文字消息</span>
            </div>
        </Modal>
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


        <Modal v-model="is_screen" title="高级搜索" :width="600">
            <screen></screen>
        </Modal>

        <!-- 加载状态 -->
        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>请求中....</div>
        </Spin>
        <!-- end加载状态 -->
    </div>
</template>
<script>
  import personnel from '../commonComponent/ChatPopulation';
  import formation from '../commonComponent/commoninformation';
  import chart from '../commonComponent/Chatting';
  import screen from '../commonComponent/screen';
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
            title: '意向产品',
            key: 'product_id'
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
                      Object.assign(this.clientData, params.row);
                      // this.clientData = params.row;
                      this.popup3 = true;
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
        data1: [],
        modal2: false,
        desc: '',
        modal3: false,
        isMass: false,
        modal_loading: false,
        is_screen: false,
        page: 1,
        real_name: ''
      };
    },
    components: {
      personnel,
      formation,
      chart,
      screen
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      addRemind () {},
      massFun () {
        this.modal3 = true;
        this.isMass = true;
      },
      // 获取客户列表
      getCustomerList () {
        this.is_Loading = true;
        this.ajax.getCustomerList({
          data: {
            page: this.page,
            real_name: this.real_name
          },
          success: (res) => {
            this.data1 = res.body;
            console.log(this.data1);
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res);
          }
        });
      }
    },
    created () {
      this.getCustomerList();
    }
  };
</script>
