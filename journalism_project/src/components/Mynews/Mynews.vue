<template>
<div>
   <v-headerlogin v-if="isShow"></v-headerlogin>
    <v-header v-else></v-header>
<div class="mynewsbox">

<div class="insideboxs">
<div class="leftbox">
<router-link to="/comment"><div class="comments"><span class="mecomments"   @click="curId=0" :class="{'cur':curId===0}">我的评论</span><span>(</span><span>{{msg}}</span><span>)</span></div></router-link>
<router-link to="/news"><div class="news"><span class="menews"   @click="curId=1" :class="{'cur':curId===1}">我的消息</span></div></router-link>
</div>
<router-view @test="change" :msg="msg"></router-view>
</div>
</div>
</div>
</template>
<script>
 import header from '../../components/header/header'
import headerlogin from '../../components/headerlogin/headerlogin'
export default {
  components:{
      'v-header':header,
    'v-headerlogin':headerlogin
  },
  data(){
return{
  msg:0,
  curId:0
}
  },
  created:function(){
 this.judge()
  },
  methods:{
    change(msg) {
        this.msg = msg;

    },
       judge:function(){
      if(localStorage.token==''){
          this.isShow=false
    }else{
      this.isShow=true
     }
    },
  }
}
</script>
<style>
.cur{
  font-family: MicrosoftYaHei;
font-size: 14px;
color: #FF8000;
letter-spacing: 0;

border-left: 3px solid red;
}
.mecomments,.menews{
padding-left: 30px;
}
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
  height: 100px;
  background: #FFFFFF;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
  position: absolute;
  left: -200px;
  padding: 10px 10px 10px 20px;

}
.comments,.news{
  width: 120px;
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


