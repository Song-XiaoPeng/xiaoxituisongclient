<style scoped lang="less">

</style>
<template>
  <div id="index">
    <Card>
      <Tabs v-model="tabsVal" value="1">
        <div slot="extra" v-show="tabsVal == '3'">
          <Button type="primary" size="small">新建分组</Button>
          <Button type="primary" size="small">新建内容</Button>
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

        <TabPane label="标签设置" name="4">标签设置</TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
  export default {
    data () {
      return {
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
            group: '第二分组',
            title: '问候语',
            content: '您好女士需要帮助吗？',
            useCount: '92'
          },
          {
            group: '第二分组',
            title: '问候语',
            content: '您好女士需要帮助吗？',
            useCount: '12'
          }
        ]
      };
    },
    components: {
    },
    mounted () {
    },
    methods: {},
    created () {
    }
  };
</script>
