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
        height: 235px;
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

  .window-border {
    width: 90%;
    height: 35px;
    -webkit-app-region: drag;
    position: relative;

  }

  .window-control {
    position: absolute;
    right: 0;
    width: 120px;
    height: 50px;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
    top: 0;
    right: 0;
    z-index: 9999;
  }

  .window-icon {
    cursor: pointer;
    padding: 10px;
  }

  .window-icon:hover {
    color:#ccc;
  }

  .loading-text {
      display: inline-block; 
      height: 1em; line-height: 1;
      vertical-align: -.25em;
      overflow: hidden;
  }

  .loading-text::before {
      display: block;
      content: '...\A..\A.';
      white-space: pre-wrap;
      animation: dot 3s infinite step-start both;
  }

  @keyframes dot {
    33% { transform: translateY(-2em); }
    66% { transform: translateY(-1em); }
  }

  .ivu-btn-ghost {
    color: #fff;
  }

  .upload-desc {
    width: 100%;
    height: 200px;
    overflow: auto;
  }
</style>

<template>
  <div class="bg">
    <div class="window-control">
      <span class="window-icon" @click="hideWindow()">
        <Icon type="minus"></Icon>
      </span>
      <span class="window-icon" @click="showWindow()">
        <Icon type="android-checkbox-outline-blank"></Icon>
      </span>
      <span class="window-icon" @click="closeWindow()">
        <Icon type="close"></Icon>
      </span>
    </div>
    
    <div class="form-box">
      <div class="window-border"></div>
      
      <div class="logo"></div>
      <div class="middle-mg1"></div>
      <div class="form" id="login">
        <div class="login-bg">
        </div>
        <Form  :label-width="80" class="form-content">
          <FormItem label="登录账号">
            <Input v-model="name" type="text" placeholder="请输入账号" @on-enter="login()" :disabled="isUploadIng"></Input>
          </FormItem>
          <FormItem label="登录密码" style="margin-bottom: 0">
            <Input v-model="password" type="password" placeholder="请输入密码" @on-enter="login()" :disabled="isUploadIng" @on-keydown="passClearFun"></Input>
            <Checkbox v-model="rememberObj.single" @on-change="remember"><span style="color: #ff3300">记住密码</span></Checkbox>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="login()" :loading="loginLoading" :disabled="isUploadIng">登录</Button>
            <Badge dot :count="isRemindUpload">
              <Button type="ghost" style="margin-left: 8px" @click="update()" :disabled="isUploadIng">获取最新版本</Button>
            </Badge>
            <p class="ivu-btn-ghost" v-show="!isUploadIng">当前客户端版本：{{version}}</p>
            <p class="ivu-btn-ghost" v-show="isUploadIng">正在更新应用中请稍等<font class="loading-text">...</font></p>
          </FormItem>
        </Form>
      </div>
    </div>

    <Modal
      v-model="isPromptUpload"
      :title="updateTitle"
      @on-ok="startUpload"
      ok-text="开始更新应用"
      cancel-text="暂不更新"
      >
      <div class="upload-desc">
        <p>更新说明：</p>
        <p v-for="(item, index) of uploadDesc" :key="item">{{index}}.{{item}}</p>
      </div>
    </Modal>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import cookies from 'js-cookie';
  import os from 'os';
  import { remote } from 'electron';
  let updater = remote.require('electron-simple-updater');
  export default {
    name: 'login',
    data () {
      return {
        password: '',
        name: '',
        updateTitle: '',
        isPromptUpload: false,
        uploadDesc: [],
        version: '',
        isOpen: false,
        loginLoading: false,
        isRemindUpload: 0,
        isUploadIng: false,
        single: '',
        rememberObj: {
          single: '',
          pass: null
        },
        md5Pass: ''
      };
    },
    components: {
    },
    methods: {
      login () {
        let reg = /^1[34578]\d{9}$/;
        let p;
        // 获取计算机网卡信息
        let mac = os.networkInterfaces();
        let macStr = [];
        let str;
        for (let k in mac) {
          mac[k].forEach((s) => {
            macStr.push(s.mac);
          });
        }
        str = macStr.join();
        if (this.rememberObj.single === true) {
          if (this.rememberObj.pass !== null && this.rememberObj.pass !== '') {
            p = this.rememberObj.pass;
          } else {
            if (this.password === '') {
              this.$Message.warning('密码不能为空');
              return;
            } else {
              p = md5(this.password);
            }
          }
        } else {
          if (this.password === '') {
            this.$Message.warning('密码不能为空');
            return;
          }
          p = md5(this.password);
        }
        if (this.name === '' && reg.test(this.name) === false) {
          this.$Message.warning('手机号不能为空或手机号错误');
          return;
        }
        this.loginLoading = true;
        this.ajax.login({
          data: {
            phone_no: this.name,
            password: p,
            version: this.version,
            client_network_mac: md5(str)
          },
          success: (res) => {
            this.loginLoading = false;
            localStorage.setItem('name', this.name);
            res.body.token = res.body.login_token;
            if (this.rememberObj.single === true) {
              this.rememberObj.pass = p;
              localStorage.setItem('remember', JSON.stringify(this.rememberObj));
            }
            localStorage.setItem('userInfo', JSON.stringify(res.body));
            this.$router.push({name: 'survey'});
          },
          error: (res) => {
            this.loginLoading = false;
            this.$Message.error(res.meta.message);
          }
        });
      },
      startUpload () {
        updater.downloadUpdate();
      },
      update () {
        updater.on('update-available', (meta) => {
          this.updateTitle = '检测到新版本' + meta.version;
          this.isPromptUpload = true;

          this.uploadDesc.splice(0, this.uploadDesc.length);

          let readme = JSON.parse(meta.readme);
          for (let item of readme) {
            this.uploadDesc.push(item);
          }
        });

        updater.on('update-not-available', () => {
          this.$Message.warning('暂无可升级更新');
        });

        updater.on('update-downloading', (meta) => {
          this.$Loading.config({
            color: '#19be6b',
            height: 10
          });
          this.isUploadIng = true;
          this.$Loading.start();
        });

        updater.on('update-downloaded', () => {
          this.$Loading.destroy();

          this.$Modal.success({
            title: '更新提醒',
            content: '更新包已下载更新完毕',
            okText: '重启应用',
            onOk: () => {
              updater.quitAndInstall();
            },
            onCancel: () => {
              updater.quitAndInstall();
            }
          });
        });

        updater.on('error', () => {
          this.$Message.error('获取更新镜像源失败');
          this.$Loading.error();
          this.isUploadIng = false;
        });

        updater.checkForUpdates();
      },
      checkUpload () {
        updater.on('update-available', (meta) => {
          this.isRemindUpload = 1;
        });

        updater.checkForUpdates();
      },
      hideWindow () {
        this.$electron.ipcRenderer.send('hide-window');
      },
      showWindow () {
        if (!this.isOpen) {
          this.isOpen = true;
          this.$electron.ipcRenderer.send('show-window');
        } else {
          this.isOpen = false;
          this.$electron.ipcRenderer.send('orignal-window');
        }
      },
      closeWindow () {
        if (this.isUploadIng) {
          this.$Message.warning({content: '正在更新应用请勿关闭窗口'});
          return;
        }

        this.$electron.ipcRenderer.send('window-all-closed');
      },
      // 记住密码
      remember (v) {
        if (v) {
          this.rememberObj.single = true;
          localStorage.setItem('remember', JSON.stringify(this.rememberObj));
        } else {
          this.password = '';
          localStorage.removeItem('remember');
        }
      },
      // 键盘事件
      passClearFun (e) {
        if (e.keyCode === 8) {
          e.target.value = '';
          this.password = '';
          this.rememberObj.pass = '';
        }
      }
    },
    created () {
      let obj = require('../../../package.json');
      this.version = obj.version;

      let name = cookies.get('name');
      if (name !== '') {
        this.name = name;
      }

      this.name = localStorage.getItem('name');

      this.checkUpload();
      // 获取是否记住密码
      let r = JSON.parse(localStorage.getItem('remember'));
      if (r !== null && r.single) {
        Object.assign(this.rememberObj, r);
        if (r.pass !== null) {
          this.password = r.pass;
        }
      }
    }
  };
</script>
