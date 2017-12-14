<style scoped lang="less">
  .user-box{
    .head-portrait{
      width: 80px;
      height: 80px;
      display: inline-block;
      border-radius: 50%;
      border: 1px #eaeaea solid;
    }
    .portrait-txt-box{
      display: inline-block;
      vertical-align: top;
      .tle,.txt{
        height: 40px;
        line-height: 40px;
      }
      .tle{
        font-size: 20px;
        font-weight: bold;
        color: #1a1a1a;
      }
      .txt{
        color: #333;
      }
    }
  }
.icon{
  display: inline-block;
  height: 20px;
  width: 20px;
  background-color: #ffa00a;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
}
.count-box{
  padding: 10px 0;
  overflow: hidden;
  .count-card{
    height: 100px;
    width: 370px;
    margin: 5px;
    float: left;
    box-shadow: 1px 1px 12px 1px #f0f0f0;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    >div{
      display: inline-block;
      width: 33.333333%;
      height: 100%;
      float: left;
      text-align: center;
      >div{
        color: #666;
        text-align: center;
        line-height: 40px;
        height: 50%;
        font-size: 16px;
      }
    }
    >div:nth-child(2){
      border-right: 1px #e3e8ee solid;
    }
  }
  .ivu-tabs-nav{
    float: right;
  }
}
  .chart-box{
    height: 600px;
    .top{
      height: 30px;
      margin-top: 30px;
    }
    .chart{
      height: 500px;
    }
  }
  .tab-top{
    background-color: #ecf0f4;
    height: 60px;
    border-top: 10px #F5F7F9 solid;
    .ranking{
      border-left: 2px #74b2fe solid;
      height: 25px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #74b2fe;
      line-height: 22px;
      display: inline-block;
      margin: 12px;
      padding: 0px 8px;
    }
    .date-sel-box{
      ul{
        li{
          height: 50px;
          line-height: 50px;
          color: #666666;
          font-size: 16px;
          padding: 0 15px;
          cursor: pointer;
        }
        li.active{
          background-color: #74b2fe;
          color: #fff;
        }
      }
    }
  }
</style>

<template>
  <div id="index">
    <div class="user-box" style="padding: 15px 15px 0 15px">
      <div class="head-portrait">
        <Avatar :src="userInfo.logo" style="height: 100%;width: 100%;" icon="person" size="large" />
      </div>
      <div class="portrait-txt-box">
        <div class="tle">{{userInfo.company_name}}</div>
        <div class="txt">
          <span class="icon"><Icon type="ios-telephone"></Icon></span>
          <span>{{userInfo.phone_no}}</span>
          <span class="icon"><Icon type="social-codepen"></Icon></span>
          <span>{{userInfo.group_name}}</span>
          <span class="icon"><Icon type="ios-location"></Icon></span>
          <span>{{userInfo.address}}</span>
        </div>
      </div>
    </div>
    <div class="count-box" v-if="is_onlineService_show" style="padding: 15px">
      <div class="count-card" >
        <div style="background-color: #83bafc">
          <img src="~@/assets/images/survey1.png" alt="" style="margin-top: 15px">
        </div>
        <div style="height: 80px;margin-top: 10px">
            <div>总客服</div>
            <div style="font-weight: bold">{{onlineServiceData.customer_service_total.total}}</div>
          </div>
          <div style="height: 80px;margin-top: 10px">
            <div>在线客服</div>
            <div style="font-weight: bold">{{onlineServiceData.customer_service_total.on_line_total}}</div>
          </div>
      </div>
      <div class="count-card">
        <div style="background-color: #78e4c6">
          <img src="~@/assets/images/survey2.png" alt="" style="margin-top: 15px">
        </div>
        <div style="height: 80px;margin-top: 10px">
          <div>在线访客</div>
          <div style="font-weight: bold">{{onlineServiceData.visitor_total.reception_total}}</div>
        </div>
        <div style="height: 80px;margin-top: 10px">
          <div>接待中</div>
          <div style="font-weight: bold">{{onlineServiceData.visitor_total.total}}</div>
        </div>
      </div>
      <div class="count-card">
        <div style="background-color: #efbc6c">
          <img src="~@/assets/images/survey3.png" alt="" style="margin-top: 15px">
        </div>
        <div style="height: 80px;margin-top: 10px">
          <div>待响应</div>
          <div style="font-weight: bold">{{onlineServiceData.response_time.pending_response}}</div>
        </div>
        <div style="height: 80px;margin-top: 10px">
          <div>平均响应时长</div>
          <div style="font-weight: bold">{{onlineServiceData.response_time.average_response}}</div>
        </div>
      </div>
    </div>

    <div class="table-box">
      <div class="tab-top">
        <div class="ranking">
          客服排名
        </div>
        <div class="f-r date-sel-box">
          <ul class="cl">
            <li class="f-l" v-bind:class="is_tab_active == 1 ? 'active': ''" @click="selDateFun(1)" >今天</li>
            <li class="f-l" v-bind:class="is_tab_active == 2 ? 'active': ''" @click="selDateFun(2)" >昨天</li>
            <!--<li class="f-l" v-bind:class="is_tab_active == 3 ? 'active': ''" @click="selDateFun(3)" >近三天</li>-->
            <li class="f-l" v-bind:class="is_tab_active == 3 ? 'active': ''" @click="selDateFun(3)" >近一周</li>
            <li class="f-l" v-bind:class="is_tab_active == 4 ? 'active': ''" @click="selDateFun(4)" >近一月</li>
            <li class="f-l" v-bind:class="is_tab_active == 5 ? 'active': ''" @click="selDateFun(5)" >自定义时间段</li>
          </ul>
        </div>
      </div>
      <div style="padding: 10px 15px">
        <Table border :columns="columns1" stripe :data="data1"></Table>
      </div>
    </div>
    
    <div class="table-box">
      <div class="tab-top">
        <div class="ranking">
          绩效咨询
        </div>
        <div class="f-r date-sel-box">

        </div>
      </div>
      <div style="padding:10px 15px; margin-bottom: 10px;">
        <ve-line :data="chartData"></ve-line>
      </div>
    </div>

    <!-- 自定义时间段弹窗 -->
    <Modal v-model="popup1" title="自定义时间" @on-ok="customDateFun">
      <DatePicker type="daterange" confirm placement="bottom-end" placeholder="请选择时间点" style="width: 100%"  @on-change="customSelDateFun"></DatePicker>
    </Modal>
    <!-- end自定义时间段弹窗 -->

    <!-- 状态 -->
    <Spin fix v-if="is_Loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>请求中....</div>
    </Spin>
    <!-- end状态 -->
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line';

  export default {
    data () {
      return {
        columns1: [
          {
            title: '客户姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '会话总数',
            key: 'session_total',
            align: 'center'
          },
          {
            title: '首次会话',
            key: 'first_session',
            align: 'center'
          },
          {
            title: '有效会话',
            key: 'effective',
            align: 'center'
          },
          {
            title: '会话率',
            key: 'effective_percentage',
            align: 'center'
          },
          {
            title: '无效会话',
            key: 'invalid_session',
            align: 'center'
          },
          {
            title: '会话遗漏',
            key: 'session_missing',
            align: 'center'
          },
          {
            title: '手动会话',
            key: 'own_session',
            align: 'center'
          },
          {
            title: '自动会话',
            key: 'auto_session',
            align: 'center'
          },
          {
            title: '发起会话',
            key: 'active_session',
            align: 'center'
          },
          {
            title: '采集客咨',
            key: 'collection',
            align: 'center'
          },
          {
            title: '采客咨率',
            key: 'collection_percentage',
            align: 'center'
          },
          {
            title: '消息总数',
            key: 'send_message_total',
            align: 'center'
          }
        ],
        data1: [],
        loading: false,
        cityList: [
          {value: 'New York', label: 'New York'
          },
          {value: 'London', label: 'London'
          },
          {value: 'Sydney', label: 'Sydney'
          },
          {value: 'Ottawa', label: 'Ottawa'
          },
          {value: 'Paris', label: 'Paris'
          },
          {value: 'Canberra', label: 'Canberra'
          }
        ],
        model1: '',
        onlineServiceData: {},
        is_Loading: false,
        is_onlineService_show: false,
        userInfo: {},
        is_tab_active: 1,
        popup1: false,
        customSelDateData: null,
        chartData: {
          columns: ['日期', '总咨询量', '有效咨询', '无效咨询', '咨询遗漏', '采集客资'],
          rows: [
            { '总咨询量': 1523, '日期': '8:00', '有效咨询': 1523, '无效咨询': 1523, '采集客资': 1764 },
            { '总咨询量': 1223, '日期': '9:00', '有效咨询': 1223, '无效咨询': 4312, '采集客资': 3314 },
            { '总咨询量': 2123, '日期': '10:00', '有效咨询': 1593, '无效咨询': 3321, '采集客资': 3321 },
            { '总咨询量': 4123, '日期': '11:00', '有效咨询': 3321, '无效咨询': 1333, '采集客资': 2215 },
            { '总咨询量': 3123, '日期': '12:00', '有效咨询': 2231, '无效咨询': 3221, '采集客资': 1523 },
            { '总咨询量': 1673, '日期': '13:00', '有效咨询': 4212, '无效咨询': 4312, '采集客资': 100 },
            { '总咨询量': 3211, '日期': '14:00', '有效咨询': 3221, '无效咨询': 3122, '采集客资': 1673 },
            { '总咨询量': 4312, '日期': '15:00', '有效咨询': 1333, '无效咨询': 1764, '采集客资': 3221 },
            { '总咨询量': 2123, '日期': '16:00', '有效咨询': 1321, '无效咨询': 2231, '采集客资': 1267 },
            { '总咨询量': 6543, '日期': '17:00', '有效咨询': 1764, '无效咨询': 3122, '采集客资': 1333 },
            { '总咨询量': 2123, '日期': '18:00', '有效咨询': 4231, '无效咨询': 1223, '采集客资': 1764 },
            { '总咨询量': 7123, '日期': '19:00', '有效咨询': 3122, '无效咨询': 1673, '采集客资': 4212 }
          ]
        },
        chartSettings: {
          metrics: ['总咨询量', '有效咨询', '无效咨询', '咨询遗漏', '采集客资'],
          dimension: ['日期']
        }
      };
    },
    components: {
      VeLine
    },
    watch: {
    },
    computed: {
    },
    mounted () {
    },
    methods: {
      onReady () {
      },
      onClick () {
      },
      // 获取首页概况信息
      getHomeSurvey () {
        this.is_Loading = true;
        this.ajax.getHomeSurvey({
          data: {},
          success: (res) => {
            Object.assign(this.onlineServiceData, res.body);
            this.is_onlineService_show = true;
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      selDateFun (v) {
        let t;
        this.is_tab_active = v;
        if (v === 1) {
          t = this.getDateFun(1);
          this.getRankFun(t);
        } else if (v === 2) {
          t = this.getDateFun(2);
          this.getRankFun(t);
        } else if (v === 3) {
          t = this.getDateFun(7);
          this.getRankFun(t);
        } else if (v === 4) {
          t = this.getDateFun(30);
          this.getRankFun(t);
        } else if (v === 5) {
          this.popup1 = true;
        } else if (v === 6) {
          console.log(2131);
        }
      },
      // 获取客户排行数据
      getRankFun (t) {
        this.is_Loading = true;
        this.ajax.getCustomerServiceRanking({
          data: {
            type: this.is_tab_active,
            start_time: t.startDate,
            end_time: t.endDate
          },
          success: (res) => {
            this.is_Loading = false;
            this.data1 = res.body;
            console.log(res);
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 根据选择的天数  返回时间
      getDateFun (d) {
        const date = new Date();
        let startY = date.getFullYear();
        let startM = date.getMonth() + 1;
        let startDey = date.getDate();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * d);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let dey = date.getDate();
        return {
          startDate: startY + '-' + startM + '-' + startDey,
          endDate: y + '-' + m + '-' + dey
        };
      },
      // 自定义时间段 选择时间方法
      customSelDateFun (v) {
        this.customSelDateData = v;
      },
      // 自定义时间段OK 回掉方法
      customDateFun () {
        this.getRankFun({
          startDate: this.customSelDateData[1],
          endDate: this.customSelDateData[0]
        });
      }
    },
    created () {
      Object.assign(this.userInfo, JSON.parse(localStorage.getItem('userInfo')));
      this.getHomeSurvey();
      this.selDateFun(1);
    }
  };
</script>
