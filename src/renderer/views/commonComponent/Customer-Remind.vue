<style scoped lang="less">
    .remind-box{
        padding: 10px;
        height: 100%;
    }
    .list{
        padding: 5px 0;
        .tel{
            color: #999;
            padding: 5px 0;
        }
    }

</style>
<template>
    <div class="remind-box">
       <div class="list">
           <p class="tel">创建人：&nbsp;刘明&nbsp;&nbsp;创建时间：2017-03-02</p>
           <p class="tel" style="color: #1a1a1a">创建人：&nbsp;刘明&nbsp;&nbsp;创建时间：2017-03-02 <span class="f-r" style="color: #ff3300">未完成</span></p>
           <div class="">
               <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="提醒内容"></Input>
           </div>
           <p class="tel" style="color: #1a1a1a">创建时间：2017-03-02  <span class="f-r" style="color: #ff3300">已经完成</span></p>
           <div class="">
               <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="完成详情"></Input>
           </div>
       </div>
    </div>
</template>
<script>
    export default {
      data () {
        return {};
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {}
    };
</script>
