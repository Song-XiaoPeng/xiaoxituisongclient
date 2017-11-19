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

</style>
<template>
    <div id="index">
       <div>
           <Tabs v-model="tab">
               <TabPane label="自定义菜单" name="name1">
                  <costom ></costom>
               </TabPane>

               <TabPane label="个性化菜单" name="name2">
                   <individuality  v-if="tab === 'name2'" ></individuality>
               </TabPane>

               <TabPane label="自动回复" name="name3">
                   <revert  v-if="tab === 'name3'" ></revert>
               </TabPane>

               <TabPane label="素材管理" name="name4">
                   <material v-if="tab === 'name4'" ></material>
               </TabPane>
           </Tabs>
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
    },
    created () {
      this.tab = this.$route.query.tab;
      console.log(this.tab);
      // 获取appid
    }
  };
</script>
