<template>
  <!-- <div class="allreday" @click="postmessage('')">全部标记为已读</div> -->
<div class="outsidebox">

   <div class="ins"  v-for="news in mynew">
    <div class="times"><span class="namess">{{news.user.nickname}}</span><span>回复了你</span><span class="timess">{{formattime(news.create_time)}}</span></div>
    <div class="conten">
      <span class="reddot" v-show="!news.isRead"></span><span class="redcommentId" @click="postmessage(news.commentId)">{{news.content}}</span>
    </div>
    <div class="articleid">
      <span>来自:</span><span>{{news.articleId.title}}</span>
    </div>
  </div>
   <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
    <span slot="no-more">
    There is no more Hacker News
  </span>
  </infinite-loading>
</div>
</template>
<script>
import moment from "moment"
import {getMynews,postmessagecheck,getmessagecount} from '../../api/example.js'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  // 注册组件
    components: {
      InfiniteLoading,
    },
  data(){
return{
  mynew:[],
  check:[],
  ac:0,
  page:2
}
  },
  created:function(){
       this.myne(1),
       this.getmessage()
  },
methods:{
     myne:function(a){
       var vm = this
       getMynews(a).then(res=>{
         if(res.data.code==='success')
             vm.mynew=res.data.data.commnets

       })
},
formattime(time) {
return moment(time).format("YYYY-MM-DD HH:mm:ss");
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
           onInfinite() {
       setTimeout(() => {
        getMynews(this.page).then((res) => {
           if (res.data.code ==='success'){
               this.mynew =  this.mynew.concat(res.data.data.commnets);
                // this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
           }else{
             console.log(res.data.message)
           }
           if (Math.ceil(res.data.data.counts/4)===this.page) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              }
           else {
                  this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                  this.page++
              }
           });
          },1000)
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
.reddot{
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #FF8000;
}
.redcommentId{
  margin-left: 10px;}
</style>


