<style scoped lang="less">
.backtrack{
    position: fixed;
    right: 30px;
    bottom: 20px;
}
</style>
<template>
   <div id="index">
       <webview id="foo" :src="url" style="display:inline-flex; width:100%; min-height: 940px;"></webview>
       <Button type="info" class="backtrack" @click="backtrackFun">返回</Button>
   </div>
</template>
<script>
  export default {
    data () {
      return {
        appid: '',
        url: ''
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      backtrackFun () {
        this.$router.push({
          name: 'addMenu'
        });
      }
    },
    created () {
      this.appid = this.$route.query.appid;
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.url = 'http://kf.lyfz.net/wx_edit/?token=' + userInfo.token + '&appid=' + this.appid;
    }
  };
</script>
