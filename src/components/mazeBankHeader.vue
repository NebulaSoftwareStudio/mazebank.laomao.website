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
import {onMounted, ref, defineExpose} from "vue";

const storage = localStorage;
const userInfo = ref({});

const refreshUserInfo = function (){
    //从 Local Storage 中获取用户信息
    let localUserInfo = storage.getItem("userInfo");
    if(localUserInfo){
        userInfo.value = JSON.parse(localUserInfo);
    }
}

onMounted(() => {
    refreshUserInfo();
})

defineExpose({
    refreshUserInfo
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
    max-width: 300px;
    font-size: 15pt;

    .account-name{
      width: 100%;
      flex: auto;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .worth {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

@media (max-width: 792px){
  .navigator{
    flex-flow: column;
    height: 150px;

    .left-logo{
      width: 259px;
      height: 50px;
    }

    .right-info{
      width: 100%;
      margin-top: 20px;
      display: flex;

      .account-name{
        width: 40%;
        flex: auto;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .worth{
        width: fit-content;
        margin-left: 20px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
