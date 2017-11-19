<style scoped lang="less">
.chart{
  position: relative;
}
.user-top{
    height: 40px;
    box-sizing: border-box;
    border-bottom: 1px #eaeaea solid;
    display: flex;
    align-items: center;
    .name{
        font-weight: bold;
        font-size: 14px;
        color: #1a1a1a;
        margin-left: 10px;
    }
    .txt{
        color: #999;
        margin-left: 10px;
    }
}
    .chart-win{
        height: 600px;
        border-bottom: 1px #eaeaea solid;
    }
    .is_mass_chart{
        height: 400px;
    }
    .chart-icon{
        height: 60px;
        overflow: hidden;
        line-height: 60px;
        border-bottom: 1px #eaeaea solid;
        span{
          font-size: 30px;
          padding:0 8px;
          cursor: pointer;
          border-radius: 2px;
          color: #999;
        }
        span:hover{
          background-color: #f7f7f7;
        }

    }
    .chart-txt{
       position: absolute;
        top:700px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 5px;
        box-sizing: border-box;
        .txt{
            height: 100%;
            width: 100%;
            border: 0;
            outline: 0;
            resize : none;
        }
        .btm{
            position: absolute;
            bottom: 0;
            left: 0;
            right:0;
            box-sizing: border-box;
            padding: 10px;
        }
    }
    .is_mass_chart-txt{
        position: relative;
        height: 200px;
        top:0;
    }
</style>
<template>
  <div class="chart-box">
     <div class="user-top" v-if="isMass ? false : true">
         <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" style="margin-left: 5px"/>
         <span class="name">的哇好快的</span>
         <span class="txt">来访：5次</span>
         <span class="txt">主动邀请：5次</span>
         <span class="txt">来自：官网</span>
         <span v-if="isAdministrator" style="position: absolute;right: 15px;">
             <Button  type="ghost" class="btn-r">领导评价</Button>
         </span>

     </div>
     <div class="chart-win" v-bind:class="{'is_mass_chart':isMass}">
         <div v-if="isMass">
             <Tabs value="name1">
                 <TabPane label="48小时内" name="name1"></TabPane>
                 <TabPane label="48小时外" name="name2"></TabPane>
             </Tabs>
             <div>
                 <Table border ref="selection" :columns="columns4" :data="data1"></Table>
             </div>
         </div>
     </div>
     <div class="chart-icon">
        <span style="color: #333" title="语言"><Icon type="ios-mic"></Icon></span>
        <span style="color: #ff9933" title="表情"><Icon type="happy-outline"></Icon></span>
        <span style="color: #333" title="截图"><Icon type="scissors"></Icon></span>
        <span style="color: #ffcc33" title="文件"><Icon type="folder"></Icon></span>
        <span style="color: #99ccff" title="超链接"><Icon type="link"></Icon></Icon></span>
        <span style="color: #996600" title="模板消息"><Icon type="ios-albums-outline"></Icon></span>
        <span style="color: #9999cc" title="群聊"><Icon type="android-person-add"></Icon></span>
        <span style="color: #cccc99" title="转发"><Icon type="android-share-alt"></Icon></span>
        <span style="color: #ff99cc" title="发送满意度"><Icon type="thumbsup"></Icon></span>
        <span style="color: #ccff66" title="下次联系提醒"><Icon type="ios-lightbulb"></Icon></span>
        <span style="color: #333399" title="退出"><Icon type="log-out"></Icon></span>
     </div>
     <div class="chart-txt" v-bind:class="{'is_mass_chart-txt':isMass}">
         <textarea class="txt" ></textarea>
         <div class="btm">
             <Button class="f-r" type="primary" size="small">发送</Button>
         </div>
     </div>
  </div>
</template>
<script>
    export default {
      data () {
        return {
          columns4: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '客户姓名',
              key: 'name'
            },
            {
              title: '产品',
              key: 'age'
            },
            {
              title: '微信名称',
              key: 'address'
            },
            {
              title: '公司名称',
              key: 'address'
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
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '详情'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          data1: [
            {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
            },
            {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
            },
            {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
            },
            {
              name: 'Jon Snow',
              age: 26,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
            }
          ]
        };
      },
      mounted () {
      },
      props: {
        isMass: {
          type: Boolean,
          default: false
        },
        isAdministrator: {
          type: Boolean,
          default: false
        }
      },
      beforeDestroy () {
      },
      methods: {},
      watch: {
      },
      created () {
      }
    };
</script>
