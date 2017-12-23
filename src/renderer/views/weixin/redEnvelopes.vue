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
        <Button type="info" @click="addRedEnvelopesOperation()"><Icon type="plus-round"></Icon> 添加红包活动</Button>
      </p>

      <Table :columns="staffColumns" :data="staffData"></Table>

      <div class="page-centent">
        <Page :total="total" :page-size="pageSize"></Page>
      </div>
    </Card>

    <Modal v-model="addActivity" title="添加编辑红包活动" @on-ok="addRedEnvelopes">
      <Form :label-width="85">
        <Row>
          <Col span="12">
            <FormItem label="公众号">
              <Select v-model="addActivityFormItem.appid">
                <Option v-for="item in appList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
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
          <DatePicker type="datetimerange" placeholder="请选择活动时间段" v-model="timeSlot" style="width:403px" @on-change="selectTime"></DatePicker>
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
        appList: [],
        defaultList: [],
        imgName: '',
        coverUrl: '',
        userInfo: null,
        visible: false,
        total: 0,
        pageSize: 0,
        page: 1,
        timeSlot: '',
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
          share_cover: '',
          details_list: []
        },
        addActivity: false,
        staffColumns: [
          {
            title: '活动名称',
            key: 'activity_name',
            align: 'center',
            ellipsis: true
          },
          {
            title: '活动开始时间',
            key: 'start_time',
            align: 'center',
            ellipsis: true
          },
          {
            title: '活动结束时间',
            key: 'end_time',
            align: 'center',
            ellipsis: true
          },
          {
            title: '所属公众号',
            key: 'app_name',
            align: 'center',
            ellipsis: true
          },
          {
            title: '派发金额上限',
            key: 'amount_upper_limit',
            align: 'center',
            width: 110
          },
          {
            title: '已发金额',
            key: 'already_amount',
            align: 'center',
            width: 100
          },
          {
            title: '状态',
            key: 'state',
            align: 'center',
            width: 80
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
                      this.delRedEnvelopes(params.row.activity_id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        staffData: []
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

        this.addActivityFormItem.details_list.push(file.response.body.resources_id);
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
      selectTime (time) {
        this.addActivityFormItem.start_time = time[0];
        this.addActivityFormItem.end_time = time[1];
      },
      addRedEnvelopesOperation () {
        for (let index in this.addActivityFormItem) {
          switch (index) {
            case 'is_open':
              this.addActivityFormItem[index] = 1;
              break;
            case 'is_follow':
              this.addActivityFormItem[index] = 1;
              break;
            case 'is_share':
              this.addActivityFormItem[index] = -1;
              break;
            case 'amount_type':
              this.addActivityFormItem[index] = 1;
              break;
            default:
              this.addActivityFormItem[index] = '';
          }
        }

        this.timeSlot = '';

        this.addActivity = true;
      },
      addRedEnvelopes () {
        this.ajax.addRedEnvelopes({
          data: {
            activity_name: this.addActivityFormItem.activity_name,
            number: this.addActivityFormItem.number,
            amount: this.addActivityFormItem.amount,
            amount_start: this.addActivityFormItem.amount_start,
            amount_end: this.addActivityFormItem.amount_end,
            amount_type: this.addActivityFormItem.amount_type,
            start_time: this.addActivityFormItem.start_time,
            end_time: this.addActivityFormItem.end_time,
            is_follow: this.addActivityFormItem.is_follow,
            appid: this.addActivityFormItem.appid,
            is_share: this.addActivityFormItem.is_share,
            share_url: this.addActivityFormItem.share_url,
            share_cover: this.addActivityFormItem.share_cover,
            amount_upper_limit: this.addActivityFormItem.amount_upper_limit,
            is_open: this.addActivityFormItem.is_open,
            details_list: this.addActivityFormItem.details_list
          },
          success: (res) => {
            console.log(res);
          },
          error: () => {}
        });
      },
      getRedEnvelopesList () {
        this.ajax.getRedEnvelopesList({
          data: {
            page: this.page
          },
          success: (response) => {
            this.staffData.splice(0, this.staffData.length);

            this.total = parseInt(response.body.page_data.count);
            this.pageSize = parseInt(response.body.page_data.rows_num);
            this.page = parseInt(response.body.page_data.page);

            for (let item of response.body.data_list) {
              let obj = {};
              obj.activity_id = item.activity_id;
              obj.activity_name = item.activity_name;
              obj.company_id = item.company_id;
              obj.number = item.number;
              obj.amount = item.amount;
              obj.amount_start = item.amount_start;
              obj.amount_end = item.amount_end;
              obj.amount_type = item.amount_type;
              obj.start_time = item.start_time;
              obj.end_time = item.end_time;
              obj.create_time = item.create_time;
              obj.is_follow = item.is_follow;
              obj.appid = item.appid;
              obj.is_share = item.is_share;
              obj.share_url = item.share_url;
              obj.share_cover = item.share_cover;
              obj.amount_upper_limit = item.amount_upper_limit;
              obj.already_amount = item.already_amount;
              obj.is_open = item.is_open;
              obj.details_list = item.details_list;
              obj.app_name = item.app_name;
              obj.state = item.state;
              obj.share_cover_url = item.share_cover_url;

              this.staffData.push(obj);
            }
          },
          error: () => {}
        });
      },
      delRedEnvelopes (activityId) {
        this.ajax.delRedEnvelopes({
          data: {
            activity_id: activityId
          },
          success: () => {
            this.$Message.success('删除成功');
            this.getRedEnvelopesList();
          },
          error: () => {
            this.$Message.error('删除失败');
          }
        });
      }
    },
    created () {
      this.ajax.getWxAuthList({
        success: (res) => {
          this.appList = res.body;
        },
        error: () => {}
      });

      this.getRedEnvelopesList();

      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
  };
</script>
