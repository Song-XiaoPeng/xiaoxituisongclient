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
      max-height: 400px;
      width: 100%;
      overflow-y: scroll;
   }
   .custom-group-box{
      padding: 10px;
   }
</style>
<template>
   <div class="box">
      <div class="client cl">
         <div class="portrait f-l">
            <img src="" alt="">
         </div>
         <div class="txt f-l">
            <ul>
               <li><span>微信名称：</span> <span style="color:#999">asda</span> </li>
               <li><span>来源：</span> <span style="color:#999">官网</span> </li>
               <li><span>公共平台</span> <span style="color:#999">哇大王</span> </li>
               <li><span>会话次数</span> <span style="color:#999">5次</span> </li>
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
            <FormItem label="粉丝分组：">
               <Select v-model="WxAutId" style="width:  100%;">
                  <Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.name }}</Option>
               </Select>
            </FormItem>
            <FormItem label="客户池组：">
               <Select v-model="wxUserGroupId" style="width:  44%;">
                  <Option v-for="item in cityList" :value="parseInt(item.wx_user_group_id)" :key="item.wx_user_group_id">{{ item.group_name }}</Option>
               </Select>
               <Button type="dashed" @click="popup2 = true">操作</Button>
            </FormItem>
            <FormItem label="客户生日：" >
               <DatePicker type="datetime" placeholder="选择时间" style="width:  100%;"></DatePicker>
            </FormItem>
            <FormItem label="性别：" >
               <RadioGroup v-model="sex">
                  <Radio label="1">
                     <span>男</span>
                  </Radio>
                  <Radio label="2">
                     <span>女</span>
                  </Radio>
               </RadioGroup>
            </FormItem>
            <FormItem :label="k.label" v-for="(k,i) in formData" :key="i">
               <Input v-model="k.value" style="width:  100%;"></Input>
            </FormItem>
            <FormItem label="备注">
               <Input type="textarea" style="width: 100%;"></Input>
            </FormItem>
         </Form>
      </div>
      <div class="custom-group-box">
         <Button type="dashed" class="f-r"  @click="modal1 = true" icon="plus-round">添加标签</Button>
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
    export default {
      data () {
        return {
          formData: [
            {
              label: '公司名称：',
              value: ''
            },
            {
              label: '客户姓名：',
              value: ''
            },
            {
              label: '微信号：',
              value: ''
            },
            {
              label: '邮箱：',
              value: ''
            },
            {
              label: '手机号码：',
              value: ''
            },
            {
              label: '微信号码：',
              value: ''
            }
          ],
          cityList: [],
          cityList1: [],
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
          WxAutId: ''
        };
      },
      mounted () {
        this.WxAuthList = JSON.parse(sessionStorage.getItem('WxAuthList'));
        this.getWxGroup();
      },
      beforeDestroy () {
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
              this.wxUserGroupId = res.body[0].wx_user_group_id;
              this.data6 = res.body;
              this.is_Loading = false;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
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
        groupcChangeFun (v) {
          console.log(v);
        }
      },
      created () {
        this.is_Loading = true;
        this.getCustomerGroupList();
      }
    };
</script>
