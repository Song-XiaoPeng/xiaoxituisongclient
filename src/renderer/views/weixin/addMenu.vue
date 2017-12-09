<style scoped lang="less">
    .container{
        position: relative;
        >div{
            display: inline-block;
        }
        .left-box{
            width: 414px;
            height: 736px;
            border: 1px #eaeaea solid;
            box-sizing: border-box;
            position: relative;
            .top-title{
                height: 80px;
                width: 100%;
                overflow: hidden;
                background-image: url("~@/assets/images/top.jpg");
                background-repeat: no-repeat;
                background-size: 100%;
                text-align: center;
                .title-txt{
                    display: inline-block;
                    margin-top: 27px;
                    height: 53px;
                    color: #fff;
                    font-weight: bold;
                    line-height: 53px;
                    font-size: 16px;
                }
            }
            .middle-box{
                position: absolute;
                top:80px;
                bottom: 60px;
                left: 0;
                right: 0;
            }
            .bot-box{
                height: 60px;
                width: 100%;
                position: absolute;
                bottom: 0;
                box-sizing: border-box;
                border-top: 1px #eaeaea solid;
                >div{
                    box-sizing: border-box;
                    border-right: 1px #eaeaea solid;
                    display: inline-block;
                    vertical-align: middle;
                    text-align: center;
                    line-height: 60px;
                }
                >div:last-child{
                    border: 0;
                }
                .jianpan{
                    width: 60px;
                    height: 60px;
                    background-image: url("~@/assets/images/jianpan.jpg");
                    background-repeat: no-repeat;
                    background-size: 100%;
                }
                .menu:hover>.close{
                    display: inline-block;
                }
                .menu{
                    display: -webkit-box;
                    position: absolute;
                    left: 60px;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    >div{
                        cursor: pointer;
                        border-right: 1px #eaeaea solid;
                        -webkit-box-flex: 1;
                        position: relative;
                        .child-box{
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: 70px;
                            border: 1px #d0d0d0 solid;
                            box-sizing: border-box;
                            ul{
                                li{
                                    position: relative;
                                    box-sizing: border-box;
                                    border-bottom: 1px #eaeaea solid;
                                }
                                li:last-child{
                                    border: 0;
                                }
                            }
                            .arrow_out {
                                position: absolute;
                                bottom: -6px;
                                display: inline-block;
                                width: 0;
                                height: 0;
                                border-width: 6px;
                                border-style: dashed;
                                border-color: transparent;
                                border-bottom-width: 0;
                                border-top-color: #d0d0d0;
                                border-top-style: solid;
                            }
                            .arrow_in {
                                position: absolute;
                                bottom: -5px;
                                display: inline-block;
                                width: 0;
                                height: 0;
                                border-width: 6px;
                                border-style: dashed;
                                border-color: transparent;
                                border-bottom-width: 0;
                                border-top-color: #fafafa;
                                border-top-style: solid;
                            }
                            .sub_pre_menu_list{

                            }
                        }
                    }
                    >div:last-child{
                        border: 0;
                    }
                }
            }
        }
        .right-box{
            position: absolute;
            left: 435px;
            right: 0;
            height: 736px;
        }
    }
    .right-top-box{
        padding: 10px;
    }
    .tab-box{
        padding: 10px;
    }
    .individuation-box{
        position: relative;
        height: 160px;
        >div{
            display: inline-block;
        }
        .l{
            width: 100px;
        }
        .r{
            position: absolute;
            left: 100px;
            top: 0;
            right: 0;
        }
    }
</style>
<template>

   <div id="index" style="padding: 10px">
       <Card style="width:100%">
           <p slot="title">
              自定义菜单
           </p>
           <div class="cl">
               <Select class="f-r" v-model="model1" style="width:200px" @on-change="selMarkFun">
                   <Option v-for="item in cityList" :value="item.appid" :key="item.value">{{ item.nick_name }}</Option>
               </Select>
               <span class="f-r" style="margin-top: 5px">当前公共号：</span>
           </div>
           <div class="container">
               <div class="left-box">
                   <div class="top-title">
                       <div class="title-txt">
                           标题标题
                       </div>
                   </div>
                   <div class="middle-box">

                   </div>
                   <div class="bot-box">
                      <div class="jianpan">

                      </div>
                      <div class="menu">
                          <div class="menu-parent" v-for="(k, i) in menu" @click.stop="menuFun(k, i)">
                              <div class="child-box"  v-if="k.is_child_show">
                                  <ul class="">
                                      <li class="" v-for="(kk, s) in k.child_menu" @click.stop="childMenuFun(kk, i, s)">
                                          <Icon v-if="kk.is_child_btn_show" type="plus-round"></Icon>
                                          <span v-if="kk.child_menu_name == '' ? false : true">{{kk.child_menu_name}}</span>
                                      </li>
                                  </ul>
                                  <i class="arrow arrow_out"></i>
                                  <i class="arrow arrow_in"></i>
                              </div>
                              <span v-if="k.is_menu_txt_show">{{k.menu_name}}</span>
                              <Icon  v-if="k.is_menu_btn" type="plus-round"></Icon>
                          </div>
                      </div>
                   </div>

               </div>
               <div class="right-box">
                   <div class="right-top-box">
                       <span>菜单名称：</span>
                       <Input v-if="selMeunObj.is_ipt" v-model="selMeunObj.obj == null ? '' :  selMeunObj.obj.menu_name" :maxlength="6" :minleng="1" placeholder="最多6个汉字或字母，建议4个" style="width: 300px"></Input>
                       <Input v-if="selMeunObj.is_ipt ? false : true" v-model="selMeunObj.obj == null ? '' : selMeunObj.obj.child_menu_name" :maxlength="6" :minleng="1" placeholder="最多6个汉字或字母，建议4个" style="width: 300px"></Input>
                       <Button class="f-r" type="dashed" @click="delMeun">删除当前菜单</Button>
                   </div>
                   <div class="individuation-box cl" v-if="is_individuation">
                       <div class="l">
                           设置显示对象：
                       </div>
                       <div class="r">
                           <Form  label-position="right" :label-width="100">
                               <FormItem label="地区：">
                                   <Cascader :data="addressData"style="width: 300px"  v-model="area" class="input-width-3" ></Cascader>
                               </FormItem>
                               <FormItem label="性别：">
                                   <RadioGroup v-model="sex">
                                       <Radio label="1">男</Radio>
                                       <Radio label="2">女</Radio>
                                   </RadioGroup>
                               </FormItem>
                               <FormItem label="手机系统：">
                                   <Select  v-model="phone_type" style="width: 300px">
                                       <Option v-for="item in cityList1"  :value="item.value" :key="item.value">{{ item.label }}</Option>
                                   </Select>
                               </FormItem>
                           </Form>
                       </div>
                   </div>
                   <div v-if="is_form">
                       <Tabs v-model="is_tab" @on-click="selTabFun(selMeunObj)">
                           <TabPane label="发送消息" name="name1">
                               <div class="tab-box">
                                   <Button type="info" class="" @click="imgTxtFun">
                                       <Icon type="images"></Icon>
                                       图文信息
                                   </Button>
                                   <Button type="info" class="" @click="imgFun">
                                       <Icon type="image"></Icon>
                                       图片
                                   </Button>
                                   <Button type="info" class="f-r" id="addImgTxtBtn" @click="createWindow">
                                       添加图文/图片
                                   </Button>
                               </div>
                           </TabPane>
                           <TabPane label="跳转网页" name="name2">
                               <div class="tab-box">
                                   <div>
                                       <span>请输入页面网址：</span><Input v-model="selMeunObj.obj == null ? '' : selMeunObj.obj.url" placeholder="例：https://www.baidu.com" style="width: 300px"></Input>
                                   </div>
                               </div>
                           </TabPane>
                           <TabPane label="指定客服" name="name3">
                               <div style="padding: 10px">
                                   <RadioGroup v-model="animal">
                                       <Radio label="客服人员"></Radio>
                                       <Radio label="客服分组"></Radio>
                                       <Radio label="空"></Radio>
                                   </RadioGroup>
                               </div>
                               <div class="" style="width: 99%;height: 420px;overflow: auto">
                                   <Table v-if="animal == '客服人员' ? true : false" highlight-row ref="currentRowTable" :columns="columns3" :data="data1" @on-current-change="selPersonnel"></Table>
                                   <Table v-if="animal == '客服分组' ? true : false" highlight-row ref="currentRowTable" :columns="columns4" :data="data2" @on-current-change="selPersonnel"></Table>
                                   <div style="text-align: center;padding: 5px">
                                       <Page :total="pageData.count" :page-size="pageData.rows_num" v-if="animal == '客服人员' ? true : false" @on-change="pageFun"></Page>
                                       <Button class="f-r" style="margin-top: 10px" @click="handleClearCurrentRow">清除所选客服</Button>
                                   </div>

                               </div>
                           </TabPane>
                           <!--<TabPane label="跳转小程序" name="name3">-->
                               <!--<div class="tab-box">-->
                                   <!--<Form ref="formInline" :label-width="150" >-->
                                       <!--<FormItem label="请输入小程序APPID：">-->
                                           <!--<Input v-model="name_val" placeholder="请输入" style="width: 100%"></Input>-->
                                       <!--</FormItem>-->
                                       <!--<FormItem label="请输入小程序页面路径：">-->
                                           <!--<Input v-model="name_val" placeholder="请输入" style="width: 100%"></Input>-->
                                       <!--</FormItem>-->
                                   <!--</Form>-->
                               <!--</div>-->
                           <!--</TabPane>-->
                           <!--<TabPane label="推广模板" name="name4">-->

                           <!--</TabPane>-->
                       </Tabs>
                   </div>
               </div>
           </div>
           <div style="padding: 10px 0; text-align: right">
               <Button type="info" class="" @click="addMenuFun">保存菜单</Button>
           </div>
       </Card>



       <Modal v-model="modal2" title="图文详情" width="800">
           <div style="max-height: 700px; overflow: auto">
               <Table highlight-row ref="currentRowTable" :columns="columns5" :data="data5" @on-current-change="selImgTxtFun"></Table>
           </div>
           <div style="text-align: center;padding: 10px">
               <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
           </div>
       </Modal>


       <Modal v-model="modal3" title="图片" width="800">
           <div style="max-height: 700px; overflow: auto">
               <Table highlight-row ref="currentRowTable" :columns="columns6" :data="data6" @on-current-change="selTxtFun" ></Table>
           </div>
           <div style="text-align: center;padding: 10px">
               <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
           </div>
       </Modal>



       <Spin fix v-if="is_Loading">
           <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
           <div>请求中....</div>
       </Spin>
   </div>
</template>
<script>
  import editor from './editor';
  import address from '../../config/address';
  export default {
    data () {
      return {
        menu: [],
        name_val: '',
        model1: '',
        cityList: [],
        cityList1: [
          {
            value: '1',
            label: 'IOS'
          },
          {
            value: '2',
            label: 'Android'
          },
          {
            value: '3',
            label: '其他'
          }
        ],
        phone_type: '',
        modal2: false,
        modal3: false,
        addressData: [],
        selMeunObj: {
          i: null,
          obj: null,
          is_ipt: true
        },
        is_Loading: true,
        is_tab: 'name1',
        animal: '客服人员',
        columns3: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '客服名',
            key: 'name'
          },
          {
            title: '所属组',
            key: 'user_group_name'
          }
        ],
        data1: [],
        columns4: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '分组名',
            key: 'user_group_name'
          }
        ],
        data2: [],
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
          }
        ],
        data6: [],
        pageData: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        pageData1: {
          count: 0,
          rows_num: 0,
          page: 1
        },
        is_img_txt: '',
        page1: 1,
        is_form: false,
        menu_i: null,
        menu_child_i: null,
        menu_data: [],
        is_menu: false, // 点击是否菜单还是子菜单
        is_individuation: false, // 是否是个性化菜单
        area: [],
        sex: 1,
        individuationData: ''
      };
    },
    components: {
      editor
    },
    mounted () {
    },
    beforeDestroy () {
    },
    watch: {
      animal: (v) => {
      },
      area: (v) => {
        console.log(v);
      }
    },
    methods: {
      // 添加菜单方法
      menuFun (obj, i) {
        this.menu_i = i;
        this.menu_child_i = null;
        this.is_menu = true;
        if (obj.is_menu_btn === false) {
          this.selMeunObj.i = i;
          this.selMeunObj.obj = obj;
          this.selMeunObj.is_ipt = true;
          let isKf = obj.key === undefined ? '' : obj.key.slice(0, 2);
          if (obj.child_menu.length === 1 && obj.child_menu[0].child_menu_name === '') {
            // 菜单没有子菜单
            this.is_form = true;
          } else {
            // 菜单有子菜单
            this.is_form = false;
          }
          // 切换tab
          if (obj.type === 'click') {
            this.is_tab = 'name1';
          } else if (obj.type === 'view') {
            this.is_tab = 'name2';
          } else if (obj.type === 'media_id') {
            this.is_tab = 'name1';
          }
          // 如果是客服 切换tab
          if (isKf === 'kf') {
            this.is_tab = 'name3';
            obj.type = 'click';
          }
        } else if (this.menu.length < 3) {
          // 如果菜单小于3个，并且菜单为初始添加的时候，就添加新菜单
          obj.menu_name = '菜单名称';
          obj.is_child_show = true;
          obj.is_menu_txt_show = true;
          obj.is_menu_btn = false;
          this.menu.push({
            is_btn: true,
            btn_txt: '添加菜单',
            menu_name: '',
            is_menu_btn: true,
            is_menu_txt_show: false,
            is_child_show: false,
            type: null,
            child_menu: [
              {
                child_menu_name: '',
                type: null,
                is_child_btn_show: true
              }
            ]
          });
          this.is_form = false;
          this.is_tab = 'name1';
          this.selMeunObj.is_ipt = true;
        } else if (this.menu.length === 3) {
          // 点击最后一个加号的时候，，并且菜单为初始添加的时候，就隐藏添加按钮并添加一个菜单
          obj.menu_name = '菜单名称';
          obj.type = null;
          obj.is_child_show = true;
          obj.is_menu_txt_show = true;
          obj.is_menu_btn = false;
          this.selMeunObj.is_ipt = true;
          this.is_form = false;
          this.is_tab = 'name1';
        }
      },
      // 添加子菜单方法
      childMenuFun (obj, i, s) {
        this.is_tab = 'name1';
        this.menu_i = i;
        this.menu_child_i = s;
        this.is_menu = false;
        if (this.menu[i].child_menu.length < 5 && obj.is_child_btn_show) {
          // 如果数组子菜单小于5个的时并且子菜单为初始添加状态，就添加新子菜单
          this.menu[i].child_menu.push({
            child_menu_name: '子菜单名称',
            is_child_btn_show: false,
            type: null
          });
          this.is_form = false;
          this.is_tab = 'name1';
          this.selMeunObj.is_ipt = false;
        } else if (this.menu[i].child_menu.length === 5 && obj.is_child_btn_show) {
          // 如果子菜单已经有5个了并且子菜单为初初始添加状态，就隐藏添加按钮，添加一个新子菜单
          obj.child_menu_name = '子菜单名称';
          obj.is_child_btn_show = false;
          obj.type = null;
          this.selMeunObj.is_ipt = false;
          this.is_form = false;
          this.is_tab = 'name1';
        } else {
          this.selMeunObj.i = i;
          this.selMeunObj.obj = obj;
          this.selMeunObj.is_ipt = false;
          this.is_form = true;
          // this.menu[i].child_menu[s]['obj'] = obj;
          let isKf = obj.key === undefined ? '' : obj.key.slice(0, 2);
          // 切换tab
          if (obj.type === 'click') {
            this.is_tab = 'name1';
          } else if (obj.type === 'view') {
            this.is_tab = 'name2';
          } else if (obj.type === 'media_id') {
            this.is_tab = 'name1';
          }
          // 切换 客服tab
          if (isKf === 'kf') {
            this.is_tab = 'name3';
            obj.type = 'click';
          }
        }
      },
      // 获取菜单
      getMenuFun () {
        this.menu = [];
        this.is_Loading = true;
        this.ajax.getMenuList({
          data: {
            appid: this.model1
          },
          success: (res) => {
            this.is_Loading = false;
            console.log(res.body);
            this.defaultData(res.body);
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      arr (k) {
        if (k.length < 5) {
          // 如果子菜单小于5个  就启动默认添加按钮并 添加已有的菜单
          return [{
            child_menu_name: '',
            is_child_btn_show: true,
            type: null
          }].concat(k.map((k) => {
            return {
              type: k.type,
              key: k.key,
              url: k.url,
              img: k.img,
              imgTxt: k.imgTxt,
              Personnel: k.Personnel,
              child_menu_name: k.name,
              is_child_btn_show: false
            };
          }));
        } else {
          // 否则添加所有配置好的子菜单
          return k.map((k) => {
            return {
              type: k.type,
              key: k.key,
              url: k.url,
              img: k.img,
              imgTxt: k.imgTxt,
              Personnel: k.Personnel,
              child_menu_name: k.name,
              is_child_btn_show: false
            };
          });
        }
      },
      selMarkFun () {
        this.getMenuFun();
      },
      // 默认加载的数据操作
      defaultData (data) {
        data.forEach((k) => {
          if (k.type === 'click') {
            let kf = k.key.slice(0, 2);
            // 如果是客服
            if (kf !== 'kf') {
              k.type = '';
            } else {
              if (k.key.indexOf('user') !== -1) {
                // 客服人员
                k['Personnel'] = {
                  uid: k.key.slice(k.key.lastIndexOf('_') + 1)
                };
              } else if (k.key.indexOf('group') !== -1) {
                // 客服分组
                k['Personnel'] = {
                  user_group_id: k.key.slice(k.key.lastIndexOf('_') + 1)
                };
              }
            }
          } else if (k.type === 'view_limited') {
            k.imgTxt = {
              media_id: k.media_id
            };
          } else if (k.type === 'media_id') {
            k.img = {
              media_id: k.media_id
            };
          }
          k.sub_button.map((s) => {
            if (s.type === 'click') {
              let kf = s.key.slice(0, 2);
              if (kf !== 'kf') {
                s.type = '';
              } else {
                if (s.key.indexOf('user') !== -1) {
                  // 客服人员
                  s['Personnel'] = {
                    uid: s.key.slice(s.key.lastIndexOf('_') + 1)
                  };
                } else if (s.key.indexOf('group') !== -1) {
                  // 客服分组
                  s['Personnel'] = {
                    user_group_id: s.key.slice(s.key.lastIndexOf('_') + 1)
                  };
                }
              }
            } else if (s.type === 'view_limited') {
              s.imgTxt = {
                media_id: s.media_id
              };
            } else if (s.type === 'media_id') {
              s.img = {
                media_id: s.media_id
              };
            }
            return s;
          });
        });
        if (data.length !== 0) {
          // 如果有菜单配置
          data.forEach((k, i) => {
            // 如果子菜单 为空的时候，就启动默认增加按钮
            if (k.sub_button.length === 0) {
              this.menu.push({
                btn_txt: k.name,
                type: k.type,
                is_child_show: true,
                is_menu_txt_show: true,
                menu_name: k.name,
                is_menu_btn: false,
                img: k.img,
                imgTxt: k.imgTxt,
                Personnel: k.Personnel,
                key: k.key,
                url: k.url,
                child_menu: [
                  {
                    type: null,
                    is_child_btn_show: true,
                    child_menu_name: ''
                  }
                ]
              });
            } else {
              // 如果子菜单不为空的时候，添加菜单
              this.menu.push({
                btn_txt: k.name,
                type: k.type,
                key: k.key,
                url: k.url,
                img: k.img,
                imgTxt: k.imgTxt,
                Personnel: k.Personnel,
                is_child_show: true,
                is_menu_txt_show: true,
                menu_name: k.name,
                is_menu_btn: false,
                // 子菜单 方法
                child_menu: this.arr(k.sub_button)
              });
            }
          });
        } else {
          // 如果没有设置菜单，就启动默认菜单配置项
          this.menu.push(
            {
              is_btn: true,
              btn_txt: '添加菜单',
              menu_name: '',
              type: null,
              is_menu_btn: true,
              is_menu_txt_show: false,
              is_child_show: false,
              child_menu: [
                {
                  type: null,
                  child_menu_name: '',
                  is_child_btn_show: true
                }
              ]
            }
          );
        }
        // 判断菜单是否小于三个 并启动默认添加按钮
        if (this.menu.length < 3) {
          this.menu.push({
            is_btn: true,
            btn_txt: '添加菜单',
            menu_name: '',
            type: null,
            is_menu_btn: true,
            is_menu_txt_show: false,
            is_child_show: false,
            child_menu: [
              {
                type: null,
                child_menu_name: '',
                is_child_btn_show: true
              }
            ]
          });
        }
      },
      /* tab的切换方法 */
      selTabFun (k) {
        if (this.menu_child_i === null) {
          // 菜单 添加所选type 类型
          this.menu[this.menu_i]['type'] = this.is_tab === 'name2' ? 'view' : this.is_tab === 'name1' ? '' : this.is_tab === 'name3' ? 'click' : 'click';
        } else if (this.menu_child_i !== null) {
          // 子菜单 添加所选type 类型
          this.menu[this.menu_i].child_menu[this.menu_child_i]['type'] = this.is_tab === 'name2' ? 'view' : this.is_tab === 'name1' ? '' : this.is_tab === 'name3' ? 'click' : 'click';
        }
      },
      // 选择客服人员
      selPersonnel (v) {
        if (this.menu_child_i === null) {
          // 菜单 添加所选客服数据
          this.menu[this.menu_i]['Personnel'] = v;
        } else if (this.menu_child_i !== null) {
          // 子菜单 添加所选客服数据
          this.menu[this.menu_i].child_menu[this.menu_child_i]['Personnel'] = v;
        }
      },
      // 清除客服选择项目
      handleClearCurrentRow () {
        this.$refs.currentRowTable.clearCurrentRow();
      },
      // 获取部门列表
      getSection () {
        this.is_Loading = true;
        this.ajax.getSection({
          data: {},
          success: (res) => {
            this.is_Loading = false;
            this.data2 = res.body;
            // this.getUserList();
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      /* 获取客服列表 */
      getUserList () {
        this.is_Loading = true;
        this.ajax.getCustomerServiceList({
          data: {
            appid: this.model1,
            page: this.pageData.page
          },
          success: (res) => {
            console.log(res.body);
            this.is_Loading = false;
            this.pageData.count = parseInt(res.body.page_data.count);
            this.pageData.rows_num = res.body.page_data.rows_num;
            this.data1 = res.body.data_list;
          },
          error: (res) => {
            this.is_Loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 分页
      pageFun (v) {
        this.pageData.page = v;
        this.getUserList();
      },
      // 表格单行数据方法
      seltabFun (v) {
      },
      createWindow () {
        this.$router.push({
          name: 'winEdit',
          query: {
            appid: this.model1
          }
        });
      },
      // 获取素材/图文/图片
      getMaterial (t) {
        this.is_Loading = true;
        this.ajax.getArticleList({
          data: {
            page: this.pageData1.page,
            appid: this.model1,
            type: this.is_img_txt
          },
          success: (res) => {
            this.is_Loading = false;
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
      // 素材分页
      pageFun1 (v) {
        this.pageData1.page = v;
        this.getMaterial();
      },
      // 获取图文素材
      imgTxtFun () {
        this.is_img_txt = 'news';
        this.pageData1.page = 1;
        this.getMaterial();
      },
      // 获取图片
      imgFun () {
        this.is_img_txt = 'image';
        this.pageData1.page = 1;
        this.getMaterial();
      },
      // 选择素材
      selImgTxtFun (v) {
        if (this.menu_child_i === null) {
          // 菜单 改变type参数 并 加入所选数据
          this.menu[this.menu_i]['type'] = 'view_limited';
          this.menu[this.menu_i]['imgTxt'] = v;
        } else if (this.menu_child_i !== null) {
          // 子菜单 改变type参数 并 加入所选数据
          this.menu[this.menu_i].child_menu[this.menu_child_i]['type'] = 'view_limited';
          this.menu[this.menu_i].child_menu[this.menu_child_i]['imgTxt'] = v;
        }
      },
      // 选择图片
      selTxtFun (v) {
        if (this.menu_child_i === null) {
          // 菜单 改变type参数 并 加入所选数据
          this.menu[this.menu_i]['type'] = 'media_id';
          this.menu[this.menu_i]['img'] = v;
        } else if (this.menu_child_i !== null) {
          // 子菜单 改变type参数 并 加入所选数据
          this.menu[this.menu_i].child_menu[this.menu_child_i]['type'] = 'media_id';
          this.menu[this.menu_i].child_menu[this.menu_child_i]['img'] = v;
        }
      },
      // 组合数据
      combination () {
        let arr = [];
        console.log(this.menu);
        for (let i = 0; i < this.menu.length; i++) {
          // 首选筛选设置的菜单
          if (this.menu[i].is_menu_btn !== true) {
            if (this.menu[i].child_menu.length === 1 && this.menu[i].child_menu[0].is_child_btn_show === true) {
              let obj = {};
              // 没有子菜单的时候
              if (this.menu[i].type === 'media_id') {
                // 图片
                obj['media_id'] = this.menu[i].img.media_id;
                obj['name'] = this.menu[i].menu_name;
                obj['type'] = this.menu[i].type;
                obj['sub_button'] = [];
              } else if (this.menu[i].type === 'view_limited') {
                // 图文
                obj['media_id'] = this.menu[i].imgTxt.media_id;
                obj['name'] = this.menu[i].menu_name;
                obj['type'] = this.menu[i].type;
                obj['sub_button'] = [];
              } else if (this.menu[i].type === 'view') {
                // 网址
                if (this.menu[i].url === undefined || this.menu[i].url === '') {
                  this.$Message.warning(this.menu[i].menu_name + '--> 请输入网址/url！！！');
                  break;
                }
                obj['url'] = this.menu[i].url;
                obj['name'] = this.menu[i].menu_name;
                obj['type'] = this.menu[i].type;
                obj['sub_button'] = [];
              } else if (this.menu[i].type === 'click') {
                if (this.animal === '客服人员') {
                  // 客服
                  if (this.menu[i].Personnel === undefined || this.menu[i].Personnel === '') {
                    this.$Message.warning(this.menu[i].menu_name + '--> 请选择客服人员！！！');
                    break;
                  }
                  obj['key'] = 'kf_user_' + this.menu[i].Personnel.uid;
                  obj['name'] = this.menu[i].menu_name;
                  obj['type'] = this.menu[i].type;
                  obj['sub_button'] = [];
                } else if (this.animal === '客服分组') {
                  // 客服分组
                  if (this.menu[i].Personnel === undefined || this.menu[i].Personnel === '') {
                    this.$Message.warning(this.menu[i].menu_name + '--> 请选择客服分组！！！');
                    break;
                  }
                  obj['key'] = 'kf_group_' + this.menu[i].Personnel.user_group_id;
                  obj['name'] = this.menu[i].menu_name;
                  obj['type'] = this.menu[i].type;
                  obj['sub_button'] = [];
                } else {
                  obj['key'] = 'kf_other';
                  obj['name'] = this.menu[i].menu_name;
                  obj['type'] = this.menu[i].type;
                  obj['sub_button'] = [];
                }
              } else if (this.menu[i].type === '') {
                this.$Message.warning(this.menu[i].menu_name + '--> 请选择图文或图片！！！');
                break;
              }
              arr.push(obj);
            } else {
              // 有子菜单的时候
              let arr1 = [];
              for (let s = 0; s < this.menu[i].child_menu.length; s++) {
                if (this.menu[i].child_menu[s].child_menu_name && this.menu[i].child_menu[s].is_child_btn_show === false) {
                  let obj = {};
                  if (this.menu[i].child_menu[s].type === 'media_id') {
                    // 图片
                    obj['media_id'] = this.menu[i].child_menu[s].img.media_id;
                    obj['name'] = this.menu[i].child_menu[s].child_menu_name;
                    obj['type'] = this.menu[i].child_menu[s].type;
                    obj['sub_button'] = [];
                  } else if (this.menu[i].child_menu[s].type === 'view_limited') {
                    // 图文
                    obj['media_id'] = this.menu[i].child_menu[s].imgTxt.media_id;
                    obj['name'] = this.menu[i].child_menu[s].child_menu_name;
                    obj['type'] = this.menu[i].child_menu[s].type;
                    obj['sub_button'] = [];
                  } else if (this.menu[i].child_menu[s].type === 'view') {
                    // 网址
                    if (this.menu[i].child_menu[s].url === undefined || this.menu[i].child_menu[s].url === '') {
                      this.$Message.warning(this.menu[i].child_menu[s].child_menu_name + '--> 请输入网址/url！！！');
                      break;
                    }
                    obj['url'] = this.menu[i].child_menu[s].url;
                    obj['name'] = this.menu[i].child_menu[s].child_menu_name;
                    obj['type'] = this.menu[i].child_menu[s].type;
                    obj['sub_button'] = [];
                  } else if (this.menu[i].child_menu[s].type === 'click') {
                    if (this.animal === '客服人员') {
                      // 客服
                      if (this.menu[i].child_menu[s].Personnel === undefined || this.menu[i].child_menu[s].Personnel === '') {
                        this.$Message.warning(this.menu[i].child_menu[s].child_menu_name + '--> 请选择客服人员！！！');
                        break;
                      }
                      obj['key'] = 'kf_user_' + this.menu[i].child_menu[s].Personnel.uid;
                      obj['name'] = this.menu[i].child_menu[s].child_menu_name;
                      obj['type'] = this.menu[i].child_menu[s].type;
                      obj['sub_button'] = [];
                    } else if (this.animal === '客服分组') {
                      // 客服分组
                      if (this.menu[i].child_menu[s].Personnel === undefined || this.menu[i].child_menu[s].Personnel === '') {
                        this.$Message.warning(this.menu[i].child_menu[s].child_menu_name + '--> 请选择客服分组！！！');
                        break;
                      }
                      obj['key'] = 'kf_group_' + this.menu[i].child_menu[s].Personnel.user_group_id;
                      obj['name'] = this.menu[i].child_menu[s].child_menu_name;
                      obj['type'] = this.menu[i].child_menu[s].type;
                      obj['sub_button'] = [];
                    } else {
                      obj['key'] = 'kf_other';
                      obj['name'] = this.menu[i].child_menu[s].child_menu_name;
                      obj['type'] = this.menu[i].type;
                      obj['sub_button'] = [];
                    }
                  } else if (this.menu[i].child_menu[s].type === '') {
                    this.$Message.warning(this.menu[i].child_menu[s].child_menu_name + '--> 请选择图文或图片！！！');
                    break;
                  }
                  arr1.push(obj);
                }
              }
              arr.push({
                name: this.menu[i].menu_name,
                sub_button: arr1
              });
            }
          }
        }
        return arr;
      },
      // 自定义菜单提交接口
      setCustomMeunFun () {
        let data = {
          appid: this.model1,
          menu_list: this.combination()
        };
        if (data.menu_list.length === 0) {
          return;
        }
        this.ajax.setMenu({
          data: data,
          success: (res) => {
            this.$router.push({
              name: 'enhance',
              query: {
                tab: 'name1'
              }
            });
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 个性化菜单提交接口
      setIndividuationFun () {
        let data = {
          appid: this.model1,
          menu_list: this.combination(),
          match_rule: {
            tag_id: '',
            sex: this.sex,
            country: '中国',
            province: this.area[1] || '',
            city: this.area[2] || '',
            client_platform_type: this.phone_type,
            language: 'zh_CN'
          }
        };
        if (data.menu_list.length === 0) {
          return;
        }
        this.ajax.setWxIndividualizationMenu({
          data: data,
          success: (res) => {
            this.$router.push({
              name: 'enhance',
              query: {
                tab: 'name2'
              }
            });
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 提交数据
      addMenuFun () {
        if (this.is_individuation) {
          this.setIndividuationFun();
        } else {
          this.setCustomMeunFun();
        }
      },
      // 删除当前菜单
      delMeun () {
        if (this.menu_child_i === null) {
          // 删除
          this.menu[this.menu_i].is_btn = true;
          this.menu[this.menu_i].btn_txt = '添加菜单';
          this.menu[this.menu_i].menu_name = '';
          this.menu[this.menu_i].type = null;
          this.menu[this.menu_i].is_menu_btn = true;
          this.menu[this.menu_i].is_menu_txt_show = false;
          this.menu[this.menu_i].is_child_show = false;
          this.menu[this.menu_i].child_menu = [{
            type: null,
            is_child_btn_show: true,
            child_menu_name: ''
          }];
        } else if (this.menu_child_i !== null) {
          // 删除子菜单
          if (this.menu[this.menu_i].child_menu.length === 5 && this.menu[this.menu_i].child_menu[0].is_child_btn_show === false) {
            this.menu[this.menu_i].child_menu[this.menu_child_i].type = null;
            this.menu[this.menu_i].child_menu[this.menu_child_i].is_child_btn_show = true;
            this.menu[this.menu_i].child_menu[this.menu_child_i].child_menu_name = '';
            this.menu[this.menu_i].child_menu[this.menu_child_i].is_th = true;
          } else {
            this.menu[this.menu_i].child_menu.splice(this.menu_child_i, 1);
          }
        }
      }
    },
    created () {
      this.is_individuation = this.$route.query.is_individuation;
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body;
          this.model1 = res.body[0].appid;
          this.getUserList();
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });

      this.getSection();
      // 默认地区方法
      for (let item of address) {
        let obj1 = {};
        obj1.value = item._area;
        obj1.label = item._area;
        obj1.children = [];
        for (let index of item.Allcity) {
          let obj2 = {};
          obj2.value = index.name;
          obj2.label = index.name;
          obj2.children = [];
          for (let ctl of index.cityList) {
            let obj3 = {};
            obj3.value = ctl.name;
            obj3.label = ctl.name;
            obj3.children = [];
            obj2.children.push(obj3);
          }
          obj1.children.push(obj2);
        }
        this.addressData.push(obj1);
      }
      console.log(157894561236);
    }
  };
</script>
