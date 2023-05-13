<template>
    <div class="full_screen_box" >
        <div class="function_main_title">欢迎回来</div>
        <div class="function_main_title">{{userInfo.userName?userInfo.userName:'访客用户'}}</div>

        <div class="confirm_button" style="margin-top: 80px" @click="openNavigate('deposit')">存款</div>
        <div class="confirm_button" style="margin-top: 20px" @click="openNavigate('withdraw')">取款</div>
        <div class="confirm_button" style="margin-top: 20px" @click="openNavigate('accountTransactionDetail')">检视账户交易</div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from 'vue-router';

const storage = localStorage;
const router = useRouter()
const userInfo = ref({});

// 开启跳转链接
const openNavigate = function (pageName){
    router.push({
        name: pageName
    })
}


onMounted(() => {
    //从 Local Storage 中获取用户信息
    let localUserInfo = storage.getItem("userInfo");
    if(localUserInfo){
        userInfo.value = JSON.parse(localUserInfo);
    }
    if (localUserInfo == null) {
        router.replace({
            name: 'login',
        })
    }
})
</script>

<style scoped lang="less">
.full_screen_box{
  width: 100%;
  height: calc(100% - 150px);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  box-sizing: border-box;
  padding: 0 40px 40px 40px;
}

.function_main_title{
  font-size: 25pt;
  color: #000000;
}

.confirm_button{
  width: 350px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18pt;
  color: #ffffff;
  background-image: linear-gradient(to bottom,#df242f,#b9243a);
  border: 3px solid #811924;
  border-radius: 10px;
  cursor: pointer;
}

.confirm_button:hover{
  background-image: linear-gradient(to bottom,#b9243a,#df242f);
  border: 3px solid #140000;
}
</style>
