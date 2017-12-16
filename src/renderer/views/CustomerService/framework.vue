<style scoped lang="less">
  .mass-type {
    line-height: 32px;
  }
</style>
<template>
  <div id="index">
    <Card>
      <Tabs v-model="tabsVal" value="1">
        <p slot="extra">
          <Button @click="addDepartment = true">添加部门</Button>
          <Button @click="addPosition = true">添加岗位</Button>
          <Button @click="addUser = true">添加用户</Button>
        </p>
        <TabPane label="组织架构" name="1">
          <Row>
            <Col span="2" class="mass-type">
              &nbsp&nbsp&nbsp&nbsp群发类别：
            </Col>
            <Col span="1">
              <Button type="primary">部门岗位图</Button>
            </Col>
            <Col span="1" offset="1">
              <Button>上下级关系图</Button>
            </Col>
          </Row>
          </br>
          <Row>
            <Col span="5">
              <Tree :data="frameworkData"></Tree>
            </Col>
          </Row>
        </TabPane>

        <TabPane label="用户管理" name="2">
          <Row>
            <Col span="24">
              <Form :label-width="80">
                <Row>
                  <Col span="6">
                    <FormItem label="上级部门">
                      <Select>
                        <Option value="beijing">财务部</Option>
                        <Option value="shanghai">客服部</Option>
                        <Option value="shenzhen">售后部</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="关键字">
                      <Input placeholder="请输入关键字"></Input>
                    </FormItem>
                  </Col>
                  <Col span="2" style="margin-left:20px; line-height:32px;">
                    <Button type="primary">搜索</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <Table border :columns="staffColumns" :data="staffData"></Table>

          <div class="page-centent">
            <Page :total="100"></Page>
          </div>
        </TabPane>

        <TabPane label="已停止用户" name="3">
          <Row>
            <Col span="24">
              <Form :label-width="80">
                <Row>
                  <Col span="6">
                    <FormItem label="上级部门">
                      <Select>
                        <Option value="beijing">财务部</Option>
                        <Option value="shanghai">客服部</Option>
                        <Option value="shenzhen">售后部</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="关键字">
                      <Input placeholder="请输入关键字"></Input>
                    </FormItem>
                  </Col>
                  <Col span="2" style="margin-left:20px; line-height:32px;">
                    <Button type="primary">搜索</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <Table border :columns="staffColumns" :data="staffQuitData"></Table>

          <div class="page-centent">
            <Page :total="4"></Page>
          </div>
        </TabPane>
      </Tabs>
    </Card>

    <Modal v-model="addDepartment" title="添加部门">
      <Form :label-width="80">
        <FormItem label="部门名称">
          <Input placeholder="请输入部门名称"></Input>
        </FormItem>
        <FormItem label="上级部门">
          <Select>
            <Option value="beijing">财务部</Option>
            <Option value="shanghai">客服部</Option>
            <Option value="shenzhen">售后部</Option>
          </Select>
        </FormItem>
        <FormItem label="部门描述">
          <Input placeholder="请输入部门描述" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="addPosition" title="添加岗位">
      <Form :label-width="80">
        <FormItem label="岗位名">
          <Input placeholder="请输入岗位名	"></Input>
        </FormItem>
        <FormItem label="所属部门">
          <Select>
            <Option value="beijing">财务部</Option>
            <Option value="shanghai">客服部</Option>
            <Option value="shenzhen">售后部</Option>
          </Select>
        </FormItem>
        <FormItem label="上级部门">
          <Select>
            <Option value="beijing">财务部</Option>
            <Option value="shanghai">客服部</Option>
            <Option value="shenzhen">售后部</Option>
          </Select>
        </FormItem>
        <FormItem label="岗位描述">
          <Input placeholder="请输入岗位描述	" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="addUser" title="添加用户">
      <Form :label-width="80">
        <FormItem label="姓名">
          <Input placeholder="请输入姓名	"></Input>
        </FormItem>
        <FormItem label="昵称">
          <Input placeholder="请输入昵称	"></Input>
        </FormItem>
        <FormItem label="用户账号">
          <Input placeholder="请输入用户账号	"></Input>
        </FormItem>
        <FormItem label="登录密码">
          <Input placeholder="请输入登录密码	"></Input>
        </FormItem>
        <FormItem label="所属部门">
          <Select>
            <Option value="beijing">财务部</Option>
            <Option value="shanghai">客服部</Option>
            <Option value="shenzhen">售后部</Option>
          </Select>
        </FormItem>
        <FormItem label="所属职责">
          <Select>
            <Option value="beijing">客服</Option>
            <Option value="shanghai">员工</Option>
          </Select>
        </FormItem>
        <FormItem label="头像上传">
          <Button type="primary"><Icon type="ios-cloud-upload-outline"></Icon> 选择头像</Button>
        </FormItem>
        <FormItem label="是否客服">
          <RadioGroup v-model="addUserFormItem.isCustomerService">
            <Radio label="1">是</Radio>
            <Radio label="-1">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="用户性别">
          <RadioGroup v-model="addUserFormItem.sex">
            <Radio label="1">男</Radio>
            <Radio label="-1">女</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        addUserFormItem: {
          isCustomerService: 1,
          sex: 1
        },
        tabsVal: '1',
        addUser: false,
        addDepartment: false,
        addPosition: false,
        staffColumns: [
          {
            title: '姓名',
            key: 'name',
            width: 80,
            align: 'center'
          },
          {
            title: '昵称',
            key: 'nickname',
            width: 90,
            align: 'center'
          },
          {
            title: '用户账号',
            key: 'phone_no',
            width: 120,
            align: 'center'
          },
          {
            title: '是否客服',
            key: 'is_customer_service',
            width: 90,
            align: 'center'
          },
          {
            title: '部门',
            key: 'department',
            width: 90,
            align: 'center'
          },
          {
            title: '职责',
            key: 'duty',
            width: 90,
            align: 'center'
          },
          {
            title: '性别',
            key: 'sex',
            width: 70,
            align: 'center'
          },
          {
            title: '地址',
            key: 'address',
            align: 'center'
          },
          {
            title: '在职状态',
            key: 'state',
            width: 90,
            align: 'center'
          },
          {
            title: '操作',
            key: 'handle',
            width: 90,
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
                      this.receivables(params.index);
                    }
                  }
                }, '编辑')
              ]);
            }
          }
        ],
        staffData: [
          {
            'name': '张三',
            'nickname': '张望的人',
            'phone_no': '18316313321',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '黄飞',
            'nickname': '飞哥',
            'phone_no': '18924392999',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '张力',
            'nickname': '亮亮',
            'phone_no': '13692711899',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '刘晗',
            'nickname': '叶子',
            'phone_no': '13249318006',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '张丽',
            'nickname': 'nba!',
            'phone_no': '13502439257',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '李豪',
            'nickname': '涛涛',
            'phone_no': '13502789217',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '梁坚全',
            'nickname': '小熊',
            'phone_no': '13122431115',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '孙旭诚',
            'nickname': '小熊',
            'phone_no': '13122431235',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '林楚梵',
            'nickname': '小熊',
            'phone_no': '13122431432',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '王国维',
            'nickname': '小熊',
            'phone_no': '13122431331',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          },
          {
            'name': '张昊',
            'nickname': '小熊',
            'phone_no': '13122431231',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '在职'
          }
        ],
        staffQuitData: [
          {
            'name': '梁坚全',
            'nickname': '小熊',
            'phone_no': '13122431115',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '离职'
          },
          {
            'name': '孙旭诚',
            'nickname': '小熊',
            'phone_no': '13122431235',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '离职'
          },
          {
            'name': '林楚梵',
            'nickname': '小熊',
            'phone_no': '13122431432',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '离职'
          },
          {
            'name': '王国维',
            'nickname': '小熊',
            'phone_no': '13122431331',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '离职'
          },
          {
            'name': '张昊',
            'nickname': '小熊',
            'phone_no': '13122431231',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男',
            'address': '广东省惠州市惠城区',
            'state': '离职'
          }
        ],
        frameworkData: [
          {
            title: 'CEO行政部 (钟立新、钟北清、李玉平)',
            expand: true,
            children: [
              {
                title: '财务部 （钟岁霞）',
                expand: true,
                children: [
                  {
                    title: '开发部 (王剑锋)',
                    expand: true,
                    children: [
                      {
                        title: '程序员 (黄飞、刘超)'
                      },
                      {
                        title: '产品 (刘明)'
                      },
                      {
                        title: '督导 (刘明)'
                      },
                      {
                        title: '程序员 (王涛、张力、刘晗、徐凯、施海月、杨勇、顾航、朱启刚、王奔奔、贺建峰、秦攀、孙伟、张晓婷、汤婷婷)'
                      }
                    ]
                  },
                  {
                    title: '网络营销部 (张丽)',
                    expand: true,
                    children: [
                      {
                        title: '网络销售员 (张三、王五、刘浩、陆宏伟、王建国、刘联合)'
                      }
                    ]
                  },
                  {
                    title: '售后部 (张昊)',
                    expand: true,
                    children: [
                      {
                        title: '售后员工 (张浩、李豪、王国维、黄梦倩、郭宜兴、高群、江璟、李田、郭宜兴、徐凯)'
                      }
                    ]
                  },
                  {
                    title: '惠州销售团队 (孙旭诚)',
                    expand: true,
                    children: [
                      {
                        title: '销售员工 (李琳颖、林楚梵、徐亚楠、刘婷、刘宇、董蓓蓓、顾颖、翟艺霏、高盼盼、董一凡、朱彦博、黄梦倩)'
                      }
                    ]
                  },
                  {
                    title: '武汉销售团队 (何文瑜)',
                    expand: true,
                    children: [
                      {
                        title: '销售员工 (温子帆、黎蓓丹、阮思韵、董冰青、郑越、杨钰成、田新生、任华、吴庆伟、白建红、黄党恩、李明生、黄丰年、任仲敏、孙勇宏、郑欣、孙思阳、高飞)'
                      }
                    ]
                  },
                  {
                    title: '西安销售团队 (羊沛)',
                    expand: true,
                    children: [
                      {
                        title: '销售员工 (陈紫荆、陆晨燕、许丰盈、刘梓言、彭汉英)'
                      }
                    ]
                  },
                  {
                    title: '离职员工',
                    expand: true,
                    children: [
                      {
                        title: '离职员工 (梁坚全、钟颖、何紫敏、林艺萱、方芷芊、胡慧敏、黄莎莎)'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
    },
    components: {
    },
    mounted () {
    },
    methods: {
    },
    created () {
    }
  };
</script>
