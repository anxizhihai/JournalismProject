<template>
<div>

<v-header></v-header>
<div class="routersv">
<div class="routersvs">
<div class="registerzz">
  <div class="register">注册</div>
  <div class="aggregate">
    <div class="aggregate1"><input type="text" class="registerint1" placeholder="账号（请输入手机号码)" v-model="phone"></div>
    <div class="aggregate2"><input type="text" class="registerint2" placeholder="图形验证码" v-model="captcha"><span class="Captcha" v-on:click="getImg" v-html="imgCaptcha"></span></div>
    <div class="aggregate3"><input type="text" class="registerint3" placeholder="短信验证码" v-model="smsCaptcha"><button class="verifying" v-on:click="getSms">获取验证码</button>
     <button v-on:click="getshort" class="verifyingm">短信</button></div>
    <div class="aggregate4"><input type="text" class="registerint4" placeholder="密码（请输入6~20位字符）"></div>
    <div class="aggregate5"><input type="text" class="registerint5" placeholder="确认密码" v-model="password"></div>
    <button class="registerbtn" v-on:click="postreg">注册</button>
  </div>
   <div class="changereg">
        <span>已经有APIS账号了</span>
        <button>登录</button>
      </div>
</div>
</div>
</div>
</div>
</template>
<script>
 //引入获取图文验证码和短信验证码接口
  import {getImgCaptcha, getSmsCaptcha,getShortmessage,postregister} from '../../api/example.js'
   import header from '../../components/header/header'

  export default {
    components:{
      'v-header':header,

  },
    name: 'bar',
    data () {
      return {
        phone: '',
        imgCaptcha: '',
        captcha: '',
        password:'',
        smsCaptcha:''
      }
    },
    created() {
        this.getImg()

    },
    methods: {
      getImg: function () {
        // 获取vue实例
        var vm = this
        getImgCaptcha().then(res => {
            // 将图文验证码赋给变量imgCaptcha
            vm.imgCaptcha = res.data
        })
          // 捕获错误
          .catch(err => {
          console.log(err)
        })
      },

      //发送验证码
      getSms: function () {
        // 获取vue实例
        var vm = this
        // 将用户的图文验证码作为参数传递
        getSmsCaptcha(vm.captcha,vm.phone).then(res => {
            alert(res.data.message)
        })
          // 捕获错误
          .catch(err => {
          console.log(err)
        })
      },
      //获取到验证码
      getshort: function() {
         // 获取vue实例
        var vm = this
         // 将手机号码作为参数传递
         getShortmessage(vm.phone).then(res => {
            alert(res.data.message)
        })
         // 捕获错误
          .catch(err => {
          console.log(err)
        })
      },
      //zhuce
      postreg: function () {
        // 获取vue实例
        var vm = this
        // 将用户的图文验证码作为参数传递
        postregister(vm.phone,vm.password,vm.smsCaptcha).then(res => {
            alert(res.data.message)
        })
          // 捕获错误
          .catch(err => {
          console.log(err)
        })
      }
    }

  }
</script>
<style scoped>
.registerzz{
  width: 568px;
  background: rgba(255,255,255,0.24);
  box-shadow: 6px 6px 14px 5px rgba(39,52,101,0.08);
  padding-top: 44.2px;
}
.register{
  font-family: MicrosoftYaHei;
  font-size: 36px;
  color: #FFFFFF;
  text-align: center;
}
.aggregate{
  width: 384px;
  margin-left: 93.9px;
  margin-top: 35px;
}
.registerint1,.registerint2,.registerint3,.registerint4,.registerint5{
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  border-radius: 2px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #9B9B9B;
  text-indent:1em;
  padding: 0px;
}

.registerint1{
  width: 380px;
  height: 56px;

}
.registerint2,.registerint3{
  width: 228px;
  height: 56px;
}
.Captcha{
  display: inline-block;
  width: 139px;
  height: 54.7px;
  background-color: #9B9B9B;
  margin-left: 12.2px;
  vertical-align:top;
}
svg{
  width: 139px;
  height: 54.7px;
  }
.aggregate2,.aggregate3,.aggregate4,.aggregate5{
  margin-top: 18px;
}
.verifying,.verifyingm{
  width: 70px;
  height: 56px;
  background: #FF8000;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #FFFFFF;
  border: 1px solid #FF8000;
  vertical-align:top;
  padding: 0px;
  margin-left: 3px;
  cursor: pointer;
}
.registerint4,.registerint5{
  width: 380px;
  height: 56px;
}
.registerbtn{
  width: 382px;
  height: 53px;
  background: #FF8000;
  border: 1px solid #FF8000;
  margin-top: 42.3px;
  cursor: pointer;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  color: #FFFFFF;
}
.changereg{
  margin-top: 39.7px;
  border-top:  1px solid #FFFFFF;
}
.changereg span{
  float: left;
  margin-top: 29.4px;
  margin-left: 19.7px;
  margin-bottom: 28px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #FFFFFF;
}
.changereg button{
float: right;
width: 66px;
height: 41px;
font-family: MicrosoftYaHei;
font-size: 20px;
color: #0D407E;
background: #FFFFFF;
border: 1px solid #FFFFFF;
margin-right: 16.9px;
margin-top: 18.5px;
cursor: pointer;

}
.changereg:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}
</style>


