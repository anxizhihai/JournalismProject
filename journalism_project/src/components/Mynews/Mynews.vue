<template>
<div class="mynewsbox">

<div class="insideboxs">
<div class="leftbox">
<router-link to="/comment"><div class="comments"><span>我的评论</span><span>(</span><span>{{msg}}</span><span>)</span></div></router-link>
<router-link to="/news"><div class="news"><span>我的消息</span></div></router-link>
</div>
<router-view @test="change" :msg="msg"></router-view>
</div>
</div>
</template>
<script>
export default {
  data(){
return{
  msg:0
}
  },
  methods:{
    change(msg) {
        this.msg = msg;

    }
  }
}
</script>
<style>
.insideboxs{
  width: 896px;
  min-height: 862px;
  background: #FFFFFF;
  margin: 0 auto;
  margin-top: 88.3px;
  margin-bottom: 88.3px;
  padding: 0px 10px 20px 10px;
  position: relative;
}
.ins{
  border-bottom: 1px solid  #DCDCDC;

}
.leftbox{
  width: 160px;
  height: 160px;
  background: #FFFFFF;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
  position: absolute;
  left: -200px;
  padding: 10px 10px 10px 20px;

}
.comments,.news{
  width: 100px;
  height: 19px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;

}

.news{
  margin-top: 42px;
}
</style>


