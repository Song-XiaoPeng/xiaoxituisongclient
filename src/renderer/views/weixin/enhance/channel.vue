<style scoped lang="less">
    .top-box{
        padding: 10px;
    }
</style>
<template>
  <div>
      <div class="top-box">
          <Input  placeholder="搜索" icon="search" style="width: 300px"></Input>
          <Select v-model="model1" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button class="f-r" type="primary" @click="modal1 = true">新增</Button>
      </div>
      <div>
          <Table border :columns="columns7" :data="data6"></Table>
      </div>



      <!-- 添加弹窗 -->
      <Modal v-model="modal1" title="添加带参二维码" >
          <Form  label-position="right" :label-width="100">
              <FormItem label="渠道名称">
                  <Input placeholder="请输入"></Input>
              </FormItem>
              <FormItem label="渠道分组">
                  <Select  placeholder="Select your city" style="width: 328px">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                  </Select>
                  <Button type="ghost">设置</Button>
              </FormItem>
              <FormItem label="自动标签">
                  <Select  placeholder="Select your city" style="width: 328px">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                  </Select>
                  <Button type="ghost">设置</Button>
              </FormItem>
              <FormItem label="专属客户/部门">
                  <Select  placeholder="Select your city" style="width: 100px">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                  </Select>
                  <Select  placeholder="Select your city" style="width: 225px">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                  </Select>
                  <Button type="ghost">设置</Button>
              </FormItem>
              <FormItem label="有效时间">
                  <DatePicker type="date" placeholder="Select date" style="width: 100%"></DatePicker>
              </FormItem>
              <FormItem label="扫码关注回复">
                  <RadioGroup v-model="animal">
                      <Radio label="不回复"></Radio>
                      <Radio label="回复"></Radio>
                  </RadioGroup>
              </FormItem>
          </Form>
          <Table highlight-row ref="currentRowTable" :columns="columns3" :data="data1"></Table>
      </Modal>
      <!-- end添加弹窗 -->


      <!-- 创建分组弹窗 -->
      <Modal v-model="modal1" title="添加带参二维码" >
          <Form  label-position="right" :label-width="100">
              <FormItem label="渠道名称">
                  <Input placeholder="请输入"></Input>
              </FormItem>
          </Form>
      </Modal>
      <!-- end加载状态 -->


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
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        model1: '',
        columns7: [
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          },
          {
            title: 'Action',
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
                }, '修改'),
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
        data6: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ],
        modal1: false,
        animal: '不回复',
        columns3: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
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
        is_Loading: false
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {}
  };
</script>
