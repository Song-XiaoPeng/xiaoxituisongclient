<style scoped lang="less">
.info-box{
    padding: 10px;
}
    .tel{
        padding: 5px 0;
        font-weight: bold;
        font-size: 16px;
    }
</style>
<template>
   <div class="info-box">
       <div>
           <Select v-model="model1" style="width:150px">
               <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
           <Input v-model="seekVal" placeholder="搜索常用术语" style="width: 150px"></Input>
       </div>
       <div>
          <div class="tel">
             我的常用话术
          </div>
          <Table border :columns="columns7" :show-header="false" :data="data6"></Table>
       </div>
       <div>
           <div class="tel">
               企业常用话术
           </div>
           <Table border :columns="columns7" :show-header="false" :data="data6"></Table>
       </div>
   </div>
</template>
<script>
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
          columns7: [
            {
              title: 'Age',
              key: 'age'
            },
            {
              title: 'Address',
              key: 'address'
            },
            {
              title: 'Action',
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
                        this.show(params.index);
                      }
                    }
                  }, 'View'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      }
                    }
                  }, 'Delete')
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
          ]
        };
      },
      mounted () {
      },
      beforeDestroy () {
      },
      methods: {}
    };
</script>
