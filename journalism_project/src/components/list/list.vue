<template>
<div>

<div>

  <div class="hot">
  <div class="searchs">
     <input type="text" class="search" v-model="key" @focus="modalshow()" @blur="modalhide()">
     <div class="circular"></div>
      <router-link :to="{ path: '/searchresult', query: {keys: key}}"> <img src="../../assets/icon_ search.png" alt=""></router-link>
   </div>
   <transition name="fade">
   <div class="hotsearch"  v-show="intsh">
     <li v-for="hotnews in hots" @click="sea($event)" >{{hotnews.title}}</li>
   </div>
   </transition>
   </div>
<div class="mainbox">
<div class="bodybox">
  <div class="outsidebox" v-for="news in newsList">
    <div class="insidebox">
        <router-link :to="{ path: '/listdetails', query: {id: news._id,covers: news.cover}}">{{news.title}}</router-link>
       <div class="labels">
         <span class="labelsss">
         <span class="labels0" v-for="(la,index) in news.keywords" v-html="la"></span></span>
       <span class="labels1"><img src="../../assets/icon_comment.png" alt=""><span class="labels3">10</span></span><span class="labels2"><img src="../../assets/icon_saw.png" alt=""><span class="labels4">{{news.comment_sum}}</span></span></div>
       <div class="covers"><img :src="img_url+news.cover" alt="" class="coversimg"></div>
    </div>
    <div class="timeaddress">
       <div class="time" v-html="dateDiff(news.create_time)"></div>
       <div class="address">{{news.source}}</div>
    </div>
  </div>
  <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
    <span slot="no-more">
    There is no more Hacker News
  </span>
  </infinite-loading>
  <div class="left">
   <div class="lefto"v-for="(le,index) in leftv" @click="getlist(le)">{{navigations[index]}}</div>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>
<script>
import {getnewlist,gethotlist} from '../../api/example.js'
import InfiniteLoading from 'vue-infinite-loading'


export default {
  components: {
    InfiniteLoading,

  },
  data () {
      return {
        newsList: [],
        img_url:'https://dev.apis.sh/PBXZ$DK1c/static/',
        leftv:['yaowen','shehui','war','tech','ent'],
        navigations:['要闻','社会','军事','科技','娱乐'],
        me:'yaowen',
        page:2,
        key:'',
        intsh: false,
        hots:[],
      }
    },
    created: function () {

      // 在created钩子中调用getNews方法
       this.getlist(this.me,1)
       this.gethot()

    },


  methods:{
     getlist: function (abc) {
        // 获取vue实例
        var vm = this
        this.newsList = ''
        getnewlist(abc,1).then(res => {
          if(res.data.code === 'success'){
            vm.newsList = res.data.data.news
          }
        })
          // 捕获错误
          .catch(err => {
          console.log(err)
        })
      },

      modalshow:function(){
             this.intsh=true
      },
      modalhide:function(){
             this.intsh= false
      },
      gethot:function(){
        var vm = this
        gethotlist().then(res =>{
             if(res.data.code === 'success'){
             this.hots = res.data.data.news
          }
        })
      },
      sea:function(event){
        console.log(event.currentTarget.innerText)
        this.key = event.currentTarget.innerText

      },
      onInfinite() {
       setTimeout(() => {
        getnewlist(this.me,this.page).then((res) => {
           if (res.data.code ==='success'){
                this.newsList = this.newsList.concat(res.data.data.news);
                // this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
           }else{
             console.log(res.data.message)
           }
           if (Math.ceil(res.data.data.count/4)===this.page) {
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
.mainbox{
background: #F9F9F9;
margin-top: 60.9px;
}

.outsidebox{
  width: 726px;
  background: #FFFFFF;
  margin: 0 auto;
  position: relative;
}
.insidebox{
    padding: 15.8px 77px 20.4px 138.3px;
}
.insidebox a{
  display: inline-block;
  width: 408px;
  height: 1.5em;
  font-family: MicrosoftYaHei;
  font-size: 24px;
  color: #333333;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

}
.insidebox img{
  width: 418.6px;
  height: 184.5px;
  cursor: pointer;
}
.labels{
  margin-top: 14.2px;
}
.labels img{
  width: 22px;
  height: 22px;;
  vertical-align: top;
}
.labels span{
  display: inline-block;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #9B9B9B;
  vertical-align: top;
}
.covers{
  margin-top: 14px;
}
.labelsss{
  display: inline-block;
  width: 140px;
  height: 19;
}
.labels0{
  display: inline-block;
  height: 19;
  margin-right: 5px;
}
.labels1{
  margin-left: 220.4px;
}
.labels3{
  margin-left: 10.4px;
}
.labels2{
  margin-left: 23.8px;
}
.labels4{
  margin-left: 10px;
}
.outsidebox{
  margin-bottom: 48px;
}
.timeaddress{
  width: 140px;
  height: 78px;
  background: #FFFFFF;
  border: 1px solid #DCDCDC;
  position: absolute;
  bottom: 239.8px;
  right: 623.5px;

}
.time{
  font-family: MicrosoftYaHei;
  font-size: 24px;
  color: #9B9B9B;
  padding-top: 10.9px;
  padding-left: 15.5px;
}
.address{
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #9B9B9B;
  margin-top: 6.2px;
  margin-left: 15px;
}
.left{
  width: 134px;
  height: 303px;
  background: #FFFFFF;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12);
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
  padding-top: 18px;
  position: fixed;
  top: 231.3px;
  left: 149.1px;

}
.left div{
  margin-bottom: 41px;
  cursor: pointer;
}
.searchs{
  width: 520px;
  height: 52px;
  background: #F9F9F9;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 60px;
}
.search{
  width: 520px;
  height: 48px;
  background: #FFFFFF;
  border: 1px solid #FF8000;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #9B9B9B;
  text-indent:1em;
}
.hot{
  width: 520px;
  position: relative;
  margin: 0 auto;
}
.hotsearch{
  width: 519.9px;
  background: #FFFFFF;
  box-shadow: -2px 0 3px 1px rgba(39,52,101,0.08), 2px 2px 3px 1px rgba(39,52,101,0.08);
  position: absolute;
  top: 50px;
  z-index: 2;
  padding-top: 12px;

}
.hotsearch li{
  list-style-type:none;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #151515;
  letter-spacing: 0;
  text-align: center;
  line-height: 19px;
  float: left;
  cursor: pointer;
  padding-bottom: 24px;
  margin-left: 19.5px;
}
.hotsearch li:first-child::before{
   content: '1.';
   color:  #FF8000;

}
.hotsearch li:nth-child(2)::before{
  content: '2.';
   color:  #FF8000;
}
.hotsearch li:nth-child(3)::before{
  content: '3.';
   color:  #FF8000;
}
.hotsearch li:nth-child(4)::before{
  content: '4.';
  color: #9B9B9B;
}
.hotsearch li:nth-child(5)::before{
  content: '5.';
  color: #9B9B9B;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


