<style scoped lang="less">
   .title{
     .btn{
         font-weight: 100;
         padding: 0px 5px;
         border-right: 1px #eaeaea solid;
         float: right;
         font-size: 12px;
         color: #1a1a1a;
         cursor: pointer;
         transition: all .2s;
     }
       .btn:hover{
           color: #2db7f5;
       }

   }
</style>
<template>
    <div id="index">
        <Card style="width:100%">
            <p slot="title" class="title">
                <span class="btn">本月</span>
                <span class="btn">本周</span>
                <span class="btn">昨日</span>
                <span class="btn" >今日</span>
            </p>
            <div>
                <span>来源：</span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityLis1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>员工：</span>
                <Select v-model="model2" style="width:200px">
                    <Option v-for="item in cityLis2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>会话方式：</span>
                <Select v-model="model3" style="width:200px">
                    <Option v-for="item in cityLis3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div style="height: 450px">
                <IEcharts :option="pie1" :resizable="true" :loading="loading"  @ready="onReady" @click="onClick"></IEcharts>
            </div>
        </Card>
        <Card style="width:100%;margin-top: 10px">
            <p slot="title" class="title">
                <span>详情</span>
            </p>
            <div >
                <Table :columns="columns1" :data="data1"></Table>
            </div>
        </Card>
    </div>
</template>
<script>
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import 'echarts/lib/chart/pie';
  export default {
    data () {
      return {
        pie1: {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)', '你打听', '你打听', '你打听', '你打听', '你打听', '你打听', '你打听']
          },
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220, 220, 220, 220, 220, 220, 220]
            }
          ]
        },
        loading: false,
        columns1: [
          {
            title: '时间',
            key: 'name1'
          },
          {
            title: '访问量',
            key: 'name2'
          },
          {
            title: '首次访问',
            key: 'name3'
          },
          {
            title: '粉丝分组',
            key: 'name4'
          }
        ],
        data1: [
          {
            name1: '8点',
            name2: '100',
            name3: '20',
            name4: '10'

          }
        ],
        cityLis1: [
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
        cityLis2: [
          {
            value: 'New York',
            label: '你DATe'
          },
          {
            value: 'London',
            label: '张大爷'
          }
        ],
        cityLis3: [
          {
            value: '1',
            label: '会话数'
          },
          {
            value: '2',
            label: '手动接入会话'
          },
          {
            value: '3',
            label: '自动分配会话'
          },
          {
            value: '4',
            label: '主动发起会话'
          },
          {
            value: '5',
            label: '客户回应'
          },
          {
            value: '6',
            label: '发出消息数'
          },
          {
            value: '7',
            label: '接收消息数在线时长'
          }
        ],
        model1: '',
        model2: '',
        model3: ''
      };
    },
    components: {
      IEcharts
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      onReady () {
      },
      onClick () {
        console.log(13444);
      }
    },
    created () {
    }
  };
</script>
