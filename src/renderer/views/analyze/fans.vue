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
                <span>访问总览</span>
                <span class="btn" style="border: 0">利亚方舟</span>
                <span class="btn">点赞科技</span>
                <span class="btn">本月</span>
                <span class="btn">本周</span>
                <span class="btn">昨日</span>
                <span class="btn" >今日</span>
            </p>
            <div>
                <span>来源：</span>
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div style="height: 450px">
                <!--<IEcharts :option="pie1" :resizable="true" :loading="loading"  @ready="onReady" @click="onClick"></IEcharts>-->
            </div>
        </Card>
        <Card style="width:100%;margin-top: 10px">
            <p slot="title" class="title">
                <span>访问时间</span>

            </p>
            <div style="text-align: right">
                <Button type="dashed">添加时间点</Button>
            </div>
            <div style="height: 450px">
                <!--<IEcharts :option="pie2" :resizable="true" :loading="loading1"  @ready="onReady" @click="onClick"></IEcharts>-->
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
//  import IEcharts from 'vue-echarts-v3/src/full.vue';
//  import 'echarts/lib/chart/pie';
  export default {
    data () {
      return {
        pie1: {
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c}({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['当前总粉丝', '净增长', '取消关注', '新关注']
          },
          series: [
            {
              name: '粉丝',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '当前总粉丝', selected: true},
                {value: 679, name: '新关注'}
              ]
            },
            {
              name: '粉丝',
              type: 'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: [
                {value: 335, name: '当前总粉丝'},
                {value: 310, name: '净增长'},
                {value: 234, name: '取消关注'},
                {value: 135, name: '新关注'}
              ]
            }
          ]
        },
        pie2: {
          title: {
            text: '咨询绩效'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点', '00点', '01点']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点', '00点', '01点']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '粉丝总数',
              type: 'line',
              stack: '',
              data: [120, 132, 101, 134, 90, 23, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134]
            },
            {
              name: '取消关注',
              type: 'line',
              stack: '',
              data: [120, 12, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 20, 120, 132, 101, 134]
            },
            {
              name: '新关注',
              type: 'line',
              stack: '',
              data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 12, 132, 101, 14]
            },
            {
              name: '净增长',
              type: 'line',
              stack: '',
              data: [120, 132, 11, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134]
            }
          ]
        },
        loading: false,
        loading1: false,
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
        model1: ''
      };
    },
    components: {
      // IEcharts
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      onReady () {
      },
      onClick () {
        console.log(13447845314);
      }
    },
    created () {
    }
  };
</script>
