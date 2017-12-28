<style scoped lang="less">
    .sel-top{
        padding: 5px 10px;
    }
    .add-btn{
        padding: 5px 10px;
        position: relative;
        span{
            position: absolute;
            bottom: 0;
            right: 10px;
        }
    }
.tab-box{
    background-color: #fefefe;
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px #d1d6dc solid;
    ul{
        li{
            float: left;
            height: 60px;
            line-height: 60px;
            padding: 0 10px;
            cursor: pointer;
        }
        li.active{
            background-color: #90c0fc;
            color: #fff;
        }
    }
}
</style>
<template>
    <div id="index">
       <div>
           <div class="tab-box">
               <ul class="cl">
                   <li v-bind:class="tab == 'name1' ? 'active' : ''" @click="tabFun('name1')">自定义菜单</li>
                   <li v-bind:class="tab == 'name2' ? 'active' : ''" @click="tabFun('name2')">个性化菜单</li>
                   <li v-bind:class="tab == 'name3' ? 'active' : ''" @click="tabFun('name3')">自动回复</li>
                   <li v-bind:class="tab == 'name4' ? 'active' : ''" @click="tabFun('name4')">素材管理</li>
               </ul>
           </div>
           <div>
               <costom v-if="tab === 'name1'" ></costom>
               <individuality  v-if="tab === 'name2'" ></individuality>
               <revert  v-if="tab === 'name3'" ></revert>
               <material v-if="tab === 'name4'" ></material>
           </div>
           <!--<Tabs v-model="tab">-->
               <!--<TabPane label="自定义菜单" name="name1">-->
                  <!--<costom ></costom>-->
               <!--</TabPane>-->

               <!--<TabPane label="个性化菜单" name="name2">-->
                   <!--<individuality  v-if="tab === 'name2'" ></individuality>-->
               <!--</TabPane>-->

               <!--<TabPane label="自动回复" name="name3">-->
                   <!--<revert  v-if="tab === 'name3'" ></revert>-->
               <!--</TabPane>-->

               <!--<TabPane label="素材管理" name="name4">-->
                   <!--<material v-if="tab === 'name4'" ></material>-->
               <!--</TabPane>-->
           <!--</Tabs>-->
       </div>
    </div>
</template>
<script>
  import costom from './enhance/custom';
  import individuality from './enhance/individuality';
  import revert from './enhance/revert';
  import material from './enhance/material';
  export default {
    data () {
      return {
        cityList: [],
        model1: '',
        columns7: [
          {
            title: '菜单组名称',
            key: 'age'
          },
          {
            title: '显示对象',
            key: 'address'
          },
          {
            title: '是否在公共平台生效',
            key: 'action',
            width: 200,
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
                }, '保存并生效')
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
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
                }, '编辑'),
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
                }, '删除')
              ]);
            }
          }
        ],
        data6: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ],
        columns8: [
          {
            title: '菜单组名称',
            key: 'age'
          },
          {
            title: '显示对象',
            key: 'address'
          },
          {
            title: '是否在公共平台生效',
            key: 'action',
            width: 200,
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
                }, '保存并生效')
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
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
                }, '编辑'),
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
                }, '删除')
              ]);
            }
          }
        ],
        data7: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ],
        tab: 'name1'
      };
    },
    components: {
      costom,
      individuality,
      revert,
      material
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      tabFun (t) {
        this.tab = t;
      }
    },
    created () {
      // this.tab = this.$route.query.tab;
      // 获取appid
    }
  };
</script>
