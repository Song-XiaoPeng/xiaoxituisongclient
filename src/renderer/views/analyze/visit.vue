<style scoped lang="less">
    .title-box{
        background-color: #e6f1fe;
        padding: 16px;
        .r{

        }
    }
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
    .table-copy {
        border-collapse: collapse;
        width: 100%;
    }

    .table-copy, td, th{
        border:1px solid #e9eaec;
        text-align: center;
        height: 40px;
    }

    .table-copy th{
        background-color: #e6f1fe;
    }

    .table-copy tr:nth-child(even){
        background: #f8f8f9;
    }

    .table-copy tr:hover{
        background: #ebf7ff;
    }
</style>
<template>
    <div id="index">
        <Card style="width:100%" :padding="0">
            <div class="title-box cl">
                <span style="font-size: 16px; color: #74b2fe;position: relative;top: 3px;">访问量</span>
                <div class="f-r r">
                    <div class="sel-box f-r">
                        <Select v-model="appid" style="width:200px" @on-change="selAppidFun">
                            <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
                        </Select>
                    </div>
                    <div class="sel-box f-r" >
                        <Select style="width:200px">
                            <Option v-for="(k, i) in share" :value="i" :key="i">{{k}}</Option>
                        </Select>
                    </div>
                    <div class="sel-box f-r">
                        <!--<Select  style="width:200px" @on-change="selDeyFun">-->
                            <!--<Option  :value="1" >今日</Option>-->
                            <!--<Option  :value="2" >昨日</Option>-->
                            <!--<Option  :value="7" >本周</Option>-->
                            <!--<Option  :value="30" >本月</Option>-->
                        <!--</Select>-->
                        <DatePicker type="daterange" v-model="time" :options="options2" placement="bottom-end" placeholder="请选择" style="width: 200px" @on-change="selTimeFun"></DatePicker>
                    </div>
                </div>
            </div>
            <div class="cl" style="overflow: hidden;padding: 16px">
                <table class="table-copy">
                    <thead>
                    <tr>
                        <th>访问总量</th>
                        <th>首次访问</th>
                        <th>粉丝分组1</th>
                        <th>粉丝分组2</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>21583</td>
                        <td>2364</td>
                        <td>fwkbfw</td>
                        <td>dnwajdjkw</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="height: 450px;padding: 16px;">
                <div class="" style="color:#ff0033;text-align: right">单次统计，只限间隔不能超过7天</div>
                <ve-line :data="chartData"></ve-line>
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



        <!-- 请求状态 -->
        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>请求中....</div>
        </Spin>
        <!-- end请求状态 -->
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
        is_Loading: false,
        time: false,
        loading: false,
        loading1: false,
        columns1: [
          {
            title: '时间',
            key: 'ref_date'
          },
          {
            title: '分享次数',
            key: 'share_count'
          },
          {
            title: '分享人数',
            key: 'share_user'
          },
          {
            title: '阅读该文类型',
            render: (h, p) => {
              return h('span', this.readType[p.row.user_source]);
            }
          },
          {
            title: '分享场景',
            render: (h, p) => {
              return h('span', this.share[p.row.share_scene]);
            }
          }
        ],
        data1: [],
        cityList: [],
        model1: '',
        chartData: {
          columns: ['日期', '分享次数', '分享人数'],
          rows: []
        },
        appid: '',
        readType: {
          0: '会话',
          1: '好友',
          2: '朋友圈',
          3: '腾讯微博',
          4: '历史消息',
          5: '其他'
        },
        share: {
          1: '好友转发',
          2: '朋友圈',
          3: '腾讯微博',
          255: '其他'
        },
        start_date: '',
        end_date: ''
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
      // 选择天数获取数据
      selDeyFun (v) {
        let end = new Date();
        let start = new Date();
        if (v === 1) {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
        } else if (v === 2) {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
        } else if (v === 7) {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        } else if (v === 30) {
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        }
        let y = start.getFullYear();
        let m = start.getMonth() + 1;
        let d = start.getDate();
        let yy = end.getFullYear();
        let mm = end.getMonth() + 1;
        let dd = end.getDate();
        this.start_date = y + '-' + m + '-' + d;
        this.end_date = yy + '-' + mm + '-' + dd;
        this.getUserSummary();
      },
      createChart () {
      },
      onReady () {
      },
      onClick () {
      },
      // 获取 数据列表
      getUserSummary () {
        this.increase = 0;
        this.cancel = 0;
        this.clean = 0;
        this.is_Loading = true;
        this.ajax.getUserShareSummary({
          data: {
            appid: this.appid,
            start_date: this.start_date,
            end_date: this.end_date
          },
          success: (res) => {
            this.is_Loading = false;
            let arr = [];
            this.data1 = res.body;
            res.body.forEach((k) => {
              this.increase += k.new_user;
              this.cancel += k.cancel_user;
              this.clean += k.new_user - k.cancel_user;
              arr.push({
                '日期': k.ref_date,
                // '来源': ,
                '分享次数': k.share_count,
                '分享人数': k.share_user
              });
            });
            this.data1 = res.body;
            this.chartData.rows = arr;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning('无法统计包含今天数据或大于7天数据');
          }
        });
      },
      // 选择时间
      selTimeFun (v) {
        let d = this.DateDifference(v[0], v[1]);
        if (d > 7) {
          this.$Message.warning('请选择小于等于7天');
        } else {
          this.start_date = v[0];
          this.end_date = v[1];
          this.getUserSummary();
          this.getUserCumulate();
        }
      },
      // 判断所选的 开始时间和结束时间之间的间隔天数
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
      },
      // appid 改变请求数据
      selAppidFun () {
        this.getUserSummary();
      }
    },
    created () {
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body.filter((k) => {
            if (k.type !== 2) {
              return k;
            }
          });
          this.appid = this.cityList[0].appid;
          let day1 = new Date();
          let y = day1.getFullYear();
          let m = day1.getMonth() + 1;
          let d = day1.getDate();
          day1.setTime(day1.getTime() - 168 * 60 * 60 * 1000);
          let s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate();
          this.start_date = s1;
          this.end_date = y + '-' + m + '-' + (d - 1);
          this.getUserCumulate();
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
