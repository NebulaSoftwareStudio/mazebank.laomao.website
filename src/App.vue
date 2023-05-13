<template>
    <div class="top_red_line"></div>

    <div class="maze-bank-display-main-box">
        <!-- 顶部logo及菜单 -->
        <maze-bank-header  />

        <router-view/>
    </div>
</template>
<script setup>
import MazeBankHeader from "@/components/mazeBankHeader.vue";
import {watch} from "vue";
import { useRouter } from 'vue-router'

const router = useRouter;

watch(router,(e)=>{
    console.log(e)
},{ immediate: true, deep: true })
</script>

<style lang="less">
*{
  padding: 0;
  margin: 0;
}

body{
  background-image: url("@/assets/images/page_background.jpg");
  background-repeat: repeat;
  background-size: 100px 100px;
}

.top_red_line{
  width: 100%;
  height: 10px;
  background-color: #ee222e;
}

.maze-bank-display-main-box{
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #e8e8e8;
  position: relative;
  min-height: calc(100vh - 10px);
  overflow-y: auto;

  &::-webkit-scrollbar{
    display: none;
    height: 0;
    width: 0;
    opacity: 0;
  }
}
</style>
