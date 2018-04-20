<template>
  <!-- 通过判断level是否等于commentIds的长度来判断是否为楼层的顶部，如果是则实行else，不是的就接着递归 -->

  <div class="comment-box" v-if="level !== commentIds.split(',').length">
      <img :src="commentItem[commentId].user.avatar ? `https://dev.apis.sh/PBXZ$DK1c/static/${commentItem[commentId].user.avatar}` : avatar" alt="">
      <div class="comment-info">
      <span class="user">{{commentItem[commentId].user.nickname}}</span>
      <span>{{commentItem[commentId].create_time}}</span>
      <span class="floor-count">{{commentItem[commentId].buildLevel}}楼</span>
      <div class="pspan">
     <p class="content">{{commentItem[commentId].content}}</p>
     <span class="message">
        <span class="message1"><img @click="postrates()" src="../../assets/icon_thumb_down.png" alt=""><span>{{commentItem[commentId].against}}</span></span>
        <span class="message2"><img @click="postrate()" src="../../assets/icon_thumb_up.png" alt=""><span>{{commentItem[commentId].vote}}</span></span>
        <span class="message3"><img  @click="isShow()" src="../../assets/icon_comment.png" alt=""><span></span></span>
           <div class="commhs" v-show="ishow">
           <div><input type="text" class="inpt" v-model="contens"></div>
           <button style="button" class="Submit" @click="postaddcommen()">提交</button>
           </div>
           </span>
      </div>

      <div>

      </div>

      </div>
    <!-- 此时如果level === 1说明没有更多的楼层，递归结束,否则level-1，接着递归 -->
    <commentBox v-if="level !== 1" v-bind:commentItem="commentItem" v-bind:commentIds="commentIds" :level="level - 1"/>
  </div>
  <!-- 如果是楼层顶部则应用单独的样式 -->
  <div v-else class="comment-item">
    <img :src="commentItem[commentId].user.avatar ? `https://dev.apis.sh/PBXZ$DK1c/static/${commentItem[commentId].user.avatar}` : avatar" alt="">
    <!-- <img :src="img_url+commentItem[commentId].user.avatar"  alt=""> -->
  <div class="inner-box">
    <div class="thspan">
      <span>{{commentItem[commentId].user.nickname}}</span>
      <span class="time">{{commentItem[commentId].create_time}}</span>
      <span class="floor-count">{{commentItem[commentId].buildLevel}}楼</span>
    </div>
      <div class="pspan">
        <p class="content">{{commentItem[commentId].content}}</p>
        <span class="message">
        <span class="message1"><img  @click="postrates()" src="../../assets/icon_thumb_down.png" alt=""><span >{{commentItem[commentId].against}}</span></span>
        <span class="message2"><img @click="postrate()" src="../../assets/icon_thumb_up.png" alt=""><span>{{commentItem[commentId].vote}}</span></span>
        <span class="message3"><img  @click="isShow()" src="../../assets/icon_comment.png" alt=""><span></span></span>
           <div class="commhs" v-show="ishow">
           <div><input type="text" class="inpt" v-model="contens"></div>
           <button style="button" class="Submit" @click="postaddcommen()">提交</button>
           </div>
           </span>
        </div>
        <!-- 顶楼盖完后递归下一层楼,如果楼层只有一层则递归结束，否则level-1接着递归 -->
      <commentBox v-if="level !== 1" v-bind:commentItem="commentItem" v-bind:commentIds="commentIds" :level="level - 1"/>
    </div>
  </div>
</template>
<script>
  // 引入默认头像
  import avatar from '../../assets/logo.png'
  import {postaddcommentsid,postaddrate} from '../../api/example.js'
  export default {
    //通过name实现递归调用
    name: 'commentBox',
    data(){
      return {
      img_url:'https://dev.apis.sh/PBXZ$DK1c/static/',
      ishow:false,
      counts:0,
      contens:'',
      rates:'against'
      }
    },
    // 通过props来接收父组件传递过来的参数，名字与父组件中一致，接收到的参数可像data中的变量一样使用
    props: ['commentItem', 'commentIds', 'level'],
    computed: {
      commentId: function () {
        var vm = this
        // 通过split方法把id字符串切割成对应的数组，然后通过level来取到对应的楼层
        return vm.commentIds.split(',')[vm.level - 1]
      },
      // 通过计算属性返回可在模板中使用的变量
      avatar: function () {
        return avatar
      }
    },
     methods:{
        isShow:function(){
            this.counts++
           if(this.counts % 2===0){
             this.ishow=false
           }else{
           this.ishow = true
         }
        },
        postaddcommen:function(){
             postaddcommentsid(this.commentId,this.contens).then(res=>{
                if(res.data.code ==='success'){
                   alert('success')
                }
        })
      },
      //点赞
    postrate:function(){
    postaddrate(this.commentId,'vote').then(res=>{
     if(res.data.code ==='success'){
         alert('success');

       }

    })
},
    postrates:function(){
    postaddrate(this.commentId,'against').then(res=>{
     if(res.data.code ==='success'){
         alert('success');

       }

    })
},
    },
    watch:{

    },
  }
</script>
<style scoped>
.comment-box {
  padding: 5px;
  border: 1px solid #adadad;
}
.comment-box img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
}
.inner-box img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
}
.comment-item>img {
  float: left;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  vertical-align: middle;
}
.comment-info span,.inner-box span {
  font-size: 12px;
}
.comment-item .inner-box {
  margin-left: 50px;
}
.floor-count {
  float: right;
  margin-right: 10px;
}
.content {
  margin: 10px 0;
  width: 600px;
  float: left;
}
.user {
  margin-left: 5px;
}
.pspan:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}
.message{
  display: inline-block;
  float: right;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #6F6F6F;
}
.inner-box p{
  width: 400px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #333333;
}
.message img{
  width: 24px;
  height: 24px;
}
.message1,.message2,.message3{
  width: 60px;
  margin-left: 25px;
}
.inpt{
  width: 400px;
  border: 1px solid #979797;
  border-radius: 4px;
}
.Submit{
  background: #FF8000;
  border: 1px solid #FF8000;
  cursor: pointer;
  float: right;
  margin-top: 10px;
}
</style>
