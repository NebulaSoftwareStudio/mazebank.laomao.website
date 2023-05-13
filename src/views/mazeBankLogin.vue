<template>
    <div class="full_screen_box">
        <div class="function_main_title">欢迎您</div>
        <div class="function_main_title">请登记您的用户名</div>
        <div :class="'login-input-box' + (inputError?' random-run':'')">
            <input placeholder="您在 MazeBank 的用户名" class="user-name-input" v-model="loginUseUserName"
                   maxlength="25"/>
            <img :src="nextIcon" alt="next" class="login-btn" @click="login"/>
        </div>
        <div class="tips">* MazeBank 尊重您的隐私，您的所有数据与交易都将通过量子传输。
            <a href="https://www.nebula-soft.com/policy.php?name=privacy" target="_blank">隐私政策</a></div>
    </div>
</template>

<script setup>
import nextIcon from "@/assets/images/next.png";
import {ref, onMounted} from "vue";
import {useRouter} from 'vue-router'

const inputError = ref(false);
const loginUseUserName = ref("");
const storage = localStorage;
const router = useRouter()

// 用户登录
const login = function () {
    if (loginUseUserName.value === '') {
        inputError.value = true;
        setTimeout(function () {
            inputError.value = false
        }, 500)
    } else {
        // 将用户名存储到local storage中，并初始化账户。
        let userInfo = {
            userName: loginUseUserName.value,
            money: 0.000
        };
        storage.setItem("userInfo", JSON.stringify(userInfo));

        let logList = [
            {content: "重设用户名为「 " + loginUseUserName.value + " 」", money: 0}
        ];
        storage.setItem("logList", JSON.stringify(logList));

        router.push({
            name: 'index',
        })
    }
    loginUseUserName.value = ''
}

onMounted(() => {
    //从 Local Storage 中获取用户信息
    let userInfo = storage.getItem("userInfo");
    if (userInfo != null && userInfo !== '') {
        router.replace({
            name: 'index',
        })
    }
})

</script>

<style scoped lang="less">
.full_screen_box {
  width: 100%;
  height: calc(100% - 150px);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  box-sizing: border-box;
  padding: 0 40px 40px 40px;

  .function_main_title {
    font-size: 25pt;
    color: #000000;
  }

  .login-input-box {
    border: 5px solid #ee222e;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    height: 70px;
    width: 350px;
    margin-top: 40px;
    margin-bottom: 20px;
    overflow: hidden;

    .user-name-input {
      box-sizing: border-box;
      height: 70px;
      width: 50%;
      flex: auto;
      padding: 15px;
      font-size: 15pt;
      border-radius: 10px 0 0 10px;
      border: unset;
      outline: none;
    }

    .login-btn {
      display: block;
      width: 70px;
      height: 70px;
      box-sizing: border-box;
      padding: 15px;
      background-color: #ee222e;
      cursor: pointer;
      transition: opacity 200ms ease-in-out;
      user-select: none;

      &:hover {
        opacity: .7;
        transition: opacity 200ms ease-in-out;
      }
    }
  }

}


.tips {
  font-size: 12pt;
  color: #888888;
}

.random-run {
  animation: random-run 500ms ease-in-out;
}

@keyframes random-run {
  0% {
    transform: translateX(0%);
  }
  20% {
    transform: translateX(5%);
  }
  40% {
    transform: translateX(-5%);
  }
  60% {
    transform: translateX(5%);
  }
  80% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(0%);
  }
}

</style>
