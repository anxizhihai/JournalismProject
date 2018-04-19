<template>

  <!-- 通过判断level是否等于commentIds的长度来判断是否为楼层的顶部，如果是则实行else，不是的就接着递归 -->

  <div class="comment-box" v-if="level !== commentIds.split(',').length">
    <div class="comment-info">
      <!-- <img v-bind:src="commentItem[commentId].user.avatar ? `http://192.168.1.99:8765/PBumsXFDc/static/${commentItem[commentId].user.avatar}` : avatar" alt=""> -->
      <span class="user">{{commentItem[commentId].user.nickname}}</span>
      <span>{{commentItem[commentId].create_time}}</span>
      <span class="floor-count">{{commentItem[commentId].buildLevel}}楼</span>
    </div>
    <div class="">
    <span class="content">{{commentItem[commentId].content}}</span>
      <span class="rightfloat">
        <span class="commentagainst">
          <span class="commentagainsti"><img src="../../assets/icon_thumb_down.png" alt=""></span>
          <span class="commentagainsts">{{commentItem[commentId].against}}</span>
        </span>
        <span class="commentvote">
          <span class="commentvotei"><img src="../../assets/icon_thumb_up.png" alt=""></span>
          <span class="commentvotes">{{commentItem[commentId].vote}}</span>
        </span>
        <span class="commentpn">
          <span class="commentpns"><img src="../../assets/icon_comment.png" alt=""></span>
        </span>
      </span>
    </div>

    <!-- 此时如果level === 1说明没有更多的楼层，递归结束,否则level-1，接着递归 -->
    <comment1Box v-if="level !== 1" v-bind:commentItem="commentItem" v-bind:commentIds="commentIds" :level="level - 1"/>
  </div>
  <!-- 如果是楼层顶部则应用单独的样式 -->

  <div v-else class="comment-item">

    <!-- <img :src="commentItem[commentId].user.avatar ? `http://192.168.1.99:8765/PBumsXFDc/static/${commentItem[commentId].user.avatar}` : avatar" alt=""> -->
    <div class="inner-box">
<!-- <div> <span >{{commentItem[commentId].create_time}}</span></div>
<div>
  <span >{{commentItem[commentId].content}}</span>
            <span class="rightfloat">
        <span class="commentagainst">
          <span class="commentagainsti"><img src="../../assets/icon_thumb_down.png" alt=""></span>
          <span class="commentagainsts">{{commentItem[commentId].against}}</span>
        </span>
        <span class="commentvote">
          <span class="commentvotei"><img src="../../assets/icon_thumb_up.png" alt=""></span>
          <span class="commentvotes">{{commentItem[commentId].vote}}</span>
        </span>
        <span class="commentpn">
          <span class="commentpns"><img src="../../assets/icon_comment.png" alt=""></span>
        </span>
      </span>
</div> -->
      <!-- 顶楼盖完后递归下一层楼,如果楼层只有一层则递归结束，否则level-1接着递归 -->

      <comment1Box v-if="level !== 1" v-bind:commentItem="commentItem" v-bind:commentIds="commentIds" :level="level - 1"/>

    </div>
  </div>

</template>

<script>
  // 引入默认头像
   import avatar from '../../assets/logo.png'
  export default {
    // 通过name实现递归调用
    name: 'comment1Box',
    // 通过props来接收父组件传递过来的参数，名字与父组件中一致，接收到的参数可像data中的变量一样使用
    props: ['isshow','commentItem', 'commentIds', 'level'],
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
    // methods:{
    //   falses:function(){
    //     this.isshow=false
    //   }
    // }
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
.floor-count,.time {
  float: right;
}
.content {
  margin: 10px 0;
}
.user {
  margin-left: 5px;
}
.rightfloat{
  display: inline-block;
  float: right;
}
.commentagainsti img{
width: 15px;
height: 15px;
}
.commentvotei img{
width: 15px;
height: 15px;
}
.commentpns img{
width: 15px;
height: 15px;
}
</style>

