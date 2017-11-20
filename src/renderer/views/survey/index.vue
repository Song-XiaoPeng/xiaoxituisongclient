<style scoped lang="less">
  .user-box{
     height: 80px;
    .head-portrait{
      height: 80px;
      width: 80px;
      display: inline-block;
      border-radius: 50%;
      border: 1px #eaeaea solid;
    }
    .portrait-txt-box{
      height: 80px;
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
  background-color: brown;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
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
      >div{
        color: #fff;
        text-align: center;
        line-height: 25px;
        height: 50%;
      }
    }
    >div:first-child{
      border-right: 1px #ffffff solid;
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
</style>

<template>
  <div id="index">
    <Card>
      <div class="user-box">
        <div class="head-portrait">
          <img src="" alt="">
        </div>
        <div class="portrait-txt-box">
          <div class="tle">达瓦达瓦低洼低洼低洼低洼</div>
          <div class="txt">
            <span class="icon"><Icon type="ios-telephone"></Icon></span>
            <span>13233223322</span>
            <span class="icon"><Icon type="social-codepen"></Icon></span>
            <span>美容·美发</span>
            <span class="icon"><Icon type="ios-location"></Icon></span>
            <span>地址达瓦达瓦达瓦达瓦</span>
          </div>
        </div>
      </div>
      <div class="count-box">
        <div class="count-card">
           <div>
             <div>总客服</div>
             <div>150</div>
           </div>
           <div>
             <div>在线客服</div>
             <div>11</div>
           </div>
        </div>
        <div class="count-card" style="background-color: #ff9966">
          <div>
            <div>在线访客</div>
            <div>150</div>
          </div>
          <div>
            <div>接待中</div>
            <div>11</div>
          </div>
        </div>
        <div class="count-card" style="background-color: #666699">
          <div>
            <div>待响应</div>
            <div>150</div>
          </div>
          <div>
            <div>平均响应时长</div>
            <div>11</div>
          </div>
        </div>
      </div>
      <div class="table-box">
        <div id="tab-box">
          <Tabs value="name1" class="cl" >
            <TabPane label="今天" name="name1"></TabPane>
            <TabPane label="昨天" name="name2"></TabPane>
            <TabPane label="近三天" name="name3"></TabPane>
            <TabPane label="近一周" name="name4"></TabPane>
            <TabPane label="近一月" name="name5"></TabPane>
          </Tabs>
        </div>
        <div>
          <Table :columns="columns1" :data="data1"></Table>
        </div>
      </div>
      <div class="chart-box">
        <div class="top" >
          <Select v-model="model1" style="width:200px;float: right">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="chart">
          <!--<IEcharts :option="pie1" :resizable="true" :loading="loading"  @ready="onReady" @click="onClick"></IEcharts>-->
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        columns1: [
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
          {name: 'John Brown', age: 18, address: 'New York No. 1 Lake Park', date: '2016-10-03'
          },
          {name: 'Jim Green', age: 24, address: 'London No. 1 Lake Park', date: '2016-10-01'
          },
          {name: 'Joe Black', age: 30, address: 'Sydney No. 1 Lake Park', date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ],
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
        model1: ''
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
        console.log(111);
      }
    },
    created () {
    }
  };
</script>
