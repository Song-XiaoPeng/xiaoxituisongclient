<style scoped lang="less">

</style>
<template>
   <div id="index">
       <div>
           <Tabs v-model="tabs" @on-click="tabFun">
               <TabPane label="按分组发送" name="name1"></TabPane>
               <TabPane label="按标签发送" name="name2"></TabPane>
           </Tabs>
       </div>
       <div v-if="tabs == 'name1'">
           <Form  label-position="right" :label-width="100">
               <FormItem label="分组">
                   <Select v-model="model1" style="width:200px">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                   </Select>
               </FormItem>
               <FormItem label="性别">
                   <RadioGroup v-model="anima3">
                       <Radio label="男"></Radio>
                       <Radio label="女"></Radio>
                   </RadioGroup>
               </FormItem>
               <FormItem label="地区">
                   <Select v-model="model1" style="width:200px">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                   </Select>
               </FormItem>
           </Form>
       </div>
       <div v-if="tabs == 'name2'">
           <Form  label-position="right" :label-width="100">
               <FormItem label="标签">
                   <RadioGroup v-model="animal">
                       <Radio label="金斑蝶"></Radio>
                       <Radio label="爪哇犀牛"></Radio>
                       <Radio label="印度黑羚"></Radio>
                   </RadioGroup>
               </FormItem>
           </Form>
       </div>
       <div style="padding: 10px">
           <Table highlight-row ref="currentRowTable" :columns="columns3" :data="data1"></Table>
       </div>
       <div style="padding: 10px">
           <Form  label-position="right" :label-width="100">
               <FormItem label="发送时间">
                   <RadioGroup v-model="anima2">
                       <Radio label="立即发送"></Radio>
                       <Radio label="定时发送"></Radio>
                   </RadioGroup>
               </FormItem>
               <FormItem v-if="anima2 == '定时发送'" label="选择时间">
                   <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
               </FormItem>
           </Form>
       </div>
       <div style="text-align: center;padding: 10px">
           <Button type="primary">保存</Button>
       </div>
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
        animal: '',
        anima3: '男',
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
        anima2: '立即发送',
        tabs: 'name1'
      };
    },
    mounted () {
    },
    watch: {
      anima2: (v) => {
        console.log(v);
      }
    },
    beforeDestroy () {
    },
    methods: {
      tabFun (v) {
        console.log(v, this.tabs);
      }
    }
  };
</script>
