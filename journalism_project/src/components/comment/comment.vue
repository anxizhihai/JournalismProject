<template>
  <div class="commentoutsidebox">
    <div v-for="userc in usercomments" class="commentinsidebox">
      <div class="commenttime">{{userc.create_time}}</div>
      <div class="commentcontent"><span class="commentcontentuserc">{{userc.content}}</span>
      <span class="rightfloat">
        <span class="commentagainst">
          <span class="commentagainsti"><img src="../../assets/icon_thumb_down.png" alt=""></span>
          <span class="commentagainsts">{{userc.against}}</span>
        </span>
        <span class="commentvote">
          <span class="commentvotei"><img src="../../assets/icon_thumb_up.png" alt=""></span>
          <span class="commentvotes">{{userc.vote}}</span>
        </span>
        <span class="commentpn">
          <span class="commentpns"><img src="../../assets/icon_comment.png" alt=""></span>
        </span>
      </span>
      </div>
      <div class="commentgetcomm">
        <button class="commentgetcommclick" type="button" @click="getcommentsl(userc.commentId)">展开</button>
        <div v-show="ishow">
            <div id="commentList">
            <!-- 循环commentIdsList来显示每条评论具体的盖楼评论id -->
            <div v-for="commentIds in commentIdsList" class="body">
            <!-- 使用组件，并传递参数 -->
            <!-- commentItem每个楼层具体的评论内容 -->
            <!-- 嵌套的评论id关系 -->
            <!-- 通过level来控制递归的次数 -->
            <comment1Box v-bind:commentItem="commentItem" v-bind:commentIds="commentIds" v-bind:level="commentIds.split(',').length"/>
          </div>
        </div>
        </div>
      </div>
      <div class="commentart"><span>来自:</span><span>{{userc.articleId.title}}</span></div>


    </div>

  </div>

</template>
<script>
import {getusercomments,getcommentslevel,getmessagecount} from '../../api/example.js'
// 引入组件
import comment1Box from '../../components/comment1Box/comment1Box.vue'
import commentBox456 from '../../components/commentBox456/commentBox456.vue'
export default {
// 注册组件
    components: {
      comment1Box: comment1Box,
      commentBox456:commentBox456
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
       this.counts++
           if(this.counts % 2===0){
             this.ishow=false
           }else{
           this.ishow = true
         }
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
  width: 24px;
  height: 24px;
  vertical-align: top;
}
.commentvotei img{
   width: 24px;
  height: 24px;
  vertical-align: top;
}
.commentpns img{
  width: 24px;
  height: 24px;
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


