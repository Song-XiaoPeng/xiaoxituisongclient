<style scoped lang="less">
    .top-box{
        padding: 10px;
    }
</style>
<template>
  <div>
      <div class="top-box cl">
          <Button class="f-r" type="primary" @click="modal1 = true, qrcode_id = '', name = '', qrcode_group_id = '', tabArr = [], customer_service_group_id = '', qrcode_id = '', userName = '', customer_service_id = ''">新增</Button>
      </div>
      <div>
          <Table border :columns="columns7" :loading="is_Loading" :data="data6"></Table>
      </div>
      <div style="margin-top: 10px;text-align: center">
          <Page :total="pageData1.count" :page-size="pageData1.rows_num" @on-change="pageFun1"></Page>
      </div>


      <!-- 添加弹窗 -->
      <Modal v-model="modal1" title="添加带参二维码" width="800" @on-ok="createChannelFun">
          <Form  label-position="right" :label-width="100">
              <FormItem label="公共号">
                  <Select v-model="appid" style="width:200px" @on-change="selAppidFun">
                      <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="渠道名称">
                  <Input v-model="name" placeholder="请输入"></Input>
              </FormItem>
              <FormItem label="渠道分组">
                  <Select  placeholder="请选择" v-model="qrcode_group_id" style="width: 91%">
                      <Option v-for="k in data2" :value="k.qrcode_group_id" :key="k.value">{{k.qrcode_group_name}}</Option>
                  </Select>
                  <Button type="ghost" @click="modal1 = false,popup3 = true">操作</Button>
              </FormItem>
              <FormItem label="自动标签">
                  <Tag closable color="green" v-for="(k, i) in tabArr" :key="i" @on-close="handleClose2(i)">{{k.label_name}}</Tag>
                  <Button type="ghost" @click="popup14 = true, modal1 = false">添加</Button>
              </FormItem>
              <FormItem label="接待类型">
                  <RadioGroup v-model="selRader" @on-change="radioFun">
                      <Radio value="1" label="1">客服</Radio>
                      <Radio value="2" label="2">指定分组</Radio>
                      <Radio value="3" label="3">无</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="客服分组" v-if="selRader == 2">
                  <Select  placeholder="请选择" v-model="customer_service_group_id " style="width: 91%" @on-change="selUserGourpFun">
                      <Option v-for="k in userGroupData" :value="k.user_group_id" :key="k.value">{{k.user_group_name}}</Option>
                  </Select>
                  <!--<span>{{selRowData.user_name}}</span>-->
                  <!--<Button type="ghost" @click="popup7 = true, modal1 = false">添加</Button>-->
              </FormItem>
              <FormItem label="专属客服" v-if="selRader == 1">
                  <span v-if="userName == '' ? false : true">{{userName}}</span>
                  <Button type="ghost" @click="popup7 = true, modal1 = false">添加</Button> <span style="color: #ff3300">注意：专属客服或客服分组只能选其一</span>
              </FormItem>
              <FormItem label="扫码回复">
                  <RadioGroup v-model="selRader2" @on-change="radioFun1">
                      <Radio value="1" label="1">文字</Radio>
                      <Radio value="2" label="2">图文消息</Radio>
                      <Radio value="3" label="3">图片</Radio>
                      <Radio value="-1" label="-1">不回复</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="回复内容"  v-if="selRader2 == 1">
                  <Input type="textarea" v-model="reply_text" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入"></Input>
              </FormItem>
              <FormItem label="图文"  v-if="selRader2 == 2">
                  <span v-if="txtImgData">{{txtImgData.media_id}}</span>
                  <Button type="ghost" @click="imgTxtFun">选择图文</Button>
              </FormItem>
              <FormItem label="图片"  v-if="selRader2 == 3">
                  <span v-if="ImgData">
                      <img :src="ImgData.url" alt="" style="height: 100px;width: 100px">
                  </span>
                  <Upload style="display: inline-block;"  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                          name="file" :data="{resources_type: 1}"
                          :max-size='1024'
                          :format="['jpg','jpeg','png','gif']"
                          :show-upload-list="false"
                          :headers="{token: userInfo.token}"
                          :on-success="upImgFun">
                      <Button type="ghost" ><Icon type="image"></Icon>图片</Button>
                  </Upload>
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
              <Table  :columns="columns4" :loading="is_Loading"  :data="data2"></Table>
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
      <Modal v-model="popup7"  title="客服"  @on-cancel="popup7 = false, modal1 = true" @on-ok="popup7 = false, modal1 = true">
          <!--<div class="">-->
              <!--<span>当前公共号：</span>-->
              <!--<Select v-model="appid" style="width:200px" @on-change="selAppidFun">-->
                  <!--<Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>-->
              <!--</Select>-->
              <!--<span style="color: #ff3300">点击列表一项即选择</span>-->
          <!--</div>-->
          <div  style="max-height: 500px;overflow: auto">
              <div class=""  style="padding-top: 10px">
                  <Table highlight-row :columns="columns5"  :loading="is_Loading" :data="data3" @on-current-change="selTabRowFun"></Table>
              </div>
              <div class="" style="padding-top: 10px;text-align: center">
                  <Page :total="pageData.count" :page-size="pageData.rows_num" @on-change="pageFun"></Page>
              </div>
          </div>
      </Modal>
      <!-- end客服弹窗 -->


      <!-- 客服弹窗 -->
      <Modal v-model="popup8" title="二维码" >
          <div style="height: 100%;width: 100%;text-align: center">
              <img :src="codeUrl" alt="">
          </div>
          <div style="word-break: break-all;">
             二维码链接：{{codeUrl}}
          </div>
      </Modal>
      <!-- end客服弹窗 -->



      <!-- 图文详情 -->
      <Modal v-model="modal2" title="图文详情" width="800" @on-cancel="modal1 = true, modal2 = false" @on-ok="modal2 = false, modal1 = true">
          <div style="max-height: 700px; overflow: auto">
              <Table highlight-row ref="currentRowTable"  :loading="is_Loading"  :columns="columns8" :data="data8" @on-current-change="selImgTxtFun"></Table>
          </div>
          <div style="text-align: center;padding: 10px">
              <Page :total="pageData2.count" :page-size="pageData2.rows_num"  @on-change="pageFun2"></Page>
          </div>

          <!-- 加载状态 -->
          <Spin fix v-if="is_Loading1">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>请求中...</div>
          </Spin>
          <!-- end加载状态 -->
      </Modal>
      <!-- end图文详情 -->


      <!-- 图文片-->
      <Modal v-model="modal3" title="图片" width="800" @on-cancel="modal1 = true, modal3 = false" @on-ok="modal3 = false, modal1 = true">
          <div style="max-height: 700px; overflow: auto">
              <Table highlight-row ref="currentRowTable" :loading="is_Loading"  :columns="columns9" :data="data9" @on-current-change="selTxtFun" ></Table>
          </div>
          <div style="text-align: center;padding: 10px">
              <Page :total="pageData2.count" :page-size="pageData2.rows_num"  @on-change="pageFun2"></Page>
          </div>

          <!-- 加载状态 -->
          <Spin fix v-if="is_Loading1">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>请求中...</div>
          </Spin>
          <!-- end加载状态 -->
      </Modal>
      <!-- end图片 -->


      <!-- 图文详情-->
      <Modal v-model="modal4" title="图片" width="800" @on-cancel="modal1 = true" @on-ok="modal1 = true">
          <div style="max-width: 800px;max-height: 600px;overflow: auto">
              <div v-for="k in txtImgDataContent" v-html="k.content"></div>
          </div>
      </Modal>
      <!-- end图片 -->


      <!-- 添加标签 -->
      <Modal v-model="popup14" title="标签">
          <div class="">
              <Select v-model="label_group_id" style="width:200px">
                  <Option v-for="item in labelGroupArr" :value="item.label_group_id" :key="item.label_group_id">{{ item.group_name }}</Option>
              </Select>
              <Input v-model="seek_label_name" style="width:100px;"></Input>
              <Button type="info" size="small" @click="getLabelList(label_group_id = '')">搜索</Button>
          </div>
          <div style="text-align: right;"><span style="color: #ff3300;">点击其中一项即选择</span></div>
          <div  style="max-height: 450px;overflow: auto;">
              <Table border :columns="columns11" highlight-row :data="Label" @on-current-change="selLabelFun"></Table>
          </div>
      </Modal>
      <!-- end添加标签 -->


      <!-- 加载状态 -->
      <!--<Spin fix v-if="is_Loading">-->
          <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
          <!--<div>请求中...</div>-->
      <!--</Spin>-->
      <!-- end加载状态 -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        is_Loading1: false,
        columns8: [
          {
            title: '图文id',
            key: 'media_id'
          },
          {
            title: '素材标题',
            render: (h, params) => {
              let arr = params.row.content.news_item.map((k) => {
                return h('p', k.title);
              });
              return h('div', arr);
            }
          },
          {
            title: '操作',
            render: (h, p) => {
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
                      this.txtImgData = p.row;
                      this.txtImgDataContent = p.row.content.news_item;
                      this.modal4 = true;
                      this.modal2 = false;
                    }
                  }
                }, '详情')
              ]);
            }
          }
        ],
        userInfo: null,
        data8: [],
        columns9: [
          {
            type: '图片id',
            key: 'media_id'
          },
          {
            title: '图片名称',
            key: 'name'
          },
          {
            title: '素材标题',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.url
                },
                style: {
                  width: '100px'
                }
              });
            }
          }
        ],
        data9: [],
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        pageData2: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        txtImgData: null,
        ImgData: null,
        txtImgDataContent: null,
        modal2: false,
        modal4: false,
        is_img_txt: '',
        modal3: false,
        cityList: [],
        selRader2: '1',
        model1: '',
        popup8: false,
        codeUrl: '',
        columns7: [
          {
            title: '创建人姓名',
            key: 'create_user_name'
          },
          {
            title: '专属客服',
            key: 'customer_service_name'
          },
          {
            title: '二维码名称',
            key: 'activity_name'
          },
          {
            title: '有效时间',
            render: (h, p) => {
              return h('span', '永久');
            }
          },
          {
            title: '渠道名',
            key: 'qrcode_group_name'
          },
          {
            title: '意向客户数',
            key: 'intention_num'
          },
          {
            title: '订单客户数',
            key: 'order_num'
          },
          {
            title: '累计关注',
            key: 'attention'
          },
          {
            title: '取消关注',
            key: 'canel_attention'
          },
          {
            title: '当前关注数',
            key: 'attention_num'
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
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.data3.forEach((s) => {
                        if (s.customer_service_id === params.row.customer_service_id) {
                          this.userName = s.name;
                        }
                      });
                      this.appid = params.row.appid;
                      this.name = params.row.activity_name;
                      this.qrcode_group_id = params.row.qrcode_group_id;
                      this.tabArr = params.row.label;
                      this.customer_service_id = params.row.customer_service_id;
                      this.customer_service_group_id = params.row.customer_service_group_id;
                      this.qrcode_id = params.row.qrcode_id;
                      this.reception_type = params.row.reception_type;
                      this.selRader = params.row.reception_type;
                      this.selRader2 = params.row.reply_type;
                      this.reply_text = params.row.reply_text;
                      this.media_id = params.row.media_id;
                      this.resources_id = params.row.resources_id;
                      this.txtImgData = {'media_id': params.row.media_id};
                      this.ImgData = {'url': params.row.file_url, 'media_id': params.row.resources_id};
                      this.modal1 = true;
                    }
                  }
                }, '修改'),
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
                      this.delQrcod(params.row, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        selRader: '1',
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
        selRowData: {},
        appid: '',
        appData: '',
        name: '',
        dey: '',
        customer_service_group_id: '',
        is_service: false,
        userName: '',
        customer_service_id: '',
        qrcode_id: '',
        reception_type: '1',
        reply_type: '1',
        reply_text: '',
        media_id: '',
        resources_id: '',
        selLabelData: {},
        columns11: [
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
        popup14: false,
        Label: [],
        labelGroupArr: [],
        label_group_id: '',
        seek_label_name: ''
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      // 获取标签分组
      labelGroupList () {
        this.ajax.getLabelGroup({
          data: {
          },
          success: (res) => {
            this.labelGroupArr = res.body;
            this.labelGroupArr.unshift({
              company_id: '',
              group_name: '全部',
              label_group_id: -1
            });
            this.label_group_id = -1;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.waiting(res.meta.message);
          }
        });
      },
      // 选择标签列表 中的数据
      selLabelFun (v) {
        if (this.tabArr.length === 0) {
          this.tabArr.push(v);
        } else {
          this.tabArr.forEach((k) => {
            if (k.label_id === v.label_id) {
              this.$Message.warning('不能重复选择');
            } else {
              this.tabArr.push(v);
            }
          });
        }
        // 去重
        let arr = [];
        let json = {};
        this.tabArr.forEach((k) => {
          json[k.label_id] = k;
        });
        for (let k in json) {
          arr.push(json[k]);
        }
        this.tabArr = arr;
        this.selLabelData = v;
        this.popup14 = false;
        this.modal1 = true;
      },
      // 上传图片
      upImgFun (v) {
        this.ImgData = v.body;
        this.resources_id = v.body.resources_id;
      },
      // 素材分页
      pageFun2 (v) {
        this.pageData2.page = v;
        this.getMaterial();
      },
      // 选择素材
      selImgTxtFun (v) {
        this.media_id = v.media_id;
        this.resources_id = '';
        this.txtImgData = v;
        this.modal2 = false;
        this.modal1 = true;
      },
      // 选择图片
      selTxtFun (v) {
        this.media_id = '';
        this.resources_id = v.media_id;
        this.ImgData = v;
        this.modal3 = false;
        this.modal1 = true;
      },
      // 获取素材/图文/图片
      getMaterial (t) {
        this.is_Loading1 = true;
        this.is_Loading = true;
        this.ajax.getArticleList({
          data: {
            page: this.pageData2.page,
            appid: this.appid,
            type: this.is_img_txt
          },
          success: (res) => {
            this.is_Loading1 = false;
            this.is_Loading = false;
            if (this.is_img_txt === 'news') {
              // 如果是图文
              this.data8 = res.body.data_list;
              this.modal2 = true;
            } else if (this.is_img_txt === 'image') {
              // 如果是图片
              this.data9 = res.body.data_list;
              this.modal3 = true;
            }
            this.pageData2.count = parseInt(res.body.page_data.count);
            this.pageData2.rows_num = res.body.page_data.rows_num;
          },
          error: (res) => {
            this.is_Loading1 = false;
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取图文素材
      imgTxtFun () {
        this.is_img_txt = 'news';
        this.pageData1.page = 1;
        this.getMaterial();
        this.modal1 = false;
      },
      // 获取图片
      imgFun () {
        this.is_img_txt = 'image';
        this.pageData1.page = 1;
        this.getMaterial();
        this.modal1 = false;
      },
      // 接待类型
      radioFun (v) {
        if (v === '1') {
          this.reception_type = '1';
          this.customer_service_group_id = '';
        } else if (v === '2') {
          this.reception_type = '2';
          this.customer_service_id = '';
        } else if (v === '3') {
          this.reception_type = '3';
          this.customer_service_id = '';
          this.customer_service_group_id = '';
        }
      },
      // 回复类型
      radioFun1 (v) {
        if (v === '1') {
          this.selRader2 = '1';
          this.reply_type = '1';
        } else if (v === '2') {
          this.selRader2 = '2';
          this.reply_type = '2';
        } else if (v === '3') {
          this.selRader2 = '3';
          this.reply_type = '3';
        } else if (v === '-1') {
          this.selRader2 = '-1';
          this.reply_type = '-1';
        }
      },
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
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 创建二维码
      createChannelFun () {
        if (this.name === '') {
          this.$Message.warning('名称不能为空');
          return;
        }
        // if (this.selRader === '1') {
        // if (this.customer_service_id === '') {
        // this.$Message.warning('请选择专属客服');
        // return;
        // }
        // }
        // if (this.selRader === '2') {
        // if (this.customer_service_group_id === '') {
        // this.$Message.warning('请选择客服分组');
        // return;
        // }
        // }
        if (this.selRader === '3') {
          this.customer_service_id = '';
          this.customer_service_group_id = '';
        }
        let arr = this.tabArr.map((k) => {
          return k.label_id;
        });
        let obj = {
          type: '1',
          appid: this.appid,
          qrcode_id: this.qrcode_id,
          activity_name: this.name,
          qrcode_group_id: this.qrcode_group_id,
          invalid_day: this.dey,
          label: arr,
          customer_service_id: this.customer_service_id,
          customer_service_group_id: this.customer_service_group_id,
          reception_type: this.reception_type,
          reply_type: this.reply_type
        };
        if (this.reply_type === '1') {
          if (this.reply_text === '') {
            this.$Message.warning('请输入回复内容');
            return;
          }
          Object.assign(obj, {'reply_text': this.reply_text});
          Object.assign(obj, {'media_id': ''});
          Object.assign(obj, {'resources_id': ''});
        }
        if (this.reply_type === '2') {
          if (this.media_id === '') {
            this.$Message.warning('请选择模板消息');
            return;
          }
          Object.assign(obj, {'reply_text': ''});
          Object.assign(obj, {'media_id': this.media_id});
          Object.assign(obj, {'resources_id': ''});
        }
        if (this.reply_type === '3') {
          if (this.resources_id === '') {
            this.$Message.warning('请选择图片');
            return;
          }
          Object.assign(obj, {'reply_text': ''});
          Object.assign(obj, {'media_id': ''});
          Object.assign(obj, {'resources_id': this.resources_id});
        }
        if (this.reply_type === '-1') {
          Object.assign(obj, {'reply_text': ''});
          Object.assign(obj, {'media_id': ''});
          Object.assign(obj, {'resources_id': ''});
        }
        this.ajax.createQrcode({
          data: obj,
          success: (res) => {
            this.pageData1.page = 1;
            this.getQrcodList();
            this.qrcode_id = '';
            this.name = '';
            this.qrcode_group_id = '';
            this.tabArr = '';
            this.customer_service_group_id = '';
            this.customer_service_id = '';
            this.qrcode_id = '';
            this.$Message.success('操作成功');
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
            this.$Message.warning(res.meta.message);
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
            this.$Message.warning(res.meta.message);
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
            this.$Message.warning(res.meta.message);
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
        this.customer_service_group_id = '';
        this.userName = v.name;
        this.customer_service_id = v.customer_service_id;
        // Object.assign(this.selRowData, v);
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
      },
      selUserGourpFun (v) {
        if (v !== '') {
          this.userName = '';
          this.customer_service_id = '';
        }
      },
      // 获取标签列表
      getLabelList () {
        this.ajax.getLabelList({
          data: {
            label_group_id: this.label_group_id === -1 ? '' : this.label_group_id,
            label_name: this.seek_label_name
          },
          success: (res) => {
            this.Label = res.body;
          },
          error: (res) => {
            this.$Message.waiting(res.meta.message);
          }
        });
      }
    },
    watch: {
      appid: function (v) {
      },
      data3: {
        handler: (val, oldVal) => {
        },
        // 深度观察
        deep: true
      },
      label_group_id: function (v) {
        if (v !== '') {
          this.seek_label_name = '';
          this.getLabelList();
        }
      }
    },
    created () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.geteChannelGroupListFun();
      this.getSection();
      this.getQrcodList();
      this.labelGroupList();
      this.getLabelList();
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body.filter((k) => {
            if (k.type !== 2) {
              return k;
            }
          });
          this.appid = this.cityList[0].appid;
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
