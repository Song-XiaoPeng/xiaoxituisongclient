<style scoped lang="less">
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }

  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }

  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }

  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
<template>
  <div id="index">
    <Card>
      <p slot="title">
        扫码红包
      </p>
      <p slot="extra">
        <Button type="info" @click="addActivity = true">添加红包活动</Button>
      </p>

      <Table :columns="staffColumns" :data="staffData"></Table>

      <div class="page-centent">
        <Page :total="100"></Page>
      </div>
    </Card>

    <Modal v-model="addActivity" title="添加红包活动">
      <Form :label-width="85">
        <Row>
          <Col span="12">
            <FormItem label="公众号">
              <Select>
                <Option value="beijing">财务部</Option>
                <Option value="shanghai">客服部</Option>
                <Option value="shenzhen">售后部</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="活动名称">
              <Input placeholder="请输入活动名称" v-model="addActivityFormItem.activity_name"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="红包数量">
              <Input placeholder="请输入红包数量" v-model="addActivityFormItem.number"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="金额上限">
              <Input placeholder="请输入派发红包金额上限" v-model="addActivityFormItem.amount_upper_limit"></Input>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="活动时间">
          <DatePicker type="datetimerange" placeholder="请选择活动时间段" style="width:403px" @on-change="selectTime"></DatePicker>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="派发方式">
              <RadioGroup v-model="addActivityFormItem.amount_type">
                <Radio label="1">固定金额</Radio>
                <Radio label="2">随机金额</Radio>
              </RadioGroup>
            </FormItem>
          </COl>
          <Col span="10">
            <FormItem label="活动开启">
              <RadioGroup v-model="addActivityFormItem.is_open">
                <Radio label="1">开启</Radio>
                <Radio label="-1">关闭</Radio>
              </RadioGroup>
            </FormItem>
          </COl>
        </Row>
        <FormItem label="红包金额" v-if="addActivityFormItem.amount_type == 1">
          <Input placeholder="请输入红包金额" v-model="addActivityFormItem.amount"></Input>
        </FormItem>
        <FormItem label="随机金额" v-if="addActivityFormItem.amount_type == 2">
          <Row>
            <Col span="11">
              <Input placeholder="金额范围开始" v-model="addActivityFormItem.amount_start"></Input>
            </Col>
            <Col span="11" offset="2">
              <Input placeholder="金额范围结束" v-model="addActivityFormItem.amount_end"></Input>
            </Col>
          </Row>
        </FormItem>
        <Row>
          <Col span="10">
            <FormItem label="强制分享">
              <RadioGroup v-model="addActivityFormItem.is_share">
                <Radio label="1">开启</Radio>
                <Radio label="-1">关闭</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="10" style="line-height:30px;">
            <FormItem label="强制关注">
              <RadioGroup v-model="addActivityFormItem.is_follow">
                <Radio label="1">开启</Radio>
                <Radio label="-1">关闭</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="addActivityFormItem.is_share == 1">
          <Col span="7">
            <FormItem label="分享封面">
              <Upload 
                ref="upload"
                :show-upload-list="false"
                :on-success="handleCoverSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleCoverFormatError"
                :on-exceeded-size="handleCoverMaxSize"
                :before-upload="handleCoverBeforeUpload"
                :data="{resources_type: 4}"
                :headers="{token: userInfo.token}"
                type="drag"
                action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources">
                <div style="width:58px; height:58px; line-height:58px; background-size: cover;" :style="{backgroundImage: 'url(' + coverUrl + ')'}">
                  <Icon type="camera" size="20" v-if="!coverUrl"></Icon>
                </div>
              </Upload>
            </FormItem>
          </Col>
          <Col span="16" offset="1" style="line-height:30px;">
            <FormItem label="分享链接">
              <Input placeholder="请输入分享链接" v-model="addActivityFormItem.share_url"></Input>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="详情图">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :data="{resources_type: 4}"
            :headers="{token: userInfo.token}"
            multiple
            type="drag"
            action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>

          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
        </FormItem>
      </Form>
    </Modal>

    <Modal title="预览图片" v-model="visible">
      <img :src=imgName v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        defaultList: [],
        imgName: '',
        coverUrl: '',
        userInfo: null,
        visible: false,
        uploadList: [],
        addActivityFormItem: {
          is_open: 1,
          is_follow: 1,
          is_share: -1,
          amount_type: 1,
          share_url: '',
          amount_start: '',
          amount_end: '',
          activity_name: '',
          number: '',
          amount_upper_limit: '',
          amount: '',
          appid: '',
          start_time: '',
          end_time: '',
          share_cover: ''
        },
        addActivity: false,
        staffColumns: [
          {
            title: '活动名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '活动开始时间',
            key: 'nickname',
            align: 'center'
          },
          {
            title: '活动结束时间',
            key: 'phone_no',
            align: 'center'
          },
          {
            title: '所属公众号',
            key: 'is_customer_service',
            align: 'center'
          },
          {
            title: '派发金额上限',
            key: 'department',
            align: 'center'
          },
          {
            title: '已发金额',
            key: 'duty',
            align: 'center'
          },
          {
            title: '状态',
            key: 'sex',
            align: 'center'
          },
          {
            title: '操作',
            key: 'handle',
            width: 280,
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
                      this.receivables(params.index);
                    }
                  }
                }, '导出二维码'),
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
                      this.receivables(params.index);
                    }
                  }
                }, '领取情况'),
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
                      this.receivables(params.index);
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        staffData: [
          {
            'name': '张三',
            'nickname': '张望的人',
            'phone_no': '18316313321',
            'is_customer_service': '是',
            'department': '客服部',
            'duty': '客服',
            'sex': '男'
          }
        ]
      };
    },
    components: {
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
      handleView (url) {
        this.imgName = url;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        file.url = file.response.body.url;
        file.resources_id = file.response.body.resources_id;
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件类型不正确',
          desc: '文件 ' + file.name + '只能是 jpg 或 png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '图片超过大小限制',
          desc: '文件 ' + file.name + ' 大小不超过 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传5张图片'
          });
        }
        return check;
      },
      handleCoverRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleCoverSuccess (res, file) {
        this.coverUrl = file.response.body.url;
        this.addActivityFormItem.share_cover = file.response.body.resources_id;
      },
      handleCoverFormatError (file) {
        this.$Notice.warning({
          title: '文件类型不正确',
          desc: '文件 ' + file.name + '只能是 jpg 或 png.'
        });
      },
      handleCoverMaxSize (file) {
        this.$Notice.warning({
          title: '图片超过大小限制',
          desc: '文件 ' + file.name + ' 大小不超过 2M.'
        });
      },
      handleCoverBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传5张图片'
          });
        }
        return check;
      },
      selectTime (time) {
        this.addActivityFormItem.start_time = time[0];
        this.addActivityFormItem.end_time = time[1];
      }
    },
    created () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
  };
</script>
