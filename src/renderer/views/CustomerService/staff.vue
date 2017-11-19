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
                    <Button type="primary" @click="popupBol = true"><Icon type="plus"></Icon> 添加客服</Button>
                </p>
                <div style="padding: 10px">
                    <span>
                        当前部门：
                    </span>
                    <Select v-model="sectionId" style="width: 200px" @on-change="selUser">
                        <Option v-for="(item, key) in userGroupData" :key="key" :value="item.user_group_id">{{ item.user_group_name }}</Option>
                    </Select>
                    <Button type="text" @click="delFun">删除当前部门</Button>
                </div>
                <table class="table-copy">
                    <thead>
                    <tr>
                        <th>姓名</th>
                        <th>账号</th>
                        <th>所属部门</th>
                        <th>添加时间</th>
                        <th>员工状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(k, index) in listData" :key="index">
                        <td style="padding: 4px;">
                            {{k.user_name}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.phone_no}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.user_group_name}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.create_time}}
                        </td>
                        <td>
                            {{k.user_state_name}}
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
                    <Page :total="pageCount" @on-change="pageFun"></Page>
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
        <Modal v-model="is_sectionPupop" title="添加部门" :width="500" @on-ok="addsection">
            <Form  :label-width="120">
                <Form-item label="部门名称：">
                    <Input v-model="section" placeholder="请输入名称"></Input>
                </Form-item>
            </Form>
        </Modal>
        <!-- end添加部门弹窗 -->


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
        listData: [{
          user_name: '123',
          user_group_name: '123',
          phone_no: '123',
          create_time: '123',
          switchBol: ''
        }],
        radioVal: '',
        userGroupData: [],
        pageData: null,
        page: 1,
        userGroupName: '',
        selectImg: '',
        isShow: false,
        page1: 1,
        is_examinePupop: false,
        exmineData: [],
        columns1: [
          {
            title: '评价事件',
            key: 'appointment_state'
          },
          {
            title: '评价星级(5为优秀)',
            key: 'evaluation_grade'
          },
          {
            title: '项目',
            key: 'series_name'
          },
          {
            title: '评价内容',
            key: 'content'
          },
          {
            title: '评价时间',
            key: 'add_time'
          }
        ],
        pageCount: 1,
        userid: '',
        sectionId: '',
        is_Loading: true
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
            this.sectionId = res.body[0].user_group_id;
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
      getUserList () {
        this.is_Loading = true;
        this.ajax.getUserList({
          data: {
            user_group_id: this.sectionId,
            page: 1
          },
          success: (res) => {
            this.is_Loading = false;
            this.pageCount = parseInt(res.body.page_data.count);
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
      selUser () {
        this.page = 1;
        this.getUserList();
      },
      pageFun (v) {
        this.page = v;
        this.getUserList();
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
      }
    },
    created () {
      this.getSection();
    }
  };
</script>
