<template>
<div>

    <v-header></v-header>
<div class="routersv">

<div class="routersvs">
  <div class="loginz">
      <div class="loginsz">登录</div>
      <div class="loginb">
        <input type="text" class="int1" placeholder="手机号/用户名" v-model="phone">
        <input type="text" class="int2" placeholder="密码" v-model="password">
        <button  v-on:click="postlog">登录</button>
         <!-- <router-link :to="{ path: '/Newslist', query: {msg: 'welcome to apis'}}">登录</router-link> -->
          <router-link to="/Forgetpassword">忘记密码？</router-link>
      </div>
      <div class="changereg">
        <span>还没有APIS账号吗？</span>
        <button>注册</button>
      </div>
  </div>
</div>
</div>
</div>
</template>
<script>
//引入获取图文验证码和短信验证码接口
  import {postlogin} from '../../api/example.js'
  import header from '../../components/header/header'


export default {
    components: {
      'v-header':header,

  },
 data () {
      return {
        phone: '',
        password: ''
      }
    },

     methods:{
     postlog: function () {
        // 获取vue实例
        var vm = this
        // 将用户输入的密码用户名作为参数传递
        postlogin(vm.phone,vm.password).then(res => {
            if(res.data.code=="success"){
               alert("登陆成功")
               localStorage.name=res.data.data.account.nickname;
               localStorage.token=res.data.data.account.token;
               localStorage.id=res.data.data.account._id;
               localStorage.phone = this.phone;
               localStorage.avatar = res.data.data.account.avatar
               this.$router.push({path: '/Newslist'})
            }
        })
          // 捕获错误
          .catch(err => {
          console.log(err)
        })
      },

     }
}
</script>
<style>
.routersv{
  background: #0D407E;
  height: 860px;
  width: 100%;
  padding-top: 106.8px;
}
.routersvs{
  float: right;
  margin-right: 197.9px;
}
.loginz{
  width: 568px;
  background: rgba(255,255,255,0.24);
  box-shadow: 6px 6px 14px 5px rgba(39,52,101,0.08);
  padding-top: 44.2px;
}
.loginsz{
  font-family: MicrosoftYaHei;
  font-size: 36px;
  color: #FFFFFF;
  text-align: center;
}
.loginb{
  width: 382px;
  margin-top: 35px;
  margin-left: 93.9px;
}
.int1{
  width: 380px;
  height: 56px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  border-radius: 2px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #9B9B9B;
  padding: 0px;
  margin: 0px;
  text-indent:1em;
}
.int2{
  width: 380px;
  height: 56px;
  margin-top: 18px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  border-radius: 2px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #9B9B9B;
  padding: 0px;
  text-indent:1em;
}
.loginb button{
  width: 382px;
  height: 53px;
  margin-top: 42.3px;
  background: #FF8000;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  color: #FFFFFF;
  border: 1px solid  #FF8000;
  cursor: pointer;
}
.loginb a{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #FFFFFF;
  float: right;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
}
.changereg{
  margin-top: 100px;
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

