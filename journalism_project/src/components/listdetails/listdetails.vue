<template>
<div class="articlebox">
<div class="article">
  <!--标题-->
  <div class="titles">{{detail.title}}</div>
  <!--出版社，时间-->
  <div class="press"><span class="press1">{{detail.source}}</span><span class="press2" v-html="dateDiff(detail.create_time)"></span></div>
  <!--图片-->
  <div class="imgsbox"><img class="imgs" :src="img_url+srcs" alt=""></div>
  <!--内容-->
  <div class="content" v-html="detail.details"></div>
  <!--分割线-->
  <div class="Segmentingline"></div>
  <div class="Comment">新闻点评</div>
  <!--评论框-->
  <div class="Commentbox"><input type="text" placeholder="我有话要说" v-model="cont"></div>
  <!--按钮-->
  <div class="btn"><button style="button" @click="postadd()">评论</button></div>
  <div class="newcomment">最新评论</div>
  <div class="newcommentbox">
      <div id="commentList">
      <!-- 循环commentIdsList来显示每条评论具体的盖楼评论id -->
      <div v-for="commentIds in commentIdsList" class="body">
      <!-- 使用组件，并传递参数 -->
      <!-- commentItem每个楼层具体的评论内容 -->
      <!-- 嵌套的评论id关系 -->
      <!-- 通过level来控制递归的次数 -->
      <commentBox v-bind:commentItem="commentItem" v-bind:commentIds="commentIds" v-bind:level="commentIds.split(',').length"/>
    </div>
     <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
    <span slot="no-more">
    There is no more Hacker News
  </span>
  </infinite-loading>
   </div>
  </div>
 </div>
<div class="leftbo">
  <div class="leftbo1"><img src="../../assets/icon_comment_color.png" alt=""><span>{{detail.comment_sum}}</span></div>
  <div class="leftbo2"><img src="../../assets/icon_saw_color.png" alt=""><span>100</span></div>
  <div class="leftbo3"></div>
  <div class="leftbo4"><img src="../../assets/icon_share.png" alt=""></div>
</div>
</div>
</template>
<script>
import {getdetails,getKeyword,postaddcomments,getReviewlist} from '../../api/example.js'
import commentBox from '../../components/commentBox/commentBox.vue'
import InfiniteLoading from 'vue-infinite-loading'
// 引入组件
export default {
  // 注册组件
    components: {
      commentBox: commentBox,
       InfiniteLoading,
    },
// 此时可以看到url中带有转义后的查询字符串——?msg=welcome%20to%20apis，
//我们通过$route.query.msg取到msg，然后在页面中显示出来。
    name: 'commentList',
    data(){
      return {
         img_url:'https://dev.apis.sh/PBXZ$DK1c/static/',
        detail:[],
        srcs:'',
        cont:'',
        commentItem: {},
        commentIdsList: [],
        page:1,
             }
        },
created:function(){
   this.getdetail(this.$route.query.id)
  //  this.getReview()
},
methods:{
  getdetail:function(){
    var vm = this
    getdetails(this.$route.query.id).then(res=>{
      console.log(res.data.code)
      var vm = this
      if(res.data.code === 'success'){
        vm.detail = res.data.data.news
       this.srcs= this.$route.query.covers
      }
    })
},
postadd:function(){
     postaddcomments(this.$route.query.id,this.cont).then(res=>{
    })
},
getReview:function(){
      var vm = this
    getReviewlist(this.$route.query.id,1).then(res=>{
      if (res.data.code === 'success') {
            // 将接口返回的评论id列表和评论内容赋给相应变量
            vm.commentItem = res.data.data.comments
            vm.commentIdsList = res.data.data.commentIds
          }
    })
},
      onInfinite() {
       setTimeout(() => {
        getReviewlist(this.$route.query.id,this.page).then((res) => {
           if (res.data.code ==='success'){
                  this.commentItem =Object.assign({}, this.commentItem, res.data.data.comments);
                  this.commentIdsList = this.commentIdsList.concat(res.data.data.commentIds);
                  console.log(res.data.data.commentIds)
                  console.log(res.data.data.comments)


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

      dateDiff:function(timestamp){
         var arrTimestamp = (timestamp + '').split('');
         for (var start = 0; start < 13; start++) {
         if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - timestamp;
    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }
    // 计算差异时间的量级
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    // 数值补0方法
    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };
    // 使用
    if (monthC > 1) {
        // 超过1年，直接显示年月日
        return (function () {
            var date = new Date(timestamp);
            return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
    }  else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
    }
    return '刚刚';
}
}
}
</script>
<style>
.articlebox{
  width: 858px;
  position: relative;
  margin: 0 auto;
}
.article{
  width: 858px;
}
.titles{
  width: 858px;
  font-family: MicrosoftYaHei;
  font-size: 26px;
  color: #333333;
  margin-top: 60px;
}
.press{
  width: 858px;
  margin-top: 31.4px;
}
.press1{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #333333;
}
.press2{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #9B9B9B;
  margin-left: 24.5px;
}
.imgsbox{
  width: 858px;
  margin-top: 29.6px;
}
.imgs{
  width: 655px;
  height: 377px;
  margin-left: 100.5px;
}
.content{
  margin-top: 29px;
}
.leftbo1 img,.leftbo2 img,.leftbo3 img{
width: 30px;
height: 30px;
vertical-align: top;
cursor: pointer;
}
.leftbo1 span,.leftbo2 span{
font-family: MicrosoftYaHei;
font-size: 14px;
color: #9B9B9B;
margin-left: 17px;
}
.leftbo2{
  margin-top: 10px;
}
.leftbo3{
  margin-top: 9.5px;
}
.leftbo4{
  margin-top: 10.5px;
}
.leftbo{
  position: absolute;
  top: 66.4px;
  left: -145.2px;
}
.Segmentingline{
  width: 858px;
  margin-top: 52px;
  height: 1px;
  border: 0.5px solid #DCDCDC;
  background: #DCDCDC;
}
.Comment{
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #6F6F6F;
  margin-top: 50px;
}
.Commentbox input{
  width: 858px;
  margin-top: 20px;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #6F6F6F;
  text-indent:1em;
  border: 1px solid #979797;
  border-radius: 4px;
}
.btn{
  width: 858px;
  height: 38px;
  margin-top: 15.5px;
  cursor: pointer;
}
.btn button{
  width: 110px;
  height: 36px;
  background: #FF8000;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 2px;
  float: right;
  border: 1px solid #FF8000;
}
.newcomment{
  width: 858px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #6F6F6F;
  margin-top: 35.1px;
}
.newcommentbox{
  margin-top: 20.4px;
}
#commentList {
  width: 1200px;
  margin: auto;
  text-align: left;
}
#commentList .body {
  padding: 10px 0;
  border-top: 1px solid #adadad;
  width: 858px;
}

</style>


