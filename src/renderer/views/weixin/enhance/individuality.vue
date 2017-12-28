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
    .tab{
        padding: 10px;
        background-color: #fff;
    }
    .table-copy {
        border-collapse: collapse;
        width: 100%;
    }

    .table-copy, td, th{
        border:1px solid #e9eaec;
        text-align: center;
        height: 40px;
    }

    .table-copy th{
        background-color: #f8f8f9;
    }
    .table-copy tr:nth-child(even){
        background: #f8f8f9;
    }

    .table-copy tr:hover{
        background: #ebf7ff;
    }
    .title-box-btn{
        height: 60px;
        line-height: 60px;
        background-color: #ecf0f4;
    }
</style>
<template>
    <div id="index">
        <div class="sel-top">
            <Select v-model="model1" style="width:200px" @on-change="selFun">
                <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
            </Select>
            <!--<Input class=""  icon="search" placeholder="" style="width: 200px"></Input>-->
        </div>
        <div class="title-box-btn cl" style="">
            <span class="" style="color: #2db7f5;margin-left: 10px">
               个性化菜单
            </span>
            <Button type="info" class="f-r" @click="addMenuFun(null)" style="margin: 15px">
                <Icon type="plus-round"></Icon>
                添加个性化菜单
            </Button>
        </div>
        <div class="tab">
            <Table border :columns="columns7" :loading="is_loading" :data="data7"></Table>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        data7: [],
        columns7: [
          {
            title: '菜单组名称',
            render: (h, params) => {
              let arr = [];
              params.row.button.forEach((k) => {
                arr.push(h('p', k.name));
              });
              return h('div', arr);
            }
          },
          {
            title: '子菜单名称',
            render: (h, params) => {
              let arr = [];
              params.row.button.forEach((k) => {
                let arr1 = [];
                k.sub_button.forEach((s) => {
                  arr1.push(h('span', s.name));
                });
                arr.push(h('p', arr1));
              });
              return h('div', arr);
            }
          },
          {
            title: '显示对象',
            render: (h, params) => {
              let arr = [];
              arr.push(h('p', '地区：' + params.row.matchrule.province + ',' + params.row.matchrule.city));
              arr.push(h('p', '性别：' + (params.row.matchrule.sex === 1 ? '男' : params.row.matchrule.sex === 2 ? '女' : '不限')));
              arr.push(h('p', '手机类别：' + (params.row.matchrule.client_platform_type === 1 ? 'IOS' : params.row.matchrule.client_platform_type === 2 ? 'Android' : '不限')));
              return h('div', arr);
            }
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delMeun(params.row.menuid, params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        model1: '',
        cityList: [],
        is_loading: false
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      addMenuFun (data) {
        this.$router.push({
          name: 'addMenu',
          query: {
            is_individuation: true
          }
        });
      },
      props: {
        appid: {
          type: String,
          default: ''
        }
      },
      watch: {
      },
      // 获取列表
      getIndividualiMeunFun () {
        this.is_loading = true;
        this.ajax.getWxIndividualizationMenu({
          data: {
            appid: this.model1
          },
          success: (res) => {
            this.is_loading = false;
            this.data7 = res.body || [];
          },
          error: (res) => {
            this.is_loading = false;
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 选择公共号请求数据
      selFun () {
        this.getIndividualiMeunFun();
      },
      // 删除个性化菜单
      delMeun (id, i) {
        this.ajax.delWxIndividualizationMenu({
          data: {
            appid: this.model1,
            menuId: id
          },
          success: (res) => {
            this.$Message.success('操作成功');
            this.data7.splice(i, 1);
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      }
    },
    created () {
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body;
          this.model1 = res.body[0].appid;
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
