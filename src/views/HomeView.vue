<template>
    <!-- 加载时遮罩 -->
    <transition name="fade">
        <div class="pre_loader" v-if="showLoading">
            <img :src="mazeBankLogo" class="logo">
            <div class="text">正在加载</div>
            <div class="loading_icon">
                <div class="loader-inner line-spin-fade-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from 'vue-router'
import mazeBankLogo from "@/assets/images/mazebank_logo.png";

const storage = localStorage;
const router = useRouter()
const showLoading = ref(true);

onMounted(() => {
    //从 Local Storage 中获取用户信息
    let userInfo = storage.getItem("userInfo");
    setTimeout(function (){
        showLoading.value = false;
    }, 1500);
    setTimeout(function (){
        if(userInfo == null || userInfo == ''){
            router.replace({
                name: 'login',
            })
        }else{
            router.replace({
                name: 'index',
            })
        }
    }, 2000);

})

</script>
<style scoped lang="less">
.pre_loader{
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
  background-image: url("@/assets/images/page_background.jpg");
  background-repeat: repeat;
  background-size: 100px 100px;
}

.pre_loader .text{
  font-size: 15pt;
  color: #353535;
  margin: 20px auto;
}

.pre_loader .logo{
  width: 100px;
  height: 100px;
  display: flex;
}

.loading_icon{
  display: block;
  margin: 0 auto;
  width: 60px;
  height: 60px;
}
.line-spin-fade-loader {
  position: relative;
  top: 20px;
  left: 25px
}

.line-spin-fade-loader > div {
  border-radius: 2px;
  margin: 2px;
  background-color: #ee222e
}

.line-spin-fade-loader > div:nth-child(1) {
  top: 20px;
  left: 0;
  animation: line-spin-fade-loader 1.2s -.84s infinite ease-in-out
}

.line-spin-fade-loader > div:nth-child(2) {
  top: 13.64px;
  left: 13.64px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  animation: line-spin-fade-loader 1.2s -.72s infinite ease-in-out
}

.line-spin-fade-loader > div:nth-child(3) {
  top: 0;
  left: 20px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  animation: line-spin-fade-loader 1.2s -.6s infinite ease-in-out
}

.line-spin-fade-loader > div:nth-child(4) {
  top: -13.64px;
  left: 13.64px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  animation: line-spin-fade-loader 1.2s -.48s infinite ease-in-out
}

.line-spin-fade-loader > div:nth-child(5) {
  top: -20px;
  left: 0;
  animation: line-spin-fade-loader 1.2s -.36s infinite ease-in-out
}

.line-spin-fade-loader > div:nth-child(6) {
  top: -13.64px;
  left: -13.64px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  animation: line-spin-fade-loader 1.2s -.24s infinite ease-in-out
}

.line-spin-fade-loader > div:nth-child(7) {
  top: 0;
  left: -20px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  animation: line-spin-fade-loader 1.2s -.12s infinite ease-in-out
}

.line-spin-fade-loader > div:nth-child(8) {
  top: 13.64px;
  left: -13.64px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  animation: line-spin-fade-loader 1.2s 0s infinite ease-in-out
}

.line-spin-fade-loader > div {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  width: 5px;
  height: 15px
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


@keyframes line-spin-fade-loader {
  50% {
    opacity: .3
  }
  100% {
    opacity: 1
  }
}
</style>
