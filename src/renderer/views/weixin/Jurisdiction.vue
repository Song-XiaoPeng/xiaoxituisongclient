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
       <div class="top-box" style="background-color: #ecf0f4">
           <Button type="ghost" @click="accredit">授权公共平台</Button>
           <Button type="ghost">添加小程序</Button>
       </div>
       <div class="tab">
           <table class="table-copy">
               <thead>
               <tr >
                   <th style="background-color: #e6f1fe">logo</th>
                   <th style="background-color: #e6f1fe">类型</th>
                   <th style="background-color: #e6f1fe">名称</th>
                   <th style="background-color: #e6f1fe">公众号或小程序所属公司名称</th>
                   <th style="background-color: #e6f1fe">二维码</th>
                   <th style="background-color: #e6f1fe">证书</th>
                   <!-- <th>能否接单</th> dwa231d23wa1d -->
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
                       <Button type="ghost" @click="popup2 = true, appid = k.appid">上传支付凭证文件</Button>
                   </td>
                   <!--<td>-->
                       <!--<i-switch>-->
                           <!--<span slot="open">开</span>-->
                           <!--<span slot="close">关</span>-->
                       <!--</i-switch>-->
                   <!--</td>-->
               </tr>
               </tbody>
           </table>
       </div>


       <!-- 支付凭证弹窗 -->
       <Modal v-model="popup2" title="支付凭证" @on-ok="upCertificateFun">
         <div>
             <Form  label-position="right" :label-width="100">
                 <FormItem label="商户号">
                     <Input v-model="merchant_id"></Input>
                 </FormItem>
                 <FormItem label="支付密匙">
                     <Input v-model="pay_key"></Input>
                 </FormItem>
                 <FormItem label="上传">
                     <Upload style="display: inline-block;"  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                             name="file" :data="{resources_type: 3}"
                             :max-size='20480'
                             :format="['pem']"
                             :show-upload-list="false"
                             :before-upload="handleBeforeUpload"
                             :headers="{token: userInfo.token}"
                             :on-progress="upLodingFun"
                             :on-format-error="handleFormatError"
                             :on-exceeded-size="handleMaxSize"
                             :on-success="upfileCertFun">
                         <Button type="ghost">上传支付公钥文件</Button>
                     </Upload>
                     <Upload style="display: inline-block;"  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                             name="file" :data="{resources_type: 3}"
                             :max-size='20480'
                             :format="['pem']"
                             :show-upload-list="false"
                             :before-upload="handleBeforeUpload"
                             :headers="{token: userInfo.token}"
                             :on-progress="upLodingFun"
                             :on-format-error="handleFormatError"
                             :on-exceeded-size="handleMaxSize"
                             :on-success="upfileKeyFun">
                         <Button type="ghost">上传支付私钥文件</Button>
                     </Upload>
                 </FormItem>
             </Form>
         </div>
       </Modal>
       <!-- end支付凭证弹窗 -->



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
        popup2: false,
        modal1: false,
        is_Loading: true,
        userInfo: null,
        apiclient_cert_pem: '',
        apiclient_key_pem: '',
        appid: '',
        merchant_id: '',
        pay_key: ''
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      // 上传支付证书
      upCertificateFun () {
        if (this.merchant_id === '') {
          this.$Message.warning('请输入商户号');
          return;
        }
        if (this.pay_key === '') {
          this.$Message.warning('请输入密匙');
          return;
        }
        if (this.apiclient_cert_pem === '') {
          this.$Message.warning('请上传支付公钥文件');
          return;
        }
        if (this.apiclient_key_pem === '') {
          this.$Message.warning('请上传支付私钥文件');
          return;
        }
        this.ajax.setCertificate({
          data: {
            appid: this.appid,
            apiclient_cert_pem: this.apiclient_cert_pem,
            apiclient_key_pem: this.apiclient_key_pem,
            merchant_id: this.merchant_id,
            pay_key: this.pay_key
          },
          success: (res) => {
            this.$Message.success('设置成功');
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      handleBeforeUpload (res) {
      },
      upLodingFun (res) {
      },
      handleFormatError (res) {
      },
      handleMaxSize (res) {
      },
      // 支付公钥文件
      upfileCertFun (res) {
        this.$Message.success('上传成功');
        this.apiclient_cert_pem = res.body.resources_id;
      },
      // 支付私钥文件
      upfileKeyFun (res) {
        this.$Message.success('上传成功');
        this.apiclient_key_pem = res.body.resources_id;
      },
      accredit (v) {
        if (v !== undefined) {
          setTimeout(() => {
            this.modal1 = true;
          }, 1000);
          shell.openExternal('http://kf.lyfz.net/api/v1/we_chat/Business/getAuthUrl?company_id=' + this.userInfo.company_id);
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
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.getWxAuthList();
    }
  };
</script>
