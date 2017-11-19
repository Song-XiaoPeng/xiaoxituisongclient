<style scoped lang="less">
    .top-box{
        padding: 10px;
    }
</style>
<template>
   <div id="index">
       <div style="padding: 10px">
           <Tabs value="name1">
               <TabPane label="渠道二维码" name="name1">
                   <channel></channel>
               </TabPane>

               <TabPane label="限时活动推广二维码" name="name2">
                   <activity></activity>
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
    methods: {}
  };
</script>
