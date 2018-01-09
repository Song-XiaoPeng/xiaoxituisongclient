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
                    客服管理
                </p>
                <div class="cl" style="padding: 10px">
                    <div class="top-box f-r">
                        <span>当前公共号：</span>
                        <Select v-model="appid" style="width:200px">
                            <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
                        </Select>
                    </div>
                </div>
                <table class="table-copy">
                    <thead>
                    <tr>
                        <th>客服名称</th>
                        <th>公共号/小程序名称</th>
                        <th>所属部门</th>
                        <th>添加时间</th>
                        <th>客服状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(k, index) in listData" :key="index">
                        <td style="padding: 4px;">
                            {{k.name}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.app_name}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.user_group_name}}
                        </td>
                        <td style="padding: 4px;">
                            {{k.create_time}}
                        </td>
                        <td>
                            {{k.state === -1 ? '离线' : k.state === 1 ? '在线' : k.state === 2 ? '离开' : '未知'}}
                        </td>
                        <td>
                            <Button type="ghost" @click="is_sectionPupop = true, selUserData = k">修改客服名</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="page-centent">
                    <Page :total="pageData1.count" :page-size="pageData1.rows_num" @on-change="pageFun"></Page>
                </div>
            </Card>
            </Col>
        </Row>



        <!-- 添加部门弹窗 -->
        <Modal v-model="is_sectionPupop" title="修改名称" :width="500" @on-ok="editVerviceName">
            <Form  :label-width="120">
                <Form-item label="名称：">
                    <Input v-model="serviceName" placeholder="请输入名称"></Input>
                </Form-item>
            </Form>
        </Modal>
        <!-- end添加部门弹窗 -->



        <!-- 状态 -->
        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>请求中....</div>
        </Spin>
        <!-- end状态 -->
    </div>
</template>
<script>
  export default {
    data () {
      return {
        is_Loading: true,
        appid: '',
        is_sectionPupop: false,
        cityList: [],
        listData: [],
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        serviceName: '',
        selUserData: ''
      };
    },
    components: {
    },
    watch: {

    },
    methods: {
      // 获取数据列表
      getListFun () {
        this.is_Loading = true;
        this.ajax.getCustomerServiceList({
          data: {
            appid: this.appid,
            page: this.pageData1.page
          },
          success: (res) => {
            this.listData = res.body.data_list;
            this.pageData1.count = parseInt(res.body.page_data.count);
            this.pageData1.rows_num = res.body.page_data.rows_num;
            this.is_Loading = false;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
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
            this.getListFun();
            this.$Message.success('修改成功');
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 分页
      pageFun (v) {
        this.pageData1.page = v;
        this.getListFun();
      }
    },
    created () {
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body.filter((k) => {
            if (k.type !== 2) {
              return k;
            }
          });
          this.appid = this.cityList[0].appid;
          this.getListFun();
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
