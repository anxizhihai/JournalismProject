<template>
  <div class="headerlogin">
      <div class="journalism">
     <router-link to="/Newslist"><img src="../../assets/logo_white.png" alt=""></router-link>
        <span>新闻项目</span>
      </div>
      <div class="personalinformation">
        <img class="avater" :src="avatr" alt="">
        <span class="apis">{{name}}</span>
        <img class="arrow" src="../../assets/icon_arrow_up.png" alt="">
         <div class="Accountmessage">
           <router-link  to="/Mynews">
           <div class="myaccount"><img src="../../assets/icon_my.png" alt=""><span>我的账户</span></div>
           </router-link>
           <router-link to="/Personalsettings"><div class="settingper">个人设置</div></router-link>
           <div class="exitlogon"><img src="../../assets/icon_out.png" alt=""><span v-on:click="outside">退出登录</span></div>
      </div>
      </div>

  </div>
</template>
<script>
export default {
  data(){
    return{
    name:localStorage.name,
    avatr:localStorage.avatar
    }

  },
  methods:{
    outside:function(){
    localStorage.token=''
    console.log(localStorage.token)
  }
}
}
</script>
<style>
.headerlogin{
  width: 100%;
  background: #0074FF;
  height: 80px;
}
a{
  text-decoration: none;
}
.avater{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align:top;
  margin-top: 20px;
}
.arrow{
  vertical-align:top;
  margin-top: 35px;
  padding: 0px;
  margin-left: 8.2px;
  transition: all .3s;
}
.apis{
  display: inline-block;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  color: #FFFFFF;
  padding: 0px;
  margin-left: 15px;
  vertical-align:top;
  margin-top: 30px;

}
.headerlogin:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}
.journalism{
  float: left;
  margin-left: 130px;
}
.personalinformation{
  float: right;
  margin-right: 120px;
  position: relative;
}
.Accountmessage{
  width: 140px;
  height: 118px;
  position: absolute;
  background: #FFFFFF;
  box-shadow: -2px -2px 3px 1px rgba(39,52,101,0.08), 2px 2px 3px 1px rgba(39,52,101,0.08);
  left: 10px;
  top: 80px;
  padding-top: 18px;
  visibility: hidden;
  opacity: 0;
  transition: all .3s;
}

.personalinformation:hover .Accountmessage{
     visibility:visible;
     opacity: 1;
}
.personalinformation:hover .arrow{
  transform: rotateZ(180deg)
}
.journalism img{
  width: 120px;
  height: 38.7px;
  vertical-align:top;
  margin-top: 20px;
}
.journalism span{
  display: inline-block;
  font-family: MicrosoftYaHei;
  font-size: 26px;
  color: #FFFFFF;
  vertical-align:top;
  margin-left: 32.7px;
  line-height: 80px;
}
.myaccount img{
  width: 22px;
  height: 22px;
  vertical-align:top;
  margin-left: 24.5px;
}
.myaccount span{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #333333;
  vertical-align:top;
  margin-left: 11.4px;
  cursor: pointer;
}
.settingper{
  margin-left: 57px;
  margin-top: 20px;
  font-family: MicrosoftYaHei;
font-size: 14px;
color: #333333;
}
.exitlogon{
margin-top: 20px;
}
.exitlogon img{
  width: 22px;
  height: 22px;
  vertical-align:top;
  margin-left: 24.5px;
}
.exitlogon span{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #333333;
  vertical-align:top;
  margin-left: 11.4px;
  cursor: pointer;
}
</style>


