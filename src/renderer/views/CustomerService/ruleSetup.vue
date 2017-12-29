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
    span{
      color: #2db7f5;
      margin: 18px;
      display: inline-block;
      font-size: 16px;
    }
    bottom{
      margin: 15px;
    }
  }
</style>
<template>
  <div id="index">
      <div class="top-box">
        <ul>
          <li v-bind:class="tabVal == 'name1' ? 'active' : ''" @click="tabFun('name1')" >客资领取回收规则</li>
          <li v-bind:class="tabVal == 'name2' ? 'active' : ''" @click="tabFun('name2')">会话规则</li>
          <li v-bind:class="tabVal == 'name3' ? 'active' : ''" @click="tabFun('name3')">企业常用话术</li>
          <li v-bind:class="tabVal == 'name4' ? 'active' : ''" @click="tabFun('name4')">标签设置</li>
        </ul>
      </div>
      <div class="title-box">
        <span v-if="tabVal == 'name1'">客资领取回收规则</span>
        <span  v-if="tabVal == 'name2'">会话规则</span>
        <span  v-if="tabVal == 'name3'">企业常用话术</span>
        <span  v-if="tabVal == 'name4'">标签设置</span>
        <!--<Button v-show="tabVal == 'name3'" type="primary" class="f-r" style="margin: 17px"  size="small" @click="addConversationRule = true">新建分组</Button>-->
        <Button v-show="tabVal == 'name3'" type="primary" class="f-r" style="margin: 17px"  size="small" @click="addConversationContent = true">新建企业话术内容</Button>
      </div>


      <div v-if="tabVal == 'name1'"  style="padding: 16px">
        <Row>
          <Col  span="14">
          <Form  :label-width="100">
            <Row>
              <Col span="10">
              <FormItem label="线索池领取周期">
                <Select v-model="recycle.cued_pool.cycle">
                  <Option value="1">本天</Option>
                  <Option value="2">本周</Option>
                  <Option value="3">本月</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="10">
              <FormItem label="内限制领取">
                <Input v-model="recycle.cued_pool.number" placeholder="请输入个数"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
              <FormItem label="线索池回收周期">
                <Input v-model="recycle.cued_pool_recovery" placeholder="请输入天数"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
              <FormItem label="意向领取周期">
                <Select v-model="recycle.intention_receive.cycle">
                  <Option value="1">本天</Option>
                  <Option value="2">本周</Option>
                  <Option value="3">本月</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="10">
              <FormItem label="内限制领取">
                <Input v-model="recycle.intention_receive.number" placeholder="请输入个数"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
              <FormItem label="意向池回收周期">
                <Input v-model="recycle.intention_recovery" placeholder="请输入天数"></Input>
              </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" @click="setCustomerResourcesRuleFun">保存</Button>
            </FormItem>
          </Form>
          </Col>
        </Row>
      </div>







          <div v-if="tabVal == 'name2'" style="padding: 16px">
            <Form :model="ruleFrom" :label-width="120">
              <Row>
                <Col span="10">
                <FormItem label="无所属咨询分配规则">
                  <Select v-model="ruleFrom.select">
                    <Option value="beijing">平均分配</Option>
                    <Option value="shanghai">抢单模式</Option>
                  </Select>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10">
                <FormItem label="超时会话">
                  <Input v-model="ruleFrom.input" placeholder="请输入超时分钟数"></Input>
                </FormItem>
                </Col>
              </Row>
              <FormItem>
                <Button type="primary" @click="addRuleFun">保存</Button>
              </FormItem>
            </Form>
          </div>






          <div  v-if="tabVal == 'name3'"  style="padding: 16px">
            <Table :columns="replyTableColumns" :loading="is_Loading" :data="replyTableData"></Table>

            <div class="page-centent">
              <Page :total="100"></Page>
            </div>
          </div>






          <div  v-if="tabVal == 'name4'"  style="padding: 16px">
            <Form :label-width="80">
              <FormItem label="操作">
                <Button type="primary" @click="popup3 = true">分组管理</Button>
                <Button type="primary" @click="popup2 = true">新建标签</Button>
              </FormItem>
              <FormItem label="详细">
                <Table :columns="labelTableColumns" :loading="is_Loading" :data="labelTableData"></Table>
              </FormItem>
            </Form>
          </div>






    <Modal
      v-model="addConversationRule"
      title="新建企业话术分组">
      <Form :label-width="80">
        <FormItem label="分组名称">
          <Input  placeholder="请输入分组名称"></Input>
        </FormItem>
      </Form>
    </Modal>




    <Modal v-model="addConversationContent" title="新建话术内容" @on-ok="addEnterpriseTxtFun">
      <Form :label-width="80">
        <FormItem label="内容">
          <Input v-model="enterpriseData.text" placeholder="请输入内容" :autosize="{minRows: 4,maxRows: 8}" type="textarea"></Input>
        </FormItem>
      </Form>
    </Modal>


    <!-- 添加标签组 弹窗-->
    <Modal v-model="popup1" title="标签组" @on-ok="updateLabelGroup">
      <Form :label-width="80">
        <FormItem label="分组名称">
          <Input v-model="labelGroupName" placeholder="请输入分组名称"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end添加标签组 弹窗-->


    <!-- 添加标签/内容 弹窗-->
    <Modal v-model="popup2" title="标签内容" @on-ok="setLabel">
      <Form :label-width="80">
        <FormItem label="分组">
          <Select v-model="group_id" style="width:200px">
            <Option v-for="item in cityList" :value="item.label_group_id" :key="item.label_group_id">{{ item.group_name }}</Option>
          </Select>
        </FormItem>
      </Form>
      <Form :label-width="80">
        <FormItem label="标签内容">
          <Input v-model="labelGroupContent" placeholder="请输入"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end添加标签/内容 弹窗-->


    <!-- 分组操作 弹窗-->
    <Modal v-model="popup3" title="标签分组">
      <div style="margin-bottom: 5px;"><Button type="primary" @click="popup1 = true">新建分组</Button></div>
      <div>
        <Table :columns="GroupColumns" :loading="is_Loading" :data="cityList"></Table>
      </div>
    </Modal>
    <!-- edn分组操作 弹窗 123132-->



    <!-- 加载状态 -->
    <!--<Spin fix v-if="is_Loading">-->
      <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
      <!--<div>请求中....</div>-->
    <!--</Spin>-->
    <!-- end加载状态 -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        popup3: false,
        addConversationContent: false,
        addConversationRule: false,
        tabsVal: '1',
        enterpriseData: {
          quick_reply_id: '',
          text: ''
        },
        popup2: false,
        ruleFrom: {
          select: '',
          input: ''
        },
        recycle: {
          cued_pool: {
            cycle: '',
            number: ''
          },
          cued_pool_recovery: '',
          intention_receive: {
            cycle: '',
            number: ''
          },
          intention_recovery: ''
        },
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        },
        replyTableColumns: [
          {
            title: '内容',
            key: 'content'
          },
          {
            title: '使用次数',
            key: 'useCount'
          },
          {
            title: '操作',
            key: 'operation',
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
                      this.receivables(params.index);
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.cancelOrder(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        replyTableData: [
          {
            group: '第一分组',
            title: '问候语',
            content: '您好有什么需要帮助',
            useCount: '32'
          },
          {
            group: '第二分组',
            title: '问候语',
            content: '您好先生需要帮助吗？',
            useCount: '56'
          },
          {
            group: '第二分组',
            title: '问候语',
            content: '您好女士需要帮助吗？',
            useCount: '75'
          },
          {
            group: '第三分组',
            title: '问候语',
            content: '您好女士需要帮助吗？',
            useCount: '92'
          },
          {
            group: '第三分组',
            title: '问候语',
            content: '您好女士需要帮助吗？',
            useCount: '12'
          }
        ],
        labelTableColumns: [
          {
            title: '标签分组',
            key: 'group_name',
            render: (h, p) => {
              return h('span', p.row.group_name === null || p.row.group_name === '' ? '暂无' : p.row.group_name);
            }
          },
          {
            title: '标签内容',
            key: 'label_name'
          },
          {
            title: '操作',
            key: 'operation',
            width: 150,
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
                      this.group_id = params.row.label_group_id;
                      this.label_id = params.row.label_id;
                      this.labelGroupContent = params.row.label_name;
                      this.popup2 = true;
                      this.is_group_label = true;
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.label_id = params.row.label_id;
                      this.delLabel();
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        GroupColumns: [
          {
            title: '分组名',
            key: 'group_name'
          },
          {
            title: '操作',
            key: 'operation',
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
                      this.popup3 = false;
                      this.group_id = params.row.label_group_id;
                      this.labelGroupName = params.row.group_name;
                      this.popup1 = true;
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.group_id = params.row.label_group_id;
                      this.delGroupFun(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        labelTableData: [],
        is_Loading: false,
        popup1: false,
        labelGroupName: '',
        LabelGroupListData: [],
        group_id: '',
        cityList: [],
        labelGroupContent: '',
        label_id: '',
        is_group_label: false,
        tabVal: 'name1',
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        }
      };
    },
    components: {
    },
    mounted () {
    },
    methods: {
      // tab 切换
      tabFun (v) {
        this.tabVal = v;
      },
      // 保存客资领取规则
      setCustomerResourcesRuleFun () {
        if (this.recycle.cued_pool.cycle === '') {
          this.$Message.warning('请输入线索池领取周期');
          return;
        }
        if (this.recycle.cued_pool.number === '') {
          this.$Message.warning('请输入线索池领取周期内限制个数');
          return;
        }
        if (this.recycle.cued_pool_recovery === '') {
          this.$Message.warning('请输入线索池回收周期天数');
          return;
        }
        if (this.recycle.intention_receive.cycle === '') {
          this.$Message.warning('请输入意向领取周期');
          return;
        }
        if (this.recycle.intention_receive.number === '') {
          this.$Message.warning('请输入意向领取周期内限制领取个数');
          return;
        }
        if (this.recycle.intention_recovery === '') {
          this.$Message.warning('请输入意向池回收周期');
          return;
        }
        this.ajax.setCustomerResourcesRule({
          data: this.recycle,
          success: () => {
            this.$Message.success('设置成功');
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 保存会话规则
      addRuleFun () {
        if (this.ruleFrom.select === '') {
          this.$Message.warning('请选择分配规则');
          return;
        }
        if (this.ruleFrom.input === '') {
          this.$Message.warning('请输入超时分钟');
          return;
        }
        this.ajax.setSessionRule({
          data: {
            rule_type: this.ruleFrom.select === 'beijing' ? '1' : '2',
            overtime: this.ruleFrom.input
          },
          success: (res) => {
            this.$Message.success('设置成功');
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
        console.log(this.ruleFrom);
      },
      // 获取标签分组列表
      getLabelGroupListFun () {
        this.ajax.getLabelGroup({
          data: {},
          success: (res) => {
            this.cityList = res.body;
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取标签列表
      getLabelListFun () {
        this.ajax.getLabelList({
          data: {},
          success: (res) => {
            this.labelTableData = res.body;
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 设置公众号标签
      setLabel () {
        if (this.is_group_label) {
          this.editLabelFun();
          return;
        };
        if (this.group_id === '') {
          this.$Message.warning('请选择分组');
          return;
        }
        if (this.labelGroupContent === '') {
          this.$Message.warning('请输入名称');
          return;
        }
        this.is_Loading = true;
        this.ajax.setLabel({
          data: {
            label_group_id: this.group_id,
            label_name: this.labelGroupContent
          },
          success: (res) => {
            this.getLabelListFun();
            this.is_Loading = false;
            this.is_group_label = false;
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 添加修改标签分组
      updateLabelGroup () {
        if (this.labelGroupName === '') {
          this.$Message.warning('请输入名称');
          return;
        }
        this.is_Loading = true;
        this.ajax.updateLabelGroup({
          data: {
            label_group_id: this.group_id,
            group_name: this.labelGroupName
          },
          success: (res) => {
            this.getLabelGroupListFun();
            this.group_id = '';
            this.labelGroupName = '';
            this.is_Loading = false;
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 删除分组
      delGroupFun () {
        this.is_Loading = true;
        this.ajax.delLabelGroup({
          data: {
            label_group_id: this.group_id
          },
          success: (res) => {
            this.getLabelGroupListFun();
            this.is_Loading = false;
            this.group_id = '';
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.waiting(res.meta.message);
          }
        });
      },
      // 删除标签
      delLabel () {
        this.ajax.delLabel({
          data: {
            label_id: this.label_id
          },
          success: (res) => {
            this.getLabelListFun();
            this.label_id = '';
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.$Message.waiting(res.meta.message);
          }
        });
      },
      // 修改标签
      editLabelFun () {
        this.ajax.updateLabel({
          data: {
            label_group_id: this.group_id,
            label_name: this.labelGroupContent,
            label_id: this.label_id
          },
          success: (res) => {
            this.getLabelListFun();
            this.group_id = '';
            this.label_id = '';
            this.labelGroupContent = '';
            this.is_group_label = false;
          },
          error: (res) => {
            this.$Message.waiting(res.meta);
          }
        });
      },
      // 获取规则数据
      getSessionRule () {
        this.ajax.getSessionRule({
          data: {},
          success: (res) => {
            // beijing shanghai
            this.ruleFrom.select = res.body.rule_type === '1' ? 'beijing' : 'shanghai';
            this.ruleFrom.input = res.body.overtime;
          },
          error: (res) => {
            this.$Message.waiting(res.meta);
          }
        });
      },
      // 获取客资领取规则
      getCustomerResourcesRule () {
        this.ajax.getCustomerResourcesRule({
          data: {},
          success: (res) => {
            this.recycle.cued_pool.cycle = res.body.cued_pool.cycle;
            this.recycle.cued_pool.number = res.body.cued_pool.number;
            this.recycle.cued_pool_recovery = res.body.cued_pool_recovery;
            this.recycle.intention_receive.cycle = res.body.intention_receive.cycle;
            this.recycle.intention_receive.number = res.body.intention_receive.number;
            this.recycle.intention_recovery = res.body.intention_recovery;
          },
          error: (res) => {
            this.$Message.waiting(res.meta);
          }
        });
      },
      // 添加企业数据
      addEnterpriseTxtFun () {
        this.ajax.setCommonQuickReplyText({
          data: this.enterpriseData,
          success: (res) => {
            console.log(res);
          },
          error: (res) => {
            this.$Message.waiting(res.meta);
          }
        });
      },
      // 获取企业话术列表
      getEnterpriseTxtListFun () {
        this.ajax.getEnterpriseSentence({
          data: {
            page: 1
          },
          success: (res) => {
            console.log(res);
            // this.pageData1
          },
          error: (res) => {
            this.$Message.waiting(res.meta);
          }
        });
      }
    },
    created () {
      this.getLabelListFun();
      this.getSessionRule();
      this.getEnterpriseTxtListFun();
      this.getCustomerResourcesRule();
      this.getLabelGroupListFun();
    }
  };
</script>
