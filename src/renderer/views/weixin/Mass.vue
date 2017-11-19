<style scoped lang="less">
    .top-box{
        padding: 10px;
    }
    .tab{
        padding: 10px;
    }
</style>
<template>
    <div id="index">
        <div class="top-box">
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="info" class="f-r" @click="addMassFun" >
                新建发送条目
            </Button>
        </div>
        <div class="tab">
            <Table border :columns="columns7" :data="data6"></Table>
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
        model1: '',
        columns7: [
          {
            title: '发送类型',
            key: 'age'
          },
          {
            title: '群发类别',
            key: 'address'
          },
          {
            title: '群发条件',
            key: 'address'
          },
          {
            title: '接受粉丝人数',
            key: 'address'
          },
          {
            title: '群发内容',
            key: 'address'
          },
          {
            title: '创建时间',
            key: 'address'
          },
          {
            title: '发送时间',
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
                }, '停止'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '详情')
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
    methods: {
      addMassFun () {
        this.$router.push({
          name: 'addMass'
        });
      }
    }
  };
</script>
