<style scoped lang="less">
    .record-box{
        padding: 10px;
        height: 100%;
        position: relative;
        .top{
            border-bottom: 1px #eaeaea solid;
        }
        .top>div{
            padding: 5px 0;

        }
        .middle{
            padding: 5px 0;
            border-bottom: 1px #eaeaea solid;
        }
        .list{

        }
    }
</style>
<template>
   <div class="record-box">
       <div class="top">
           <div><span class="">来源：</span><span style="color: #999">网</span></div>
           <div><span class="">会话次数：</span><span style="color: #999">5此</span></div>
           <div><span class="">首次沟通：</span><span style="color: #999">2017-09-09 上海</span></div>
           <div><span class="">最近沟通：</span><span style="color: #999">217-05-05 baij</span></div>
       </div>
       <div class="middle">
           <Select v-model="model1" style="width:200px">
               <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
           <Select v-model="model1" style="width:200px">
               <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
       </div>
       <div class="list">
          <div class="cl">
              <p style="padding: 2px 0;color: #2db7f5">你大特 2017-05-05 10:00</p>
              <div>
                  dwadaw
              </div>
          </div>
       </div>
   </div>
</template>
<script>
    export default {
      data () {
        return {
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
          model1: ''
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {}
    };
</script>
