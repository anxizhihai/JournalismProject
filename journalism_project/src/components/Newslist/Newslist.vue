<template>
<div>
   <v-headerlogin v-if="isShow"></v-headerlogin>
    <v-header v-else></v-header>
 <div class="newlist">
   <div class="newlists">
   <div class="list">
   <v-list></v-list>
   </div>
   <v-left></v-left>
  </div>
</div>
</div>
</template>
<script>
import leftnavigation from "../../components/leftnavigation/leftnavigation.vue";
import list from "../../components/list/list.vue";
import header from "../../components/header/header";
import headerlogin from "../../components/headerlogin/headerlogin";
export default {
  components: {
    "v-left": leftnavigation,
    "v-list": list,
    "v-header": header,
    "v-headerlogin": headerlogin
  },
  created: function() {
    this.judge();
  },
  methods: {
    judge: function() {
      if (localStorage.token == "") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  }
};
</script>
<style>
.newlists {
  background: #f9f9f9;
  padding-top: 60px;
  min-height: 800px;
}
.circular {
  width: 200px;
  height: 140px;
  transform: rotate(-52deg);
  background: #ff8000;
  border-radius: 50%;
  position: absolute;
  top: -100px;
  left: 420px;
}
.searchs img {
  position: absolute;
  top: 10px;
  left: 470px;
  cursor: pointer;
}
</style>


