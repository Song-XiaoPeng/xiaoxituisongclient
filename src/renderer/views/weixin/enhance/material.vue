<style scoped lang="less">
    .container{
        background-color: #fff;
        .top-tab{
            height: 60px;
            background-color: #ecf0f4;
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
            .list-content{
                width: 340px;
                height: 300px;
                margin: 10px;
                box-sizing: border-box;
                border: 1px #d7dde4 solid;
                box-shadow: 0px 0px 5px 1px #d7dde4;
                float: left;
                .time{
                    background-color: #f7f8f8;
                    color: #999;
                    height: 40px;
                    overflow: hidden;
                    line-height: 40px;
                    word-wrap: break-word;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-left: 5px;
                }
                .content{
                    background-color: #fff;
                    height: 218px;
                    box-sizing: border-box;
                    padding: 5px;
                    .title{
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
                        word-wrap: break-word;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color: #1a1a1a;
                    }
                    .img-box{
                        height: 168px;
                        img{
                            height: 100%;
                            width: 100%;
                            object-fit: cover;
                            object-position: center;
                        }
                    }
                    .decs{
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
                        word-wrap: break-word;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color: #1a1a1a;
                    }
                }
                .btn-box{
                    height: 40px;
                    display: -webkit-box;
                    background-color: #f7f8f8;
                    div{
                        -webkit-box-flex: 1;
                        line-height: 40px;
                        font-size: 16px;
                        text-align: center;
                        color: #999;;
                        cursor: pointer;
                        border-right: 1px #eaeaea solid;
                    }
                    div:hover{
                        // background-color: #2db7f5;
                        color: #2db7f5;
                    }
                }
            }
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
        <div class="cl" style="padding: 10px">
            <Select  v-model="model1" style="width:200px" @on-change="selMarkFun">
                <Option v-for="item in cityList" :value="item.appid" :key="item.value">{{ item.nick_name }}</Option>
            </Select>
        </div>
        <div class="top-tab">
             <span class="" style="color: #2db7f5;position: relative;top: 21px;left: 10px;">
                素材管理
            </span>
            <Button  type="info" class="f-r" @click="addMaterialFun" style="margin: 14px">添加素材</Button>
            <ul class="f-r cl" style="margin: 21px">
                <li data-start="1" v-bind:class="is_img_txt === 'news' ? 'active' : ''" @click="imgTxtFun">图文</li>
                <li data-start="2" v-bind:class="is_img_txt === 'image' ? 'active' : ''" @click="imgFun">图片</li>
                <!--<li data-start="3">语音</li>-->
                <!--<li data-start="4">视频</li>-->
            </ul>
        </div>
        <div class="list-box">
            <div class="cl" v-if="modal2">
                <div class="list-content" v-for="(k, i) in data5">
                    <div class="time">{{k.content.create_time}}</div>
                    <div class="content">
                        <div class="title">{{k.content.news_item[0].title}}</div>
                        <div class="img-box" style="cursor: pointer" @click="modal4 = true,el = k.content.news_item">
                            <img :src="k.content.news_item[0].thumb_url" alt="">
                        </div>
                        <div class="decs">{{k.content.news_item[0].digest}}</div>

                    </div>
                    <div class="btn-box">
                        <!--<div title="修改">-->
                            <!--<Icon type="compose"></Icon>-->
                        <!--</div>-->
                        <div style="border: 0" title="删除" @click="delImgFun(k.media_id, i)"><Icon type="trash-a"></Icon></div>
                    </div>
                </div>

                <!--<div>-->
                    <!--<Table highlight-row ref="currentRowTable" :columns="columns5" :data="data5" @on-current-change="selImgTxtFun"></Table>-->
                <!--</div>-->

            </div>
            <div v-if="modal2" style="text-align: center;padding: 10px">
                <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
            </div>
           <div v-if="modal3" class="cl">
               <div class="list-content" v-for="(k, i) in data6">
                   <div class="time">{{k.update_time}}</div>
                   <div class="content">
                       <div class="title">{{k.name}}</div>
                       <div class="img-box">
                           <img :src="k.url" alt="">
                       </div>
                       <div class="decs">{{k.media_id}}</div>

                   </div>
                   <div class="btn-box">
                       <!--<div title="修改">-->
                           <!--<Icon type="compose"></Icon>-->
                       <!--</div>-->
                       <div style="border: 0" title="删除" @click="delImgFun(k.media_id, i)"><Icon type="trash-a"></Icon></div>
                   </div>
               </div>
               <!--<div>-->
                   <!--<Table highlight-row ref="currentRowTable" :columns="columns6" :data="data6" @on-current-change="selTxtFun" ></Table>-->
               <!--</div>-->

            </div>
            <div  v-if="modal3" style="text-align: center;padding: 10px">
                <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
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



        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>请求中....</div>
        </Spin>
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
        model1: '',
        is_Loading: false
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
        this.is_Loading = true;
        this.ajax.getArticleList({
          data: {
            page: this.pageData1.page,
            appid: this.model1,
            type: this.is_img_txt
          },
          success: (res) => {
            let newDate = new Date();
            this.is_Loading = false;
            if (this.is_img_txt === 'news') {
              // 如果是图文
              res.body.data_list.forEach((k) => {
                newDate.setTime(k.content.create_time);
                Object.assign(k.content, {create_time: newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + '  ' + newDate.getHours() + ':' + newDate.getSeconds() + ':' + newDate.getMinutes()});
              });
              this.data5 = res.body.data_list;
              this.modal2 = true;
            } else if (this.is_img_txt === 'image') {
              // 如果是图片
              res.body.data_list.forEach((k) => {
                newDate.setTime(k.update_time);
                Object.assign(k, {update_time: newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + '  ' + newDate.getHours() + ':' + newDate.getSeconds() + ':' + newDate.getMinutes()});
              });
              this.data6 = res.body.data_list;
              this.modal3 = true;
            }
            this.pageData1.count = parseInt(res.body.page_data.count);
            this.pageData1.rows_num = res.body.page_data.rows_num;
          },
          error: (res) => {
            this.is_Loading = false;
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
          this.cityList = res.body.filter((k) => {
            if (k.type !== 2) {
              return k;
            }
          });
          this.model1 = this.cityList[0].appid;
        },
        error: (res) => {
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
