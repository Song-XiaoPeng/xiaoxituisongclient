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
          <Table border :columns="columns1" :data="data1"></Table>
        </div>
    </div>
    <!--<div class="chart-box">-->
      <!--<div class="top" >-->
        <!--<Select v-model="model1" style="width:200px;float: right">-->
          <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        <!--</Select>-->
      <!--</div>-->
      <!--<div class="chart">-->
          <!--&lt;!&ndash;<IEcharts :option="pie1" :resizable="true" :loading="loading"  @ready="onReady" @click="onClick"></IEcharts>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->

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
  export default {
    data () {
      return {
        columns1: [
          {
            title: '客户姓名',
            key: 'name'
          },
          {
            title: '会话总数',
            key: 'session_total'
          },
          {
            title: '首次会话',
            key: 'first_session'
          },
          {
            title: '有效会话',
            key: 'effective'
          },
          {
            title: '会话率',
            key: 'effective_percentage'
          },
          {
            title: '无效会话',
            key: 'invalid_session'
          },
          {
            title: '会话遗漏',
            key: 'session_missing'
          },
          {
            title: '手动会话',
            key: 'own_session'
          },
          {
            title: '自动会话',
            key: 'auto_session'
          },
          {
            title: '发起会话',
            key: 'active_session'
          },
          {
            title: '采集客咨',
            key: 'collection'
          },
          {
            title: '采客咨率',
            key: 'collection_percentage'
          },
          {
            title: '消息总数',
            key: 'send_message_total'
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
        customSelDateData: null
      };
    },
    components: {
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
