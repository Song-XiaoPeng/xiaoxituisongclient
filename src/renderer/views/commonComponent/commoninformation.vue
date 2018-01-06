<style scoped lang="less">
    .right-box{
        display: -webkit-box;
        background-color: #ecf0f4;
    }
    .btn{
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #333333;
        border-bottom: 1px #eaeaea solid;
        transition: all .5s;
        cursor: pointer;
        box-sizing: border-box;
        border-right: 1px #d7dde4 solid;
        -webkit-box-flex: 1;
    }
    .active{
        border-bottom: 3px #3399ff solid;
    }
    .btn:hover{
        color: #2db7f5;
    }
</style>
<template>
  <div style="height: 100%; position: relative">
      <div class="right-box">
          <div class="btn" v-if="is_CRM.common" v-bind:class="navState == 1 ? 'active' : ''" @click="selTbeFun(1)">
              客户信息
          </div>
          <div class="btn" v-if="is_CRM.information" v-bind:class="navState == 2 ? 'active' : ''" @click="selTbeFun(2)">
             常用话术
          </div>
          <div class="btn" v-if="is_CRM.record" v-bind:class="navState == 3 ? 'active' : ''" @click="selTbeFun(3)">
             漫游消息
          </div>
          <div class="btn" v-if="is_CRM.remind" v-bind:class="navState == 4 ? 'active' : ''" style="border-right: 0" @click="selTbeFun(4)">
             业务提醒
          </div>
      </div>
      <div class="" style="overflow: auto; position: absolute;left: 0;top: 40px; bottom: 0;right: 0;">
         <Common v-show="navState == 1 && is_CRM.common"></Common>
         <information v-show="navState == 2 && isAdministrator == false && is_CRM.information"></information>
         <Record v-show="navState == 3 && is_CRM.record" ></Record>
         <Remind v-show="navState == 4 && is_CRM.remind"></Remind>
      </div>
  </div>
</template>
<script>
    import Bus from '../../assets/eventBus';
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
        Bus.$on('is_remind', (obj, k) => {
          this.is_CRM.remind = k.remind;
        });
      }
    };
</script>
