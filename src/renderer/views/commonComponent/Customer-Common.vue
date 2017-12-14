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
      padding: 5px;
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
 @media all and (min-height:800px) and (max-height:1000px){
    .form-box{
       height: 420px
    }
 }
 @media all and (min-height:1000px) and (max-height:1200px){
    .form-box{
       height: 650px
    }
 }
 @media all and (min-height:1201px){
    .form-box{
       height: 750px
    }
 }
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
         <div class="txt-bot">
           <span>首次沟通：</span>
           <span>2017-03-05</span>
           <span style="color: #2db7f5">张三</span>
           <span style="margin-left: 10px">最近沟通：</span>
           <span >2017-03-05</span>
           <span style="color: #2db7f5">张三</span>
         </div>
      </div>
      <div class="form-box">
         <Form label-position="right" :label-width="80">
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
            <FormItem label="客户池组：">
               <Select v-model="formData.wx_user_group_id" style="width:  44%;">
                  <Option v-for="item in cityList" :value="parseInt(item.wx_user_group_id)" :key="item.wx_user_group_id">{{ item.group_name }}</Option>
               </Select>
               <Button type="dashed" @click="popup2 = true">操作</Button>
            </FormItem>
            <FormItem label="客户生日：" >
               <DatePicker type="date" v-model="formData.birthday" placeholder="选择时间" style="width:  100%;" @on-change="birthdayFun"></DatePicker>
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
            <FormItem  label="姓名：">
               <Input v-model="formData.real_name" style="width:  100%;" @on-change="nameSeekFun" @on-blur="is_name_show = false"></Input>
               <ul class="name-box" v-if="is_name_show">
                  <li v-for="(item, i) in nameArr" @click="selNameSeekFun(item)">{{ item.real_name }}</li>
               </ul>
            </FormItem>
            <FormItem  label="手机：">
               <Input v-model="formData.real_phone" style="width:  100%;"></Input>
            </FormItem>
            <FormItem  label="联系地址：">
               <Input v-model="formData.contact_address" style="width:  100%;"></Input>
            </FormItem>
            <FormItem  label="微信号">
               <Input v-model="formData.wx_number" style="width:  100%;"></Input>
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
         </Form>
      </div>
      <div class="custom-group-box cl">
         <Button type="info" class="f-r"  @click="saveFun" icon="plus-round">保存</Button>
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


      <!-- 请求状态 -->
      <Spin fix v-if="is_Loading">
         <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
         <div>请求中....</div>
      </Spin>
      <!-- end请求状态 -->
   </div>
</template>
<script>
    import Bus from '../../assets/eventBus';
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
          is_CRM: false
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
        // 客户池分组改变方法
        saveFun (v) {
          Object.assign(this.formData, {'appid': this.clientData.appid});
          Object.assign(this.formData, {'openid': this.clientData.customer_wx_openid});
          this.ajax.setCustomerInfo({
            data: this.formData,
            success: (res) => {
              if (res.body.customer_info_id && res.body.customer_info_id !== null) {
                Bus.$emit('is_remind', {'remind': true});
              }
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
              this.formData.email = res.body.email;
              this.formData.tel = res.body.tel;
              this.formData.contact_address = res.body.contact_address;
              this.formData.customer_info_id = res.body.customer_info_id;
              this.formData.real_sex = res.body.real_sex;
              this.formData.wx_user_group_id = res.body.wx_user_group_id;
              this.formData.wx_user_group_name = res.body.wx_user_group_name;
              this.is_Loading = false;
              if (res.body.customer_info_id && res.body.customer_info_id !== null) {
                Bus.$emit('is_remind', res.body, {'remind': true});
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
        Bus.$on('WxAuthList', (k) => {
          this.WxAuthList = k.body;
          this.getWxGroup();
        });
        Bus.$on('change', (k, o) => {
          this.is_CRM = o ? o.is_CRM : false;
          this.clientData = k;
          this.getClientFun();
        });
      }
    };
</script>
