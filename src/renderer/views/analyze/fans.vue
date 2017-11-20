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
   .count-box{
       height: 100px;
       padding: 10px 0;
       overflow: hidden;
       .count-card{
           height: 70px;
           width: 200px;
           margin: 5px;
           float: left;
           box-shadow: 3px 3px 5px 1px #999;
           border-radius: 6px;
           box-sizing: border-box;
           padding: 10px 0;
           background-color: #3399cc;
           >div{
               display: inline-block;
               width: 50%;
               height: 100%;
               float: left;
               line-height: 50px;
               text-align: center;
               color: #EAEAEA;
           }
           >div:first-child{
               border-right: 1px #ffffff solid;
           }
       }
       .ivu-tabs-nav{
           float: right;
       }
   }
    #myCanvas{
        height:  100% !important;
        width: 100% !important;
    }
</style>
<template>
    <div id="index">
        <Card style="width:100%">
            <p slot="title" class="title">
                <span>访问总览</span>
            </p>
            <div class="count-box">
                <div class="count-card">
                    <div>
                        新关注
                    </div>
                    <div>
                       1010
                    </div>
                </div>
                <div class="count-card" style="background-color: #ff9966">
                    <div>
                      取消关注
                    </div>
                    <div>
                        100
                    </div>
                </div>
                <div class="count-card" style="background-color: #666699">
                    <div>
                        净增长
                    </div>
                    <div>
                        100
                    </div>
                </div>
                <div class="count-card" style="background-color: #cc6699">
                    <div>
                        当前粉丝总数
                    </div>
                    <div>
                        100
                    </div>
                </div>
            </div>
            <div style="text-align: right">
                <span>自定义时间：</span>
                <DatePicker type="daterange" v-model="time" :options="options2" placement="bottom-end" placeholder="请选择" style="width: 200px" @on-change="selTimeFun"></DatePicker>
            </div>
            <div style="height: 450px">
                <ve-line :data="chartData"></ve-line>
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
  import VeLine from 'v-charts/lib/line';
  export default {
    data () {
      return {
        options2: {
          shortcuts: [
            {
              text: '近7天',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            }
          ]
        },
        time: false,
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
        model1: '',
        chart: '',
        myChart: '',
        chartData: {
          columns: ['日期', '销售量'],
          rows: [
            { '日期': '1月1日', '销售量': 123 },
            { '日期': '1月2日', '销售量': 1223 },
            { '日期': '1月3日', '销售量': 2123 },
            { '日期': '1月4日', '销售量': 4123 },
            { '日期': '1月5日', '销售量': 3123 },
            { '日期': '1月6日', '销售量': 7123 }
          ]
        }
      };
    },
    components: {
      VeLine
    },
    mounted () {
      this.createChart();
    },
    beforeDestroy () {
    },
    methods: {
      createChart () {
      },
      onReady () {
      },
      onClick () {
        console.log(45651);
      },
      // 选择时间
      selTimeFun (v) {
        console.log(v);
        console.log(this.DateDifference(v[0], v[1]));
      },
      // 返回
      DateDifference (sDate1, sDate2) {
        // sDate1和sDate2是2006-12-18格式
        let aDate, oDate1, oDate2, iDays;
        aDate = sDate1.split('-');
        // 调用Date的构造函数，转换为12-18-2006格式
        oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
        aDate = sDate2.split('-');
        oDate2 = oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
        // 把相差的毫秒数转换为天数
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
        return iDays;
      }
    },
    created () {
    }
  };
</script>
