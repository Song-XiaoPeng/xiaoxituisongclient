<style scoped lang="less">
</style>

<template>
  <div>
    <Form  :label-width="80">
      <FormItem label="登录账号">
        <Input placeholder="请输入账号"></Input>
      </FormItem>
      <FormItem label="登录密码">
        <Input placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="login()">登录</Button>
        <Button type="ghost" style="margin-left: 8px">获取最新版本</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
      };
    },
    components: {
    },
    methods: {
      login () {
        this.$router.push({name: 'survey'});
      }
    }
  };
</script>
