<style scoped lang="less">
    .right-box{
        display: -webkit-box;
    }
    .btn{
        height: 37px;
        text-align: center;
        line-height: 37px;
        font-size: 16px;
        color: #1a1a1a;
        border-bottom: 1px #eaeaea solid;
        transition: all .3s;
        cursor: pointer;
        box-sizing: border-box;
        border-right: 1px #eaeaea solid;
        -webkit-box-flex: 1;
    }
    .active{
        background-color: #3399ff;
        color: #fff;
    }
    .btn:hover{
        background-color: #2db7f5;
        color: #fff;
    }
</style>
<template>
  <div>
      <!--<Row>-->
          <!--<Col :xs="isAdministrator ? 12 : 12"  :lg="isAdministrator ? 8 : 6">-->
              <!--<div class="btn" v-bind:class="navState == 1 ? 'active' : ''" @click="selTbeFun(1)">-->
                  <!--客户信息-->
              <!--</div>-->
          <!--</Col>-->
          <!--<Col v-if="isAdministrator ? false : true" :xs="12"  :lg="6">-->
      <!--<div class="btn" v-bind:class="navState == 3 ? 'active' : ''" @click="selTbeFun(3)">-->
      <!--漫游消息-->
      <!--</div>-->
          <!--</Col>-->
          <!--<Col :xs="isAdministrator ? 12 : 12"  :lg="isAdministrator ? 8 : 6">-->
              <!--<div class="btn" v-bind:class="navState == 3 ? 'active' : ''" @click="selTbeFun(3)">-->
                  <!--漫游消息-->
              <!--</div>-->
          <!--</Col>-->
          <!--<Col :xs="isAdministrator ? 24 : 12"  :lg="isAdministrator ? 8 : 6">-->
              <!--<div class="btn" v-bind:class="navState == 4 ? 'active' : ''" style="border-right: 0" @click="selTbeFun(4)">-->
                  <!--业务提醒-->
              <!--</div>-->
          <!--</Col>-->
      <!--</Row>-->
      <div class="right-box">
          <div class="btn" v-if="is_CRM.common" v-bind:class="navState == 1 ? 'active' : ''" @click="selTbeFun(1)">
              客户信息
          </div>
          <div class="btn" v-if="is_CRM.information" v-bind:class="navState == 2 ? 'active' : ''" @click="selTbeFun(3)">
             常用话术
          </div>
          <div class="btn" v-if="is_CRM.record" v-bind:class="navState == 3 ? 'active' : ''" @click="selTbeFun(3)">
             漫游消息
          </div>
          <div class="btn" v-if="is_CRM.remind" v-bind:class="navState == 4 ? 'active' : ''" style="border-right: 0" @click="selTbeFun(4)">
             业务提醒
          </div>
      </div>
      <div>
         <Common v-show="navState == 1"></Common>
         <information v-show="navState == 2 && isAdministrator == false"></information>
         <Record v-show="navState == 3" ></Record>
         <Remind v-show="navState == 4"></Remind>
      </div>
  </div>
</template>
<script>
    import Bus from '../../../assets/eventBus';
    import Common from './Customer-Common';// 常用术语
    import Information from './Customer-Information';//  客户信息
    import Record from './Customer-Record';// 会话记录
    import Remind from './Customer-Remind';// 业务提醒
    export default {
      data () {
        return {
          navState: 0,
          is_CRM: {
            common: false,
            information: false,
            record: false,
            remind: false
          }
        };
      },
      components: {
        Common,
        Information,
        Record,
        Remind
      },
      mounted () {
      },
      props: {
        isAdministrator: {
          type: Boolean,
          default: false
        }
      },
      beforeDestroy () {
      },
      watch: {
        isAdministrator: (v) => {
        }
      },
      methods: {
        selTbeFun (v) {
          this.navState = v;
          if (v === 3) {
            // 点击漫游信息时候  触发滚动条方法
            Bus.$emit('scro');
          } if (v === 4) {
            // 通知业务提醒组件 请求业务提醒相关的数据
            Bus.$emit('remind');
          }
        }
      },
      destroyed (s) {
      },
      created () {
        Bus.$on('change', (k, o) => {
          // 判断是否是客户管理数据/ 控制显示（客户信息/常用话术/漫游信息/业务提醒）
          Object.assign(this.is_CRM, o);
          let i = 1;
          for (let s in o) {
            if (s) {
              this.navState = i;
              break;
            }
            i++;
          }
          this.navState = 1;
        });
      }
    };
</script>
