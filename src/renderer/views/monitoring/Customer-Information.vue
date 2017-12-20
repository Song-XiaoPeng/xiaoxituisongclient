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
        margin-top: 10px;
        overflow: auto;
        /* border-top: 1px #eaeaea solid; */
        padding-top: 10px;
    }
@media all and (min-height:800px) and (max-height:1000px){
    .tab-box{
        height: 550px
    }
}
@media all and (min-height:1000px) and (max-height:1200px){
    .tab-box{
        height: 750px
    }
}
@media all and (min-height:1201px){
    .tab-box{
        height: 900px
    }
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
       </div>
       <div class="tab-box">
          <Table border :columns="columns7"  :show-header="false" :data="data6" @on-current-change="selShortcutTxtFun"></Table>
       </div>
       <!--<div>-->
           <!--<div class="tel">-->
               <!--企业常用话术-->
           <!--</div>-->
           <!--<Table border :columns="columns7" :show-header="false" :data="data6"></Table>-->
       <!--</div>-->




       <!-- 添加文字弹窗 -->
       <Modal v-model="popup1" title="快捷回复" @on-ok="addShortcutTxtFun">
           <Input v-model="txt" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入快捷回复内容"></Input>
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
          cityList: [
            {
              value: 'New York',
              label: 'New York'
            }
          ],
          model1: '',
          popup1: false,
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
          txt: '',
          quick_reply_id: ''
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {
        // 添加快捷回复
        addShortcutTxtFun () {
          this.ajax.setQuickReplyText({
            data: {
              quick_reply_id: this.quick_reply_id,
              text: this.txt
            },
            success: (res) => {
              this.quick_reply_id = '';
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
            data: {},
            success: (res) => {
              this.data6 = res.body;
            },
            error: (res) => {
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 选中表格一条数据的方法  传递数据到聊天窗口 文本域中
        selShortcutTxtFun (v, e) {
          Bus.$emit('ShortcutTxtFun', v);
        },
        // 删除
        delShortcutTxtFun (k, i) {
          this.ajax.delQuickReply({
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
        }
      },
      created () {
        this.getShortcutTxtFun();
      }
    };
</script>
