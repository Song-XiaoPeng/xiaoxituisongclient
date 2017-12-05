<style scoped lang="less">
    .top-box{
        padding: 10px;
    }
</style>
<template>
  <div>
      <div class="top-box">
          <span>当前公共号：</span>
          <Select v-model="appid" style="width:200px" @on-change="selAppidFun">
              <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
          </Select>
          <Button class="f-r" type="primary" @click="modal1 = true">新增</Button>
      </div>
      <div>
          <Table border :columns="columns7" :data="data6"></Table>
      </div>
      <div style="margin-top: 10px;text-align: center">
          <Page :total="pageData1.count" :page-size="pageData1.rows_num" @on-change="pageFun1"></Page>
      </div>


      <!-- 添加弹窗 -->
      <Modal v-model="modal1" title="添加带参二维码" width="800" @on-ok="createChannelFun">
          <Form  label-position="right" :label-width="100">
              <FormItem label="渠道名称">
                  <Input v-model="name" placeholder="请输入"></Input>
              </FormItem>
              <FormItem label="渠道分组">
                  <Select  placeholder="Select your city" v-model="qrcode_group_id" style="width: 91%">
                      <Option v-for="k in data2" :value="k.qrcode_group_id" :key="k.value">{{k.qrcode_group_name}}</Option>
                  </Select>
                  <Button type="ghost" @click="modal1 = false,popup3 = true">操作</Button>
              </FormItem>
              <FormItem label="自动标签">
                  <Tag closable color="green" v-for="(k, i) in tabArr" :key="k" @on-close="handleClose2(i)">{{k}}</Tag>
                  <Button type="ghost" @click="popup6 = true, modal1 = false">添加</Button>
              </FormItem>
              <FormItem label="客服分组">
                  <Select  placeholder="Select your city" v-model="customer_service_group_id " style="width: 91%">
                      <Option v-for="k in userGroupData" :value="k.user_group_id" :key="k.value">{{k.user_group_name}}</Option>
                  </Select>
                  <!--<span>{{selRowData.user_name}}</span>-->
                  <!--<Button type="ghost" @click="popup7 = true, modal1 = false">添加</Button>-->
              </FormItem>
              <FormItem label="专属客服">
                  <span>{{selRowData.user_name}}</span>
                  <Button type="ghost" @click="popup7 = true, modal1 = false">添加</Button>
              </FormItem>
              <FormItem label="有效天数">
                  <Input placeholder="请输入" v-model="dey"></Input>
              </FormItem>
              <!--<FormItem label="扫码关注回复">-->
                  <!--<RadioGroup v-model="animal">-->
                      <!--<Radio label="不回复"></Radio>-->
                      <!--<Radio label="回复"></Radio>-->
                  <!--</RadioGroup>-->
              <!--</FormItem>-->
          </Form>
          <!--<Table highlight-row ref="currentRowTable" :columns="columns3" :data="data1"></Table>-->
      </Modal>
      <!-- end添加弹窗 -->


      <!-- 创建分组弹窗 -->
      <Modal v-model="popup3" title="添加带参二维码" @on-cancel="popup3 = false, modal1 = true" @on-ok="popup3 = false, modal1 = true">
          <div>
              <Button type="primary" @click="popup3 = false, popup4 = true">添加渠道组</Button>
          </div>
          <div  style="margin-top: 10px">
              <Table  :columns="columns4" :data="data2"></Table>
          </div>
      </Modal>
      <!-- end创建分组弹窗 -->



      <!-- 创建分组弹窗 -->
      <Modal v-model="popup4" title="渠道分组" @on-cancel="popup4 = false, popup3 = true" @on-ok="createChannelNameFun">
          <Input v-model="channelName" placeholder="请输入名称" ></Input>
      </Modal>
      <!-- end创建分组弹窗 -->


      <!-- 修改分组弹窗 -->
      <Modal v-model="popup5" title="渠道分组" @on-cancel="popup5 = false, popup3 = true" @on-ok="editQrcodeGroupName">
          <Input v-model="channelName" placeholder="请输入名称" ></Input>
      </Modal>
      <!-- end修改分组弹窗 -->


      <!-- 添加标签弹窗 -->
      <Modal v-model="popup6" title="自动标签" @on-cancel="popup6 = false, modal1 = true" @on-ok="addTab">
          <Input v-model="tabName" placeholder="请输入名称" ></Input>
      </Modal>
      <!-- end添加标签弹窗 -->


      <!-- 客服弹窗 -->
      <Modal v-model="popup7"  title="自动标签"  @on-cancel="popup7 = false, modal1 = true" @on-ok="popup7 = false, modal1 = true">
          <!--<div class="">-->
              <!--<span>当前公共号：</span>-->
              <!--<Select v-model="appid" style="width:200px" @on-change="selAppidFun">-->
                  <!--<Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>-->
              <!--</Select>-->
              <!--<span style="color: #ff3300">点击列表一项即选择</span>-->
          <!--</div>-->
          <div class=""  style="padding-top: 10px">
              <Table highlight-row :columns="columns5" :data="data3" @on-current-change="selTabRowFun"></Table>
          </div>
          <div class="" style="padding-top: 10px;text-align: center">
              <Page :total="pageData.count" :page-size="pageData.rows_num" @on-change="pageFun"></Page>
          </div>
      </Modal>
      <!-- end客服弹窗 -->


      <!-- 客服弹窗 -->
      <Modal v-model="popup8" title="二维码" >
          <div style="height: 100%;width: 100%;text-align: center">
              <img :src="codeUrl" alt="">
          </div>
      </Modal>
      <!-- end客服弹窗 -->
      

      <!-- 加载状态 -->
      <Spin fix v-if="is_Loading">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>请求中...</div>
      </Spin>
      <!-- end加载状态 -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        cityList: [],
        model1: '',
        popup8: false,
        codeUrl: '',
        columns7: [
          {
            title: '二维码名称',
            key: 'activity_name'
          },
          {
            title: '渠道名',
            key: 'qrcode_group_name'
          },
          {
            title: '创建人姓名',
            key: 'create_user_name'
          },
          {
            title: '二维码创建时间',
            key: 'create_time'
          },
          {
            title: '二维码失效时间',
            key: 'invalid_time'
          },
          {
            title: '二维码',
            align: 'canter',
            render: (h, p) => {
              return h('img', {
                attrs: {
                  src: p.row.qrcode_url
                },
                style: {
                  width: '60px',
                  height: '60px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.codeUrl = p.row.qrcode_url;
                    this.popup8 = true;
                  }
                }
              });
            }
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delQrcod(params.row, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data6: [],
        modal1: false,
        animal: '不回复',
        columns4: [
          {
            title: '组名',
            key: 'qrcode_group_name'
          },
          {
            title: '操作',
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
                      this.channelName = params.row.qrcode_group_name;
                      this.qrcode_group_id = params.row.qrcode_group_id;
                      this.popup4 = false;
                      this.popup5 = true;
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delQrcodeGroupFun(params.row, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        columns5: [
          {
            title: '客服名',
            key: 'name'
          },
          {
            title: '图像',
            align: 'canter',
            render: (h, p) => {
              return h('img', {
                attrs: {
                  src: p.row.avatar_url
                },
                style: {
                  width: '60px',
                  height: '60px'
                }
              });
            }
          },
          {
            title: '账号',
            key: 'phone_no'
          }
        ],
        data2: [],
        data3: [],
        is_Loading: false,
        popup3: false,
        popup4: false,
        popup6: false,
        channelName: '',
        group_type: '1',
        popup5: false,
        popup7: false,
        qrcode_group_id: '',
        tabArr: [],
        tabName: '',
        userGroupData: {},
        sectionId: '',
        listData: [],
        pageData: {
          page: 1,
          count: 1,
          rows_num: 1
        },
        pageData1: {
          page: 1,
          count: 1,
          rows_num: 1
        },
        selRowData: {},
        appid: '',
        appData: '',
        name: '',
        dey: '',
        customer_service_group_id: '',
        is_service: false
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      // 创建渠道分组
      createChannelNameFun () {
        if (this.channelName === '') {
          this.$Message.warning('名称不能为空');
          this.popup3 = true;
          this.popup4 = false;
          return;
        }
        this.ajax.addQrcodeGroup({
          data: {
            group_type: this.group_type,
            qrcode_group_name: this.channelName
          },
          success: (res) => {
            this.geteChannelGroupListFun();
            this.popup3 = true;
            this.popup4 = false;
          },
          error: (res) => {
            this.$Message.warning(res);
          }
        });
      },
      // 创建二维码
      createChannelFun () {
        this.ajax.createQrcode({
          data: {
            type: '1',
            appid: this.appid,
            activity_name: this.name,
            qrcode_group_id: this.qrcode_group_id,
            invalid_day: this.dey,
            label: this.tabArr,
            customer_service_id: this.selRowData.customer_service_id,
            customer_service_group_id: this.customer_service_group_id
          },
          success: (res) => {
            this.pageData1.page = 1;
            this.getQrcodList();
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取渠道分组列表
      geteChannelGroupListFun () {
        this.ajax.getQrcodeGroupList({
          data: {
            group_type: this.group_type
          },
          success: (res) => {
            this.data2 = res.body;
            this.qrcode_group_id = res.body[0].qrcode_group_id;
          },
          error: (res) => {
            this.$Message.warning(res);
          }
        });
      },
      // 修改渠道分组名
      editQrcodeGroupName (id) {
        this.ajax.editQrcodeGroupName({
          data: {
            qrcode_group_id: this.qrcode_group_id,
            qrcode_group_name: this.channelName
          },
          success: (res) => {
            this.geteChannelGroupListFun();
            this.popup3 = true;
            this.popup5 = false;
          },
          error: (res) => {
            this.$Message.warning(res);
          }
        });
      },
      // 删除渠道分组
      delQrcodeGroupFun (k, i) {
        this.ajax.delQrcodeGroup({
          data: {
            qrcode_group_id: k.qrcode_group_id
          },
          success: () => {
            this.$Message.success('操作成功');
            this.data2.splice(i, 1);
          },
          error: (res) => {
            this.$Message.warning(res);
          }
        });
      },
      // 添加在动标签
      addTab () {
        if (this.tabName === '') {
          this.$Message.warning('标签名不能为空');
          this.modal1 = true;
          return;
        }
        this.tabArr.push(this.tabName);
        this.tabName = '';
        this.modal1 = true;
      },
      // 删除自定义标签
      handleClose2 (i) {
        this.tabArr.splice(i, 1);
      },
      // 获取部门列表
      getSection () {
        this.is_Loading = true;
        this.ajax.getSection({
          data: {},
          success: (res) => {
            this.is_Loading = false;
            // this.sectionId = res.body[0].user_group_id;
            this.userGroupData = res.body;
            this.sectionId = res.body[0].user_group_id;
            // this.getUserList();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取客服列表
      getUserList () {
        this.data3 = [];
        this.is_Loading = true;
        this.ajax.getCustomerServiceList({
          data: {
            appid: this.appid,
            page: this.pageData.page
          },
          success: (res) => {
            this.data3 = res.body.data_list;
            this.pageData.count = parseInt(res.body.page_data.count);
            this.pageData.rows_num = parseInt(res.body.page_data.rows_num);
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 根据部门 获取客服列表
      selUserFun () {
        this.pageData.page = 1;
        // this.getUserList();
      },
      // 分页
      pageFun (v) {
        this.pageData.page = v;
        this.getUserList();
      },
      // 分页1
      pageFun1 (v) {
        this.pageData1.page = v;
        this.getQrcodList();
      },
      // 客服表格选择单行数据
      selTabRowFun (v) {
        Object.assign(this.selRowData, v);
      },
      selAppidFun () {
        this.getUserList();
      },
      // 获取二维码列表
      getQrcodList (v) {
        this.ajax.getQrcodList({
          data: {
            page: this.pageData1.page,
            type: '1'
          },
          success: (res) => {
            this.data6 = res.body.data_list;
            this.pageData1.count = parseInt(res.body.page_data.count);
            this.pageData1.rows_num = parseInt(res.body.page_data.rows_num);
            console.log(res);
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 删除二维码
      delQrcod (k, i) {
        this.is_Loading = true;
        this.ajax.delQrcod({
          data: {
            qrcode_id: k.qrcode_id
          },
          success: (res) => {
            this.data6.splice(i, 1);
            this.is_Loading = false;
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      }
    },
    watch: {
      appid: function (v) {
        console.log(v);
      },
      data3: {
        handler: (val, oldVal) => {
        },
        // 深度观察
        deep: true
      }
    },
    created () {
      this.geteChannelGroupListFun();
      this.getSection();
      this.getQrcodList();
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body;
          this.appid = res.body[0].appid;
          this.appData = res.body[0];
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
