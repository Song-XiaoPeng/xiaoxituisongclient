<style scoped lang="less">
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
    .page-centent{
        padding: 10px;
        text-align: center;
    }
</style>
<template>
    <div id="index">
        <Row>
            <Col span="24">
            <Card>
                <p slot="title">
                    员工管理
                </p>
                <p slot="extra">
                    <Button type="ghost" @click="is_sectionPupop = true">添加部门</Button>
                    <Button type="primary" @click="popupBol = true"><Icon type="plus"></Icon> 添加人员</Button>
                </p>
                <div style="padding: 10px">
                    <span>
                        当前部门：
                    </span>
                    <Select v-model="sectionId" style="width: 200px" @on-change="sectionFun">
                        <Option v-for="(item, key) in userGroupData" :key="key" :value="item.user_group_id">{{ item.user_group_name }}</Option>
                    </Select>
                    <Button type="text" @click="delFun">删除当前部门</Button>

                </div>
                <table class="table-copy">
                    <thead>
                    <tr>
                        <th>姓名</th>
                        <th>图像</th>
                        <th>账号</th>
                        <th>所属部门</th>
                        <th>员工状态</th>
                        <th>头像</th>
                        <th>是否客服</th>
                        <th>设置客服</th>
                        <th>解除硬件绑定</th>
                        <th>在职/离职 操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(k, index) in listData" :key="index">
                        <td style="padding: 4px;">
                            {{k.user_name}}
                        </td>
                        <td style="padding: 4px;">
                            <img :src="k.avatar_url" alt="" style="height: 50px;width: 50px">
                        </td>
                        <td style="padding: 4px;">
                            {{k.phone_no}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.user_group_name}}
                        </td>
                        <td>
                            {{k.user_state_name}}
                        </td>
                        <td>
                            <Upload  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                                    name="file" :data="{resources_type: 2}"
                                    :show-upload-list="false"
                                    :headers="{token: userInfo.token}"
                                    :on-success="upImgFun">
                                <Button type="ghost" size="small" icon="ios-cloud-upload-outline" @click="selEdit = k">上传图像</Button>
                            </Upload>
                        </td>
                        <td>
                            <span v-if="k.customer_service_list == null">否</span>
                            <Button v-else type="ghost" size="small" @click="popup8 = true,serviceArr = k.customer_service_list, changeUserData = k">操作</Button>
                        </td>
                        <td>
                            <Button type="ghost" size="small" @click="is_sectionPupop1 = true, selUser = k">设为客服</Button>
                            <Button type="ghost" size="small" @click="is_sectionPupop2 = true, selEdit = k">调部门</Button>
                        </td>
                        <td>
                            <span v-if="k.client_network_mac == null">未绑定</span>
                            <Button v-else type="ghost" size="small" @click="untieFun(k)">解除</Button>
                        </td>
                        <td>
                            <i-switch v-model="k.is_switch" @on-change="switchFun(k)">
                                <span slot="1">在职</span>
                                <span slot="2">离职</span>
                            </i-switch>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="page-centent">
                    <Page :total="pageCount" :page-size="pageSize" @on-change="pageFun"></Page>
                </div>
            </Card>
            </Col>
        </Row>

        <Modal v-model="popupBol" title="添加员工" @on-ok="confirmFun">
            <Form :model="formItem" :label-width="120">
                <Form-item label="选择部门">
                    <Select v-model="formItem.roleSel" >
                        <Option v-for="(item, key) in userGroupData" :key="key" :value="item.user_group_id">{{ item.user_group_name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="名称">
                    <Input v-model="formItem.name" placeholder="请输入"></Input>
                </Form-item>
                <!-- <Form-item label="是否首页展示">
                    <i-switch v-model="isShow">
                        <span slot="1">是</span>
                        <span slot="-1">否</span>
                    </i-switch>
                </Form-item> -->
                <Form-item label="手机号">
                    <Input v-model="formItem.tel" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="初始密码">
                    <Input type="password" v-model="formItem.password" placeholder="请输入"></Input>
                </Form-item>
            </Form>
        </Modal>

        <!-- 添加部门弹窗 -->
        <Modal v-model="is_sectionPupop" title="添加部门" :width="500" @on-ok="setServer()">
            <Form  :label-width="120">
                <Form-item label="部门名称：">
                    <Input v-model="section" placeholder="请输入名称"></Input>
                </Form-item>
            </Form>
        </Modal>
        <!-- end添加部门弹窗 -->



        <!-- 改部门弹窗 -->
        <Modal v-model="is_sectionPupop2" title="调部门" :width="500" @on-ok="editBranch">
            <Form  :label-width="120">
                <Form-item label="选择部门">
                    <Select v-model="edit_branch_id" >
                        <Option v-for="(item, key) in userGroupData" :key="key" :value="item.user_group_id">{{ item.user_group_name }}</Option>
                    </Select>
                </Form-item>
            </Form>
        </Modal>
        <!-- end改部门弹窗 -->


        <!-- 改部门弹窗 -->
        <Modal v-model="popup8" title="客服" :width="800" @on-ok="editBranch">
            <table class="table-copy">
                <thead>
                <tr>
                    <th>客服名称</th>
                    <th>公共号/小程序名称</th>
                    <th>客服状态</th>
                    <th>权限管理</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(k, index) in serviceArr" :key="index">
                    <td style="padding: 4px;">
                        {{k.name}}
                    </td>
                    <td style="padding: 4px;">
                        {{k.app_name}}
                    </td>
                    <td>
                        {{k.state === -1 ? '离线' : k.state === 1 ? '在线' : k.state === 2 ? '离开' : '未知'}}
                    </td>
                    <td>
                        <Button type="ghost" @click="changePermission(k)">修改权限</Button>
                    </td>
                    <td>
                        <Button type="ghost" @click="popup9 = true, selUserData = k, popup8 = false,serviceName = k.name">修改客服名</Button>
                    </td>
                </tr>
                </tbody>
            </table>
        </Modal>
        <!-- end改部门弹窗 -->


        <!-- 修改权限弹窗 -->
        <Modal v-model="popup10" title="选择公共号" :width="500" @on-ok="setServer">
            <Form  :label-width="120">
                <Form-item label="客服名称：">
                    <Input v-model="selUser.user_name" :placeholder="selUser.user_name"></Input>
                </Form-item>
                <Form-item label="当前公共号：">
                    <Select v-model="appid">
                        <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
                    </Select>
                </Form-item>
            </Form>
        </Modal>
        <!-- end修改权限弹窗 -->



        <!-- 添加部门弹窗 -->
        <Modal v-model="is_sectionPupop1" title="选择公共号" :width="500" @on-ok="setServer">
            <Form  :label-width="120">
                <Form-item label="客服名称：">
                    <Input v-model="selUser.user_name" :placeholder="selUser.user_name"></Input>
                </Form-item>
                <Form-item label="当前公共号：">
                    <Select v-model="appid">
                        <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
                    </Select>
                </Form-item>
            </Form>
        </Modal>
        <!-- end添加部门弹窗 -->


        <!-- 修改客服名称弹窗 -->
        <Modal v-model="popup9" title="修改名称" :width="500" @on-ok="editVerviceName">
            <Form  :label-width="120">
                <Form-item label="名称：">
                    <Input v-model="serviceName" placeholder="请输入名称"></Input>
                </Form-item>
            </Form>
        </Modal>
        <!-- end修改客服名称弹窗 -->


        <!-- 权限管理 -->
        <Modal v-model="popup11" title="权限管理" :width="500" @on-ok="jurisdictionFun" @on-cancel="cancelJurisdictionFun">
            <Tree :data="menuArr" show-checkbox @on-check-change="jurisdiction"></Tree>
        </Modal>
        <!-- end权限管理 -->


        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>请求中....</div>
        </Spin>
    </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    data () {
      return {
        single: null,
        popupBol: false,
        isNewUserGroup: false,
        is_sectionPupop: false,
        section: '',
        formInline: null,
        formItem: {
          name: '',
          tel: '',
          roleSel: '',
          password: ''
        },
        listData: [],
        radioVal: '',
        userGroupData: [],
        is_sectionPupop1: false,
        is_sectionPupop2: false,
        pageData: null,
        page: 1,
        isShow: false,
        page1: 1,
        pageCount: 1,
        userid: '',
        sectionId: '',
        is_Loading: true,
        appid: '',
        cityList: [],
        selUser: '',
        edit_branch_id: '',
        selEdit: null,
        userInfo: null,
        popup8: false,
        serviceArr: [],
        popup9: false,
        selUserData: null,
        serviceName: '',
        popup10: false,
        menuArr: [],
        popup11: false,
        jurisdictionData: [],
        pageSize: 0,
        changeUserData: null,
        menuArr1: []
      };
    },
    components: {
    },
    watch: {
    },
    methods: {
      addsection () {
        if (this.section === '') {
          this.$Message.warning('部门名称不能为空');
          return;
        }
        this.is_Loading = true;
        this.ajax.section({
          data: {
            user_group_name: this.section
          },
          success: () => {
            this.is_Loading = false;
            this.$Message.success('添加成功');
            this.getSection();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
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
            // this.getUserList();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      confirmFun () {
        let reg = /^1[34578]\d{9}$/;
        if (this.formItem.name === '') {
          this.$Message.warning('客服名称不能为空');
          return;
        }
        if (this.formItem.roleSel === '') {
          this.$Message.warning('请选择部门');
          return;
        }
        if (this.formItem.tel === '' && reg.test(this.name) === false) {
          this.$Message.warning('电话号码为空或输入错误');
          return;
        }
        if (this.formItem.password === '') {
          this.$Message.warning('密码不能为空');
          return;
        }
        this.is_Loading = true;
        this.ajax.addAccountNumber({
          data: {
            user_group_id: this.formItem.roleSel,
            phone_no: this.formItem.tel,
            user_name: this.formItem.name,
            password: md5(this.formItem.password)
          },
          success: () => {
            this.is_Loading = false;
            this.$Message.success('添加成功！');
            this.getUserList();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 修改权限
      changePermission (k) {
        let arr = this.changeUserData.model_list ? this.changeUserData.model_list : [];
        this.menuArr.forEach((k) => {
          arr.forEach((s) => {
            if (k.model_id === s) {
              Object.assign(k, {expand: true});
            } else {
              // Object.assign(k, {checked: false});
            }
          });
          k.children.forEach((z) => {
            arr.forEach((b) => {
              if (z.model_id === b) {
                Object.assign(z, {checked: true});
              } else {
                // Object.assign(z, {checked: false});
              }
            });
          });
        });
        // this.menuArr1 = arr;
        this.popup11 = true;
        this.popup8 = false;
        this.selUserData = k;
      },
      cancelJurisdictionFun () {
        this.menuArr.forEach((k) => {
          Object.assign(k, {expand: false});
          k.children.forEach((z) => {
            Object.assign(z, {checked: false});
          });
        });
      },
      // 数据列表
      getUserList () {
        this.is_Loading = true;
        this.ajax.getUserList({
          data: {
            user_group_id: this.sectionId,
            page: this.page
          },
          success: (res) => {
            this.is_Loading = false;
            this.pageCount = parseInt(res.body.page_data.count);
            this.pageSize = parseInt(res.body.page_data.rows_num);
            res.body.user_list.forEach((v) => {
              v['is_switch'] = v.user_state === '1';
            });
            this.listData = res.body.user_list;
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
            this.is_Loading = false;
          }
        });
      },
      sectionFun () {
        this.page = 1;
        this.getUserList();
      },
      pageFun (v) {
        this.page = v;
        this.getUserList();
      },
      // 修改客服名称
      editVerviceName () {
        let k = this.selUserData;
        if (this.serviceName === '') {
          this.$Message.warning('请输入名称');
          return;
        }
        this.ajax.updateCustomerServiceName({
          data: {
            appid: this.appid,
            uid: k.uid,
            user_name: this.serviceName
          },
          success: () => {
            this.is_Loading = false;
            this.getUserList();
            this.$Message.success('修改成功');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      switchFun (v) {
        this.is_Loading = true;
        this.ajax.setUserState({
          data: {
            uid: v.uid,
            state: v.is_switch ? '1' : '-1'
          },
          success: () => {
            this.is_Loading = false;
            v.user_state_name = v.is_switch ? '正常' : '已离职';
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
            this.is_Loading = false;
          }
        });
      },
      delFun () {
        if (this.sectionId === '') {
          this.$Message.warning('请选择部门');
          return;
        }
        this.is_Loading = true;
        this.ajax.delUserGroup({
          data: {
            user_group_id: this.sectionId
          },
          success: () => {
            this.is_Loading = false;
            this.$Message.success('操作成功！');
            this.getSection();
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
            this.is_Loading = false;
          }
        });
      },
      // 设置客服
      setServer () {
        let k = this.selUser;
        this.ajax.setUserCustomerService({
          data: {
            uid: k.uid,
            appid: this.appid,
            user_name: k.user_name
          },
          success: () => {
            this.is_Loading = false;
            this.getUserList();
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 改部门
      editBranch () {
        this.ajax.setUserGroup({
          data: {
            set_uid: this.selEdit.uid,
            user_group_id: this.edit_branch_id
          },
          success: () => {
            this.getUserList();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 修改图像
      upImgFun (d) {
        this.ajax.setUserPortrait({
          data: {
            uid: this.selEdit.uid,
            resources_id: d.body.resources_id
          },
          success: (res) => {
            this.selEdit.avatar_url = res.body.avatar_url;
            this.$Message.success('设置成功');
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取权限列表
      getModelAuthList () {
        this.ajax.getModelAuthList({
          data: {},
          success: (res) => {
            let arr = res.body;
            arr.forEach((k, i) => {
              if (k.superior_id === -1) {
                Object.assign(k, {'title': k.model_name});
                Object.assign(k, {'expand': false});
                this.menuArr.push(k);
              }
            });
            this.menuArr.forEach((s) => {
              let arr1 = [];
              arr.forEach((k, i) => {
                if (k.superior_id === s.model_id) {
                  Object.assign(k, {'title': k.model_name});
                  Object.assign(k, {'checked': false});
                  arr1.push(k);
                }
              });
              Object.assign(s, {'children': arr1});
            });
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 提交权限设置
      jurisdictionFun () {
        let arr = [];
        console.log(this.menuArr);
        this.menuArr.forEach((k) => {
          if (k.model_id === 1) {
            if (k.checked) {
              arr.push(1);
            }
          }
          let q = 0;
          k.children.forEach((s) => {
            if (s.checked) {
              if (q === 0) {
                arr.push(k.model_id);
              }
              q++;
              arr.push(s.model_id);
            }
          });
        });
        this.ajax.setUserModelAuth({
          data: {
            uid: this.selUserData.uid,
            model_list: arr
          },
          success: (res) => {
            this.menuArr1 = [];
            this.$Message.success('操作成功');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
        this.cancelJurisdictionFun();
      },
      // 点击权限复选框方法  保存数据
      jurisdiction (v) {
        // this.jurisdictionData = v;
      },
      // 解绑硬件
      untieFun (k) {
        this.ajax.relieveUserBind({
          data: {
            uid: k.uid
          },
          success: (res) => {
            this.getUserList();
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
      this.getModelAuthList();
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body;
          this.appid = res.body[0].appid;
          this.getSection();
          this.getUserList();
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
