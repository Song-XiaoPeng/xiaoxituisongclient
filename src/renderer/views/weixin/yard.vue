<style scoped lang="less">
    .top-box{
        padding: 10px;
    }
</style>
<template>
   <div id="index">
       <div style="padding: 10px">
           <Tabs value="name1" @on-click="tabFun">
               <TabPane label="渠道二维码" name="name1">
                   <channel v-if="tabName == 'name1'"></channel>
               </TabPane>

               <TabPane label="限时活动推广二维码" name="name2">
                   <activity v-if="tabName == 'name2'"></activity>
               </TabPane>
           </Tabs>
       </div>
   </div>
</template>
<script>
  import channel from './enhance/channel';
  import activity from './enhance/activity';
  export default {
    data () {
      return {
        tabName: 'name1'
      };
    },
    components: {
      channel,
      activity
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      tabFun (v) {
        this.tabName = v;
      }
    }
  };
</script>
