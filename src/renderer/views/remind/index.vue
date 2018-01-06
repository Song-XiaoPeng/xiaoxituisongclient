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
                                <FormItem label="需联系：" style="height: 20px">
                                    <Select v-model="model" >
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Col>
                    </div>
                    <div class="btn-box" style="text-align: right;padding: 0 10px">
                        <Button type="ghost" style="margin-left: 10px" @click="modal2 = true">添加业务提醒</Button>
                        <Button type="ghost" style="margin-left: 10px" @click="massFun">群发激活</Button>
                        <Button class="f-l" type="ghost" style="" @click="is_screen = true">高级搜索</Button>
                    </div>
                    <div>
                        <Tabs value="name1">
                            <TabPane label="待完成" name="name1"></TabPane>
                        </Tabs>
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
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed">设置</Button>
                    </Select>
                </FormItem>
                <FormItem label="最后完成日期：">
                    <DatePicker type="date" placeholder="Select date" style="width: 100%"></DatePicker>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="is_Mass" title="群发" @on-ok="addRemind" :width="800" ok-text="" cancel-text="">
            <chart  :isMass="isMass"></chart>
            <div slot="footer">
                <span class="" style="color: #ff3300">最多同时发送30人，只可用模版消息/或文字消息</span>
            </div>
        </Modal>


        <Modal v-model="is_screen" title="高级搜索" :width="600">
            <screen></screen>
        </Modal>
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
            label: '今日需联系'
          },
          {
            value: '2',
            label: '明日需沟通'
          },
          {
            value: '3',
            label: '本周需沟通'
          },
          {
            value: '4',
            label: '本月需沟通'
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
        model1: '1',
        model: '1',
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '客户姓名',
            key: 'name'
          },
          {
            title: '产品',
            key: 'age'
          },
          {
            title: '微信名称',
            key: 'address'
          },
          {
            title: '公司名称',
            key: 'address'
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
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ],
        modal2: false,
        desc: '',
        modal3: false,
        isMass: false,
        modal_loading: false,
        is_screen: false,
        is_Mass: false
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
        this.is_Mass = true;
        this.isMass = true;
      }
    },
    created () {
    }
  };
</script>
