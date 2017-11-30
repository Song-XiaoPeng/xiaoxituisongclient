<style scoped lang="less">
  .bg,.videoEl{
    height: 100%;
    width: 100%;
  }
  .bg{
      background: url("~@/assets/images/timg.jpg");
      background-repeat: no-repeat;
      background-size: 100% 100%;
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
      .logo{
          position: absolute;
          top:60px;
          left: 60px;
          background: url("~@/assets/images/login-logo.png");
          height: 67px;
          width: 219px;
      }
      .middle-mg1{
          position: absolute;
          top: 50%;
          left: 50%;
          background: url("~@/assets/images/img1.png");
          height: 570px;
          width: 510px;
          margin-top: -285px;
          margin-left: -425px;
          background-size: 100% 100%;
      }
    .form{
        height: 200px;
        width: 400px;
        position: absolute;
        overflow: hidden;
        top: 50%;
        right: 50%;
        margin-top: -100px;
        margin-right: -600px;
        border-radius: 10px;
        box-shadow: 7px 7px 27px -5px #333;
        .login-bg{
            background-color: rgba(255,255,255, .4);
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 1;
            -webkit-filter: blur(10px); /* Chrome, Opera */
            -moz-filter: blur(10px);
            -ms-filter: blur(10px);
            filter: blur(10px);
        }
        .form-content{
            position: absolute;
            z-index: 100;
            width: 80%;
            margin-left: 26px;
            margin-top: 28px;
        }
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
        <!--<video  autoplay loop>-->
          <!--<source :src="video" type="video/mp4">-->
          <!--您的浏览器不支持Video标签。-->
        <!--</video>-->
     </div>
     <div class="form-box">
         <div class="logo"></div>
         <div class="middle-mg1"></div>
        <div class="form" id="login">
          <div class="login-bg">

          </div>
          <Form  :label-width="80" class="form-content">
            <FormItem label="登录账号">
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
