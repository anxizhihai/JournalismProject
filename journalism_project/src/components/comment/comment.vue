<template>
  <div class="commentoutsidebox">
    <div v-for="userc in usercomments" class="commentinsidebox">
    <comment1 v-bind:userc="userc"></comment1>
  </div>
  </div>
</template>
<script>
import {getusercomments,getcommentslevel,getmessagecount} from '../../api/example.js'
// 引入组件
import comment1Box from '../../components/comment1Box/comment1Box.vue'
import comment1 from '../../components/comment1/comment1.vue'
export default {
// 注册组件
    components: {
      comment1Box: comment1Box,
      comment1:comment1
    },
data(){
  return{
 page:1,
  usercomments:[],
  commentItem: {},
  commentIdsList: [],
  commentIdsLists:[],
   counts:0,
  }

},
 created:function(){
       this.getuser()
      //  this.getmessage()
  },
methods:{
  //用户评论列表
    getuser:function(){
      var vm = this
      getusercomments(1).then(res=>{
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


