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
                       {{increase}}
                    </div>
                </div>
                <div class="count-card" style="background-color: #ff9966">
                    <div>
                      取消关注
                    </div>
                    <div>
                        {{cancel}}
                    </div>
                </div>
                <div class="count-card" style="background-color: #666699">
                    <div>
                        净增长
                    </div>
                    <div>
                       {{clean}}
                    </div>
                </div>
                <div class="count-card" style="background-color: #cc6699">
                    <div>
                        当前粉丝总数
                    </div>
                    <div>
                        {{fansSum}}
                    </div>
                </div>
            </div>
            <div class="cl" style="text-align: right">
                <div class="f-l" style="text-align: left;">
                    <span>当前公共号：</span>
                    <Select v-model="appid" style="width:200px" @on-change="selAppidFun">
                        <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
                    </Select>
                </div>
                <span>自定义时间：</span>
                <DatePicker type="daterange" v-model="time" :options="options2" placement="bottom-end" placeholder="请选择" style="width: 200px" @on-change="selTimeFun"></DatePicker>
            </div>
            <div style="height: 450px">
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
            title: '来源',
            render: (h, p) => {
              return h('span', this.userSource[p.row.user_source]);
            }
          },
          {
            title: '新关注',
            key: 'new_user'
          },
          {
            title: '取消关注',
            key: 'cancel_user'
          },
          {
            title: '净增长',
            render: (h, p) => {
              return h('span', p.row.new_user - p.row.cancel_user);
            }
          }
        ],
        data1: [],
        cityList: [],
        userSource: {
          0: '其他合计',
          1: '公共号搜索',
          17: '名片分享',
          30: '扫码二维码',
          43: '图文页右上角菜单',
          51: '支付后关注（在支付完成页）',
          57: '图文页内公众号名称',
          75: '公众号文章广告',
          78: '朋友圈广告'
        },
        model1: '',
        chartData: {
          columns: ['日期', '新关注', '取消关注', '净增长'],
          rows: []
        },
        appid: '',
        start_date: '',
        end_date: '',
        increase: 0,
        cancel: 0,
        clean: 0,
        fansSum: 0
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
        console.log(179);
      },
      // 获取 数据列表
      getUserSummary () {
        this.increase = 0;
        this.cancel = 0;
        this.clean = 0;
        this.is_Loading = true;
        this.ajax.getUserSummary({
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
                '日期': k.ref_date + this.userSource[k.user_source],
                // '来源': ,
                '新关注': k.new_user,
                '取消关注': k.cancel_user,
                '净增长': (k.new_user - k.cancel_user)
              });
            });
            this.chartData.rows = arr;
            console.log(this.chartData.rows);
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
      // 获取粉丝总数
      getUserCumulate () {
        this.fansSum = 0;
        this.ajax.getUserCumulate({
          data: {
            appid: this.appid,
            start_date: this.start_date,
            end_date: this.end_date
          },
          success: (res) => {
            res.body.forEach((k) => {
              this.fansSum += k.cumulate_user;
            });
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
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
        this.getUserCumulate();
        this.getUserSummary();
      }
    },
    created () {
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body;
          this.appid = res.body[0].appid;
          let day1 = new Date();
          let y = day1.getFullYear();
          let m = day1.getMonth() + 1;
          let d = day1.getDate();
          day1.setTime(day1.getTime() - 168 * 60 * 60 * 1000);
          let s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate();
          this.start_date = s1;
          this.end_date = y + '-' + m + '-' + (d - 1);
          this.getUserSummary();
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
