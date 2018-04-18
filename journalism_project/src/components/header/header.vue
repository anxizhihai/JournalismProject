<template>
<header class="headers">
  <div class="imgjournalism">
    <img src="../../assets/logo_color.png" alt="">
    <span>新闻项目</span>
    </div>
   <div class="loginregister">
     <router-link to="/login">登录</router-link>
     <router-link to="/register">注册</router-link>
   </div>
</header>
</template>
<script>
export default {

}
</script>
<style>
body,html{
  padding: 0px;
  margin: 0px;
}
.headers{
  padding: 0px;
  margin: 0px;
  line-height: 80px;
  background: #FFFFFF;
}
.imgjournalism {
  float: left;
  margin-left: 130px;
}
.imgjournalism span{
  display: inline-block;
   font-family: MicrosoftYaHei;
   font-size: 26px;
   color: #0074FF;
   cursor: pointer;
   vertical-align:top;
   margin-left: 32.7px;
}
.imgjournalism img{
  width: 120px;
  height: 38.7px;
   vertical-align:top;
   margin-top: 20px;

}
.loginregister{
  float: right;
  margin-right: 101.6px;
}
.loginregister a{
  text-decoration: none;
  margin-right: 28px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  color: #0074FF;
  cursor: pointer;

}
.router -link-active{
   text-decoration: none;
    font-family: MicrosoftYaHei;
    font-size: 30px;
    color: #0074FF;
    cursor: pointer;
}
.headers:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}

</style>

