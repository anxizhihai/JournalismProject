<template>
<div>
   <v-headerlogin v-if="isShow"></v-headerlogin>
    <v-header v-else></v-header>
    <div class="settings">
    <div class="accountset">账号设置</div>
     <div class="userAvatar">
     <label for="imgfile">
     <img src="../../assets/logo.png" v-if="defaultshow" class="filesimg">
     <img :src="dataUrl" v-else-if="!defaultshow" class="filesimg">
     </label>
     <input type="file" id="imgfile" @change="handleFileChange" ref="inputer"  class="imgfiles">
     </div>
     <div class="usernmaes">{{name}}</div>
      <div class="nickname">
        <div class="nicknamew"><span>昵称</span><input class="nicknamewinput" type="text" v-model="name"></div>
      </div>
    <div class="phonenumber">
    <div class="phonenumberw"><span>手机号</span><input type="text" :placeholder="phone"></div></div>
    <div class="passwordss">
     <div class="passwordssw"><span>密码</span><input type="text" placeholder="******">
      <button type="button" @click="submitfile">修改</button></div>
    </div>
  </div>
  </div>
</template>
<script>
import header from "../../components/header/header";
import headerlogin from "../../components/headerlogin/headerlogin";
import { postaccountchange } from "../../api/example.js";
import Axios from '../../api/index'
export default {
  components: {
    "v-header": header,
    "v-headerlogin": headerlogin
  },
  data() {
    return {
      img_url:'https://dev.apis.sh/PBXZ$DK1c/static/',
      name: '',
      phone: localStorage.phone,
      defaultshow: "",
      dataUrl:""
    };
  },
  created: function() {
    this.judge();
  },
  methods: {
    judge: function() {
      if (localStorage.token == "") {
        this.isShow = false;
        this.defaultshow = true;
      } else {
        this.isShow = true;
        this.defaultshow = false;
        this.dataUrl=localStorage.avatar
        this.name=localStorage.name
        console.log(localStorage.name)
      }
    },
    // 头像预览
    imgPreview(file) {
      let self = this;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        var reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          self.dataUrl = this.result;
        };
      }
    },
    handleFileChange(e) {
      this.defaultshow = false;
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.file = inputDOM.files[0];
      this.errText = "";
      var file = e.target.files[0];

      let size = Math.floor(this.file.size / 1024);
      // 限制上传头像大小为5M
      if (size > 5 * 1024) {
        // 这里可以加个文件大小控制
        return false;
      }

      // 触发这个组件对象的input事件
      this.$emit("input", this.file);
      // 这里就可以获取到文件的名字了
      this.fileName = this.file.name;
      // 这里加个回调也是可以的
      this.onChange && this.onChange(this.file, inputDOM.value);
      // 在获取到文件对象进行预览就行了！
      this.imgPreview(this.file);
      this.avatar = this.file;
    },

    submitfile:function(){
        let inputDOM = this.$refs.inputer;
        this.file = inputDOM.files[0];
        var formdata = new FormData();
        formdata.append('avatar',this.file)
        formdata.append('token',localStorage.token)
        formdata.append('nickname',this.name)
        Axios.post('/account/detail/change',formdata,{
                headers:{'Content-Type':'multipart/form-data'}
            }).then(response => {
                 localStorage.avatar = this.dataUrl
                 localStorage.name = this.name
                 console.log(localStorage.name)
            })
    },

  }
};
</script>
<style>
.filesimg {
  width: 73.8px;
  height: 82.6px;
}
.settings {
  width: 1032px;
  height: 566px;
  background: #ffffff;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.11);
  margin: 0 auto;
  margin-top: 83.2px;
  margin-bottom: 243.6px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #333333;
}
.accountset {
  font-family: MicrosoftYaHei;
  font-size: 20px;
  color: #333333;
  line-height: 72.5px;
  border-bottom: 1px solid #dcdcdc;
  padding-left: 35.9px;
}
.imgfiles {
  position: absolute;
  left: -99999px;
}
.icon {
  width: 100%;
  text-align: center;
  line-height: 153px;
  padding-top: 35px;
}
.icon img {
  width: 104.3px;
  height: 120px;
  margin: 0 auto;
  vertical-align: top;
}
.nickname input {
  width: 296px;
  height: 38px;
  border: 1px solid #6f6f6f;
}
.phonenumber input {
  width: 296px;
  height: 38px;
  border: 1px solid #6f6f6f;
}
.passwordss input {
  width: 195px;
  height: 38px;
}
.passwordss button {
  width: 110px;
  height: 36px;
  background: #ff8000;
  border: 1px solid #ff8000;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 2px;
  text-align: center;
}
.passwordss,
.nickname,
.phonenumber {
  width: 100%;
}
.passwordssw,
.nicknamew,
.phonenumberw {
  margin-left: 335px;
}
.nicknamew span {
  display: inline-block;
  width: 43px;
}
.phonenumberw span {
  display: inline-block;
  width: 43px;
  margin-left: -10px;
}
.passwordssw span {
  display: inline-block;
  width: 43px;
}
.phonenumberw input {
  margin-left: 10px;
  border: 1px solid #ffffff;
}
.passwordssw input {
  border: 1px solid #ffffff;
}
.nickname,
.phonenumber,
.passwordss {
  margin-bottom: 30px;
}
.userAvatar{
  text-align: center;
  padding-top: 10px;
}
.usernmaes{
  text-align: center;
  margin-bottom: 30px;
}
.nicknamewinput{
    text-indent:1em;
}
</style>


