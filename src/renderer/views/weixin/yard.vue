<style scoped lang="less">
    .top-box{
        height: 60px;
        background-color: #fefefe;
        border-bottom: 1px #d0d5dc solid;
    }
    .li{
        height: 60px;
        padding: 0 10px;
        line-height: 60px;
        color: #333333;
        font-size: 16px;
        text-align: center;
        float: left;
        cursor: pointer;
    }
    li.active{
        background-color:#2db7f5;
        color: #fff;
    }
</style>
<template>
   <div id="index">
       <div class="tab-box" style="border-bottom: 1px #eaeaea solid">
           <ul class="cl">
               <li class="li" v-bind:class="tabName == 'name1' ? 'active' : ''" @click="tabFun('name1')">渠道二维码</li>
               <li class="li" v-bind:class="tabName == 'name2' ? 'active' : ''" @click="tabFun('name2')">限时活动推广二维码</li>
           </ul>
       </div>
       <div v-if="tabName == 'name1'" style="padding: 10px">
           <channel></channel>
       </div>
       <div v-if="tabName == 'name2'" style="padding: 10px">
           <activity></activity>
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
