<template>
  <!-- <div class="allreday" @click="postmessage('')">全部标记为已读</div> -->
<div class="outsidebox">

   <div class="ins"  v-for="news in mynew">
    <div class="times"><span class="namess">{{news.user.nickname}}</span><span>回复了你</span><span class="timess">{{news.create_time}}</span></div>
    <div class="conten">
      <span @click="postmessage(news.commentId)">{{news.content}}</span><span>{{news.commentId}}</span>
    </div>
    <div class="articleid">
      <span>来自:</span><span>{{news.articleId.title}}</span>
    </div>
  </div>
</div>

</template>
<script>
import {getMynews,postmessagecheck,getmessagecount} from '../../api/example.js'
export default {
  data(){
return{
  mynew:[],
  check:[],
  ac:0
}
  },
  created:function(){
       this.myne(),
       this.getmessage()
  },
methods:{
     myne:function(){
       var vm = this
       getMynews(1).then(res=>{
         if(res.data.code==='success')
             vm.mynew=res.data.data.commnets
       })
},
postmessage:function(ab){
  var vm = this
  postmessagecheck(ab).then(res=>{

  })
},
 //我的消息提示
    getmessage:function(){
      var vm = this
      getmessagecount().then(res=>{
        this.$emit('test',res.data.count); //主动触发test方法，res.data.count为向父组件传递的数据
      })
    },

}
}
</script>
 <style>
 .outsidebox{
   padding: 0px 10px 0px 20px;
 }
 .ins{
   padding: 37.5px 0px 30px 0px;
 }
.times{
width: 100%;
font-family: MicrosoftYaHei;
font-size: 16px;
color: #6F6F6F;
}
.timess{
  display: inline-block;
  float: right;
  margin-right: 20px;
}
.conten{
  margin-top: 15px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #333333;
}
.articleid{
  margin-top: 24px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #6F6F6F;
}
</style>


