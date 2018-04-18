<template>
 <div class="newlist">
   <div class="newlists">
   <div class="list">
   <v-list></v-list>
   </div>
   <v-left></v-left>
  </div>
</div>
</template>
<script>
import leftnavigation from '../../components/leftnavigation/leftnavigation.vue'
import list from '../../components/list/list.vue'
export default {
components:{
  'v-left':leftnavigation,
  'v-list':list
 },
}
</script>
<style>
.newlists{
  background: #F9F9F9;
  padding-top: 60px;
  min-height: 800px;
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


