<style scoped lang="less">
 .box{
     margin: 10px;
     overflow: hidden;
 }
   .client{
      border-bottom: 1px #eaeaea solid;
      position: relative;
      height: 130px;
      width: 100%;
      overflow: hidden;
      .portrait{
         height: 100px;
         width: 100px;
         overflow: hidden;
         border: 1px #eaeaea solid;
         img{
            width: 100%;
            height: 100%;
         }
      }
      .txt{
         position: absolute;
         top:0;
         left: 110px;
         right: 0;
         bottom: 30px;
         ul{
            height: 100%;
            li{
               height: 25%;
               line-height: 25px;
            }
         }
      }
      .txt-bot{
         height: 30px;
         line-height: 30px;
         position: absolute;
         bottom: 0;
         right: 0;
         left: 0;
      }
   }
   .form-box{
      padding: 10px;
      border-bottom: 1px #eaeaea solid;
      width: 100%;
      overflow-y: scroll;
   }
   .custom-group-box{
      padding: 10px;
   }
   .name-box{
      position: absolute;
      width: 100%;
      background-color: #fff;
      z-index: 1000;
      border: 1px #eaeaea solid;
      box-shadow: 0px 1px 1px 0px #eaeaea;
      li{
         cursor: pointer;
         box-sizing: border-box;
         padding: 0 10px;
      }
      li:hover{
         background-color: #f7f7f7;
      }
   }
 @media all and (min-height:400px) and (max-height:799px){
    /*.form-box{*/
       /*height: 450px*/
    /*}*/
 }
 @media all and (min-height:800px) and (max-height:1000px){
    /*.form-box{*/
       /*height: 450px*/
    /*}*/
 }
 @media all and (min-height:1000px) and (max-height:1200px){
    /*.form-box{*/
       /*height: 650px*/
    /*}*/
 }
 @media all and (min-height:1201px){
    /*.form-box{*/
       /*height: 750px*/
    /*}*/
 }
</style>
<template>
   <div class="box">
      <!--<div class="client cl">-->
         <!--<div class="portrait f-l">-->
            <!--<img :src="clientData.customer_wx_portrait" alt="">-->
         <!--</div>-->
         <!--<div class="txt f-l">-->
            <!--<ul>-->
               <!--<li><span>微信名称：</span> <span style="color:#999">{{clientData.customer_wx_nickname}}</span> </li>-->
               <!--<li><span>来源：</span> <span style="color:#999">{{clientData.app_name}}</span> </li>-->
               <!--&lt;!&ndash;<li><span>公共平台</span> <span style="color:#999">哇大王</span> </li>&ndash;&gt;-->
               <!--<li><span>来访次数</span> <span style="color:#999">{{clientData.session_frequency}}</span> </li>-->
            <!--</ul>-->
         <!--</div>-->
         <!--<div class="txt-bot">-->
           <!--<span>首次沟通：</span>-->
           <!--<span>2017-03-05</span>-->
           <!--<span style="color: #2db7f5">张三</span>-->
           <!--<span style="margin-left: 10px">最近沟通：</span>-->
           <!--<span >2017-03-05</span>-->
           <!--<span style="color: #2db7f5">张三</span>-->
         <!--</div>-->
      <!--</div>-->
      <div class="form-box">
         <Form  v-if="is_clue" label-position="right" :label-width="100">
            <FormItem label="客户姓名：">
               <span>{{clientData.nickname}}</span>
            </FormItem>
            <FormItem label="二维码来源：">
               <span>{{clientData.source_qrcode_name}}</span>
            </FormItem>
            <FormItem label="所在地区：">
               <span>{{clientData.country}}，{{clientData.province}}，{{clientData.city}}</span>
            </FormItem>
            <FormItem label="性别：">
               <span v-if="clientData.gender == '1'">男</span>
               <span v-if="clientData.gender == '2'">女</span>
               <span v-if="clientData.gender == '3'">未知</span>
            </FormItem>
         </Form>

         <Form id="clientCrm-form" v-else label-position="right" :label-width="80">
            <!--<FormItem label="粉丝分组：">-->
               <!--<Select v-model="WxAutId" style="width:  100%;">-->
                  <!--<Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.name }}</Option>-->
               <!--</Select>-->
            <!--</FormItem>-->
            <FormItem label="客户类型：">
               <Select v-model="formData.customer_type" style="width:  44%;">
                  <Option v-for="item in clientTypeArr" :value="item.id" :key="item.id">{{ item.label }}</Option>
               </Select>
            </FormItem>
            <FormItem label="产品：">
               <span v-for="(k, i) in selPurposeData" :key="i">{{k.product_name}},</span>
               <Button type="dashed" @click="popup12 = true">操作</Button>
            </FormItem>
            <!--<FormItem label="客户池组：">-->
               <!--<Select v-model="formData.wx_user_group_id" style="width:  44%;">-->
                  <!--<Option v-for="item in cityList" :value="parseInt(item.wx_user_group_id)" :key="item.wx_user_group_id">{{ item.group_name }}</Option>-->
               <!--</Select>-->
               <!--<Button type="dashed" @click="popup2 = true">操作</Button>-->
            <!--</FormItem>-->
            <FormItem  label="姓名：">
               <Input v-model="formData.real_name" style="width:  100%;" @on-change="nameSeekFun" @on-blur="blurFun"></Input>
               <ul class="name-box" v-if="is_name_show">
                  <li v-for="(item, i) in nameArr" @click="selNameSeekFun(item)">{{ item.real_name }}</li>
               </ul>
            </FormItem>
            <FormItem  label="手机：">
               <Input v-model="formData.real_phone" style="width:  100%;"></Input>
            </FormItem>
            <FormItem  label="微信号">
               <Input v-model="formData.wx_number" style="width:  100%;"></Input>
            </FormItem>
            <FormItem label="客户生日：" >
               <DatePicker type="datetime" v-model="formData.birthday" placeholder="选择时间" style="width:  100%;" @on-change="birthdayFun"></DatePicker>
            </FormItem>
            <FormItem label="性别：" >
               <RadioGroup v-model="formData.real_sex">
                  <Radio label="1">
                     <span>男</span>
                  </Radio>
                  <Radio label="2">
                     <span>女</span>
                  </Radio>
               </RadioGroup>
            </FormItem>
            <FormItem  label="联系地址：">
               <Input v-model="formData.contact_address" style="width:  100%;"></Input>
            </FormItem>
            <FormItem  label="邮箱">
               <Input v-model="formData.email" style="width:  100%;"></Input>
            </FormItem>
            <FormItem  label="客户电话">
               <Input v-model="formData.tel" style="width:  100%;"></Input>
            </FormItem>
            <FormItem label="备注">
               <Input type="textarea" v-model="formData.desc" style="width: 100%;"></Input>
            </FormItem>
            <FormItem label="" v-if="!is_clue">
               <Button type="info" class="f-r"  @click="saveFun" icon="plus-round">保存</Button>
            </FormItem>
         </Form>
      </div>


      <div class="cl" >
         <div class="" style="text-align: right;padding: 5px">
            <Button type="info" size="small" @click="popup14 = true">添加标签</Button>
         </div>
         <div class="label-box">
            <Tag v-for="(k, i) in userData.label" color="green" :key="i" v-if="k" closable @on-close="lableCloseFun(k, i)">{{k.label_name}}</Tag>
         </div>
      </div>



      <!-- 添加或修改客户池 -->
      <Modal v-model="popup1" title="客户池组" @on-ok="addCustomerGroup" :styles="{'z-index': 1000}">
         <Form label-position="right" :label-width="80">
            <FormItem label="池组名称：">
               <Input v-model="pondName" placeholder="请输入" style="width:  100%;"></Input>
            </FormItem>
         </Form>
      </Modal>
      <!-- end添加或修改客户池 -->



      <!-- 客户池列表弹窗 132123-->
      <Modal v-model="popup2" title="选项名称" :styles="{'z-index': 100}">
         <div style="padding: 5px"><Button type="primary" @click="popup1 = true,is_pond = '1', popup2 = false">添加池组</Button></div>
         <div>
            <Table border :columns="columns7" :data="data6"></Table>
         </div>
      </Modal>
      <!-- end客户池列表弹窗 -->


      <!-- 意向产品 -->
      <Modal v-model="popup12" title="意向产品" :styles="{'z-index': 100}" width="800">
         <div style="padding: 5px"><Button type="primary" @click="popup13 = true, popup12 = false">添加意向产品</Button><span style="color: #ff3300; margin-left: 10px">点击其中一项即选择</span></div>
         <div>
            <Table border :columns="columns8" highlight-row :data="data7" @on-selection-change="selPurposeFun"></Table>
         </div>
         <div style="text-align: center;padding: 5px">
            <Page :total="pageData.count" :page-size="pageData.row_sum" @click="pageFun"></Page>
         </div>
      </Modal>
      <!-- end意向产品 -->


      <!-- 添加或修改意向产品 -->
      <Modal v-model="popup13" title="添加意向产品" @on-ok="addPurposeFun" :styles="{'z-index': 1000}">
         <Form label-position="right" :label-width="100">
            <FormItem label="意向产品名称：">
               <Input v-model="purposeName" placeholder="请输入" style="width:  100%;"></Input>
            </FormItem>
         </Form>
      </Modal>
      <!-- end添加或修改意向产品 -->




      <!-- 添加标签 -->
      <Modal v-model="popup14" title="标签" @on-ok="setWxUserLabel" width="800">
         <div class="">
            <Select v-model="label_group_id" style="width:200px">
               <Option v-for="item in labelGroupArr" :value="item.label_group_id" :key="item.label_group_id">{{ item.group_name }}</Option>
            </Select>
            <Input v-model="seek_label_name" style="width:100px;"></Input>
            <Button type="info" size="small" @click="getLabelList(label_group_id = '')">搜索</Button>
         </div>
         <div style="text-align: right;"><span style="color: #ff3300;">点击其中一项即选择</span></div>
         <div  style="max-height: 450px;overflow: auto;">
            <Table border :columns="columns9" highlight-row :data="Label" @on-current-change="selLabelFun"></Table>
         </div>

      </Modal>
      <!-- end添加标签 -->




      <!-- 请求状态 -->
      <Spin fix v-if="is_Loading">
         <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
         <div>请求中....</div>
      </Spin>
      <!-- end请求状态 -->
   </div>
</template>
<script>
    import Bus from '../../../assets/eventBus';
    export default {
      data () {
        return {
          formData: {
            customer_info_id: '',
            real_name: '',
            real_sex: 1,
            real_phone: '',
            contact_address: '',
            is_Loading: false,
            wx_company_id: '',
            wx_user_group_id: '',
            customer_type: 0,
            company_id: '',
            desc: '',
            birthday: '',
            wx_number: '',
            email: '',
            tel: '',
            wx_user_group_name: '',
            wx_company_name: ''
          },
          purposeName: '',
          cityList: [],
          cityList1: [],
          clientTypeArr: [
            {
              label: '线索',
              id: 0
            },
            {
              label: '意向客户',
              id: 1
            },
            {
              label: '订单客户',
              id: 2
            },
            {
              label: '追销客户',
              id: 3
            }
          ],
          nameArr: [],
          model1: '',
          addName: '',
          modal1: false,
          sex: 1,
          is_pond: '',
          popup1: false,
          popup13: false,
          popup2: false,
          pondName: '',
          is_Loading: false,
          wxUserGroupId: '',
          columns7: [
            {
              title: '池组名称',
              key: 'group_name'
            },
            {
              title: '池组ID',
              key: 'wx_user_group_id'
            },
            {
              title: 'Action',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.pondName = params.row.group_name;
                        this.wxUserGroupId = params.row.wx_user_group_id;
                        this.popup1 = true;
                        this.popup2 = false;
                        this.is_pond = '2';
                      }
                    }
                  }, '修改名称'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.delCustomerGroup(params.row.wx_user_group_id, params.index);
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          Label: [],
          popup14: false,
          data6: [],
          columns8: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '意向产品名称',
              key: 'product_name'
            },
            {
              title: '意向产品id',
              key: 'product_id'
            },
            {
              title: 'Action',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.is_purpose = 2;
                        this.purposeName = params.row.product_name;
                        this.product_id = params.row.product_id;
                        this.popup13 = true;
                        this.popup12 = false;
                      }
                    }
                  }, '修改名称'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.delProductFun(params.row, params.index);
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          data7: [],
          WxAuthList: null,
          WxAutId: '',
          clientData: {},
          is_name_show: false,
          is_CRM: false,
          popup12: false,
          is_purpose: 1,
          product_id: '',
          pageData: {
            count: 1,
            page: 1,
            rows_num: 1
          },
          selPurposeData: [],
          is_clue: false,
          is_ajax_clue: false,
          userData: {},
          columns9: [
            {
              title: '标签名',
              key: 'label_name'
            },
            {
              title: '标签id',
              key: 'label_id'
            },
            {
              title: '标签分组',
              key: 'group_name'
            },
            {
              title: '标签分组id',
              key: 'label_group_id'
            }
          ],
          selLabelData: null,
          labelGroupArr: [],
          label_group_id: '',
          seek_label_name: ''
        };
      },
      mounted () {
        this.getCustomerGroupList();
      },
      beforeDestroy () {
      },
      watch: {
        label_group_id: function (v) {
          if (v !== '') {
            this.seek_label_name = '';
            this.getLabelList();
          }
        }
      },
      methods: {
        // 关闭标签wdd
        lableCloseFun (k, i) {
          this.ajax.canelWxUserLabel({
            data: {
              appid: this.userData.user_info.appid,
              openid: this.userData.user_info.openid,
              label_id: k.label_id
            },
            success: () => {
              this.userData.label.splice(i, 1);
              this.$Message.success(`操作成功`);
            },
            error: (res) => {
              this.$Message.warning(`${res.meta.message}`);
            }
          });
        },
        labelGroupList () {
          this.ajax.getLabelGroup({
            data: {
            },
            success: (res) => {
              this.labelGroupArr = res.body;
              this.labelGroupArr.unshift({
                company_id: '',
                group_name: '全部',
                label_group_id: -1
              });
              this.label_group_id = -1;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.waiting(res.meta.message);
            }
          });
        },
        // 选择标签列表 中的数据
        selLabelFun (v) {
          this.selLabelData = v;
        },
        // 设置用户标签
        setWxUserLabel () {
          if (!this.selLabelData) {
            this.$Message.waiting('请选择标签');
            return;
          }
          this.is_Loading = true;
          this.ajax.setWxUserLabel({
            data: {
              appid: this.clientData.appid,
              openid: this.clientData.openid,
              label_id: this.selLabelData.label_id
            },
            success: (res) => {
              this.getWxUserInfo();
              this.is_Loading = false;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.waiting(res.meta.message);
            }
          });
        },
        // 获取微信用户基本信息
        getWxUserInfo () {
          this.ajax.getWxUserInfo({
            data: {
              appid: this.clientData.appid,
              openid: this.clientData.openid || this.clientData.customer_wx_openid
            },
            success: (res) => {
              this.userData = res.body;
              this.is_Loading = false;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.waiting(res.meta.message);
            }
          });
        },
        // 获取标签列表
        getLabelList () {
          this.ajax.getLabelList({
            data: {
              label_group_id: this.label_group_id === -1 ? '' : this.label_group_id,
              label_name: this.seek_label_name
            },
            success: (res) => {
              this.Label = res.body;
            },
            error: (res) => {
              this.$Message.waiting(res.meta.message);
            }
          });
        },
        // 姓名失去焦点延迟方法
        blurFun () {
          setTimeout(() => {
            this.is_name_show = false;
          }, 300);
        },
        ok () {
        },
        // 添加/修改 池组
        addCustomerGroup () {
          let data = {};
          if (this.is_pond === '1') {
            if (this.pondName === '') {
              this.$Message.warning('请输入池组名称');
              return;
            } else {
              data['group_name'] = this.pondName;
            }
          } else if (this.is_pond === '2') {
            data['group_name'] = this.pondName;
            data['wx_user_group_id'] = this.wxUserGroupId;
            this.popup2 = true;
          }
          this.is_Loading = true;
          this.ajax.addCustomerGroup({
            data: data,
            success: () => {
              this.getCustomerGroupList();
              this.is_Loading = false;
              this.is_pond = '';
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 获取池组列表
        getCustomerGroupList () {
          this.cityList.length = 0;
          this.ajax.getCustomerGroupList({
            data: {},
            success: (res) => {
              this.cityList = res.body;
              this.wx_user_group_id = res.body[0].wx_user_group_id;
              this.data6 = res.body;
              this.is_Loading = false;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 生日选择方法
        birthdayFun (v) {
          this.formData.birthday = v;
        },
        // 删除池组方法
        delCustomerGroup (id, i) {
          this.ajax.delCustomerGroup({
            data: {
              wx_user_group_id: id
            },
            success: () => {
              this.$Message.success('操作成功');
              this.data6.splice(i, 1);
              this.cityList.splice(i, 1);
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 获取粉丝分组
        getWxGroup () {
          this.is_Loading = true;
          this.ajax.getWxGroup({
            data: {
              appid: this.WxAuthList[0].appid
            },
            success: (res) => {
              this.is_Loading = false;
              this.cityList1 = res.body;
              this.WxAutId = res.body[0].id;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 保存
        saveFun (v) {
          let arr = this.selPurposeData.map((k) => {
            return k.product_id;
          });
          Object.assign(this.formData, {'product_id': arr});
          // if (this.is_ajax_clue) {
          Object.assign(this.formData, {'appid': this.clientData.appid});
          Object.assign(this.formData, {'openid': this.clientData.openid});
          this.ajax.setCustomerInfo({
            data: this.formData,
            success: (res) => {
              this.getWxCustomerInfo(this.clientData);
              this.$Message.success('操作成功');
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
          // } else {
          // this.ajax.crmUpdate({
          // data: this.formData,
          // success: (res) => {
          // this.$Message.success('操作成功');
          // },
          // error: (res) => {
          // this.$Message.warning(res.meta.message);
          // }
          // });
          // }
        },
        // 获取客户信息dwad
        getClientFun (res) {
          this.formData.birthday = res.birthday;
          this.formData.company_id = res.wx_company_id;
          this.formData.customer_type = res.customer_type;
          this.formData.product_name = res.product_name;
          this.formData.product_id = res.product_id;
          this.formData.desc = res.desc;
          this.formData.uid = res.uid;
          // this.nameArr.push(res.body);
          this.formData.real_name = res.real_name;
          this.formData.real_phone = res.real_phone;
          this.formData.wx_company_name = res.wx_company_name;
          this.formData.wx_number = res.wx_number;
          this.formData.email = res.email;
          this.formData.tel = res.tel;
          this.formData.contact_address = res.contact_address;
          this.formData.customer_info_id = res.customer_info_id;
          this.formData.real_sex = res.real_sex;
          this.formData.wx_user_group_id = res.wx_user_group_id;
          this.formData.wx_user_group_name = res.wx_user_group_name;
          this.selPurposeData = res.product_list;
        },
        // 模糊搜索客户名称
        nameSeekFun (v) {
          this.ajax.searchCustomerInfo({
            data: {
              real_name: this.formData.real_name
            },
            success: (res) => {
              if (res.body.length !== 0) {
                this.nameArr = res.body;
                this.is_name_show = true;
              }
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 模糊搜索返回的值
        selNameSeekFun (v) {
          this.formData.birthday = v.birthday;
          this.formData.company_id = v.wx_company_id;
          this.formData.customer_type = v.customer_type;
          this.formData.desc = v.desc;
          this.formData.uid = v.uid;
          // this.nameArr.push(res.body);
          this.formData.real_name = v.real_name;
          this.formData.real_phone = v.real_phone;
          this.formData.wx_company_name = v.wx_company_name;
          this.formData.wx_number = v.wx_number;
          this.formData.email = v.email;
          this.formData.tel = v.tel;
          this.formData.contact_address = v.contact_address;
          this.formData.customer_info_id = v.customer_info_id;
          this.formData.real_sex = v.real_sex;
          this.formData.wx_user_group_id = v.wx_user_group_id;
          this.formData.wx_user_group_name = v.wx_user_group_name;
          this.is_name_show = false;
        },
        // 添加意向产品
        addPurposeFun () {
          if (this.is_purpose === 1) {
            if (this.purposeName === '') {
              this.$Message.warning('请输入名称');
              return;
            }
          }
          this.ajax.addProduct({
            data: {
              product_name: this.purposeName,
              product_id: this.product_id
            },
            success: (res) => {
              this.is_purpose = 1;
              this.purposeName = '';
              this.pageData.page = 1;
              this.getProductList();
              this.$Message.success('操作成功');
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 获取意向产品list
        getProductList () {
          this.ajax.getProductList({
            data: {
              page: this.pageData.page
            },
            success: (res) => {
              this.data7 = res.body.data_list;
              this.pageData.count = parseInt(res.body.page_data.count);
              this.pageData.row_sum = parseInt(res.body.page_data.rows_num);
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 删除意向产品
        delProductFun (k, i) {
          this.ajax.delProduct({
            data: {
              product_id: k.product_id
            },
            success: (res) => {
              this.data7.splice(i, 1);
              this.selPurposeData = {};
              this.$Message.success('操作成功');
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 意向产品数据表 选择一项数据
        selPurposeFun (v) {
          Object.assign(this.selPurposeData, v);
        },
        // 意向产品分页方法
        pageFun (v) {
          this.pageData.page = v;
          this.getProductList();
        },
        // 获取客户信息dwadwaddwadwad
        getWxCustomerInfo (obj) {
          this.formData.birthday = '';
          this.formData.company_id = '';
          this.formData.customer_type = '';
          this.formData.product_name = '';
          this.formData.product_id = '';
          this.formData.desc = '';
          this.formData.uid = '';
          // this.nameArr.push(res.body);
          this.formData.real_name = '';
          this.formData.real_phone = '';
          this.formData.wx_company_name = '';
          this.formData.wx_number = '';
          this.formData.email = '';
          this.formData.tel = '';
          this.formData.contact_address = '';
          this.formData.customer_info_id = '';
          this.formData.real_sex = '';
          this.formData.wx_user_group_id = '';
          this.formData.wx_user_group_name = '';
          this.selPurposeData = [];
          this.ajax.getWxCustomerInfo({
            data: {
              openid: obj.openid,
              appid: obj.appid
            },
            success: (res) => {
              this.getClientFun(res.body);
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        }
      },
      destroyed (s) {
        // Bus.$off();
      },
      created () {
        this.getLabelList();
        this.labelGroupList();
        // Bus.$off();
        Bus.$on('WxAuthList', (k) => {
          this.WxAuthList = k.body.filter((k) => {
            if (k.type !== 2) {
              return k;
            }
          });
          this.getWxGroup();
        });
        Bus.$on('change', (k, o) => {
          if (o.type === 'clue') {
            this.is_clue = true;
          } else {
            this.is_clue = false;
          }
          if (o.ajax_type === 'clue') {
            this.is_ajax_clue = true;
          } else {
            this.is_ajax_clue = false;
          }
          this.is_CRM = o ? o.is_CRM : false;
          this.clientData = k;
          let obj = k.customer_info ? k.customer_info : k;
          this.getWxUserInfo();
          this.getWxCustomerInfo(obj);
        });
        this.getProductList();
      }
    };
</script>
