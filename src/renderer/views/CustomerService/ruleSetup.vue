<style scoped lang="less">

</style>
<template>
  <div id="index">
    <Card>
      <Tabs v-model="tabsVal" value="1">
        <div slot="extra" v-show="tabsVal == '3'">
          <Button type="primary" size="small" @click="addConversationRule = true">新建分组</Button>
          <Button type="primary" size="small" @click="addConversationContent = true">新建内容</Button>
        </div>





        <TabPane label="客资领取回收规则" name="1">
          <Row>
            <Col span="14">
              <Form :model="formItem" :label-width="100">
                <Row>
                  <Col span="10">
                    <FormItem label="线索池领取周期">
                      <Select v-model="formItem.select">
                        <Option value="beijing">本天</Option>
                        <Option value="shanghai">本周</Option>
                        <Option value="shenzhen">本月</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="10">
                    <FormItem label="内限制领取">
                      <Input v-model="formItem.input" placeholder="请输入个数"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10">
                    <FormItem label="线索池回收周期">
                      <Input v-model="formItem.input" placeholder="请输入天数"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10">
                    <FormItem label="意向领取周期">
                      <Select v-model="formItem.select">
                        <Option value="beijing">本天</Option>
                        <Option value="shanghai">本周</Option>
                        <Option value="shenzhen">本月</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="10">
                    <FormItem label="内限制领取">
                      <Input v-model="formItem.input" placeholder="请输入个数"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10">
                    <FormItem label="意向池回收周期">
                      <Input v-model="formItem.input" placeholder="请输入天数"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <FormItem>
                  <Button type="primary">保存</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </TabPane>



        <TabPane label="会话规则" name="2">
          <Form :model="formItem" :label-width="120">
            <Row>
              <Col span="10">
                <FormItem label="无所属咨询分配规则">
                  <Select v-model="formItem.select">
                    <Option value="beijing">平均分配</Option>
                    <Option value="shanghai">抢单模式</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem label="超时会话">
                  <Input v-model="formItem.input" placeholder="请输入超时分钟数"></Input>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary">保存</Button>
            </FormItem>
          </Form>
        </TabPane>




        <TabPane label="企业常用话术" name="3">
          <Table :columns="replyTableColumns" :data="replyTableData"></Table>

          <div class="page-centent">
            <Page :total="100"></Page>
          </div>
        </TabPane>




        <TabPane label="标签设置" name="4">
          <Form :label-width="80">
            <FormItem label="操作">
              <Button type="primary" @click="popup1 = true">新建分组</Button>
              <Button type="primary">新建内容</Button>
            </FormItem>
            <FormItem label="详细">
              <Table :columns="labelTableColumns" :data="labelTableData"></Table>
            </FormItem>
          </Form>
        </TabPane>





      </Tabs>
    </Card>




    <Modal
      v-model="addConversationRule"
      title="新建企业话术分组">
      <Form :label-width="80">
        <FormItem label="分组名称">
          <Input  placeholder="请输入分组名称"></Input>
        </FormItem>
      </Form>
    </Modal>




    <Modal v-model="addConversationContent" title="新建话术内容">
      <Form :label-width="80">
        <FormItem label="标题">
          <Input placeholder="请输入标题	"></Input>
        </FormItem>
        <FormItem label="	内容">
          <Input placeholder="请输入内容	" type="textarea"></Input>
        </FormItem>
      </Form>
    </Modal>


    <!-- 添加标签组 弹窗-->
    <Modal v-model="popup1" title="标签组">
      <Form :label-width="80">
        <FormItem label="分组名称">
          <Input v-model="labelGroupName" placeholder="请输入分组名称"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end添加标签组 弹窗-->

    <!-- 加载状态 -->
    <Spin fix v-if="is_Loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>请求中....</div>
    </Spin>
    <!-- end加载状态 -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        addConversationContent: false,
        addConversationRule: false,
        tabsVal: '1',
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
            title: '话术分组',
            key: 'group'
          },
          {
            title: '标题',
            key: 'title'
          },
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
            key: 'group',
            width: 100
          },
          {
            title: '标签内容',
            key: 'content'
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
        labelTableData: [
          {
            group: '意向产品',
            content: '铂金版ERP-30、经典版ERP-30'
          },
          {
            group: '客户行业',
            content: '铂金版ERP-32、经典版ERP-12、扫客通-12'
          }
        ],
        is_Loading: false,
        popup1: false,
        labelGroupName: ''
      };
    },
    components: {
    },
    mounted () {
    },
    methods: {
      // 添加修改标签分组
      updateLabelGroup () {
        this.is_Loading = true;
        this.ajax.updateLabelGroup({
          data: {},
          success: (res) => {
            this.is_Loading = false;
            this.$Message.warning('操作成');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      }
    },
    created () {
    }
  };
</script>
