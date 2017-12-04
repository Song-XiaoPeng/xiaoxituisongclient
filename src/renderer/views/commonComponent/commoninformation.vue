<style scoped lang="less">
    .btn{
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #1a1a1a;
        box-sizing: border-box;
        border-bottom: 1px #eaeaea solid;
        transition: all .3s;
        cursor: pointer;
        box-sizing: border-box;
        border-right: 1px #eaeaea solid;
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
      <Row>
          <Col :xs="isAdministrator ? 12 : 12"  :lg="isAdministrator ? 8 : 6">
              <div class="btn" v-bind:class="navState == 1 ? 'active' : ''" @click="selTbeFun(1)">
                  客户信息
              </div>
          </Col>
          <Col v-if="isAdministrator ? false : true" :xs="12"  :lg="6">
              <div class="btn" v-bind:class="navState == 2 ? 'active' : ''" @click="selTbeFun(2)">
                  常用话术
              </div>
          </Col>
          <Col :xs="isAdministrator ? 12 : 12"  :lg="isAdministrator ? 8 : 6">
              <div class="btn" v-bind:class="navState == 3 ? 'active' : ''" @click="selTbeFun(3)">
                  漫游消息
              </div>
          </Col>
          <Col :xs="isAdministrator ? 24 : 12"  :lg="isAdministrator ? 8 : 6">
              <div class="btn" v-bind:class="navState == 4 ? 'active' : ''" style="border-right: 0" @click="selTbeFun(4)">
                  业务提醒
              </div>
          </Col>
      </Row>
      <div>
         <Common v-show="navState == 1"></Common>
         <information v-show="navState == 2 && isAdministrator == false"></information>
         <Record v-show="navState == 3" ></Record>
         <Remind v-show="navState == 4"></Remind>
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
          navState: 1
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
          }
        }
      },
      destroyed (s) {
        Bus.$off();
      },
      created () {
        Bus.$on('change', (k) => {
          this.navState = 1;
        });
      }
    };
</script>
