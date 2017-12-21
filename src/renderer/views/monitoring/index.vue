<style scoped lang="less">
    #index{
        height: 90%;
    }
   .box,.personnel,.chart,.information{
       height: 100%;
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

  }
  .chart{

  }
  .information{
      border-right: 1px #eaeaea solid;
  }
</style>
<template>
  <div id="index">
      <Row class="box">
          <Col span="4" class="box">
             <div class="personnel">
               <personnel></personnel>
             </div>
          </Col>
          <Col span="12" class="box">
               <div class="chart">
                   <chart :isAdministrator="isAdministrator"></chart>
               </div>
          </Col>
          <Col span="8" class="box">
              <div class="information">
                <formation :isAdministrator="isAdministrator"></formation>
              </div>
          </Col>
      </Row>
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
