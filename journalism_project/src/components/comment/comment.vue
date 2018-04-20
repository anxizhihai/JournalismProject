<template>
  <div class="commentoutsidebox">
    <div v-for="userc in usercomments" class="commentinsidebox">
    <comment1 v-bind:userc="userc"></comment1>
  </div>
   <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
    <span slot="no-more">
    There is no more Hacker News
  </span>
  </infinite-loading>
  </div>
</template>
<script>
import {getusercomments,getcommentslevel,getmessagecount} from '../../api/example.js'
// 引入组件
import comment1Box from '../../components/comment1Box/comment1Box.vue'
import comment1 from '../../components/comment1/comment1.vue'
import InfiniteLoading from 'vue-infinite-loading'
export default {
// 注册组件
    components: {
      comment1Box: comment1Box,
      comment1:comment1,
      InfiniteLoading,
    },
data(){
  return{
 page:1,
  usercomments:[],
  commentItem: {},
  commentIdsList: [],
  commentIdsLists:[],
   counts:0,
   page:2
  }

},
 created:function(){
       this.getuser(1)
      //  this.getmessage()
  },
methods:{
  //用户评论列表
    getuser:function(a){
      var vm = this
      getusercomments(a).then(res=>{
        vm.usercomments = res.data.data.comments
        vm.commentId = res.data.data.comments.commentId

      })
    },
    //用户评论列表折叠
    getcommentsl:function(ab){

      var vm = this
      getcommentslevel(ab).then(res=>{
            // 将接口返回的评论id列表和评论内容赋给相应变量
            vm.commentItem = res.data.data.comments
            vm.commentIdsLists = res.data.data.commentIds
            var city = new Array();
            city.push(this.commentIdsLists)
            console.log(city)
            vm.commentIdsList = city

      })
    },
          onInfinite() {
       setTimeout(() => {
        getusercomments(this.page).then((res) => {
           if (res.data.code ==='success'){
               this.usercomments =  this.usercomments.concat(res.data.data.comments);
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
    //我的消息提示
    // getmessage:function(){
    //   var vm = this
    //   getmessagecount().then(res=>{
    //     this.$emit('test',res.data.count); //主动触发test方法，'123'为向父组件传递的数据
    //   })
    // },
}
}
</script>
<style>
.commentoutsidebox{
  padding: 0px 21px 0px 21px;
}
.commentinsidebox{

  padding: 21px 0px 21px 0px;
  border-bottom: 1px solid #DCDCDC;
}
.commenttime{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #6F6F6F;
}
.rightfloat{
  float: right;
}
.commentcontent{
  margin-top: 12px;
}
.commentcontentuserc{
   font-family: MicrosoftYaHei;
   font-size: 16px;
   color: #333333;
}
.commentagainsts,.commentvotes{
   font-family: MicrosoftYaHei;
   font-size: 14px;
   color: #6F6F6F;
}
.commentagainsti img{
  width: 15px;
  height: 15px;
  vertical-align: top;
}
.commentvotei img{
   width: 15px;
  height: 15px;
  vertical-align: top;
}
.commentpns img{
  width: 15px;
  height: 15px;
    vertical-align: top;
}
.commentart{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #6F6F6F;
  margin-top: 22.4px;
}
.commentagainst,.commentvote,.commentpn{
  margin-left: 21px;
}
</style>


