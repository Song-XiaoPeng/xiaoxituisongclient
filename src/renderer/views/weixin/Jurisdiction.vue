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
           <Button type="ghost" @click="accredit">授权公众平台/小程序</Button>
           <!--<Button type="ghost">添加小程序</Button>-->
       </div>
       <div class="tab">
           <table class="table-copy">
               <thead>
               <tr >
                   <th style="background-color: #e6f1fe">logo</th>
                   <!--<th style="background-color: #e6f1fe">类型</th>-->
                   <th style="background-color: #e6f1fe">类型</th>
                   <th style="background-color: #e6f1fe">公众号或小程序所属公司名称</th>
                   <th style="background-color: #e6f1fe">公司名称</th>
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
                       {{k.type == 2 ? '小程序' : k.type == 1 ? '公众号' : '未知'}}
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
                       <Button type="ghost" @click="popup2 = true, appid = k.appid, selData.merchant_id = k.merchant_id, selData.pay_key = k.pay_key, selData.cert_path = k.cert_path, selData.key_path = k.key_path">上传支付凭证文件</Button>
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
       <Modal v-model="popup2" title="支付凭证" @on-ok="upCertificateFun" width="700">
         <div>
             <Form  label-position="right" :label-width="100">
                 <FormItem label="商户号">
                     <Input v-model="selData.merchant_id"></Input>
                 </FormItem>
                 <FormItem label="支付密匙">
                     <Input v-model="selData.pay_key"></Input>
                 </FormItem>
                 <FormItem label="公钥文件">
                     <span>{{selData.cert_path}}</span>
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
                 </FormItem>
                 <FormItem label="私钥文件">
                     <span>{{selData.key_path}}</span>
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

       <!-- 询问弹窗 12313-->
       <Modal v-model="modal1" title="支付凭证" @on-ok="getWxAuthList">
           <h2 style="text-align: center">
               <Icon type="information-circled" style="margin: 0 10px;color: #3399ff;font-size: 20px"></Icon>是否授权成功？
           </h2>
       </Modal>
       <!-- end询问弹窗 -->
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
        pay_key: '',
        selData: {
          merchant_id: '',
          pay_key: '',
          cert_path: '',
          key_path: ''
        }
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      // 上传支付证书
      upCertificateFun () {
        if (this.selData.merchant_id === '' || this.selData.merchant_id === null) {
          this.$Message.warning('请输入商户号');
          return;
        }
        if (this.selData.pay_key === '' || this.selData.pay_key === null) {
          this.$Message.warning('请输入密匙');
          return;
        }
        if (this.selData.cert_path === '' || this.selData.cert_path === null) {
          this.$Message.warning('请上传支付公钥文件');
          return;
        }
        if (this.selData.key_path === '' || this.selData.key_path === null) {
          this.$Message.warning('请上传支付私钥文件');
          return;
        }
        this.ajax.setCertificate({
          data: {
            appid: this.appid,
            apiclient_cert_pem: this.selData.cert_path,
            apiclient_key_pem: this.selData.key_path,
            merchant_id: this.selData.merchant_id,
            pay_key: this.selData.pay_key
          },
          success: (res) => {
            this.getWxAuthList();
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
        this.selData.cert_path = res.body.resources_id;
      },
      // 支付私钥文件
      upfileKeyFun (res) {
        this.$Message.success('上传成功');
        this.selData.key_path = res.body.resources_id;
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
            this.data6 = res.body.filter((k) => {
              if (k.type !== 2) {
                return k;
              }
            });
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
