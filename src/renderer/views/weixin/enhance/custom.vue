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
    <div  style="padding: 10px;">
        <div class="sel-top">
            <span>当前公共号：</span>
            <Select v-model="model1" style="width:200px" @on-change="selFun">
                <Option v-for="item in cityList" :value="item.appid" :key="item.appid">{{ item.nick_name }}</Option>
            </Select>
        </div>
        <div class="cl add-btn" >
            <span class="" style="color: #ff3300">
                *只能生效一个自定义菜单
            </span>
            <Button type="info" class="" @click="addMenuFun">
                添加/删除/修改/自定义菜单
            </Button>
        </div>
        <Table border :columns="columns7" :data="data6"></Table>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        columns7: [
          {
            title: '菜单组名称',
            key: 'name'
          },
          {
            title: '子菜单名称',
            render: (h, params) => {
              let arr = [];
              params.row.sub_button.forEach((k) => {
                arr.push(h('p', k.name));
              });
              return h('div', arr);
            }
          }
        ],
        cityList: [],
        data6: [],
        model1: ''
      };
    },
    mounted () {
    },
    beforeDestroy () {
    },
    props: {
    },
    watch: {
    },
    methods: {
      addMenuFun () {
        this.$router.push({
          name: 'addMenu'
        });
      },
      // 获取自定义菜单
      getMeunListFun () {
        this.ajax.getMenuList({
          data: {
            appid: this.model1
          },
          success: (res) => {
            this.data6 = res.body;
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      },
      // 选择公共号请求数据
      selFun () {
        this.getMeunListFun();
      }
    },
    created () {
      this.ajax.getWxAuthList({
        data: {},
        success: (res) => {
          this.cityList = res.body;
          this.model1 = res.body[0].appid;
          this.getMeunListFun();
        },
        error: (res) => {
          this.is_Loading = false;
          this.$Message.warning(res.meta.message);
        }
      });
    }
  };
</script>
