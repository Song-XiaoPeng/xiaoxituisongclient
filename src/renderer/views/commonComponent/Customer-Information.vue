<style scoped lang="less">
.info-box{
    padding: 10px;
}
    .tel{
        padding: 5px 0;
        font-weight: bold;
        font-size: 16px;
    }
    .tab-box{
        overflow: auto;
        /* border-top: 1px #eaeaea solid; */
        padding-top: 10px;
    }
@media all and (min-height:800px) and (max-height:1000px){
    /*.tab-box{*/
        /*height: 550px*/
    /*}*/
}
@media all and (min-height:1000px) and (max-height:1200px){
    /*.tab-box{*/
        /*height: 750px*/
    /*}*/
}
@media all and (min-height:1201px){
    /*.tab-box{*/
        /*height: 900px*/
    /*}*/
}
</style>
<template>
   <div class="info-box">
       <div>
           <!--<Select v-model="model1" style="width:150px">-->
               <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
           <!--</Select>-->
           <!--<Input v-model="seekVal" placeholder="搜索常用术语" style="width: 150px"></Input>-->
           <Button type="info"   @click="popup1 = true" icon="plus-round">添加快捷回复</Button>
           <Select v-model="common_id1" class="f-r" style="width: 200px">
               <Option v-for="(item, i) in cityList" :value="item.reply_group_id" :key="i">{{item.group_name}}</Option>
           </Select>
       </div>
       <div class="tab-box">
           <div class="tel">
               我的常用话术
           </div>
          <Table border :columns="columns7"  :show-header="false" :data="data6" @on-current-change="selShortcutTxtFun"></Table>
       </div>
       <div>
           <div class="tel cl">
               <span>企业常用话术</span>
               <Select v-model="firmGroupingId" class="f-r" style="width: 200px">
                   <Option :value="k.reply_group_id" v-for="(k, i) in cityList1" :key="i">{{k.group_name}}</Option>
               </Select>
           </div>
           <Table border :columns="columns8" :show-header="false" :data="data8"></Table>
           <div class="" style="padding: 5px; text-align: center;">
               <Page :total="pageData1.count" :page-size="pageData1.rows_num"  @on-change="pageFun1"></Page>
           </div>
       </div>




       <!-- 添加文字弹窗 dsad-->
       <Modal v-model="popup1" title="快捷回复" @on-ok="addShortcutTxtFun">
           <div class="cl" style="padding: 5px">
               <Select v-model="common_id" class="f-r" style="width: 200px">
                   <Option v-for="(item, i) in cityList" :value="item.reply_group_id" :key="i">{{item.group_name}}</Option>
               </Select>
               <Button type="info"   @click="popup3 = true" size="small" icon="plus-round">添加分组 </Button>
           </div>
           <div>
               <Input v-model="txt" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入快捷回复内容"></Input>
           </div>
       </Modal>
       <!-- end添加文字弹窗 -->

       <!-- 添加文字弹窗 dsad-->
       <Modal v-model="popup3" title="分组">
           <div style="max-height: 400px;overflow: auto">
               <Form id="client-form" label-position="right" :label-width="80" style="border-bottom: 0">
                   <FormItem label="组名称">
                       <Input v-model="val1" style="width:  50%;" placeholder="请输入"></Input>
                       <Button type="info"   @click="addUserQuickReplyGroup">添加</Button>
                   </FormItem>
                   <FormItem label="组列表">
                       <Table border :columns="columns9" :show-header="false" :data="data9"></Table>
                   </FormItem>
               </Form>
           </div>
       </Modal>
       <!-- end添加文字弹窗 -->



   </div>
</template>
<script>
    import Bus from '../../assets/eventBus';
    export default {
      data () {
        return {
          seekVal: '',
          cityList: [],
          model1: '',
          popup1: false,
          popup3: false,
          columns7: [
            {
              title: '内容',
              render: (h, p) => {
                return h('div', {
                  style: {
                    padding: '10px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.selShortcutTxtFun(p.row);
                    }
                  }
                }, p.row.quick_reply_text);
              }
            },
            {
              title: 'Action',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('div', {
                  style: {
                    padding: '0'
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                    },
                    on: {
                      click: () => {
                        // 立即发送， 传递参数到聊天窗口页面并调用发送方法
                        Bus.$emit('promptlyShortcutTxtFun', params.row);
                      }
                    }
                  }, '发送'),
                  h('Button', {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      marginLeft: '5px'
                    },
                    on: {
                      click: () => {
                        this.txt = params.row.quick_reply_text;
                        this.quick_reply_id = params.row.quick_reply_id;
                        this.popup1 = true;
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
                        this.delShortcutTxtFun(params.row, params.index);
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          data6: [],
          data8: [],
          data9: [],
          columns9: [
            {
              title: '名称',
              key: 'group_name'
            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('div', {
                  style: {
                    padding: '0'
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                    },
                    on: {
                      click: () => {
                        // 立即发送， 传递参数到聊天窗口页面并调用发送方法
                        this.delUserQuickReplyFun(params.row.reply_group_id, params.index);
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          columns8: [
            {
              title: '内容',
              render: (h, p) => {
                return h('div', {
                  style: {
                    padding: '10px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.selShortcutTxtFun(p.row);
                    }
                  }
                }, p.row.quick_reply_text);
              }
            },
            {
              title: 'Action',
              key: 'action',
              align: 'center',
              render: (h, params) => {
                return h('div', {
                  style: {
                    padding: '0'
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                    },
                    on: {
                      click: () => {
                        // 立即发送， 传递参数到聊天窗口页面并调用发送方法
                        Bus.$emit('promptlyShortcutTxtFun', params.row);
                      }
                    }
                  }, '发送')
                ]);
              }
            }
          ],
          txt: '',
          quick_reply_id: '',
          popup2: false,
          pageData1: {
            count: 0,
            rows_num: 0,
            page: 1
          },
          common_id: '',
          common_id1: '',
          val1: '',
          cityList1: [],
          firmGroupingId: ''
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {
        // 获取企业话术分组
        getCommonQuickReplyGroup () {
          this.ajax.getCommonQuickReplyGroup({
            data: {
            },
            success: (res) => {
              this.cityList1 = res.body;
              this.firmGroupingId = this.cityList1[0].reply_group_id;
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 删除个人快捷回复
        delUserQuickReplyFun (id, i) {
          this.ajax.delUserQuickReplyGroup({
            data: {
              reply_group_id: id
            },
            success: (res) => {
              this.$Message.success(`操作成功`);
              this.data9.splice(i, 1);
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 获取个人快捷回复分组 dawddwad
        getUserQuickReplyGroup () {
          this.ajax.getUserQuickReplyGroup({
            data: {},
            success: (res) => {
              this.cityList = res.body;
              this.data9 = res.body;
              this.common_id1 = this.cityList[0].reply_group_id;
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 添加编辑快捷回复分组
        addUserQuickReplyGroup () {
          this.ajax.addUserQuickReplyGroup({
            data: {
              reply_group_id: this.common_id,
              group_name: this.val1
            },
            success: (res) => {
              this.common_id = '';
              this.val1 = '';
              this.$Message.success(`操作成功`);
              this.getUserQuickReplyGroup();
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 添加快捷回复 dadw
        addShortcutTxtFun () {
          this.ajax.setQuickReplyText({
            data: {
              reply_group_id: this.common_id,
              quick_reply_id: this.quick_reply_id,
              text: this.txt
            },
            success: (res) => {
              this.quick_reply_id = '';
              this.$Message.success(`操作成功`);
              this.getShortcutTxtFun();
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 获取快捷回复列表
        getShortcutTxtFun () {
          this.ajax.getQuickReplyList({
            data: {
              reply_group_id: this.common_id1
            },
            success: (res) => {
              this.data6 = res.body;
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 选中表格一条数据的方法  传递数据到聊天窗口 文本域中 dwadwd
        selShortcutTxtFun (v, e) {
          Bus.$emit('ShortcutTxtFun', v);
        },
        // 删除
        delShortcutTxtFun (k, i) {
          this.ajax.delUserQuickReply({
            data: {
              quick_reply_id: k.quick_reply_id
            },
            success: (res) => {
              this.data6.splice(i, 1);
              this.$Message.success('删除成功');
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 获取企业话术列表
        getEnterpriseTxtListFun () {
          this.ajax.getEnterpriseSentence({
            data: {
              page: this.pageData1.page,
              reply_group_id: this.firmGroupingId
            },
            success: (res) => {
              this.data8 = res.body.data_list;
              this.pageData1.count = parseInt(res.body.page_data.count);
              this.pageData1.rows_num = parseInt(res.body.page_data.rows_num);
            },
            error: (res) => {
              this.$Message.waiting(res.meta);
            }
          });
        },
        // 分页 123132
        pageFun1 (v) {
          this.pageData1.page = v;
          this.getEnterpriseTxtListFun();
        }
      },
      watch: {
        common_id1: function (v) {
          this.getShortcutTxtFun();
        },
        firmGroupingId: function (v) {
          this.getEnterpriseTxtListFun();
        }
      },
      created () {
        this.getUserQuickReplyGroup();
        this.getCommonQuickReplyGroup();
      }
    };
</script>
