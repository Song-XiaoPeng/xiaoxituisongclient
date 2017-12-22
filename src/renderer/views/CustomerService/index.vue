<style scoped lang="less">
    #index{
        height: 100%;
        position: relative;
    }
  .box{
      background-color: #fff;
  }
  .personnel,.chart,.information{
      border-top: 1px #eaeaea solid;
      border-left: 1px #eaeaea solid;
      border-bottom: 1px #eaeaea solid;
  }
  .personnel{
      width: 260px;
      position: absolute;
      left: 0;
      top:0;
      bottom: 0;
  }
  .chart{
      position: absolute;
      left: 260px;
      top: 0;
      bottom: 0;
      right: 420px;
  }
  .information{
      position: absolute;
      right: 0;
      width: 420px;
      top: 0;
      bottom: 0;
      border-right: 1px #eaeaea solid;
  }
</style>
<template>
  <div id="index">

      <div class="personnel" style="background-color: #fafafa;">
          <personnel></personnel>
      </div>

      <div class="chart">
          <chart></chart>
      </div>

      <div class="information">
          <formation></formation>
      </div>

  </div>
</template>
<script>
    import Bus from '../../assets/eventBus';
    import personnel from '../commonComponent/ChatPopulation';
    import formation from '../commonComponent/commoninformation';
    import chart from '../commonComponent/Chatting';
    export default {
      data () {
        return {};
      },
      components: {
        personnel,
        formation,
        chart
      },
      mounted () {
      },
      destroyed (s) {
      },
      beforeDestroy () {
      },
      methods: {},
      created () {
        Bus.$off();
        this.ajax.getWxAuthList({
          data: {},
          success: (res) => {
            Bus.$emit('WxAuthList', res);
            // sessionStorage.setItem('WxAuthList', JSON.stringify(res.body));
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      }
    };
</script>
