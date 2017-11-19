<style scoped lang="less">

</style>
<template>
  <div>
      <Form :label-width="100">
          <FormItem label="沟通日期：">
              <DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="选择时间" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="客户类别：">
              <Select v-model="model1">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="产品名称：">
              <Select v-model="model2">
                  <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="公共号：">
              <Select v-model="model3">
                  <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="来源方式：">
              <Select v-model="model4">
                  <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="客服：">
              <Select v-model="model5">
                  <Option v-for="item in cityList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="激活方式：">
              <Select v-model="model6">
                  <Option v-for="item in cityList6" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="会话类型：">
              <Select v-model="model7">
                  <Option v-for="item in cityList7" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>

          <FormItem label="沟通次数：">
              <Input type="text"  placeholder="请输入" style="width: 60px"></Input>
              <span>----</span>
              <Input type="text"  placeholder="请输入" style="width: 60px"></Input>
          </FormItem>
          <FormItem label="地址定位：">
              <Input type="text"  placeholder="请输入"></Input>
          </FormItem>
      </Form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        options2: {
          shortcuts: [
            {
              text: '近一星期',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '近一月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '近三月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        },
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
        cityList2: [
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
        cityList3: [
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
        cityList4: [
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
        cityList5: [
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
        cityList6: [
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
        cityList7: [
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
        model1: '',
        model2: '',
        model3: '',
        model4: '',
        model5: '',
        model6: '',
        model7: ''
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      ok () {},
      cancel () {}
    }
  };
</script>
