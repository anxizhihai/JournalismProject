<template>
<div class="searchbox">
   <div class="searchs">
     <input type="text" class="search" v-model="key">
     <div class="circular"></div>
      <router-link :to="{ path: '/searchresult', query: {keys: key}}"> <img src="../../assets/icon_ search.png" alt="" @click="getKey(key)"></router-link>
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
  </div>
  </div>
  </div>
</template>
<script>
import {getKeyword} from '../../api/example.js'
import InfiniteLoading from 'vue-infinite-loading'
export default {
  components: {
    InfiniteLoading,
  },
  data () {
      return {
        newsList: [],
        img_url:'https://dev.apis.sh/PBXZ$DK1c/static/',
        page:1,
        key: ''
      }
    },
  created: function () {
      // 在created钩子中调用getNews方法
    //  this.getKey(this.$route.query.keys,1)
     console.log(this.$route.query.keys)
    },
  methods:{
      getKey:function(ab){
        var vm = this
        vm.newsList = ''
        vm.page=2
        getKeyword(ab,1).then(res =>{
          if(res.data.code === 'success'){
            vm.newsList = res.data.data.news
          }
        })
      },
      onInfinite() {
       setTimeout(() => {
        getKeyword(this.$route.query.keys,this.page).then((res) => {
           if (res.data.code ==='success'){
                this.newsList = this.newsList.concat(res.data.data.news);
                // this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
           }else{
             console.log(res.data.message)
           }
           if (Math.ceil(res.data.data.counts/2)===this.page) {
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
.searchbox{
  padding-top: 60px;
}
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
.searchs{
  width: 520px;
  height: 52px;
  background: #F9F9F9;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
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
.circular{
  width: 200px;
  height: 140px;
  transform: rotate(-52deg);
  background: #FF8000;
  border-radius: 50%;
  position: absolute;
  top: -100px;
  left: 420px;
}
.searchs img{
  position: absolute;
  top: 10px;
  left: 470px;
  cursor: pointer;
}
</style>



