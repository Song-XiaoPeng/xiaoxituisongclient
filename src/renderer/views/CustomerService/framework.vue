<style scoped lang="less">
  .mass-type {
    line-height: 32px;
  }
  .top-box{
    height: 60px;
    background-color: #ffffff;
    border-bottom: 1px #f7f7f7 solid;
    ul{
      li{
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        color: #333333;
        float: left;
        padding: 0 10px;
        cursor: pointer;
      }
      li.active{
        background-color: #2db7f5;
        color: #fff;
      }
    }
  }
  .title-box{
    height: 60px;
    background-color: #ecf0f4;
    span{
      font-size: 16px;
      margin: 18px;
      display: inline-block;
      color: #2db7f5;
    }
  }
  .portrait{
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px #eaeaea solid;
    vertical-align: middle;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: 100% 100%;
    }
  }
</style>
<template>
  <div id="index">
    <Card :padding="0">
      <div class="top-box">
        <ul>
          <li  v-bind:class="tabVal == 'name1' ? 'active' : ''" @click="tabFun('name1')">组织架构</li>
          <li  v-bind:class="tabVal == 'name2' ? 'active' : ''" @click="tabFun('name2')">用户管理</li>
          <li  v-bind:class="tabVal == 'name3' ? 'active' : ''" @click="tabFun('name3')">已停止用户</li>
        </ul>
      </div>
      <div class="title-box">
        <span v-if="tabVal == 'name1'">组织架构</span>
        <span v-if="tabVal == 'name2'">用户管理</span>
        <span v-if="tabVal == 'name3'">已停止用户</span>
        <Button v-if="tabVal == 'name2' || tabVal == 'name3'" class="f-r" style="margin: 15px" @click="popup1 = true">部门</Button>
        <Button v-if="tabVal == 'name2' || tabVal == 'name3'" class="f-r" style="margin: 15px" @click="popup3 = true">岗位</Button>
        <Button v-if="tabVal == 'name2' || tabVal == 'name3'" class="f-r" style="margin: 15px" @click="clearFun(popup6 = true), getPostListFun(data1[1].user_group_id), userObj.user_group_id = data1[1].user_group_id">添加用户</Button>
      </div>





      <!-- 组织架构list  -->
      <div v-if="tabVal == 'name1'" style="padding: 15px;">
        <div>
          <span>群发类别：</span>
          <Button :type="is_structure_btn == '1' ? 'primary' : 'ghost'" @click="branchMapFun('1')">部门岗位图</Button>
          <Button :type="is_structure_btn == '2' ? 'primary' : 'ghost'" style="margin-left: 10px" @click="gradeMapFun('2')">上下级关系图</Button>
        </div>
        <div v-if="is_structure_btn == '1'">
          <Tree  :data="frameworkData" v-if="is_structure_btn == '1'"></Tree>
        </div>
        <div v-if="is_structure_btn == '2'">
          <Tree  :data="frameworkData1" v-if="is_structure_btn == '2'"></Tree>
        </div>
      </div>
      <!-- 组织架构list  -->


      <!-- 用户管理 -->
      <div v-if="tabVal == 'name2'" style="padding: 15px;">
        <Row>
          <Col span="24">
          <Form :label-width="80">
            <Row>
              <Col span="6">
              <FormItem label="部门">
                <Select class="f-r" v-model="branch_id" @on-change="selBranchFun">
                  <Option  :value="k.user_group_id" v-for="(k, i) in data1" :key="i">{{k.user_group_name}}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="关键字">
                <Input placeholder="请输入关键字" v-model="seekTxt"></Input>
              </FormItem>
              </Col>
              <Col span="2" style="margin-left:20px; line-height:32px;">
                <Button type="primary" @click="getUserListFun(pageData1.page = 1)">搜索</Button>
              </Col>
            </Row>
          </Form>
          </Col>
        </Row>
        <Table border :columns="staffColumns" :loading="is_Loading" :data="staffData" stripe></Table>
        <div class="page-centent">
          <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
        </div>
      </div>
      <!-- 用户管理 -->



     <!-- 已停止用户 -->
      <div v-if="tabVal == 'name3'" style="padding: 15px;">
        <Row>
          <Col span="24">
          <Form :label-width="80">
            <Row>
              <Col span="6">
              <FormItem label="部门">
                <Select class="f-r" style="width: 200px" v-model="branch_id" @on-change="selBranchFun">
                  <Option  :value="k.user_group_id" v-for="(k, i) in data1" :key="i">{{k.user_group_name}}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="关键字">
                <Input placeholder="请输入关键字" v-model="seekTxt"></Input>
              </FormItem>
              </Col>
              <Col span="2" style="margin-left:20px; line-height:32px;">
              <Button type="primary" @click="getUserListFun(pageData1.page = 1)">搜索</Button>
              </Col>
            </Row>
          </Form>
          </Col>
        </Row>
        <Table border :columns="staffColumns1" :loading="is_Loading" :data="staffQuitData" stripe></Table>
        <div class="page-centent">
          <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
        </div>
      </div>
      <!-- 已停止用户 -->




    </Card>





    <!-- 部门列表弹窗 -->
    <Modal  v-model="popup1" title="部门列表" width="800">
       <div class="" style="max-height: 400px;overflow: auto">
          <div class="" style="padding: 5px">
            <Button zise="small" style="" @click="clearFun(popup2 = true),is_branch = 'add'">添加部门</Button>
          </div>
         <div>
           <Table border :columns="columns1" :data="data5"></Table>
         </div>
       </div>
    </Modal>
    <!--end部门列表弹窗 dwadwaddwadwaf-->



    <!-- 添加部门弹窗 -->
    <Modal v-model="popup2" title="添加部门" @on-ok="addBranchFun">
      <Form :label-width="80">
        <FormItem label="部门名称">
          <Input v-model="branchData.department_name" placeholder="请输入部门名称"></Input>
        </FormItem>
        <FormItem label="上级部门">
          <Select v-model="branchData.parent_id">
            <Option :value="k.user_group_id"  v-for="(k, i) in data8" :key="i" :disabled="is_Branch_sel == i">{{k.user_group_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="部门描述">
          <Input placeholder="请输入部门描述" v-model="branchData.desc" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end添加部门弹窗 -->



    <!-- 岗位列表 -->
    <Modal  v-model="popup3" title="岗位列表" width="800">
      <div class="" style="max-height: 400px;overflow: auto">
        <div class="" style="padding: 5px">
          <Button zise="small" style="" @click="clearFun(popup4 = true, is_post = 'add', is_disabled = null)">添加岗位</Button>
          <Select class="f-r" style="width: 200px" v-model="branch_id2">
            <Option  :value="k.user_group_id" v-for="(k, i) in data1" :key="i">{{k.user_group_name}}</Option>
          </Select>
        </div>
        <div>
          <Table border :columns="columns2" :loading="is_Loading" :data="data2"></Table>
        </div>
      </div>
    </Modal>
    <!-- 岗位列表 -->


    <!-- 添加岗位列表 -->
    <Modal v-model="popup4" title="添加岗位" @on-ok="addPostFun">
      <Form :label-width="80">
        <FormItem label="岗位名">
          <Input v-model="postObj.position_name" placeholder="请输入岗位名	"></Input>
        </FormItem>
        <FormItem label="部门">
          <Select v-model="postObj.user_group_id">
            <Option :value="k.user_group_id" v-for="(k, i) in data7" :key="i">{{k.user_group_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="上级岗位">
          <Select v-model="postObj.position_id">
            <Option  :value="k.position_id" v-for="(k, i) in data6" :key="i" :disabled="is_disabled == i">{{k.position_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="岗位描述">
          <Input v-model="postObj.describe" placeholder="请输入岗位描述	" type="textarea" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- end添加岗位列表 dwadwad-->



    <!-- 人员列表 -->
    <Modal  v-model="popup5" title="部门列表" width="800">
      <div class="popupH" >
        <div class="" style="padding: 5px">
          <Button zise="small" style="" @click="popup6 = true">添加人员</Button>
          <Select class="f-r" style="width: 200px" v-model="branch_id1">
            <Option  :value="k.user_group_id" v-for="(k, i) in data1" :key="i">{{k.user_group_name}}</Option>
          </Select>
        </div>
        <div>
          <Table border :columns="columns3" :data="data3"></Table>
        </div>
        <div style="text-align: center;padding: 10px">
          <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
        </div>
      </div>
    </Modal>
    <!-- end人员列表 -->


    <!-- 添加人员列表 1213-->
    <Modal v-model="popup6" title="添加用户" @on-ok="addUserFun">
      <Form :label-width="80">
        <FormItem label="姓名">
          <Input v-model="userObj.user_name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="用户账号">
          <Input v-model="userObj.phone_no" placeholder="请输入用户账号"></Input>
        </FormItem>
        <FormItem label="登录密码">
          <Input v-model="pass" type="password" placeholder="请输入登录密码" @on-change="passFun" @on-focus="inputKeyFun"></Input>
        </FormItem>
        <FormItem label="所属部门">
          <Select  v-model="userObj.user_group_id" @on-change="addUserBranchSelFun">
            <Option  :value="k.user_group_id" v-for="(k, i) in data1" :key="i" v-if="k.user_group_id != 0">{{k.user_group_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属岗位">
          <Select   v-model="userObj.position_id">
            <Option  :value="k.position_id" v-for="(k, i) in data4" :key="i">{{k.position_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="头像上传">
          <div class="portrait">
            <img :src="portraitObj.url" alt="">
          </div>
          <Upload style="display: inline-block;"  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                  name="file" :data="{resources_type: 1}"
                  :max-size='1024'
                  :format="['jpg','jpeg','png','gif']"
                  :show-upload-list="false"
                  :before-upload="handleBeforeUpload"
                  :headers="{token: userInfo.token}"
                  :on-progress="upLodingFun"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :on-success="upImgFun">
            <Button type="primary"><Icon type="ios-cloud-upload-outline"></Icon> 选择头像</Button>
          </Upload>
        </FormItem>
        <FormItem label="是否客服">
          <RadioGroup v-model="userObj.is_customer_service">
            <Radio label="1">是</Radio>
            <Radio label="-1">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="用户性别">
          <RadioGroup v-model="userObj.sex">
            <Radio label="1">男</Radio>
            <Radio label="-1">女</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <!-- end添加人员列表 -->





    <!--<Spin fix v-if="is_Loading">-->
      <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
      <!--<div>请求中....</div>-->
    <!--</Spin>-->

  </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    data () {
      return {
        addUserFormItem: {
          isCustomerService: 1,
          sex: 1
        },
        tabsVal: '1',
        addUser: false,
        popup2: false,
        popup3: false,
        popup4: false,
        popup5: false,
        popup6: false,
        addPosition: false,
        staffColumns: [
          {
            title: '姓名',
            key: 'user_name',
            align: 'center'
          },
          {
            title: '用户账号',
            key: 'phone_no',
            align: 'center'
          },
          {
            title: '是否客服',
            align: 'center',
            render: (h, p) => {
              return h(`span`, p.row.is_customer_service === 1 ? `是` : `否`);
            }
          },
          {
            title: '部门',
            key: 'user_group_name',
            align: 'center'
          },
          {
            title: '职位',
            key: 'position_name',
            align: 'center'
          },
          {
            title: '性别',
            align: 'center',
            render: (h, p) => {
              return h(`span`, p.row.sex === 1 ? `男` : p.row.sex === 2 ? `女` : `未知`);
            }
          },
          {
            title: '在职状态',
            render: (h, p) => {
              return h(`span`, `在职`);
            },
            align: 'center'
          },
          {
            title: '操作',
            key: 'handle',
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
                      this.setDimissionFun(params.row, '-1');
                    }
                  }
                }, '设为离职')
              ]);
            }
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
                      this.userObj.user_name = params.row.user_name;
                      this.userObj.phone_no = params.row.phone_no;
                      this.userObj.password = params.row.password;
                      this.pass = params.row.password;
                      this.userObj.user_group_id = params.row.user_group_id;
                      this.userObj.position_id = params.row.position_id === -1 ? '' : params.row.position_id;
                      this.userObj.portrait = params.row.portrait;
                      this.userObj.is_customer_service = params.row.is_customer_service;
                      this.userObj.sex = params.row.sex;
                      this.userObj.uid = params.row.uid;
                      this.portraitObj.url = params.row.avatar_url;
                      this.is_pass = false;
                      this.popup6 = true;
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ],
        staffColumns1: [
          {
            title: '姓名',
            key: 'user_name',
            align: 'center'
          },
          {
            title: '用户账号',
            key: 'phone_no',
            align: 'center'
          },
          {
            title: '是否客服',
            align: 'center',
            render: (h, p) => {
              return h(`span`, p.row.is_customer_service === 1 ? `是` : `否`);
            }
          },
          {
            title: '部门',
            key: 'user_group_name',
            align: 'center'
          },
          {
            title: '职位',
            key: 'position_name',
            align: 'center'
          },
          {
            title: '性别',
            align: 'center',
            render: (h, p) => {
              return h(`span`, p.row.sex === 1 ? `男` : p.row.sex === 2 ? `女` : `未知`);
            }
          },
          {
            title: '在职状态',
            render: (h, p) => {
              return h(`span`, `离职`);
            },
            align: 'center'
          },
          {
            title: '操作',
            key: 'handle',
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
                      this.setDimissionFun(params.row, '1');
                    }
                  }
                }, '设为在职')
              ]);
            }
          }
        ],
        staffData: [],
        staffQuitData: [],
        frameworkData: [],
        frameworkData1: [],
        user_group_id: '',
        tabVal: 'name1',
        popup1: false,
        postObj: {
          position_name: '',
          user_group_id: '',
          position_superior_id: '',
          describe: '',
          position_id: ''
        },
        data3: [],
        columns3: [
          {
            title: '用户姓名',
            key: 'user_name'
          },
          {
            title: '部门',
            key: 'user_group_name'
          },
          {
            title: '职位',
            key: 'position_name'
          },
          {
            title: '性别',
            render: (h, p) => {
              return h('span', p.row.sex === 1 ? '男' : p.row.sex === 2 ? '女' : '未知');
            }
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
                      this.userObj.user_name = params.row.user_name;
                      this.userObj.phone_no = params.row.phone_no;
                      this.userObj.password = params.row.password;
                      this.pass = params.row.password;
                      this.userObj.user_group_id = params.row.user_group_id;
                      this.userObj.position_id = params.row.position_id === -1 ? '' : params.row.position_id;
                      this.userObj.portrait = params.row.portrait;
                      this.userObj.is_customer_service = params.row.is_customer_service;
                      this.userObj.sex = params.row.sex;
                      this.userObj.uid = params.row.uid;
                      this.portraitObj.url = params.row.avatar_url;
                      this.is_pass = false;
                      this.popup6 = true;
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ],
        is_disabled: null,
        columns2: [
          {
            title: '岗位名称',
            key: 'position_name'
          },
          {
            title: '上级岗位',
            key: 'position_superior_name',
            render: (h, p) => {
              return h('span', p.row.position_superior_id === -1 ? '顶级岗位' : p.row.position_superior_name);
            }
          },
          {
            title: '岗位备注',
            key: 'describe'
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
                      this.data6.forEach((k, i) => {
                        if (k.position_id === params.row.position_id) {
                          this.is_disabled = i;
                        }
                      });
                      this.postObj.position_id = params.row.position_superior_id;
                      this.postObj.user_group_id = params.row.user_group_id;
                      this.postObj.describe = params.row.describe;
                      this.postObj.position_name = params.row.position_name;
                      this.popup4 = true;
                      this.selPostData = params.row;
                      this.is_post = 'updata';
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
                      this.post_id = params.row.position_id;
                      this.delPostFun(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data2: [],
        data4: [],
        columns1: [
          {
            title: '部门名称',
            key: 'user_group_name'
          },
          {
            title: '上级部门',
            key: 'parent_name'
          },
          {
            title: '部门备注',
            key: 'desc'
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
                      this.data8.forEach((k, i) => {
                        if (k.user_group_id === params.row.user_group_id) {
                          this.is_Branch_sel = i;
                        }
                      });
                      this.branchData.desc = params.row.desc;
                      this.branchData.department_name = params.row.user_group_name;
                      this.branchData.parent_id = params.row.parent_id;
                      this.branchData.user_group_id = params.row.user_group_id;
                      this.selBranchData = params.row;
                      this.is_branch = 'updata';
                      this.popup2 = true;
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
                      this.user_group_id = params.row.user_group_id;
                      this.delBranchFun();
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: [],
        branchData: {
          user_group_id: '',
          department_name: '',
          parent_id: '',
          desc: ''
        },
        cityList1: [
          {
            user_group_id: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        branch_id: '',
        branch_id1: '',
        branch_id2: '',
        post_id: '',
        userObj: {
          phone_no: '',
          user_name: '',
          password: '',
          user_group_id: '',
          position_id: '',
          portrait: '',
          is_customer_service: '1',
          sex: '1',
          uid: ''
        },
        userInfo: {},
        portraitObj: {
          url: '',
          resources_id: ''
        },
        pass: null,
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        is_pass: true, // 控制修改用户时候，不触发md5加密，
        user_type: '1',
        is_Loading: false,
        seekTxt: '',
        data5: [],
        data6: [],
        data7: [],
        structureData: null,
        is_structure_btn: '1',
        data8: [],
        is_post: 'add',
        selPostData: null,
        is_branch: 'add',
        selBranchData: null,
        is_Branch_sel: -2
      };
    },
    components: {
    },
    mounted () {
    },
    watch: {
      branch_id: function () {
        this.getUserListFun();
      },
      branch_id2: function () {
        this.getPostListFun();
      },
      'userObj.user_group_id': function (v) {
        this.getPostListFun(v);
      },
      popup4: function (v) {
        if (v) {
          this.getPostListFun('');
        }
      }
    },
    methods: {
      // 部门岗位图
      branchMapFun () {
        this.is_structure_btn = '1';
        let arr = this.structureData.map((k) => {
          return k;
        });
        this.frameworkData = this.recursionForFun(arr);
      },
      // 上下级关系图
      gradeMapFun () {
        this.is_structure_btn = '2';
        let arr = this.structureData.map((k) => {
          return k;
        });
        this.frameworkData1 = this.recursionForFun(arr);
      },
      // 按backspace 删除密码
      inputKeyFun (e) {
        e.target.value = '';
        this.pass = '';
        this.userObj.password = '';
      },
      // 密码
      passFun (e) {
        this.userObj.password = md5(this.pass);
      },
      // 上传图像
      upImgFun (e) {
        Object.assign(this.portraitObj, e.body);
        this.portraitObj.url = e.body.url;
        this.portraitObj.resources_id = e.body.resources_id;
        this.userObj.portrait = e.body.resources_id;
      },
      // 上传中的方法
      upLodingFun (e) {
      },
      // 上传之前
      handleBeforeUpload (e) {
      },
      handleFormatError () {
      },
      handleMaxSize (file) {
        this.$Message.warning('文件过大，请选择小于1MB的图片');
      },
      // tab切换
      tabFun (v) {
        this.tabVal = v;
        if (v === 'name1') {
          // this.user_type = '1';
          // this.pageData1.page = 1;
          // this.getUserListFun();
          this.getFrameworkData();
        } else if (v === 'name2') {
          this.user_type = '1';
          this.pageData1.page = 1;
          this.getUserListFun();
        } else if (v === 'name3') {
          this.user_type = '-1';
          this.pageData1.page = 1;
          this.getUserListFun();
        }
      },
      // 添加部门 adwd
      addBranchFun () {
        if (this.branchData.department_name === '') {
          this.$Message.warning(`请出入部门名称`);
          return;
        }
        if (this.is_branch === 'add') {
          this.branchData.user_group_id = '';
        } else if (this.is_branch === 'updata') {
          this.branchData.user_group_id = this.selBranchData.user_group_id;
        }
        this.ajax.addDepartment({
          data: this.branchData,
          success: (res) => {
            this.clearFun();
            this.getBranchList();
            this.$Message.success(`操作成功`);
          },
          error: (res) => {
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 清除岗位/部门输入的数据
      clearFun () {
        // 部门
        this.branchData.user_group_id = '';
        this.branchData.department_name = '';
        this.branchData.parent_id = '';
        this.branchData.desc = '';
        // 岗位
        this.postObj.user_group_id = '';
        this.postObj.position_id = '';
        this.postObj.describe = '';
        this.postObj.position_name = '';
        this.postObj.position_superior_id = '';
        this.data6 = [];
        // 人员
        this.userObj.position_id = '';
        this.userObj.password = '';
        this.userObj.user_group_id = '';
        this.userObj.user_name = '';
        this.userObj.portrait = '';
        this.userObj.phone_no = '';
        this.userObj.sex = '';
        this.userObj.is_customer_service = '';
        this.userObj.uid = '';
        this.portraitObj.url = '';
        this.portraitObj.resources_id = '';
        this.pass = '';
      },
      // 获取部门列表
      getBranchList () {
        this.data1.length = 0;
        this.ajax.getDepartmentList({
          data: {},
          success: (res) => {
            let obj = {
              auth_data: null,
              company_id: '',
              desc: '',
              parent_id: '',
              person_charge: '',
              user_group_id: '0',
              user_group_name: '全部'
            };
            res.body.unshift(obj);
            this.branch_id = res.body[0].user_group_id;
            this.data1 = res.body;
            // this.userObj.user_group_id = res.body[1].user_group_id;
            this.data5 = res.body.map((k) => {
              return k;
            });
            this.data7 = res.body.map((k) => {
              return k;
            });
            this.data8 = res.body.slice(1);
            this.data8.unshift({
              auth_data: null,
              company_id: '',
              desc: '',
              parent_id: '-1',
              person_charge: '',
              user_group_id: '-1',
              user_group_name: '顶级部门'
            });
            this.data5.splice(0, 1);
            this.data7.splice(0, 1);
          },
          error: (res) => {
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 删除部门
      delBranchFun () {
        this.ajax.delDepartment({
          data: {
            user_group_id: this.user_group_id
          },
          success: (res) => {
            this.$Message.success(`操作成功`);
            this.getBranchList();
          },
          error: (res) => {
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 添加岗位
      addPostFun (k) {
        if (this.postObj.position_name === '') {
          this.$Message.warning(`请输入岗位名称`);
          return;
        }
        if (this.postObj.user_group_id === '' || this.postObj.user_group_id === '0') {
          this.$Message.warning(`请选择部门`);
          return;
        }
        if (this.postObj.position_id === '-1') {
          this.postObj.position_id = '';
        }
        if (this.is_post === 'add') {
          this.postObj.position_superior_id = this.postObj.position_id;
          this.postObj.position_id = '';
        } else if (this.is_post === 'updata') {
          this.postObj.position_superior_id = this.postObj.position_id;
          this.postObj.position_id = this.selPostData.position_id;
        }
        this.ajax.addPosition({
          data: this.postObj,
          success: (res) => {
            this.$Message.success(`操作成功`);
            this.getPostListFun();
            this.clearFun();
          },
          error: (res) => {
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 获取岗位列表
      getPostListFun (id) {
        let obj = {};
        if (this.popup6) {
          Object.assign(obj, {user_group_id: id});
        } else {
          Object.assign(obj, {user_group_id: this.branch_id2 === '0' ? '' : this.branch_id2});
        }
        this.ajax.getPositionList({
          data: obj,
          success: (res) => {
            if (this.popup6) {
              this.data4 = res.body.map((k) => {
                return k;
              });
            } else if (this.popup4) {
            } else {
              this.data2 = res.body;
            }
            this.data6 = res.body.map((k) => {
              k['disabled'] = false;
              return k;
            });
            this.data6.unshift({
              company_id: '',
              describe: null,
              position_id: '-1',
              position_name: '顶级岗位',
              position_superior_id: '',
              position_superior_name: '',
              user_group_id: ''
            });
          },
          error: (res) => {
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 选取部门获取部门相关的岗位 dwadawd
      selBranchFun (v) {
        this.branch_id = v;
      },
      // 选取部门获取部门相关的岗位
      // 删除岗位 dbvawjbd
      delPostFun (i) {
        this.ajax.delPosition({
          data: {
            position_id: this.post_id
          },
          success: (res) => {
            this.$Message.success(`操作成功`);
            this.data2.splice(i, 1);
          },
          error: (res) => {
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 添加人员
      addUserFun () {
        if (this.userObj.user_name === '') {
          this.$Message.warning(`请输入名称`);
          return;
        }
        if (this.userObj.phone_no === '') {
          this.$Message.warning(`请输入手机号码`);
          return;
        }
        if (this.userObj.user_group_id === '') {
          this.$Message.warning(`请选择部门`);
          return;
        }
        if (this.userObj.position_id === '') {
          this.$Message.warning(`请选择岗位`);
          return;
        }
        if (this.pass === null || this.userObj.password === '' || this.pass === '') {
          this.$Message.warning(`请输入密码`);
          return;
        }
        if (this.userObj.portrait === '') {
          this.$Message.warning(`请上传图像`);
          return;
        }
        this.ajax.addUser({
          data: this.userObj,
          success: (res) => {
            this.$Message.success(`操作成功`);
            this.clearFun();
            this.getUserListFun();
          },
          error: (res) => {
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 获取人员列表 1
      getUserListFun () {
        let obj = {
          page: this.pageData1.page,
          user_state: this.user_type,
          user_group_id: this.branch_id === '0' ? '' : this.branch_id,
          text: this.seekTxt
        };
        this.is_Loading = true;
        this.ajax.getTissueUserList({
          data: obj,
          success: (res) => {
            if (this.user_type === '1') {
              this.staffData = res.body.data_list;
              this.data3 = res.body.data_list;
            } else if (this.user_type === '-1') {
              this.staffQuitData = res.body.data_list;
            }
            this.pageData1.count = parseInt(res.body.page_data.count);
            this.pageData1.rows_num = parseInt(res.body.page_data.rows_num);
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 获取组织架构图
      getFrameworkData () {
        this.ajax.getFrameworkData({
          data: {},
          success: (res) => {
            this.structureData = res.body;
            this.gradeMapFun();
          },
          error: (res) => {
            this.$Message.warning(`错误内容：${res.meta.message}`);
          }
        });
      },
      // 递归Nn级 改变后台返回的 数据
      recursionForFun (arr) {
        let forFn = (arr) => {
          arr.forEach((k) => {
            k['expand'] = true;
            k['children'] = (k.position || []).concat(k.department || []);
            if (this.is_structure_btn === '1') {
              k['title'] = k.user_group_name || k.position_name;
            } else if (this.is_structure_btn === '2') {
              let names = [];
              if (k.user_list && k.user_list.length > 0) {
                k.user_list.forEach((s) => {
                  names.push(s.user_name);
                });
                k['title'] = `${k.user_group_name || k.position_name}(${names.join()})`;
              } else {
                k['title'] = k.user_group_name || k.position_name;
              }
            }
            if (k.user_group_name) {
              k['render'] = (h, { root, node, data }) => {
                return h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px',
                      color: '#ffcc00',
                      fontSize: '14px'
                    }
                  }),
                  h('span', data.title)
                ]);
              };
            }
            if (k.position_name) {
              k['render'] = (h, { root, node, data }) => {
                return h('span', [
                  h('Icon', {
                    props: {
                      type: 'person'
                    },
                    style: {
                      marginRight: '8px',
                      color: '#3366cc',
                      fontSize: '14px'
                    }
                  }),
                  h('span', data.title)
                ]);
              };
            }
            forFn(k.children);
          });
        };
        forFn(arr);
        return arr;
      },
      // 人员分页 dawd
      pageFun1 (v) {
        this.pageData1.page = v;
        this.getUserListFun();
      },
      // 设为离职
      setDimissionFun (v, t) {
        this.ajax.setUserState({
          data: {
            uid: v.uid,
            state: t
          },
          success: () => {
            this.getUserListFun();
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
            this.is_Loading = false;
          }
        });
      },
      // 添加人员  -- 》 部门切换 dwawd
      addUserBranchSelFun (v) {
      }
    },
    created () {
      Object.assign(this.userInfo, JSON.parse(localStorage.getItem('userInfo')));
      this.getBranchList();
      this.getFrameworkData();
      this.getPostListFun();
    }
  };
</script>
