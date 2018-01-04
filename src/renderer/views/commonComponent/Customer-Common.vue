<style scoped lang="less">
 .box{
    overflow: auto;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
 }
   .client{
      border-bottom: 1px #eaeaea solid;
      position: relative;
      height: 110px;
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
 .form-btn{
    position: absolute;
    bottom: 10px;
    right: 10px;
 }
   .form-box{
      padding: 10px;
      border-bottom: 1px #eaeaea solid;
      width: 100%;
      overflow: auto;
      top: 167px;
      left: 0px;
      /* margin-bottom: 45px; */
      /* height: 57%; */
      right: -29px;
      /* bottom: 40px; */
      transition: all .5s;
      opacity: 1;
      height: 510px;
   }
 .is-label-btn{
    position: absolute;
    bottom: 5px;
    text-align: center;
    width: 100%;
 }
   .custom-group-box{
      padding: 10px;
      border-bottom: 1px #eaeaea solid;
      width: 98%;
      overflow-y: scroll;
      top: 167px;
      left: 0px;
      position: absolute;
      /* margin-bottom: 45px; */
      /* height: 57%; */
      right: -29px;
      bottom: 40px;
      transition: all .5s;
      opacity: 0;
      display: none;
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
   .label-box{
      width: 100%;
      overflow: auto;
      .label-list{
         position: relative;
         padding: 5px;
         border-bottom: 1px #eaeaea dashed;
         p{
            color: #666666;
            span{
               display: inline-block;
               width: 70px;
               text-align: right;
            }
         }
         .label-list-edit-btn{
            position: absolute;
            top: 5px;
            right: 5px;
            color: #666;
            cursor: pointer;
         }
         .label-list-edit-btn:hover{
            color: #2db7f5;
         }
      }
   }
 /*@media all and (min-height:800px) and (max-height:1000px){*/
    /*.form-box{*/
       /*height: 220px*/
    /*}*/
 /*}*/
 /*@media all and (min-height:1000px) and (max-height:1200px){*/
    /*.form-box{*/
       /*height: 450px*/
    /*}*/
 /*}*/
 /*@media all and (min-height:1201px){*/
    /*.form-box{*/
       /*height: 550px*/
    /*}*/
 /*}*/
</style>
<template>
   <div class="box">
      <div class="client cl">
         <div class="portrait f-l">
            <img :src="clientData.customer_wx_portrait" alt="">
         </div>
         <div class="txt f-l">
            <ul>
               <li><span>微信名称：</span> <span style="color:#999">{{clientData.customer_wx_nickname}}</span> </li>
               <li><span>来源：</span> <span style="color:#999">{{clientData.app_name}}</span> </li>
               <!--<li><span>公共平台</span> <span style="color:#999">哇大王</span> </li>-->
               <li><span>来访次数</span> <span style="color:#999">{{clientData.session_frequency}}</span> </li>
            </ul>
         </div>
         <!--<div class="txt-bot">-->
           <!--<span>首次沟通：</span>-->
           <!--<span>2017-03-05</span>-->
           <!--<span style="color: #2db7f5">张三</span>-->
           <!--<span style="margin-left: 10px">最近沟通：</span>-->
           <!--<span >2017-03-05</span>-->
           <!--<span style="color: #2db7f5">张三</span>-->
         <!--</div>-->
      </div>
      <div class="form-box" >
         <Form id="client-form" label-position="right" :label-width="80" style="border-bottom: 0">
            <!--<FormItem label="粉丝分组：">-->
               <!--<Select v-model="WxAutId" style="width:  100%;">-->
                  <!--<Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.name }}</Option>-->
               <!--</Select>-->
            <!--</FormItem>-->
            <FormItem style="border-bottom: 0px;" label="客户类型：" >
               <Select v-model="formData.customer_type" style="width:  44%;">
                  <Option v-for="item in clientTypeArr" :value="item.id" :key="item.id">{{ item.label }}</Option>
               </Select>
            </FormItem>
            <!--<FormItem style="border-bottom: 0px;" label="客户池组：">-->
               <!--<Select v-model="formData.wx_user_group_id" style="width:  44%;">-->
                  <!--<Option v-for="item in cityList" :value="parseInt(item.wx_user_group_id)" :key="item.wx_user_group_id">{{ item.group_name }}</Option>-->
               <!--</Select>-->
               <!--<Button type="dashed" @click="popup2 = true">操作</Button>-->
            <!--</FormItem>-->
            <FormItem label="意向产品：">
               <span v-for="(k, i) in selPurposeData" :key="i">{{k.product_name}},</span>
               <Button type="dashed" @click="popup12 = true">操作</Button>
            </FormItem>
            <FormItem style="border-bottom: 0px;" label="客户生日：" >
               <DatePicker type="date" v-model="formData.birthday" placeholder="选择时间" style="width:  100%;" @on-change="birthdayFun"></DatePicker>
            </FormItem>
            <FormItem style="border-bottom: 0px;" label="性别：" >
               <RadioGroup v-model="formData.real_sex">
                  <Radio label="1">
                     <span>男</span>
                  </Radio>
                  <Radio label="2">
                     <span>女</span>
                  </Radio>
               </RadioGroup>
            </FormItem>
            <FormItem style="border-bottom: 0px;"  label="姓名：">
               <Input v-model="formData.real_name" style="width:  100%;" @on-change="nameSeekFun" @on-blur="blurFun"></Input>
               <ul class="name-box" v-if="is_name_show">
                  <li v-for="(item, i) in nameArr" @click="selNameSeekFun(item)">{{ item.real_name }}</li>
               </ul>
            </FormItem>
            <FormItem style="border-bottom: 0px;"  label="手机：">
               <Input v-model="formData.real_phone" style="width:  100%;"></Input>
            </FormItem>
            <FormItem style="border-bottom: 0px;"  label="联系地址：">
               <Input v-model="formData.contact_address" style="width:  100%;"></Input>
            </FormItem>
            <FormItem style="border-bottom: 0px;"  label="微信号">
               <Input v-model="formData.wx_number" style="width:  100%;"></Input>
            </FormItem>
            <FormItem style="border-bottom: 0px;"  label="邮箱">
               <Input v-model="formData.email" style="width:  100%;"></Input>
            </FormItem>
            <FormItem style="border-bottom: 0px;"  label="客户电话">
               <Input v-model="formData.tel" style="width:  100%;"></Input>
            </FormItem>
            <FormItem style="border-bottom: 0px;" label="备注">
               <Input type="textarea" v-model="formData.desc" style="width: 100%;"></Input>
            </FormItem>
            <FormItem style="border-bottom: 0px;" label="">
               <Button type="info" @click="saveFun" icon="plus-round">保存</Button>
            </FormItem>
         </Form>

      </div>
      <div class="cl" >
         <div class="" style="text-align: right;padding: 5px">
            <Button type="info" size="small" @click="popup14 = true">添加标签</Button>
         </div>
         <div class="label-box">
            <Tag v-for="(k, i) in userData.label" color="green" :key="i">{{k.label_name}}</Tag>
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



      <!-- 客户池列表弹窗 -->
      <Modal v-model="popup2" title="选项名称" :styles="{'z-index': 100}">
         <div style="padding: 5px"><Button type="primary" @click="popup1 = true,is_pond = '1', popup2 = false">添加池组</Button></div>
         <div>
            <Table border :columns="columns7" :data="data6"></Table>
         </div>
      </Modal>
      <!-- end客户池列表弹窗 -->

      <!-- 意向产品 12123-->
      <Modal v-model="popup12" title="意向产品" :styles="{'z-index': 100}" width="800">
         <div style="padding: 5px"><Button type="primary" @click="popup13 = true, popup12 = false">添加意向产品</Button><span style="color: #ff3300; margin-left: 10px">点击其中一项即选择</span></div>
         <div>
            <Table highlight-row border :columns="columns8" :data="data7" @on-selection-change="selPurposeFun"></Table>
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
      <Modal v-model="popup14" title="标签" @on-ok="setWxUserLabel">
         <div><span style="color: #ff3300">点击其中一项即选择</span></div>
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
      <!-- end请求状态  21312-->
   </div>
</template>
<script>
    import Bus from '../../assets/eventBus';
    export default {
      data () {
        return {
          popup12: false,
          selPurposeData: [],
          popup13: false,
          popup14: false,
          data7: [],
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
          purposeName: '',
          pageData: {
            count: 1,
            page: 1,
            rows_num: 1
          },
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
            product_id: '',
            email: '',
            tel: '',
            wx_user_group_name: '',
            wx_company_name: ''
          },
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
          data6: [],
          WxAuthList: null,
          WxAutId: '',
          clientData: {},
          is_name_show: false,
          is_CRM: false,
          Label: [],
          tabelName: '',
          selLabelData: null,
          userData: [],
          is_client_btn_txt: '标签'
        };
      },
      mounted () {
        this.getCustomerGroupList();
      },
      beforeDestroy () {
      },
      watch: {
      },
      methods: {
        // 客户信息显示
        labelShowFun () {
          let div = this.$refs.client;
          let label = this.$refs.label;
          if (this.is_client_btn_txt === '标签') {
            div.style.opacity = 0;
            setTimeout(() => {
              div.style.display = 'none';
              this.is_client_btn_txt = '客户信息';
              label.style.display = 'block';
              label.style.opacity = 1;
            }, 500);
          } else {
            label.style.opacity = 0;
            setTimeout(() => {
              label.style.display = 'none';
              div.style.display = 'block';
              div.style.opacity = 1;
              this.is_client_btn_txt = '标签';
            }, 500);
          }
        },
        // 姓名失去焦点延迟方法
        blurFun () {
          setTimeout(() => {
            this.is_name_show = false;
          }, 300);
        },
        // 选择标签列表 中的数据
        selLabelFun (v) {
          this.selLabelData = v;
        },
        // 获取微信用户基本信息
        getWxUserInfo () {
          this.ajax.getWxUserInfo({
            data: {
              appid: this.clientData.appid,
              openid: this.clientData.customer_wx_openid
            },
            success: (res) => {
              this.userData = res.body;
              this.is_Loading = false;
              Bus.$emit('userEV', res.body);
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.waiting(res.meta.message);
            }
          });
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
              openid: this.clientData.customer_wx_openid,
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
        // 获取标签列表
        getLabelList () {
          this.ajax.getLabelList({
            data: {},
            success: (res) => {
              this.Label = res.body;
            },
            error: (res) => {
              this.$Message.waiting(res.meta.message);
            }
          });
        },
        // 添加标签
        addLabelFun () {},
        ok () {
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
        // 客户池分组改变方法
        saveFun (v) {
          let arr = this.selPurposeData.map((k) => {
            return k.product_id;
          });
          Object.assign(this.formData, {'appid': this.clientData.appid});
          Object.assign(this.formData, {'product_id': arr});
          Object.assign(this.formData, {'openid': this.clientData.customer_wx_openid});
          this.ajax.setCustomerInfo({
            data: this.formData,
            success: (res) => {
              if (res.body.customer_info_id && res.body.customer_info_id !== null) {
                Bus.$emit('is_remind', {'remind': true});
              }

              this.$Message.success('操作成功');
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 获取客户信息
        getClientFun () {
          this.is_Loading = true;
          this.ajax.getWxCustomerInfo({
            data: {
              appid: this.clientData.appid,
              openid: this.clientData.customer_wx_openid
            },
            success: (res) => {
              this.formData.birthday = res.body.birthday;
              this.formData.company_id = res.body.wx_company_id;
              this.formData.customer_type = res.body.customer_type;
              this.formData.desc = res.body.desc;
              this.formData.uid = res.body.uid;
              // this.nameArr.push(res.body);
              this.formData.real_name = res.body.real_name;
              this.formData.real_phone = res.body.real_phone;
              this.formData.wx_company_name = res.body.wx_company_name;
              this.formData.wx_number = res.body.wx_number;
              this.formData.product_id = res.body.product_id;
              this.formData.email = res.body.email;
              this.formData.tel = res.body.tel;
              this.formData.contact_address = res.body.contact_address;
              this.formData.customer_info_id = res.body.customer_info_id;
              this.formData.real_sex = res.body.real_sex;
              this.formData.wx_user_group_id = res.body.wx_user_group_id;
              this.formData.wx_user_group_name = res.body.wx_user_group_name;
              this.is_Loading = false;
              if (res.body.customer_info_id && res.body.customer_info_id !== null) {
                Bus.$emit('is_remind', res.body, {'remind': true}, this.userData);
              }
            },
            error: (res) => {
              this.is_Loading = false;
              // this.$Message.warning(res.meta.message);
            }
          });
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
        }
      },
      destroyed (s) {
        // Bus.$off();
      },
      created () {
        this.getProductList();
        this.getLabelList();
        Bus.$on('WxAuthList', (k) => {
          this.WxAuthList = k.body;
          this.getWxGroup();
        });
        Bus.$on('change', (k, o, u) => {
          this.is_CRM = o ? o.is_CRM : false;
          this.clientData = k;
          if (u) {
            this.userData = u;
          } else {
            this.getWxUserInfo();
          }
          this.getClientFun();
          this.formData.customer_info_id = '';
          this.formData.real_name = '';
          this.formData.real_sex = '';
          this.formData.real_phone = '';
          this.formData.contact_address = '';
          this.formData.wx_company_id = '';
          this.formData.wx_user_group_id = '';
          this.formData.customer_type = '';
          this.formData.company_id = '';
          this.formData.desc = '';
          this.formData.wx_number = '';
          this.formData.product_id = '';
          this.formData.email = '';
          this.formData.tel = '';
          this.formData.wx_user_group_name = '';
          this.formData.wx_company_name = '';
        });
      }
    };
</script>
