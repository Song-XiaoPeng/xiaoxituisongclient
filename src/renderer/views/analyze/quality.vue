<style scoped lang="less">
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
    <div class="table-box">
      <div class="tab-top">
        <div class="ranking">
          接待数排行
        </div>
        <div class="f-r date-sel-box"></div>
      </div>
      <div style="padding:10px 15px; margin-bottom: 10px;">
        <ve-bar :data="chartData" :legend-visible="false"></ve-bar>
      </div>
    </div>

    <div class="table-box">
      <div class="tab-top">
        <div class="ranking">
          质量报表
        </div>
      </div>
      <div style="padding: 10px 15px">
        <Table border :columns="tableColumns" stripe :data="tableData"></Table>
      </div>
    </div>
  </div>
</template>
<script>
  import VeBar from 'v-charts/lib/bar';

  export default {
    data () {
      return {
        tableColumns: [
          {
            title: '客服',
            key: 'name',
            align: 'center'
          },
          {
            title: '有效会话',
            key: 'session_total',
            align: 'center'
          },
          {
            title: '有效会话率',
            key: 'first_session',
            align: 'center'
          },
          {
            title: '无效会话',
            key: 'auth_session',
            align: 'center'
          },
          {
            title: '会话遗漏',
            key: 'active_count',
            align: 'center'
          },
          {
            title: '采集客资',
            key: 'respond_count',
            align: 'center'
          },
          {
            title: '采集客资率',
            key: 'send_count',
            align: 'center'
          },
          {
            title: '成交订单',
            key: 'message_count',
            align: 'center'
          },
          {
            title: '成交率',
            key: 'time',
            align: 'center'
          }
        ],
        tableData: [
          {
            name: '张三',
            session_total: '152',
            first_session: '231',
            auth_session: '113',
            active_count: '612',
            respond_count: '152',
            send_count: '152',
            message_count: '117',
            time: '17%'
          },
          {
            name: '张丽',
            session_total: '213',
            first_session: '152',
            auth_session: '300',
            active_count: '612',
            respond_count: '152',
            send_count: '117',
            message_count: '612',
            time: '25%'
          },
          {
            name: '曾仪',
            session_total: '152',
            first_session: '137',
            auth_session: '612',
            active_count: '321',
            respond_count: '352',
            send_count: '212',
            message_count: '137',
            time: '15%'
          },
          {
            name: '黄飞',
            session_total: '137',
            first_session: '131',
            auth_session: '213',
            active_count: '431',
            respond_count: '352',
            send_count: '412',
            message_count: '117',
            time: '10%'
          },
          {
            name: 'hf2',
            session_total: '421',
            first_session: '331',
            auth_session: '413',
            active_count: '131',
            respond_count: '352',
            send_count: '212',
            message_count: '217',
            time: '5%'
          },
          {
            name: '李海慧',
            session_total: '133',
            first_session: '131',
            auth_session: '113',
            active_count: '231',
            respond_count: '352',
            send_count: '112',
            message_count: '217',
            time: '12%'
          },
          {
            name: '燕子',
            session_total: '275',
            first_session: '231',
            auth_session: '113',
            active_count: '231',
            respond_count: '152',
            send_count: '312',
            message_count: '217',
            time: '33%'
          }
        ],
        chartData: {
          columns: ['姓名', '接待数'],
          rows: [
            { '姓名': '张三', '接待数': 3523 },
            { '姓名': '张丽', '接待数': 2223 },
            { '姓名': '曾仪', '接待数': 2593 },
            { '姓名': '黄飞', '接待数': 4321 },
            { '姓名': 'hf2', '接待数': 2331 },
            { '姓名': '李海慧', '接待数': 4222 },
            { '姓名': '燕子', '接待数': 3166 }
          ]
        },
        chartSettings: {
          metrics: ['姓名', '接待数'],
          dimension: ['姓名']
        }
      };
    },
    components: {
      VeBar
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
    },
    created () {
    }
  };
</script>
