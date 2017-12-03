<style scoped lang="less">
    .container{
        padding:0 10px;
        background-color: #fff;
        .top-tab{
            padding: 0 10px;
            ul{
                text-align: right;
                li{
                    border-right: 1px #eaeaea solid;
                    display: inline-block;
                    padding: 0px 5px;
                    cursor: pointer;
                    transition: all .3s
                }
                li.active{
                    color: #2db7f5;
                }
                li:hover{
                    color: #2db7f5;
                }
                li:last-child{
                    border-right: 0;
                }
            }
        }
        .list-box{
            padding-bottom: 10px;
          .list{
              .list-content{
                  margin: 5px;
                  border: 1px #eaeaea solid;
                  height: 350px;
                  box-sizing: border-box;
                  padding: 5px;
                  position: relative;
                  .top{
                      border-bottom: 1px #eaeaea solid;
                      box-sizing: border-box;
                      height: 25px;
                  }
                  .middle{
                      position: absolute;
                      top:30px;
                      left: 5px;
                      right: 5px;
                      bottom: 40px;
                  }
                  .bot{
                      position: absolute;
                      bottom: 5px;
                      left: 5px;
                      right:5px;
                      height: 40px;
                      display: -webkit-box;
                      >div{
                          -webkit-box-flex: 1;
                          width: 50%;
                          box-sizing: border-box;
                          border-right: 1px #fff solid;
                          background-color: #e7e7e7;
                          line-height: 40px;
                          text-align: center;
                          cursor: pointer;
                      }
                      >div:last-child{
                          border-right: 0;
                      }
                  }
              }
          }
        }
    }
    .details-popup{
        .row{
            margin: 5px 0;
            .title{
                padding: 10px;
                box-sizing: border-box;
                text-align: center;
                border-bottom: 1px #eaeaea solid;
            }
        }
    }
</style>
<template>
    <div class="container">
        <div class="cl">
            <Select class="f-r" v-model="model1" style="width:200px" @on-change="selMarkFun">
                <Option v-for="item in cityList" :value="item.appid" :key="item.value">{{ item.nick_name }}</Option>
            </Select>
            <span class="f-r" style="margin-top: 5px">当前公共号：</span>
        </div>
        <div class="top-tab">
            <Button  type="info" @click="addMaterialFun">添加素材</Button>
            <ul>
                <li data-start="1" v-bind:class="is_img_txt === 'news' ? 'active' : ''" @click="imgTxtFun">图文</li>
                <li data-start="2" v-bind:class="is_img_txt === 'image' ? 'active' : ''" @click="imgFun">图片</li>
                <!--<li data-start="3">语音</li>-->
                <!--<li data-start="4">视频</li>-->
            </ul>
        </div>
        <div class="list-box" style="margin-top: 10px">
            <div v-if="modal2">
                <div>
                    <Table highlight-row ref="currentRowTable" :columns="columns5" :data="data5" @on-current-change="selImgTxtFun"></Table>
                </div>
                <div style="text-align: center;padding: 10px">
                    <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
                </div>
            </div>

           <div v-if="modal3">
               <div>
                   <Table highlight-row ref="currentRowTable" :columns="columns6" :data="data6" @on-current-change="selTxtFun" ></Table>
               </div>
               <div style="text-align: center;padding: 10px">
                   <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
               </div>
           </div>


        </div>


        <Modal v-model="modal4" title="图片" width="750">
            <div class="details-popup" style="max-height: 700px; overflow: auto;">
                <div class="row" v-for="k in el">
                    <div class="title">{{k.title}}</div>
                    <div v-html="k.content"></div>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        tabStart: 2,
        editorTxt: '内容区域',
        is_img_txt: 'news',
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        modal4: false,
        el: '',
        columns5: [
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
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.modal4 = true;
                      this.el = params.row.content.news_item;
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.delImgFun(params.row.media_id, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data5: [],
        columns6: [
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
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      this.delImgFun(params.row.media_id, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data6: [],
        modal2: false,
        modal3: false,
        cityList: [],
        model1: ''
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      addMaterialFun () {
        this.$router.push({
          name: 'winEdit',
          query: {
            appid: this.model1
          }
        });
      },
      // 切换appid 请求数据
      selMarkFun () {
        this.getMaterial();
      },
      // 获取素材列表
      getMaterial (t) {
        this.$Spin.show();
        this.ajax.getArticleList({
          data: {
            page: this.pageData1.page,
            appid: this.model1,
            type: this.is_img_txt
          },
          success: (res) => {
            this.$Spin.hide();
            if (this.is_img_txt === 'news') {
              // 如果是图文
              this.data5 = res.body.data_list;
              this.modal2 = true;
            } else if (this.is_img_txt === 'image') {
              // 如果是图片
              this.data6 = res.body.data_list;
              this.modal3 = true;
            }
            this.pageData1.count = parseInt(res.body.page_data.count);
            this.pageData1.rows_num = res.body.page_data.rows_num;
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 获取图文素材
      imgTxtFun () {
        this.modal3 = false;
        this.is_img_txt = 'news';
        this.pageData1.page = 1;
        this.getMaterial();
      },
      // 获取图片
      imgFun () {
        this.modal2 = false;
        this.is_img_txt = 'image';
        this.pageData1.page = 1;
        this.getMaterial();
      },
      selImgTxtFun (v) {
      },
      // 选择图片
      selTxtFun (v) {
      },
      pageFun1 (v) {
        this.pageData1.page = v;
        this.getMaterial();
      },
      // 删除图文/图片
      delImgFun (id, i) {
        this.ajax.delSourceMaterial({
          data: {
            appid: this.model1,
            mediaId: id
          },
          success: (res) => {
            this.$Message.success('操作成功');
            if (this.is_img_txt === 'news') {
              this.data5.splice(i, 1);
            } else if (this.is_img_txt === 'image') {
              this.data6.splice(i, 1);
            }
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      }
    },
    created () {
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body;
          this.model1 = res.body[0].appid;
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
