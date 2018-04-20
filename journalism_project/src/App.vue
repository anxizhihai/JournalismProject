<template>
  <div id="app">
    <!-- <v-headerlogin v-if="isShow"></v-headerlogin>
    <v-header v-else></v-header> -->
      <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './components/header/header'
import headerlogin from './components/headerlogin/headerlogin'
import footer from './components/footer/footer'

export default {
  name: 'App',
  components:{
    'v-header':header,
    'v-footer':footer,
    'v-headerlogin':headerlogin
  },
  data(){
    return {
      isShow: true
    }
  },
  created() {
        this.judge()
    },
  methods:{
    judge:function(){
      if(localStorage.token==''){
          this.isShow=false
    }else{
      this.isShow=true
     }
    }
  },
  watch:{

  }
}
</script>

<style>
body{
  padding: 0px;
  margin: 0px;
  background: #F9F9F9;
}
</style>
