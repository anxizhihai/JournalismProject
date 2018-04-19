<template>
  <div>
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
       <button class="commentgetcommclick" type="button" @click="getcommentsl(userc.commentId)">{{Open}}</button>
      <div class="commentgetcomm" >


            <div id="commentList" v-show="isshow">
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
      <div class="commentart"><span>来自:</span><span>{{userc.articleId.title}}</span></div>

  </div>
</template>
<script>
import {getusercomments,getcommentslevel,getmessagecount} from '../../api/example.js'
import comment1Box from '../../components/comment1Box/comment1Box.vue'
export default {
props:['userc'],
// 注册组件
    components: {
      comment1Box: comment1Box,

    },
data(){
  return{
 page:1,
  commentItem: {},
  commentIdsList: [],
  commentIdsLists:[],
   counts:0,
   Open:'展开',
   count:0,
isshow:false
  }

},
methods:{
  //用户评论列表折叠
    getcommentsl:function(ab){
           this.count++
           if(this.count % 2===0){
             this.Open='展开'
           }else{
           this.Open = '折叠'
         }
      this.isshow = !this.isshow
      var vm = this
      getcommentslevel(ab).then(res=>{
            // 将接口返回的评论id列表和评论内容赋给相应变量
            vm.commentItem = res.data.data.comments
            vm.commentIdsLists = res.data.data.commentIds
            var city = new Array();
            city.push(this.commentIdsLists)
            vm.commentIdsList = city

      })
    },
}
}

</script>
<style>
.commentgetcommclick{
  float: right;
  border: none;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #FF8000;
  margin-top: 10px;
  margin-bottom: 30px;
  background: #FFFFFF;
}
.commentgetcomm{
  margin-top: 50px;
}
</style>


