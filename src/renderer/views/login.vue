<style scoped lang="less">
  .bg,.videoEl{
    height: 100%;
    width: 100%;
  }
  .bg{
      background: url("~@/assets/images/timg.jpg");
      background-repeat: no-repeat;
      background-size: 100%;
  }
  .form-box{
    position: absolute;
    height: 100%;
    width: 100%;
    //background-color: rgba(255,255,255,.2);
    top:0;
    left:0;
    bottom: 0;
    right:0;
    .form{
      height: 200px;
      width: 400px;
      position: absolute;
      top:50%;
      left: 50%;
      margin-left: -200px;
      margin-top: -100px;
      border-radius: 10px;
    }
  }
  video{
    height: 100%;
    width: 100%;
    object-fit: fill;
    transform: rotateY(0deg) rotateX(0deg);
    -webkit-filter: blur(1px);
    filter: blur(1px);
  }
</style>

<template>
  <div class="bg">
     <div class="videoEl">
        <video  autoplay loop>
          <source :src="video" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
     </div>
     <div class="form-box">
        <div class="form" id="login">
          <Form  :label-width="80">
            <FormItem label="登录账号" style="color: #fff;">
              <Input v-model="name" type="text" placeholder="请输入手机号"></Input>
            </FormItem>
            <FormItem label="登录密码">
              <Input v-model="password" type="password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="login()">登录</Button>
              <Button type="ghost" style="margin-left: 8px">获取最新版本</Button>
            </FormItem>
          </Form>
        </div>
     </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  
  export default {
    name: 'login',
    data () {
      return {
        password: '',
        name: '',
        video: require('../../../src/renderer/assets/mp4/Composition2.mp4')
      };
    },
    components: {
    },
    methods: {
      login () {
        let reg = /^1[34578]\d{9}$/;
        if (this.name === '' && reg.test(this.name) === false) {
          this.$Message.warning('手机号不能为空或手机号错误');
          return;
        } else if (this.password === '') {
          this.$Message.warning('密码不能为空');
          return;
        }
        this.ajax.login({
          data: {
            phone_no: this.name,
            password: md5(this.password)
          },
          success: (res) => {
            res.body.token = res.body.login_token;
            sessionStorage.setItem('userInfo', JSON.stringify(res.body));
            this.$router.push({name: 'survey'});
          },
          error: (res) => {
            this.$Message.warning(res.meta.message);
          }
        });
      }
    }
  };
</script>
