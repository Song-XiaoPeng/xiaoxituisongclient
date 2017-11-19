<style scoped lang="less">
.top-box{
    text-align: right;
    padding:10px;
    border-bottom: 1px #eaeaea solid;
    background-color: #fff;
}
    .tab{
        padding: 10px;
        background-color: #fff;
    }
.table-copy {
    border-collapse: collapse;
    width: 100%;
}

.table-copy, td, th{
    border:1px solid #e9eaec;
    text-align: center;
    height: 40px;
}

.table-copy th{
    background-color: #f8f8f9;
}

.table-copy tr:nth-child(even){
    background: #f8f8f9;
}

.table-copy tr:hover{
    background: #ebf7ff;
}

</style>
<template>
   <div id="index">
       <div class="top-box">
           <Button type="ghost" @click="accredit">授权公共平台</Button>
           <Button type="ghost">添加小程序</Button>
       </div>
       <div class="tab">
           <table class="table-copy">
               <thead>
               <tr>
                   <th>logo</th>
                   <th>类型</th>
                   <th>名称</th>
                   <th>公众号或小程序所属公司名称</th>
                   <th>二维码</th>
                   <th>语言识别</th>
                   <th>获取地理位置</th>
                   <!-- <th>能否接单</th> -->
               </tr>
               </thead>
               <tbody>
               <tr v-for="(k, index) in data6" :key="index">
                   <td style="padding: 4px;">
                       <img :src="k.logo" style="width: 100px;height: 100px" alt="">
                   </td>
                   <td style="padding: 4px;">
                       {{k.type == 1 ? '小程序' : k.type == 2 ? '公共号' : '未知'}}
                   </td>
                   <td style="padding: 4px;">
                       {{k.nick_name}}
                   </td>
                   <td style="padding: 4px;">
                       {{k.principal_name}}
                   </td>
                   <td style="padding: 4px;">
                       <img :src="k.qrcode_url" style="width: 100px;height: 100px" alt="">
                   </td>
                   <td>
                       <i-switch>
                           <span slot="open">开</span>
                           <span slot="close">关</span>
                       </i-switch>
                   </td>
                   <td>
                       <i-switch>
                           <span slot="open">开</span>
                           <span slot="close">关</span>
                       </i-switch>
                   </td>
               </tr>
               </tbody>
           </table>
       </div>
       <Modal v-model="modal1"  title="授权" cancel-text="遇到问题，重新授权" ok-text="已完成" @on-ok="getWxAuthList" @on-cancel="accredit()">
          已授权成功？
       </Modal>
       <Spin fix v-if="is_Loading">
           <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
           <div>请求中....</div>
       </Spin>
   </div>
</template>
<script>
  const { shell } = require('electron');
  export default {
    data () {
      return {
        data6: [],
        modal1: false,
        is_Loading: true
      };
    },
    mounted () {
      console.log(111231);
    },
    beforeDestroy () {
    },
    methods: {
      accredit (v) {
        if (v !== undefined) {
          setTimeout(() => {
            this.modal1 = true;
          }, 1000);
          shell.openExternal('http://kf.lyfz.net/api/v1/we_chat/Business/getAuthUrl?company_id=00798f0c8f84562d994e543a43e7f4d1');
        }
      },
      getWxAuthList () {
        this.is_Loading = true;
        this.ajax.getWxAuthList({
          data: {},
          success: (res) => {
            this.is_Loading = false;
            this.data6 = res.body;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      }
    },
    created () {
      this.getWxAuthList();
    }
  };
</script>
