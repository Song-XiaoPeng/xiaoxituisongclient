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
        right: 380px;
    }
    .information{
        position: absolute;
        right: 0;
        width: 380px;
        top: 0;
        bottom: 0;
        border-right: 1px #eaeaea solid;
    }
</style>
<template>
  <div id="index">
      <div class="personnel">
          <personnel></personnel>
      </div>
      <div class="chart">
          <chart :isAdministrator="isAdministrator"></chart>
      </div>
      <div class="information">
          <formation :isAdministrator="isAdministrator"></formation>
      </div>
  </div>
</template>
<script>
    import personnel from './ChatPopulation.vue';
    import formation from './commoninformation';
    import chart from './Chatting';
    export default {
      data () {
        return {
          isAdministrator: false
        };
      },
      components: {
        personnel,
        formation,
        chart
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {},
      created () {
      }
    };
</script>
