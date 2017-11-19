<style scoped lang="less">
 .box{
     margin: 10px;
     overflow: hidden;
 }
   .client{
      border-bottom: 1px #eaeaea solid;
      position: relative;
      height: 130px;
      width: 100%;
      overflow: hidden;
      .portrait{
         height: 100px;
         width: 100px;
         overflow: hidden;
         border: 1px #eaeaea solid;
         img{
            width: 100%;
            height: 100%;
         }
      }
      .txt{
         position: absolute;
         top:0;
         left: 110px;
         right: 0;
         bottom: 30px;
         ul{
            height: 100%;
            li{
               height: 25%;
               line-height: 25px;
            }
         }
      }
      .txt-bot{
         height: 30px;
         line-height: 30px;
         position: absolute;
         bottom: 0;
         right: 0;
         left: 0;
      }
   }
   .form-box{
      padding: 10px;
      border-bottom: 1px #eaeaea solid;
      max-height: 400px;
      width: 100%;
      overflow-y: scroll;
   }
   .custom-group-box{
      padding: 10px;
   }
</style>
<template>
   <div class="box">
      <div class="client cl">
         <div class="portrait f-l">
            <img src="" alt="">
         </div>
         <div class="txt f-l">
            <ul>
               <li><span>微信名称：</span> <span style="color:#999">asda</span> </li>
               <li><span>来源：</span> <span style="color:#999">官网</span> </li>
               <li><span>公共平台</span> <span style="color:#999">哇大王</span> </li>
               <li><span>会话次数</span> <span style="color:#999">5次</span> </li>
            </ul>
         </div>
         <div class="txt-bot">
           <span>首次沟通：</span>
           <span>2017-03-05</span>
           <span style="color: #2db7f5">张三</span>
           <span style="margin-left: 10px">最近沟通：</span>
           <span >2017-03-05</span>
           <span style="color: #2db7f5">张三</span>
         </div>
      </div>
      <div class="form-box">
         <Form label-position="right" :label-width="80">
            <FormItem label="粉丝分组：">
               <Select v-model="model1" style="width:  100%;">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>
            <FormItem label="客户生日：" >
               <DatePicker type="datetime" placeholder="选择时间" style="width:  100%;"></DatePicker>
            </FormItem>
            <FormItem label="性别：" >
               <RadioGroup v-model="sex">
                  <Radio label="1">
                     <span>男</span>
                  </Radio>
                  <Radio label="2">
                     <span>女</span>
                  </Radio>
               </RadioGroup>
            </FormItem>
            <FormItem :label="k.label" v-for="(k,i) in formData" :key="i">
               <Input v-model="k.value" style="width:  100%;"></Input>
            </FormItem>
            <FormItem label="备注">
               <Input type="textarea" style="width: 100%;"></Input>
            </FormItem>
         </Form>
      </div>
      <div class="custom-group-box">
         <Button type="dashed" class="f-r"  @click="modal1 = true" icon="plus-round">添加标签</Button>
      </div>
      <Modal v-model="modal1" title="选项名称" @on-ok="ok">

      </Modal>
   </div>
</template>
<script>
    export default {
      data () {
        return {
          formData: [
            {
              label: '公司名称：',
              value: ''
            },
            {
              label: '客户姓名：',
              value: ''
            },
            {
              label: '微信号：',
              value: ''
            },
            {
              label: '邮箱：',
              value: ''
            },
            {
              label: '手机号码：',
              value: ''
            },
            {
              label: '微信号码：',
              value: ''
            }
          ],
          cityList: [
            {
              value: 'New York',
              label: 'New York'
            },
            {
              value: 'London',
              label: 'London'
            },
            {
              value: 'Sydney',
              label: 'Sydney'
            },
            {
              value: 'Ottawa',
              label: 'Ottawa'
            },
            {
              value: 'Paris',
              label: 'Paris'
            },
            {
              value: 'Canberra',
              label: 'Canberra'
            }
          ],
          model1: '',
          addName: '',
          modal1: false,
          sex: 1
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {
        ok () {
        }
      }
    };
</script>
