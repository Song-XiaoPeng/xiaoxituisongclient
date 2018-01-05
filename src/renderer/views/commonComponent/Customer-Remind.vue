<style scoped lang="less">
    .remind-box{
        padding: 10px;
        height: 100%;
    }
    .list{
        padding: 5px 0;
        overflow: auto;
        .tel{
            color: #999;
            padding: 5px 0;
        }
        .txt{
            box-sizing: border-box;
            border:1px #d7dde4 solid;
            .warn{
                padding: 5px;
                box-sizing: border-box;
                color: #666666;
                border-bottom: 1px #d7dde4 solid;
            }
            .fulfill{
                padding: 5px;
                display: -webkit-box;
                .left,.right{
                    min-height: 50px;
                }
                .left{
                    width: 75%;
                    textarea{
                        height: 100%;
                        width: 100%;
                        border: 0;
                        resize : none;
                        outline: 0;
                    }
                }
                .right{
                    width: 25%;
                    position: relative;
                    .icon-btn-box{
                        position: absolute;
                        width: 100%;
                        top:50%;
                        height: 50px;
                        margin-top: -25px;
                        text-align: center;
                        div>img{
                            height: 30px;
                            width: 30px;
                            border-radius: 50%;
                        }
                        .btn{
                            cursor: pointer;
                            span{
                                transition: all .3s;
                            }
                            span:hover{
                                color: #3399ff;
                            }
                        }
                    }
                }
            }
        }
    }
    @media all and (min-height:800px) and (max-height:1000px){
        .list{
            height: 440px
        }
    }
    @media all and (min-height:800px) and (max-height:1000px){
        .list{
            height: 540px
        }
    }
    @media all and (min-height:1000px) and (max-height:1200px){
        .list{
            height: 740px
        }
    }
    @media all and (min-height:1201px){
        .list{
            height: 840px
        }
    }

</style>
<template>
    <div class="remind-box">
        <div>
            <Button class="" size="small" type="info"  @click="popup1 = true">添加提醒</Button>
        </div>
        <div class="list">
            <div v-for="(k, i) in remindListArr">
                <p class="tel" style="color: #999">创建人：&nbsp;{{k.create_user_name}}&nbsp;&nbsp;创建时间：{{k.add_time}} </p>
                <p class="tel cl" style="color: #666666">提醒日期：&nbsp;{{k.remind_time}}&nbsp;&nbsp;客服：{{k.customer_service_name}}
                    <Button v-if="k.is_complete == -1" class="f-r" size="small" type="info" @click="RemindData = k, popup2 = true">设为完成</Button>
                </p>
                <div class="txt">
                    <div class="warn">
                        提醒内容:&nbsp;{{k.remind_content}}
                    </div>
                    <div class="fulfill">
                        <div class="left">
                            <span v-if="k.is_complete == 1">{{k.complete_content == null ? '暂无内容': k.complete_content}}</span>
                            <!--<textarea v-if="k.is_complete == -1" v-model="k.txtra" rows="5" cols="2" @input="descInput(k)" placeholder="请输入。。。"></textarea>-->
                        </div>
                        <div class="right">
                            <div class="icon-btn-box">
                                <div>
                                    <img v-if="k.is_complete == -1" src="~@/assets/images/remind-icon1.png" alt="">
                                    <img v-if="k.is_complete == 1" src="~@/assets/images/remind-icon2.png" alt="">
                                </div>
                                <div class="btn">
                                    <span v-if="k.is_complete == -1" style="color: #efbc6c;" @click="popup3 = true, RemindData = k,RemindDate = k.remind_time, txta = k.remind_content">修改</span>
                                    <span style="color: #efbc6c;margin: 0 5px" @click="delFulfillFun(k)">删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="padding: 5px;text-align: center;">
            <Page :total="pageData.count" :page-size="pageData.row_sum" @click="pageFun"></Page>
        </div>

        <!-- 添加提醒弹窗 -->
        <Modal v-model="popup1" title="添加提醒" @on-ok="addRemind">
            <Form :label-width="100">
                <FormItem label="提醒日期：">
                    <DatePicker type="date" placeholder="提醒时间" style="width: 100%" @on-change="dateFun"></DatePicker>
                </FormItem>
                <!--<FormItem label="提醒条目：">-->
                <!--<Select v-model="model1">-->
                <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed">设置</Button>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <FormItem label="具体内容：">
                    <Input v-model="txta" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
                </FormItem>
                <!--<FormItem label="工作人员：">-->
                <!--<Select v-model="model1">-->
                <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed" >设置</Button>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem label="最后完成日期：">-->
                <!--<DatePicker type="date" placeholder="Select date" style="width: 100%"></DatePicker>-->
                <!--</FormItem>-->
            </Form>
        </Modal>
        <!-- end添加提醒 -->



        <!-- 修改提醒弹窗 -->
        <Modal v-model="popup3" title="修改" @on-ok="updateRemindFun">
            <Form :label-width="100">
                <FormItem label="提醒日期：">
                    <DatePicker type="date" placeholder="提醒时间" style="width: 100%" @on-change="dateFun"></DatePicker>
                </FormItem>
                <!--<FormItem label="提醒条目：">-->
                <!--<Select v-model="model1">-->
                <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed">设置</Button>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <FormItem label="具体内容：">
                    <Input v-model="txta" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
                </FormItem>
                <!--<FormItem label="工作人员：">-->
                <!--<Select v-model="model1">-->
                <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option><Button type="dashed" >设置</Button>-->
                <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem label="最后完成日期：">-->
                <!--<DatePicker type="date" placeholder="Select date" style="width: 100%"></DatePicker>-->
                <!--</FormItem>-->
            </Form>
        </Modal>
        <!-- end修改提醒 -->



        <!-- 完成提醒弹窗 -->
        <Modal v-model="popup2" title="完成提醒" @on-ok="setFulfillFun">
            <Form :label-width="100">
                <FormItem label="完成内容：">
                    <Input v-model="txta" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- end完成提醒弹窗 -->



        <!-- 状态 -->
        <Spin fix v-if="is_Loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>请求中....</div>
        </Spin>
        <!-- end状态 -->
    </div>
</template>
<script>
    import Bus from '../../assets/eventBus';
    export default {
      data () {
        return {
          clientData: null,
          is_Loading: false,
          txtra: '',
          remindListArr: [],
          popup1: false,
          popup2: false,
          txta: '',
          RemindDate: '',
          userInfo: '',
          pageData: {
            count: 1,
            page: 1,
            rows_num: 1
          },
          RemindData: '',
          popup3: false,
          userData: {}
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {
        // 获取业务提醒数据列表
        getRemindList () {
          this.is_Loading = true;
          this.ajax.getRemindList({
            data: {
              customer_info_id: this.clientData.customer_info_id,
              page: this.pageData.page,
              is_remind: '1'
            },
            success: (res) => {
              res.body.data_list.forEach((k) => {
                if (k.is_complete === -1) {
                  Object.assign(k, {'is_edit': false});
                  Object.assign(k, {'txtra': ''});
                }
              });
              this.remindListArr = res.body.data_list;
              this.pageData.count = parseInt(res.body.page_data.count);
              this.pageData.row_sum = parseInt(res.body.page_data.rows_num);
              this.is_Loading = false;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 添加业务提醒
        addRemind () {
          this.is_Loading = true;
          this.ajax.addRemind({
            data: {
              remind_content: this.txta,
              customer_info_id: this.clientData.customer_info_id,
              remind_time: this.RemindDate,
              remind_uid: this.userInfo.uid,
              remind_type: this.userData.user_info.is_clue === -1 || 1 ? 1 : this.userData.user_info.is_clue === 2 || 3 ? 2 : this.userData.user_info.is_clue === 4 ? 3 : ''
            },
            success: (res) => {
              // 如果添加成功 通知业务提醒组件更新数据
              this.pageData.page = 1;
              this.getRemindList();
              this.is_Loading = false;
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
          this.getRemindList();
        },
        // 设为已完成
        setFulfillFun () {
          this.is_Loading = true;
          this.ajax.setComplete({
            data: {
              remind_id: this.RemindData.remind_id,
              complete_content: this.txta
            },
            success: (res) => {
              this.txtra = '';
              this.getRemindList();
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 修改提醒
        updateRemindFun () {
          if (this.txta === '') {
            this.$Message.warning('内容不能为空');
            return;
          } else if (this.RemindDate === '') {
            this.$Message.warning('请选择时间');
            return;
          }
          this.is_Loading = true;
          this.ajax.updateRemindTime({
            data: {
              remind_id: this.RemindData.remind_id,
              remind_time: this.RemindDate,
              remind_content: this.txta,
              remind_type: this.userData.user_info.is_clue === -1 || 1 ? 1 : this.userData.user_info.is_clue === 2 || 3 ? 2 : this.userData.user_info.is_clue === 4 ? 3 : ''
            },
            success: (res) => {
              this.txtra = '';
              this.getRemindList();
              this.is_Loading = false;
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 删除提醒
        delFulfillFun (k) {
          this.ajax.delRemind({
            data: {
              remind_id: k.remind_id
            },
            success: (res) => {
              this.getRemindList();
            },
            error: (res) => {
              this.is_Loading = false;
              this.$Message.warning(res.meta.message);
            }
          });
        },
        // 时间选择
        dateFun (v) {
          this.RemindDate = v;
        }
      },
      destroyed (s) {
        // Bus.$off();
      },
      created () {
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        Bus.$on('change', (k) => {
          this.clientData = k;
        });
        Bus.$on('is_remind', (k, obj, user) => {
          Object.assign(this.clientData, {'customer_info_id': k.customer_info_id});
          this.getRemindList();
        });
        // 获取客户信息传递本页面
        Bus.$on('userEV', (user) => {
          this.userData = user;
        });
      }
    };
</script>
