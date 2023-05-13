<template>
    <div class="navigator">
        <img class="left-logo" :src="mazeBankTextLogo" alt="MazeBank Logo" />
        <div class="right-info" v-if="userInfo.userName !== undefined">
            <div class="account-name">{{ userInfo.userName }}</div>
            <div class="worth">账户余额 ${{ userInfo.money.toFixed(2) }}</div>
        </div>
    </div>
</template>

<script setup>
import mazeBankTextLogo from "@/assets/images/mazebank_text_logo.png";
import {onMounted, ref} from "vue";

const storage = localStorage;
const userInfo = ref({});

onMounted(() => {
    //从 Local Storage 中获取用户信息
    let localUserInfo = storage.getItem("userInfo");
    if(localUserInfo){
        userInfo.value = JSON.parse(localUserInfo);
    }
})
</script>

<style lang="less" scoped>
.navigator {
  width: calc(100% - 80px);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 0;
  margin: 0 auto;
  border-bottom: 4px solid #ee222e;

  .left-logo {
    width: 363px;
    height: 70px;
    display: block;
  }

  .right-info {
    font-size: 15pt;

    .worth {
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
