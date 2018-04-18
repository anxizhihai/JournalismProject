<template>
  <div class="settings">
    <div class="accountset">账号设置</div>
    <div class="icon"><img src="../../assets/lo.png" alt=""></div>
    <div class="nickname">
      <div class="nicknamew"><span>昵称</span><input type="text" :placeholder="name"></div>
      </div>
    <div class="phonenumber">
    <div class="phonenumberw"><span>手机号</span><input type="text" :placeholder="phone"></div></div>
    <div class="passwordss">
     <div class="passwordssw"><span>密码</span><input type="text" placeholder="******">
     <router-link to="/Forgetpassword"> <button>修改</button></router-link></div>
    </div>
  </div>
</template>
<script>
export default {
data(){
  return{
    name:localStorage.name,
    phone:localStorage.phone
  }
}
}
</script>
<style>
.settings{
  width: 1032px;
  height: 566px;
  background: #FFFFFF;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.11);
  margin: 0 auto;
  margin-top: 83.2px;
  margin-bottom: 243.6px;
  font-family: MicrosoftYaHei;
font-size: 14px;
color: #333333;
}
.accountset{
font-family: MicrosoftYaHei;
font-size: 20px;
color: #333333;
line-height: 72.5px;
border-bottom: 1px solid #DCDCDC;
padding-left: 35.9px;
}
.icon{
   width: 100%;
   text-align: center;
   line-height: 153px;
   padding-top: 35px;
}
.icon img{
width: 104.3px;
height: 120px;
  margin: 0 auto;
  vertical-align: top;
}
.nickname input {
  width: 296px;
  height: 38px;
  border: 1px solid #6F6F6F;
}
.phonenumber input{
  width: 296px;
  height: 38px;
  border: 1px solid #6F6F6F;
}
.passwordss input{
  width: 195px;
  height: 38px;
}
.passwordss button{
  width: 110px;
  height: 36px;
  background: #FF8000;
  border: 1px solid #FF8000;
  font-family: MicrosoftYaHei;
font-size: 16px;
color: #FFFFFF;
letter-spacing: 2px;
text-align: center;
}
.passwordss,.nickname,.phonenumber{
  width: 100%;
}
.passwordssw,.nicknamew,.phonenumberw{
  margin-left: 335px;
}
.nicknamew span{
  display: inline-block;
  width: 43px;

}
.phonenumberw span{
  display: inline-block;
  width: 43px;
  margin-left: -10px;
}
.passwordssw span{
  display: inline-block;
  width: 43px;
}
.phonenumberw input{
  margin-left: 10px;
  border: 1px solid  #FFFFFF;
}
.passwordssw input{
  border: 1px solid  #FFFFFF;
}
.nickname,.phonenumber,.passwordss{
  margin-bottom: 30px;
}
</style>


