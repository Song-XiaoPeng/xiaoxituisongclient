<style scoped lang="less">
  @import "../less/panel";
</style>

<template>
  <div class="layout">
    <Row type="flex">
      <Col span="4" class="layout-menu-left">
        <Menu :active-name="activeName" theme="dark" width="auto" :open-names=openNames>
          <div class="layout-logo-left"></div>
          
          <Submenu :name="key"  v-for="(item, key) in menuList" :key="key">
            <template slot="title">
              <Icon :type="item.iconName"></Icon>
              {{item.menuTitle}}
            </template>
            <MenuItem v-for="(c, k) of item.son.sonList" :name="key + '-' + k" :key="k">
              {{c.menuTitle}}
            </MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col span="20">
        <div class="layout-header">
          <div class="operation">
            <span style="margin-right: 10px;">
              工作状态：
              <Select v-model="customerServiceState" style="width: 100px;">
                <Option value="1">我在线上</Option>
                <Option value="2">离开</Option>
              </Select>
            </span>
            <span>
              <Button type="error" @click="signOut"><Icon type="power"></Icon> 注销登录</Button>
            </span>
          </div>
        </div>

        <div class="content-page">
          <router-view></router-view>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import menu from '../config/menu';

  export default {
    data () {
      return {
        customerServiceState: '1',
        menuList: [],
        activeName: '0-0',
        openNames: [0]
      };
    },
    components: {
    },
    watch: {
    },
    computed: {
    },
    beforeRouteUpdate (to, from, next) {
      // 根据当前路由选择确定菜单位置
      this.routeSwitchMenu(to.name);

      next();
    },
    mounted () {
    },
    methods: {
      // 注销事件
      signOut () {
        this.$router.push({name: '/'});
      },
      routeSwitchMenu (name) {
        for (let i = 0; i < menu.length; i++) {
          for (let c = 0; c < menu[i].son.sonList.length; c++) {
            if (menu[i].son.sonList[c].route === name) {
              this.activeName = i + '-' + c;
              this.openNames = [i];
            }
          }

          this.menuList.push(menu[i]);
        }
      }
    },
    created () {
      this.routeSwitchMenu(this.$route.name);
    }
  };
</script>
