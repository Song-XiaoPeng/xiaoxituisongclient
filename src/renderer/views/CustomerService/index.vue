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
                   <chart></chart>
               </div>
          </Col>
          <Col span="8" class="box">
              <div class="information">
                <formation></formation>
              </div>
          </Col>
      </Row>
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
